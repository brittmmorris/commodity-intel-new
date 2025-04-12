import React from 'react';
import { Card, Typography, List, ListItem, ListItemText } from '@mui/material';

const FactPanelCard = ({ facts }) => {
  if (!facts) return null;

  return (
    <Card sx={{ mt: 3, p: 2 }}>
      <Typography variant="h6">Quick Facts</Typography>
      <List dense>
        <ListItem><ListItemText primary={`🔤 Symbol: ${facts.symbol}`} /></ListItem>
        <ListItem><ListItemText primary={`⚖️ Unit: ${facts.unit}`} /></ListItem>
        <ListItem><ListItemText primary={`🧪 Density: ${facts.density} g/cm³`} /></ListItem>
        <ListItem><ListItemText primary={`🔥 Melting Point: ${facts.meltingPoint} °C`} /></ListItem>
        <ListItem><ListItemText primary={`🌎 Exporters: ${facts.exporters.join(', ')}`} /></ListItem>
        <ListItem>
          <ListItemText
            primary={`🛡 Critical Mineral: ${facts.critical === true ? 'Yes ✅' : 'No'}`}
          />
        </ListItem>
      </List>
      <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
        Source: {facts.source}
      </Typography>
    </Card>
  );
};

export default FactPanelCard;
