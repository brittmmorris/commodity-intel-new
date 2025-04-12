import React from 'react';
import { Card, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from 'recharts';

const ProductionTrendCard = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  // Add index to data points for ReferenceArea
  const chartData = data.map((d, i) => ({ ...d, index: i }));

  return (
    <Card sx={{ mt: 3, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Historical Production (2015–2024)
      </Typography>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis dataKey="year" />
          <XAxis xAxisId="index" dataKey="index" hide />
          <YAxis
            domain={['auto', 'auto']}
            tickFormatter={(value) => value.toLocaleString()}
          />
          {/* Shading areas between years */}
          {chartData.map((point, i, arr) => {
            if (i === 0) return null;
            const prev = arr[i - 1];
            const isGrowth = point.value > prev.value;
            return (
              <ReferenceArea
                key={i}
                x1={i - 1}
                x2={i}
                xAxisId="index"
                fill={isGrowth ? 'green' : 'red'}
                fillOpacity={0.06}
              />
            );
          })}

          <Tooltip
            formatter={(value) => `${value.toLocaleString()} metric tons`}
            labelFormatter={(label) => `Year: ${label}`}
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
    </Card>
  );
};

export default ProductionTrendCard;
