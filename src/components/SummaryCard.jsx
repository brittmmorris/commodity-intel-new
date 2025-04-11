// components/SummaryCard.jsx
import React from 'react';
import { Card, Typography } from '@mui/material';

const SummaryCard = ({ summary, price }) => (
  <Card sx={{ mt: 3, p: 2 }}>
    <Typography variant="h6">Summary:</Typography>
    <Typography>{summary}</Typography>
    {price && (
      <Typography sx={{ mt: 1 }}><strong>Current Market Price:</strong> {price}</Typography>
    )}
  </Card>
);

export default SummaryCard;