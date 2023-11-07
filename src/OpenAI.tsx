import axios from 'axios';
import {OPENAI_APIKEY} from './ENV';
import React from 'react';

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1/chat/completions',
});

export const getChatReply = async (message: string): Promise<string> => {
  const apiKey = OPENAI_APIKEY;

  const instructions =
    'Your responses should be limited to basic diagnostic and basic health tips. If ask about other topics, your reply should be explain that you are limited to basic health and diagnostic topics only.';

  const prompt = `${instructions}\n \n ${message}`;

  const data = {
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    messages: [{role: 'user', content: prompt}],
  };

  try {
    const response = await openai.post('', data, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    let reply = response.data.choices[0].message.content.trim();

    if (message.toLowerCase().includes('health')) {
      reply +=
        '\n\nPlease remember to consult with a healthcare professional for accurate information.';
    }

    return reply;
  } catch (error) {
    console.error('Error fetching AI reply:', error);
    return 'Error fetching AI reply.';
  }
};
