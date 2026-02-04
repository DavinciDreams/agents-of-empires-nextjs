'use client';

import React, { Suspense, useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { Stars, Environment } from '@react-three/drei';
import { useGameStore } from '@/lib/store';
import { GameState, GameLoop } from '@/components/core';
import { CameraController } from '@/components/core';
import { SelectionSystem } from '@/components/core';
import { AgentBridgeProvider } from '@/components/bridge';
import { WorldGrid, GroundPlane } from '@/components/world';
import { Terrain } from '@/components/world';
import { InitialAgents, useAgentPool } from '@/components/entities';
import { AgentPool } from '@/components/entities';
import { DragonPool } from '@/components/entities';
import { StructurePool } from '@/components/entities';
import { ConnectionLines } from '@/components/entities';
import { HUD } from '@/components/ui';
import type { Structure } from '@/lib/store';

// ============================================================================
// Lighting Component
// ============================================================================

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[30, 50, 30]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <directionalLight position={[-20, 30, -20]} intensity={0.3} />
      <pointLight position={[0, 20, 0]} intensity={0.2} color="#f4d03f" />
    </>
  );
}

// ============================================================================
// Game Scene Component (runs inside Canvas)
// ============================================================================

function GameScene() {
  const { spawnAgent, spawnAgentBatch } = useAgentPool();

  // Move agents to a target position in formation
  const moveAgentsToPosition = useCallback(
    (targetPosition: [number, number, number], agentIds: string[]) => {
      if (agentIds.length === 0) return;

      const targets: [number, number, number][] = [];
      const count = agentIds.length;

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const radius = Math.max(1, Math.sqrt(count) * 0.5);
        targets.push([
          targetPosition[0] + Math.cos(angle) * radius,
          targetPosition[1],
          targetPosition[2] + Math.sin(angle) * radius,
        ]);
      }

      let i = 0;
      for (const agentId of agentIds) {
        useGameStore.getState().updateAgent(agentId, {
          targetPosition: targets[i],
          state: 'MOVING',
          currentTask: `Moving to ${targetPosition[0]}, ${targetPosition[2]}...`,
        });
        i++;
      }
    },
    []
  );

  // Handle ground click for movement
  const handleGroundClick = useCallback(
    (position: [number, number, number]) => {
      const selectedAgents = Array.from(useGameStore.getState().selectedAgentIds);
      if (selectedAgents.length === 0) return;
      moveAgentsToPosition(position, selectedAgents);
    },
    [moveAgentsToPosition]
  );

  // Handle structure click (select structure or show info)
  const handleStructureClick = useCallback(
    (structureId: string, structure: Structure) => {
      console.log('Structure clicked:', structure.name, structureId);
      // Set the selected structure to show info panel
      useGameStore.getState().setSelectedStructure(structureId);
    },
    []
  );

  // Handle structure right-click - assign selected agents to goal
  const handleStructureRightClick = useCallback(
    (structureId: string, structure: Structure) => {
      const selectedAgents = Array.from(useGameStore.getState().selectedAgentIds);

      if (selectedAgents.length === 0) {
        console.log('No agents selected to assign to', structure.name);
        return;
      }

      console.log(`Assigning ${selectedAgents.length} agents to ${structure.name}`);

      // Move agents to the structure's position
      moveAgentsToPosition(structure.position, selectedAgents);

      // Update agent tasks to reflect assignment to this goal
      for (const agentId of selectedAgents) {
        useGameStore.getState().updateAgent(agentId, {
          currentTask: `Assigned to ${structure.name}`,
        });
      }
    },
    [moveAgentsToPosition]
  );

  // Handle structure hover
  const handleStructureHovered = useCallback(
    (structureId: string | null) => {
      // Could show tooltip or status here
    },
    []
  );

  return (
    <>
      <Lighting />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="sunset" />

      <Terrain />
      <WorldGrid />
      <GroundPlane />

      <InitialAgents count={100} />
      <AgentPool onAgentClick={(agentId) => console.log('Agent clicked:', agentId)} />

      <ConnectionLines enabled={true} maxConnections={100} />

      <DragonPool />
      <StructurePool
        onStructureClick={handleStructureClick}
        onStructureRightClick={handleStructureRightClick}
      />

      <SelectionSystem
        onAgentsSelected={(ids) => console.log('Selected:', ids)}
        onGroundClicked={handleGroundClick}
        onStructureClicked={handleStructureClick}
        onStructureRightClicked={handleStructureRightClick}
        onStructureHovered={handleStructureHovered}
      />
    </>
  );
}

// ============================================================================
// Selection Box Overlay
// ============================================================================

function SelectionBoxOverlay() {
  const selectionBox = useGameStore((state) => state.selectionBox);

  if (!selectionBox || !selectionBox.active) return null;

  const x = Math.min(selectionBox.startX, selectionBox.endX);
  const y = Math.min(selectionBox.startY, selectionBox.endY);
  const width = Math.abs(selectionBox.endX - selectionBox.startX);
  const height = Math.abs(selectionBox.endY - selectionBox.startY);

  // Don't render if box is too small (less than 5 pixels)
  if (width < 5 && height < 5) return null;

  return (
    <div
      className="selection-box"
      style={{
        left: x,
        top: y,
        width,
        height,
        pointerEvents: 'none',
      }}
    />
  );
}

// ============================================================================
// Loading Screen
// ============================================================================

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-empire-dark to-black flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl mb-6 animate-bounce">⚔️</div>
        <h1 className="text-5xl font-bold text-empire-gold mb-4">Agents of Empire</h1>
        <p className="text-xl text-gray-400">Loading the battlefield...</p>
        <div className="mt-8 w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-empire-gold animate-pulse" style={{ width: '66%' }} />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Game Page Component
// ============================================================================

export default function GamePage() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-900">
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 px-4 py-2 bg-gray-800 text-yellow-500 rounded-lg hover:bg-gray-700 transition-colors"
      >
        ← Back to Landing
      </Link>

      <Suspense fallback={<LoadingScreen />}>
        <GameState>
          <AgentBridgeProvider>
            <Canvas
              shadows
              camera={{ position: [0, 30, 0], fov: 50 }}
              gl={{ antialias: true, alpha: false }}
            >
              <GameLoop />
              <GameScene />
              <CameraController />
            </Canvas>

            <HUD />
            <SelectionBoxOverlay />
          </AgentBridgeProvider>
        </GameState>
      </Suspense>
    </div>
  );
}
