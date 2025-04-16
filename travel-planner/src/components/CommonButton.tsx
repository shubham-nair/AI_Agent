import React from 'react';

interface CommonButtonProps {
  label: string;
  onClick: () => void;
}

function CommonButton({ label, onClick }: CommonButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

export default CommonButton;
