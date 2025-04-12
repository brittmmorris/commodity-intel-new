import React, { useState } from 'react';
import { Box, TextField, Button, Card, Typography, CircularProgress, Stack } from '@mui/material';
import { askOpenAI } from '../utils/openaiUtils';

const AskAI = ({ context, trendLength }) => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);

    const prompt = `
      ${context}

      Based on the ${trendLength}-day price trend, answer the user's question below.
      User:
      ${question}
    `;

    const response = await askOpenAI(prompt);
    setChatHistory((prev) => [...prev, { question, answer: response }]);
    setQuestion('');
    setLoading(false);
  };

  return (
    <Card sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Ask AI
      </Typography>

      <Box
        sx={{
          maxHeight: 300,
          overflowY: 'auto',
          mb: 2,
          px: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {chatHistory.map((entry, i) => (
          <Box key={i}>
            <Card variant="outlined" sx={{ p: 1, mb: 1, backgroundColor: '#f5f5f5' }}>
              <Typography variant="body2" fontWeight="bold">
                You:
              </Typography>
              <Typography variant="body2">{entry.question}</Typography>
            </Card>
            <Card variant="outlined" sx={{ p: 1, backgroundColor: '#EAF3FF' }}>
              <Typography variant="body2" fontWeight="bold">
                AI:
              </Typography>
              <Typography variant="body2">{entry.answer}</Typography>
            </Card>
          </Box>
        ))}

        {loading && (
          <Box sx={{ pl: 1 }}>
            <Card variant="outlined" sx={{ p: 1, backgroundColor: '#EAF3FF' }}>
              <Typography variant="body2" fontWeight="bold">
                AI:
              </Typography>
              <Typography variant="body2">
                <span className="typing">...</span>
              </Typography>
            </Card>
          </Box>
        )}
      </Box>

      <Stack direction="row" spacing={1}>
        <TextField
          label="Ask a question about the data"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          fullWidth
          onKeyDown={(e) => e.key === 'Enter' && !loading && handleAsk()}
        />
        <Button variant="contained" onClick={handleAsk} disabled={!question || loading}>
          Ask
        </Button>
      </Stack>
    </Card>
  );
};

export default AskAI;
