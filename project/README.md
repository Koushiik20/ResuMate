# Resume Builder and Analyzer

A modern web application for creating, analyzing, and improving resumes with AI-powered suggestions.

## Features

- Resume Builder with multiple templates
- Resume Analyzer with AI-powered feedback
- Skills management and visualization
- PDF export functionality

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the project root with your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## OpenAI API Key

To use the AI-powered resume analysis and suggestions, you need an OpenAI API key:

1. Sign up for an account at [OpenAI](https://platform.openai.com/)
2. Create an API key in your account settings
3. Add the API key to your `.env` file as shown above

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- OpenAI API
- jsPDF
- html2canvas
- Vite 