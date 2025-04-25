const { genkit } = require('genkit');
const { googleAI, gemini20Flash } = require('@genkit-ai/googleai');

const ai = genkit({ 
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY
    })
  ] 
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const { destination, startDate, endDate, interests } = JSON.parse(event.body || '{}');

    if (!destination || !startDate || !endDate || !interests) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const prompt = `Create a detailed travel itinerary for ${destination} from ${startDate} to ${endDate}. 
    Interests: ${interests.join(', ')}. 
    Include daily activities, recommended restaurants, and attractions. 
    Format the response as a structured JSON with the following format:
    {
      "title": "Trip to [destination]",
      "plan": [
        {
          "date": "YYYY-MM-DD",
          "weather": "weather condition",
          "activities": [
            {
              "title": "activity name",
              "description": "brief description",
              "time": "suggested time",
              "location": "location name"
            }
          ],
          "notes": "additional notes for the day"
        }
      ]
    }`;

    const { text } = await ai.generate({
      model: gemini20Flash,
      prompt: prompt
    });

    const generatedPlan = JSON.parse(text);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: 'ai-' + Date.now(),
        title: generatedPlan.title,
        preference: {
          destination,
          startDate,
          endDate,
          interests
        },
        plan: generatedPlan.plan,
        createdAt: new Date().toISOString(),
        isEditable: true,
        source: 'generated'
      })
    };
  } catch (error) {
    console.error('Error generating travel plan:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate travel plan' })
    };
  }
}; 