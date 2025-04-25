import axios from 'axios';

// Define the types for the resume analysis data
interface ResumeScores {
  overall: number;
  keywords: number;
  content: number;
  format: number;
  skills: number;
}

interface SkillGap {
  name: string;
  importance: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
}

interface ResumeAnalysis {
  scores: ResumeScores;
  keywords: {
    found: string[];
    missing: string[];
  };
  skillGaps: SkillGap[];
  improvements: {
    critical: string[];
    recommended: string[];
    optional: string[];
  };
}

// Function to get the OpenAI API key from environment variables
const getOpenAIKey = (): string => {
  // Try to get the API key from environment variables
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('OpenAI API key is not configured');
    throw new Error(
      'OpenAI API key is not configured. Please create a .env file in the project root with VITE_OPENAI_API_KEY=your_api_key'
    );
  }
  
  return apiKey;
};

// Function to generate AI suggestions based on resume analysis
export const generateResumeSuggestions = async (
  analysis: ResumeAnalysis,
  selectedRole: string
): Promise<string> => {
  try {
    console.log('Generating resume suggestions for role:', selectedRole);
    
    // Get the API key
    const apiKey = getOpenAIKey();
    
    // Construct the prompt for GPT
    const prompt = `
      You are a professional resume reviewer and career coach. 
      Based on the following resume analysis for a ${selectedRole} position, 
      provide a concise, actionable suggestion paragraph (2-3 sentences) that:
      1. Highlights the most important improvement the candidate should make
      2. References specific missing skills or keywords: ${analysis.keywords.missing.join(', ')}
      3. Suggests a concrete next step, such as a certification or project
      4. Maintains a supportive and encouraging tone
      
      Resume Analysis:
      - Overall Score: ${analysis.scores.overall}/100
      - Keywords Found: ${analysis.keywords.found.join(', ')}
      - Missing Keywords: ${analysis.keywords.missing.join(', ')}
      - Critical Improvements: ${analysis.improvements.critical.join('; ')}
      - Skill Gaps: ${analysis.skillGaps.map(skill => `${skill.name} (${skill.importance} importance)`).join(', ')}
    `;

    console.log('Sending request to OpenAI API...');
    
    // Make API call to OpenAI
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional resume reviewer and career coach providing concise, actionable advice.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    console.log('Received response from OpenAI API');
    
    // Extract the suggestion from the response
    const suggestion = response.data.choices[0].message.content.trim();
    return suggestion;
  } catch (error) {
    console.error('Error generating resume suggestions:', error);
    
    // Provide more detailed error information
    if (axios.isAxiosError(error)) {
      console.error('API Error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please check your OpenAI API key.');
      } else if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
    }
    
    // Return a fallback suggestion if the API call fails
    return `Focus on quantifiable achievements and metrics in your experience section. For a ${selectedRole} role, emphasize your technical proficiency with ${analysis.keywords.missing[0]} and ${analysis.keywords.missing[1]} - even if you're still learning them. Consider taking a quick certification course in ${analysis.skillGaps[0].name} to strengthen your application.`;
  }
}; 