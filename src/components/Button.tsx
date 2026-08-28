import React from 'react';
import './Button.css';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { SpecularButton } from './SpecularButton';

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass' | 'specular';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  icon,
  className = '',
  onClick,
  disabled,
  type = 'button',
  ...props
}) => {
  if (variant === 'specular') {
    return (
      <SpecularButton
        size={size}
        radius={12}
        tint="var(--color-accent-gold, #FFB800)"
        tintOpacity={0.12}
        textColor="var(--color-primary, #FFDCA1)"
        lineColor="#FFDCA1"
        baseColor="rgba(255, 184, 0, 0.4)"
        intensity={1.2}
        className={`${fullWidth ? 'wanderly-btn--full' : ''} ${className}`}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        disabled={disabled}
        type={type as 'button' | 'submit' | 'reset'}
      >
        {icon && <span className="btn-icon mr-2">{icon}</span>}
        {children}
      </SpecularButton>
    );
  }

  const baseClass = 'wanderly-btn';
  const classes = [
    baseClass,
    `${baseClass}--${variant}`,
    `${baseClass}--${size}`,
    fullWidth ? `${baseClass}--full` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </motion.button>
  );
};
