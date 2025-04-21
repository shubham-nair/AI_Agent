# AI Agent Projects

AI-powered applications.

## Travel Planner

Live Demo: [https://aigotrip.netlify.app/](https://aigotrip.netlify.app/)

Features:
- AI-powered travel itinerary generation
- Smart destination and activity recommendations
- Restaurant and attraction recommendations
- Interest-based activity suggestions
- User profile and saved plans


Tech Stack: React, TypeScript, Netlify

## How to Run Locally

1. Make sure you have Node.js installed on your computer. If not, download and install it from [nodejs.org](https://nodejs.org/)

2. Navigate to the travel-planner directory:
   ```
   cd travel-planner
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up your environment variables:
   - Copy `.env.example` to `.env.local`
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Add your API key to `.env.local`:
     ```
     REACT_APP_GEMINI_API_KEY=your_api_key_here
     ```

5. Start the development server:
   ```
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

The application will automatically reload when you make changes to the source files.

## License

This project is licensed under the MIT License.
