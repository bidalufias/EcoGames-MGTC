import { Box } from '@mui/material';
import { motion } from 'framer-motion';

interface EcoCardProps {
  children: React.ReactNode;
  sx?: object;
  onClick?: () => void;
  hoverable?: boolean;
}

export default function EcoCard({ children, sx, onClick, hoverable = false }: EcoCardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { scale: 1.02 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{ height: '100%' }}
    >
      <Box
        onClick={onClick}
        sx={{
          position: 'relative',
          background: 'rgba(17, 34, 64, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(13, 155, 74, 0.15)',
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: onClick ? 'pointer' : 'default',
          transition: 'all 0.3s ease',
          ...(hoverable && {
            '&:hover': {
              borderColor: 'rgba(13, 155, 74, 0.5)',
              boxShadow: '0 0 30px rgba(13, 155, 74, 0.15), 0 8px 32px rgba(0, 0, 0, 0.3)',
            },
          }),
          ...sx,
        }}
      >
        {children}
      </Box>
    </motion.div>
  );
}
