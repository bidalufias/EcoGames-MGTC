import { Box, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import EcoCard from './EcoCard';
import EcoButton from './EcoButton';

interface GameTileProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  available: boolean;
  tags: string[];
  index?: number;
}

export default function GameTile({ id, title, description, icon, color, available, tags, index = 0 }: GameTileProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      style={{ height: '100%' }}
    >
      <EcoCard hoverable onClick={available ? () => navigate(`/games/${id}`) : undefined}>
        {/* Color accent strip */}
        <Box
          sx={{
            height: 4,
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            borderRadius: '16px 16px 0 0',
          }}
        />

        <Box sx={{ p: 3 }}>
          {/* Icon */}
          <Typography
            sx={{
              fontSize: '64px',
              lineHeight: 1,
              mb: 1.5,
              filter: `drop-shadow(0 0 12px ${color}44)`,
            }}
          >
            {icon}
          </Typography>

          {/* Title */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 1,
              background: `linear-gradient(135deg, #E6F1FF, ${color})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 2,
              lineHeight: 1.6,
              minHeight: 48,
            }}
          >
            {description}
          </Typography>

          {/* Tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2.5 }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  background: `${color}18`,
                  color: color,
                  border: `1px solid ${color}33`,
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  height: 26,
                  '& .MuiChip-label': { px: 1.2 },
                }}
              />
            ))}
          </Box>

          {/* CTA */}
          {available ? (
            <EcoButton variant="primary" size="medium" endIcon={<span>→</span>}>
              Play Now
            </EcoButton>
          ) : (
            <EcoButton variant="secondary" size="medium" disabled>
              Coming Soon
            </EcoButton>
          )}
        </Box>
      </EcoCard>
    </motion.div>
  );
}
