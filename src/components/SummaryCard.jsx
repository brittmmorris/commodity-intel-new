import React from 'react';
import { Box, Button, ButtonGroup, Typography, Card } from '@mui/material';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
} from 'recharts';

const SummaryCard = ({ summary, price, trendLength, setTrendLength }) => {
  const sliceLength = trendLength === '30d' ? 30 : 5;
  const hasHistory = Array.isArray(price?.history) && price.history.length > 0;
  const sliced = hasHistory
    ? price.history.slice(-sliceLength).map((d, i) => ({ ...d, index: i }))
    : [];

  return (
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

      {sliced.length > 0 && (
        <Box mt={4}>
          <Typography variant="subtitle1" gutterBottom>
            Price Trend
          </Typography>

          <ButtonGroup sx={{ mb: 2 }} variant="outlined" size="small">
            <Button
              variant={trendLength === '5d' ? 'contained' : 'outlined'}
              onClick={() => setTrendLength('5d')}
            >
              5-Day
            </Button>
            <Button
              variant={trendLength === '30d' ? 'contained' : 'outlined'}
              onClick={() => setTrendLength('30d')}
            >
              30-Day
            </Button>
          </ButtonGroup>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={sliced}>
              <XAxis dataKey="date" />
              <XAxis xAxisId="index" dataKey="index" hide />
              <YAxis domain={['auto', 'auto']} />

              {sliced.map((d, i, arr) => {
                if (i === 0) return null;
                const prev = arr[i - 1];
                return (
                  <ReferenceArea
                    key={i}
                    x1={i - 1}
                    x2={i}
                    xAxisId="index"
                    fill={d.value > prev.value ? 'green' : 'red'}
                    fillOpacity={0.06}
                  />
                );
              })}

              <Tooltip
                formatter={(value, name, props) => {
                  if (typeof value !== 'number') return [`$${value}`, 'Price'];
                  const base = props.payload?.base;
                  const pct = base ? ((value - base) / base * 100).toFixed(2) : null;
                  return pct
                    ? [`$${value.toFixed(2)} (+${pct}%)`, 'Price']
                    : [`$${value.toFixed(2)}`, 'Price'];
                }}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#1d6ae7"
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Card>
  );
};

export default SummaryCard;
