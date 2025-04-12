import React from 'react';
import { Card, Typography, List, ListItem, ListItemText } from '@mui/material';

const NewsCard = ({ articles, source }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <Card sx={{ mt: 3, p: 2 }}>
      <Typography variant="h6">Recent News Mentions</Typography>
      <List dense>
        {articles.map((article, i) => (
          <ListItem
            key={i}
            component="a"
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItemText
              primary={article.title}
              secondary={article.date ? `Published: ${article.date}` : null}
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
            />
          </ListItem>
        ))}
      </List>
      {source && (
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          Source: {source}
        </Typography>
      )}
    </Card>
  );
};

export default NewsCard;
