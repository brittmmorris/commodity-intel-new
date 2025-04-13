// utils/openaiUtils.js
export const askOpenAI = async (prompt) => {
const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4', // or gpt-3.5-turbo
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      stream: true,
    }),
  });

  if (!response.ok) throw new Error('OpenAI API error');

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');

  let result = '';
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;

    const chunk = decoder.decode(value, { stream: true });

    // Each chunk may contain multiple lines; parse SSE stream
    const lines = chunk.split('\n').filter(line => line.trim().startsWith('data:'));

    for (let line of lines) {
      const json = line.replace(/^data:\s*/, '');
      if (json === '[DONE]') return result;

      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) result += content;
      } catch (e) {
        console.error('Stream JSON parse error', e);
      }
    }
  }

  return result;
};


export const streamOpenAI = async (prompt, onData) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      stream: true,
    }),
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split('\n').filter(line => line.trim().startsWith('data:'));

    for (let line of lines) {
      const json = line.replace(/^data:\s*/, '');
      if (json === '[DONE]') return;

      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onData(content);
      } catch (e) {
        console.error('Stream parse error:', e);
      }
    }
  }
};
