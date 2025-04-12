import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Avatar,
  CircularProgress,
  Card,
  Stack,
  IconButton,
} from '@mui/material';
import { askOpenAI } from '../utils/openaiUtils';
import SendIcon from '@mui/icons-material/Send';

const AskAI = ({ context, trendLength }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const typingMessage = {
      sender: 'ai',
      text: '...',
      timestamp: '',
      loading: true,
    };

    setMessages(prev => [...prev, userMessage, typingMessage]);
    setInput('');
    setLoading(true);

    const prompt = `
      ${context}
      Based on the ${trendLength}-day price trend, answer the user's question below.
      User:
      ${input}
    `;

    const fullResponse = await askOpenAI(prompt);

    // Simulate typing effect
    let displayedText = '';
    const streamSpeed = 20; // ms per character
    const chars = fullResponse.split('');
    const updateIndex = messages.length + 1;

    for (let i = 0; i <= chars.length; i++) {
      await new Promise(resolve => setTimeout(resolve, streamSpeed));
      displayedText = chars.slice(0, i).join('');
      setMessages(prev => {
        const updated = [...prev];
        updated[updateIndex] = {
          sender: 'ai',
          text: displayedText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        return updated;
      });
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <Box mt={4}>
      <Card sx={{ p: 2, minHeight: 200, maxHeight: 300, overflowY: 'auto' }}>
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
                {msg.text}
              </Typography>
              {msg.timestamp && (
                <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'gray' }}>
                  {msg.timestamp}
                </Typography>
              )}
            </Box>
          </Stack>
        ))}
        {loading && (
          <Typography variant="body2" sx={{ color: 'gray', fontStyle: 'italic' }}>
            AI is typing...
          </Typography>
        )}
      </Card>

      <Box display="flex" alignItems="center" mt={2}>
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
