// components/NewsCard.jsx
import React from 'react';
import { Card, Typography, List, ListItem, ListItemText, Link } from '@mui/material';

const NewsCard = ({ articles = [], source }) => {
  if (!articles.length) return null;

  return (
    <Card sx={{ mt: 3, p: 2 }}>
      <Typography variant="h6">Recent News</Typography>
      <List dense>
        {articles.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemText
              primary={
                <Link href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </Link>
              }
              secondary={item.date}
            />
          </ListItem>
        ))}
      </List>
      {source && (
        <Typography variant="caption" sx={{ mt: 1, display: 'block', fontStyle: 'italic' }}>
          Source: {source}
        </Typography>
      )}
    </Card>
  );
};

export default NewsCard;
