// utils/openaiUtils.js
export const askOpenAI = async (question, context = '') => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: `You are a helpful assistant answering questions about global commodity production data.` },
          { role: 'user', content: `Here is the context: ${context}\n\nQuestion: ${question}` }
        ]
      })
    });
    const data = await response.json();
    return data.choices[0].message.content;
  };
  