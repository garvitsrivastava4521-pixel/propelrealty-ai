import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'PropelRealty AI | Autonomous Real Estate Lead Engine',
  description: 'Convert real estate web traffic into qualified leads and Zoom bookings in sub-15 seconds.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
