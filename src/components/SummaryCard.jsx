import React from 'react';
import { Card, Typography } from '@mui/material';

const SummaryCard = ({ summary, price }) => (
  <Card sx={{ mt: 3, p: 2 }}>
    <Typography variant="h6">Summary:</Typography>
    <Typography>{summary}</Typography>

    {price && typeof price === 'object' && (
      <>
        <Typography sx={{ mt: 2 }}><strong>Current Price:</strong> {price.current}</Typography>
        <Typography><strong>Yesterday:</strong> {price.previous}</Typography>
        <Typography sx={{ color: price.isPositive ? 'green' : 'red' }}>
          <strong>Change:</strong> {price.change}
        </Typography>
      </>
    )}
  </Card>
);

export default SummaryCard;
