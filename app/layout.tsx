import type { Metadata } from 'next';
import { MedievalSharp } from 'next/font/google';
import './globals.css';

const medievalSharp = MedievalSharp({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-medieval',
});

export const metadata: Metadata = {
  title: 'Agents of Empire - Command Your AI Army',
  description: 'A 3D RTS interface for LangGraph Deep Agents. Command your AI army, build structures, and conquer the TypeScript dragons.',
  keywords: ['AI', 'RTS', 'LangGraph', 'Deep Agents', 'Three.js', 'Next.js'],
  authors: [{ name: 'Agents of Empire Team' }],
  openGraph: {
    title: 'Agents of Empire - Command Your AI Army',
    description: 'A 3D RTS interface for LangGraph Deep Agents',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={medievalSharp.variable}>
      <body className="font-medieval">
        {children}
      </body>
    </html>
  );
}
