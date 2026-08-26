import React from 'react';
import './Card.css';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

export interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'interactive' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}) => {
  const baseClass = 'wanderly-card';
  const classes = [
    baseClass,
    `${baseClass}--${variant}`,
    `${baseClass}--p-${padding}`,
    className
  ].filter(Boolean).join(' ');

  const isInteractive = variant === 'interactive';

  return (
    <motion.div
      whileHover={isInteractive ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={classes}
      {...props}
    >
      {children}
    </motion.div>
  );
};
