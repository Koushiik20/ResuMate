import React, { useState } from 'react';
import { UploadCloud, BarChart2, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import ResumeUploader from './ResumeUploader';
import ResumeAnalytics from './ResumeAnalytics';
import ResumeImprovements from './ResumeImprovements';
import { generateResumeSuggestions } from '../../services/gptService';
import axios from 'axios';

type AnalysisStatus = 'idle' | 'uploading' | 'analyzing' | 'complete';

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

// Mock resume analysis data for fallback
const mockAnalysis: ResumeAnalysis = {
  scores: {
    overall: 74,
    keywords: 68,
    content: 85,
    format: 92,
    skills: 62,
  },
  keywords: {
    found: [
      'JavaScript', 'React', 'Node.js', 'Responsive Design', 'REST API', 'CSS'
    ],
    missing: [
      'TypeScript', 'Redux', 'NextJS', 'Frontend Performance'
    ],
  },
  skillGaps: [
    {
      name: 'TypeScript',
      importance: 'high',
      difficulty: 'medium',
    },
    {
      name: 'Redux',
      importance: 'medium',
      difficulty: 'medium',
    },
    {
      name: 'AWS Services',
      importance: 'high',
      difficulty: 'hard',
    },
    {
      name: 'NextJS',
      importance: 'medium',
      difficulty: 'easy',
    },
  ],
  improvements: {
    critical: [
      'Add more quantifiable achievements to demonstrate impact',
      'Include TypeScript experience or certification',
      'Improve layout to reduce whitespace and highlight key accomplishments',
    ],
    recommended: [
      'Add a skills section with technology proficiency levels',
      'Include links to GitHub or portfolio projects',
      'Tailor your summary to match the specific job description',
    ],
    optional: [
      'Consider adding a small profile photo',
      'Include relevant hobbies that demonstrate soft skills',
      'Add references or testimonials section',
    ],
  },
};

const ResumeAnalyzer: React.FC = () => {
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState<boolean>(false);
  
  const jobRoles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'DevOps Engineer',
    'Data Scientist',
    'Product Manager',
    'Project Manager',
    'Software Architect',
    'QA Engineer',
    'Mobile Developer',
    'Machine Learning Engineer',
  ];
  
  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };
  
  const analyzeResumeWithGPT = async (resumeText: string, role: string): Promise<ResumeAnalysis> => {
    try {
      console.log('Analyzing resume with GPT for role:', role);
      
      // Check if API key is available
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey) {
        console.error('OpenAI API key is not configured');
        throw new Error('OpenAI API key is not configured. Please create a .env file in the project root with VITE_OPENAI_API_KEY=your_api_key');
      }
      
      // Construct the prompt for GPT
      const prompt = `
        You are a professional resume analyzer. Analyze the following resume for a ${role} position.
        Provide a detailed analysis in the following JSON format:
        
        {
          "scores": {
            "overall": <number between 0-100>,
            "keywords": <number between 0-100>,
            "content": <number between 0-100>,
            "format": <number between 0-100>,
            "skills": <number between 0-100>
          },
          "keywords": {
            "found": [<array of keywords found in the resume>],
            "missing": [<array of important keywords missing from the resume>]
          },
          "skillGaps": [
            {
              "name": <skill name>,
              "importance": <"high", "medium", or "low">,
              "difficulty": <"easy", "medium", or "hard">
            }
          ],
          "improvements": {
            "critical": [<array of critical improvements needed>],
            "recommended": [<array of recommended improvements>],
            "optional": [<array of optional improvements>]
          }
        }
        
        Resume Text:
        ${resumeText}
        
        Important: Return ONLY the JSON object, no additional text.
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
              content: 'You are a professional resume analyzer that returns only valid JSON.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
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
      
      // Extract and parse the JSON response
      const jsonResponse = response.data.choices[0].message.content.trim();
      return JSON.parse(jsonResponse);
    } catch (error) {
      console.error('Error analyzing resume with GPT:', error);
      
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
      
      throw new Error('Failed to analyze resume. Please try again later.');
    }
  };
  
  const handleUpload = async (file: File) => {
    if (!selectedRole) {
      alert('Please select a job role first');
      return;
    }
    
    setStatus('uploading');
    setError(null);
    setUseFallback(false);
    
    try {
      // In a real application, you would upload the file to a server
      // For this example, we'll simulate file processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('analyzing');
      
      // Simulate extracting text from the resume
      // In a real application, you would use OCR or a PDF parser
      const resumeText = `
        John Doe
        Frontend Developer
        
        SUMMARY
        Experienced frontend developer with 5 years of experience building responsive web applications.
        
        EXPERIENCE
        Senior Frontend Developer at TechCorp (2020-Present)
        - Developed and maintained React-based web applications
        - Implemented responsive designs using CSS and JavaScript
        - Collaborated with backend developers to integrate REST APIs
        
        Frontend Developer at WebSolutions (2018-2020)
        - Built user interfaces using HTML, CSS, and JavaScript
        - Optimized website performance and loading times
        - Worked with designers to implement UI/UX improvements
        
        EDUCATION
        Bachelor of Science in Computer Science
        University of Technology (2014-2018)
        
        SKILLS
        JavaScript, React, HTML, CSS, REST API, Responsive Design
      `;
      
      try {
        // Try to analyze the resume with GPT
        const analysisResult = await analyzeResumeWithGPT(resumeText, selectedRole);
        setStatus('complete');
        setAnalysis(analysisResult);
      } catch (gptError) {
        console.error('GPT analysis failed, using fallback data:', gptError);
        setUseFallback(true);
        setStatus('complete');
        setAnalysis(mockAnalysis);
        setError('Using sample data due to API limitations. For full analysis, please configure your OpenAI API key.');
      }
    } catch (err) {
      console.error('Error processing resume:', err);
      setError('Failed to process your resume. Please try again later.');
      setStatus('idle');
    }
  };
  
  const resetAnalysis = () => {
    setStatus('idle');
    setAnalysis(null);
    setError(null);
    setUseFallback(false);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Resume Analyzer</h1>
        <p className="text-gray-600 mt-2">
          Get AI-powered feedback and learn how to improve your resume for specific roles
        </p>
      </div>
      
      {error && (
        <div className="max-w-3xl mx-auto mb-6">
          <div className={`px-4 py-3 rounded-md ${
            useFallback 
              ? 'bg-amber-50 border border-amber-200 text-amber-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {error}
            {useFallback && (
              <div className="mt-2 text-sm">
                <p>To enable AI-powered analysis, create a <code className="bg-amber-100 px-1 py-0.5 rounded">.env</code> file in the project root with:</p>
                <pre className="bg-amber-100 p-2 rounded mt-1 text-xs overflow-x-auto">
                  VITE_OPENAI_API_KEY=your_api_key_here
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
      
      {status === 'idle' && (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Select a Job Role</h2>
            <p className="text-gray-600 mb-4">
              Choose the job role you're targeting to receive tailored feedback
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {jobRoles.map((role) => (
                <button
                  key={role}
                  className={`p-3 border rounded-md text-sm transition-all ${
                    selectedRole === role
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => handleRoleSelect(role)}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
          
          <ResumeUploader onUpload={handleUpload} disabled={!selectedRole} />
        </div>
      )}
      
      {(status === 'uploading' || status === 'analyzing') && (
        <div className="max-w-xl mx-auto text-center">
          <div className="p-8 bg-white rounded-lg shadow-md">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
              <div 
                className="absolute inset-0 border-4 border-indigo-600 rounded-full animate-spin"
                style={{ borderTopColor: 'transparent', animationDuration: '1.5s' }}
              ></div>
              {status === 'uploading' ? (
                <UploadCloud className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-600 h-12 w-12" />
              ) : (
                <BarChart2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-600 h-12 w-12" />
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {status === 'uploading' ? 'Uploading Resume' : 'Analyzing Resume'}
            </h2>
            <p className="text-gray-600">
              {status === 'uploading' 
                ? 'Your resume is being securely uploaded...' 
                : `Our AI is analyzing your resume for the ${selectedRole} role...`
              }
            </p>
            
            {status === 'analyzing' && (
              <div className="mt-6 text-left max-w-md mx-auto">
                <div className="flex items-center mb-2">
                  <CheckCircle className="text-green-500 h-5 w-5 mr-2" />
                  <span className="text-sm text-gray-700">Parsing resume content</span>
                </div>
                <div className="flex items-center mb-2">
                  <CheckCircle className="text-green-500 h-5 w-5 mr-2" />
                  <span className="text-sm text-gray-700">Extracting key information</span>
                </div>
                <div className="flex items-center mb-2">
                  <div className="h-5 w-5 rounded-full border-2 border-indigo-500 border-l-transparent animate-spin mr-2"></div>
                  <span className="text-sm text-gray-700">Comparing with industry standards</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <AlertCircle className="text-gray-300 h-5 w-5 mr-2" />
                  <span className="text-sm">Generating improvement suggestions</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {status === 'complete' && analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ResumeAnalytics analysis={analysis} />
          </div>
          <div>
            <ResumeImprovements analysis={analysis} selectedRole={selectedRole} />
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3">Next Steps</h3>
              <button
                onClick={resetAnalysis}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 mb-3"
              >
                Analyze a Different Resume
              </button>
              <button
                onClick={() => window.location.href = '/resume-builder'}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Create a New Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;