import React from 'react';
import { Card, Typography, Chip, Stack } from '@mui/material';

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
                label={commodity}
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

      {data.source && (
        <Typography variant="caption" sx={{ display: 'block', mt: 2, fontStyle: 'italic' }}>
          Source: {data.source}
        </Typography>
      )}
    </Card>
  );
};

export default LocationSummaryCard;
