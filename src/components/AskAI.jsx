// components/AskAI.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Card, Typography } from '@mui/material';
import { askOpenAI } from '../utils/openaiUtils';

const AskAI = ({ context,  trendLength }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleAsk = async () => {
      setLoading(true);

      const prompt = `
        ${context}

        Based on the ${trendLength}-day price trend, answer the user's question below.
        User:
        ${question}
        `;
      const response = await askOpenAI(prompt);
      setAnswer(response);
      setLoading(false);
    };
  
    return (
      <Box mt={4}>
        <TextField
          label="Ask a question about the data"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          fullWidth
        />
        <Button variant="outlined" onClick={handleAsk} disabled={!question || loading} sx={{ mt: 1 }}>
          Ask
        </Button>
        {answer && (
          <Card sx={{ mt: 2, p: 2 }}>
            <Typography variant="subtitle1">AI Response:</Typography>
            <Typography>{answer}</Typography>
          </Card>
        )}
      </Box>
    );
  };
  
  export default AskAI;
  