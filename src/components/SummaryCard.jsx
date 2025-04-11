import React from 'react';
import { Card, Typography } from '@mui/material';
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';

const SummaryCard = ({ summary, price }) => (
  <Card sx={{ mt: 3, p: 2 }}>
    <Typography variant="h6">Summary:</Typography>
    <Typography>{summary}</Typography>
    {source && (
  <Typography variant="caption" sx={{ mt: 2, fontStyle: 'italic' }}>
    Source: {source}
  </Typography>
)}

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
              type="natural"
              dataKey="value"
              stroke={price.isPositive ? 'green' : 'red'}
              strokeWidth={2}
              dot={false}
            />
            <YAxis domain={['dataMin - 0.1', 'dataMax + 0.1']} hide />
          </LineChart>
        </ResponsiveContainer>

      </div>
    )}

  </Card>
);

export default SummaryCard;
