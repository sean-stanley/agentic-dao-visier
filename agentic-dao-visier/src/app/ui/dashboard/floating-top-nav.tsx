'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function MinimalFloatingTopNav() {
  return (
    <div className="fixed top-0 left-0 z-50 flex w-full justify-end p-4">
      <div className="bg-transparent">
        <ConnectButton />
      </div>
    </div>
  );
}
