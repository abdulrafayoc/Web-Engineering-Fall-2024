import React, { memo } from 'react';
import type { LucideIcon } from 'lucide-react';

interface ControlButtonProps {
  onClick: () => void;
  disabled: boolean;
  title: string;
  Icon: LucideIcon;
}

const ControlButton = ({ onClick, disabled, title, Icon }: ControlButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
    title={title}
  >
    <Icon className="w-5 h-5" />
  </button>
);

export default memo(ControlButton);