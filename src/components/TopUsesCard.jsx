import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const TopUsesCard = ({ data, source }) => {
  if (!data || data.length === 0) return null;

  return (
    <Card sx={{ mt: 3, p: 2 }}>
      <Typography variant="h6">Top Uses</Typography>

      <Box sx={{ height: 200, mt: 2 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="percent"
              nameKey="name"
              outerRadius={70}
              label={({ name, percent }) => `${name} (${percent}%)`}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {source && (
        <Typography variant="caption" sx={{ mt: 1, display: 'block', fontStyle: 'italic' }}>
          Source: {source}
        </Typography>
      )}
    </Card>
  );
};

export default TopUsesCard;
