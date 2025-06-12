'use client';

import { BeatLoader } from 'react-spinners';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = 16,
  color = '#3b82f6',
  className = '',
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center h-screen ${className}`}>
      <BeatLoader 
        color={color} 
        size={size} 
        margin={2} 
        speedMultiplier={0.8} 
      />
    </div>
  );
}
