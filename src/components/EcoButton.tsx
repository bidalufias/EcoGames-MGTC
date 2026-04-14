import { Button } from '@mui/material';
import { motion } from 'framer-motion';

interface EcoButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const sizeMap = {
  small: { py: 0.75, px: 2, fontSize: '0.85rem', minWidth: 80 },
  medium: { py: 1.25, px: 3, fontSize: '1rem', minWidth: 120 },
  large: { py: 1.5, px: 4, fontSize: '1.1rem', minWidth: 160 },
};

export default function EcoButton({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  startIcon,
  endIcon,
}: EcoButtonProps) {
  const sz = sizeMap[size];

  const getStyles = (): object => {
    if (disabled) {
      return {
        background: 'rgba(136, 146, 176, 0.2)',
        color: 'rgba(136, 146, 176, 0.5)',
        border: '1px solid rgba(136, 146, 176, 0.1)',
        cursor: 'not-allowed',
      };
    }

    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #0D9B4A 0%, #1B8EBF 100%)',
          color: '#fff',
          border: '1px solid rgba(13, 155, 74, 0.3)',
          boxShadow: '0 4px 20px rgba(13, 155, 74, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #14CC66 0%, #23B5E8 100%)',
            boxShadow: '0 6px 30px rgba(13, 155, 74, 0.5)',
            transform: 'translateY(-1px)',
          },
        };
      case 'secondary':
        return {
          background: 'transparent',
          color: '#0D9B4A',
          border: '1px solid rgba(13, 155, 74, 0.5)',
          '&:hover': {
            background: 'rgba(13, 155, 74, 0.1)',
            borderColor: '#0D9B4A',
            boxShadow: '0 0 20px rgba(13, 155, 74, 0.2)',
            transform: 'translateY(-1px)',
          },
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: '#E6F1FF',
          border: '1px solid transparent',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.05)',
            color: '#14CC66',
          },
        };
      default:
        return {};
    }
  };

  return (
    <motion.div whileTap={!disabled ? { scale: 0.97 } : undefined} style={{ display: 'inline-block' }}>
      <Button
        onClick={onClick}
        disabled={disabled}
        startIcon={startIcon}
        endIcon={endIcon}
        sx={{
          py: sz.py,
          px: sz.px,
          fontSize: sz.fontSize,
          minWidth: sz.minWidth,
          fontWeight: 600,
          textTransform: 'none',
          borderRadius: '12px',
          transition: 'all 0.3s ease',
          ...getStyles(),
        }}
      >
        {children}
      </Button>
    </motion.div>
  );
}
