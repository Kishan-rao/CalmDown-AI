import type { ReactNode } from 'react';

interface PanelProps {
  className?: string;
  children: ReactNode;
}

export function Panel({ className = '', children }: PanelProps) {
  return <section className={`panel ${className}`}>{children}</section>;
}
