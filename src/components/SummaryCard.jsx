import React from 'react';
import { Card, Typography } from '@mui/material';
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';

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
      <Box mt={4}>
        <Typography variant="subtitle1" gutterBottom>
          5-Day Price Trend
        </Typography>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={price.history}>
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip
              formatter={(value) => `$${value.toFixed(2)}`}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={price.isPositive ? 'green' : 'red'}
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    )}

  </Card>
);


export default SummaryCard;
