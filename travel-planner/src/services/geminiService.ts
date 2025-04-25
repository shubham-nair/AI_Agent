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
    console.log('Calling Netlify function with prompt:', prompt);
    
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

    console.log('Response status:', response.status);
    const data: GeminiResponse | GeminiError = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      const errorData = data as GeminiError;
      throw new Error(errorData.error || errorData.details || 'Failed to generate content');
    }

    const successData = data as GeminiResponse;
    if (!successData.success) {
      throw new Error('Failed to generate content: No success flag in response');
    }

    return successData.result;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}; 