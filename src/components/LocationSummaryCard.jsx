import React from 'react';
import { Card, Typography, List, ListItem, ListItemText } from '@mui/material';

const LocationSummaryCard = ({ location, data }) => {
  if (!data) return null;

  return (
    <Card sx={{ mt: 3, p: 2 }}>
      <Typography variant="h6">What’s in {location}?</Typography>
      
      <Typography>Known Commodities: {data.commodities.join(', ')}</Typography>
      <Typography>Mines: {data.mineCount}</Typography>

      <Typography sx={{ mt: 2 }}><strong>Top Commodities:</strong></Typography>
      <List dense>
        {data.topCommodities.map((c, i) => (
          <ListItem key={i} disablePadding>
            <ListItemText primary={`${c.name} – ${c.share}`} />
          </ListItem>
        ))}
      </List>

      <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
        Source: {data.source}
      </Typography>
    </Card>
  );
};

export default LocationSummaryCard;
