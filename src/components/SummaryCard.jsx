import React from 'react';
import { Card, Typography } from '@mui/material';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

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

    {price?.history?.length > 0 && (
      <div style={{ marginTop: 16 }}>
        <strong>5-Day Trend:</strong>
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={price.history}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={price.isPositive ? 'green' : 'red'}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )}

  </Card>
);

export default SummaryCard;
