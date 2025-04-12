import React from 'react';
import { Card, Typography } from '@mui/material';
import { useState } from 'react';
import { Box, Button, ButtonGroup, Typography, Card } from '@mui/material';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea
} from 'recharts';

const [trendLength, setTrendLength] = useState(5);

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
          Price Trend
        </Typography>

        {/* Toggle buttons */}
        <ButtonGroup sx={{ mb: 2 }} variant="outlined" size="small">
          <Button
            variant={trendLength === 5 ? 'contained' : 'outlined'}
            onClick={() => setTrendLength(5)}
          >
            5-Day
          </Button>
          <Button
            variant={trendLength === 30 ? 'contained' : 'outlined'}
            onClick={() => setTrendLength(30)}
          >
            30-Day
          </Button>
        </ButtonGroup>

        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={price.history.slice(-trendLength)}>
            {/* Optional background shading on gain days */}
            {price.history.slice(-trendLength).map((d, i, arr) => {
              if (i === 0) return null;
              const prev = arr[i - 1];
              return d.value > prev.value ? (
                <ReferenceArea
                  key={i}
                  x1={prev.date}
                  x2={d.date}
                  fill="green"
                  fillOpacity={0.06}
                />
              ) : null;
            })}

            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip
              formatter={(value, name, props) => {
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
              stroke={price.isPositive ? 'green' : 'red'}
              strokeWidth={2}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    )}


  </Card>
);


export default SummaryCard;
