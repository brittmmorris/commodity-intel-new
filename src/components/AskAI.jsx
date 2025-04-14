import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Avatar,
  Card,
  Stack,
  IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { streamOpenAI } from '../utils/openaiUtils';

const AskAI = ({ context, trendLength }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage = {
      sender: 'user',
      text: input,
      timestamp,
    };

    setMessages(prev => [...prev, userMessage, {
      sender: 'ai',
      text: '',
      timestamp: '', // Will update later
      loading: true,
    }]);

    const prompt = `
      ${context}
      Based on the ${trendLength}-day price trend, answer the user's question below.
      User:
      ${input}
    `;

    setInput('');
    setLoading(true);

    let streamedText = '';
    await streamOpenAI(prompt, (chunk) => {
      streamedText += chunk;
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          sender: 'ai',
          text: streamedText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        return updated;
      });
    });

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <Box mt={4} mb={6}>
      <Card
        sx={{
          p: 2,
          minHeight: 200,
          maxHeight: 300,
          overflowY: 'auto',
          border: '1px solid #cccccc',
          borderRadius: 2 // or '4px'
        }}
      >
        {messages.map((msg, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={2}
            alignItems="flex-start"
            mb={2}
            sx={{ flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}
          >
            <Avatar sx={{ bgcolor: msg.sender === 'user' ? 'primary.main' : 'secondary.main' }}>
              {msg.sender === 'user' ? 'U' : 'A'}
            </Avatar>
            <Box
              sx={{
                bgcolor: msg.sender === 'user' ? '#e3f2fd' : '#f1f8e9',
                borderRadius: 2,
                p: 1.5,
                maxWidth: '75%',
              }}
            >
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {msg.text || '...'}
              </Typography>
              {msg.timestamp && (
                <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'gray' }}>
                  {msg.timestamp}
                </Typography>
              )}
            </Box>
          </Stack>
        ))}
        {loading && messages.length === 0 && (
          <Typography variant="body2" sx={{ color: 'gray', fontStyle: 'italic' }}>
            AI is typing...
          </Typography>
        )}
      </Card>

      <Box display="flex" alignItems="center">
        <TextField
          fullWidth
          label="Ask a question about the data"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <IconButton
          color="primary"
          onClick={handleAsk}
          disabled={!input || loading}
          sx={{ ml: 1 }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AskAI;
