import React from 'react';
import { Card, Typography, Chip, Stack, Box } from '@mui/material';

// Map emoji to commodities
const commodityEmojis = {
  Copper: '🪙',
  Gold: '🥇',
  Lithium: '🔋',
  Coal: '🪨',
  Salt: '🧂',
  Limestone: '🏗️',
};

const LocationSummaryCard = ({ location, data, onCommodityClick }) => {
  if (!data) {
    return (
      <Card sx={{ mt: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {location} Overview
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Sorry, we don’t have data available for this country yet.
        </Typography>
      </Card>
    );
  }

  return (
    <Card sx={{ mt: 3, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {location} Overview
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        {data.summary || 'No summary available.'}
      </Typography>

      {Array.isArray(data.commodities) && data.commodities.length > 0 ? (
        <>
          <Typography variant="subtitle2" gutterBottom>
            Commodities:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {data.commodities.map((commodity, i) => (
              <Chip
                key={i}
                label={`${commodityEmojis[commodity] || ''} ${commodity}`.trim()}
                clickable
                color="primary"
                onClick={() => onCommodityClick?.(commodity)}
              />
            ))}
          </Stack>
        </>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No commodity data available.
        </Typography>
      )}

      {data.didYouKnow && (
        <Box mt={3} p={2} bgcolor="#f9f9f9" borderRadius={2}>
          <Typography variant="subtitle2">Did You Know?</Typography>
          <Typography variant="body2">{data.didYouKnow}</Typography>
        </Box>
      )}

      {data.economicImportance && (
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mt: 2, fontStyle: 'italic' }}
        >
          {data.economicImportance}
        </Typography>
      )}

{Array.isArray(data.topCommodities) && data.topCommodities.length > 0 && (
  <Box mt={4}>
    <Typography variant="subtitle2" gutterBottom>
      Top Commodities by Share:
    </Typography>
    <Stack spacing={1}>
      {data.topCommodities.map((item, i) => (
        <Box key={i}>
          <Typography variant="body2">
            <strong>{item.name}:</strong> {item.share}
          </Typography>
          <Box
            sx={{
              height: 8,
              width: `${parseInt(item.share)}%`,
              bgcolor: 'primary.main',
              borderRadius: 4,
              mt: 0.5
            }}
          />
        </Box>
      ))}
    </Stack>
  </Box>
)}


      {data.source && (
        <Typography variant="caption" sx={{ display: 'block', mt: 2, fontStyle: 'italic' }}>
          Source: {data.source}
        </Typography>
      )}
    </Card>
  );
};

export default LocationSummaryCard;