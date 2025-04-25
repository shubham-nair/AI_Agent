interface GeminiResponse {
  result: string;
  success: boolean;
}

interface GeminiError {
  error: string;
  details: string;
}

export const generateContent = async (prompt: string, maxTokens: number = 1000): Promise<string> => {
  try {
    const response = await fetch('/.netlify/functions/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        maxTokens,
      }),
    });

    const data: GeminiResponse | GeminiError = await response.json();

    if (!response.ok) {
      throw new Error((data as GeminiError).error || 'Failed to generate content');
    }

    return (data as GeminiResponse).result;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}; 