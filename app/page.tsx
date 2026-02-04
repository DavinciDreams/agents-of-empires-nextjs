'use client';

import Link from 'next/link';
import { Landing } from '@/components/landing';

export default function HomePage() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-900">
      <Landing onEnterGame={() => {}} />
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <Link
          href="/game"
          className="px-8 py-4 bg-yellow-500 text-gray-900 text-xl font-bold rounded-lg hover:bg-yellow-400 transition-colors shadow-lg hover:shadow-xl"
        >
          Play Demo
        </Link>
      </div>
    </div>
  );
}
