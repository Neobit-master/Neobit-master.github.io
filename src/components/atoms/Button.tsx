import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
}

const Button = ({ children, type, onClick, className }: ButtonProps) => {
  return (
    <button
      type={type || 'button'}
      onClick={onClick ? () => onClick() : undefined}
      className={className || 'button'}
    >
      {children}
    </button>
  );
};

export default Button;
