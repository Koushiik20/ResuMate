import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Info, MessageCircle, Loader2 } from 'lucide-react';
import { generateResumeSuggestions } from '../../services/gptService';

interface ResumeAnalysis {
  scores: {
    overall: number;
    keywords: number;
    content: number;
    format: number;
    skills: number;
  };
  keywords: {
    found: string[];
    missing: string[];
  };
  skillGaps: {
    name: string;
    importance: 'high' | 'medium' | 'low';
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
  improvements: {
    critical: string[];
    recommended: string[];
    optional: string[];
  };
}

interface ResumeImprovementsProps {
  analysis: ResumeAnalysis;
  selectedRole: string;
}

const ResumeImprovements: React.FC<ResumeImprovementsProps> = ({ analysis, selectedRole }) => {
  const [aiSuggestion, setAiSuggestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAiSuggestion = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const suggestion = await generateResumeSuggestions(analysis, selectedRole);
        setAiSuggestion(suggestion);
      } catch (err) {
        console.error('Error fetching AI suggestion:', err);
        setError('Failed to generate AI suggestions. Please try again later.');
        // Fallback suggestion
        setAiSuggestion(`Focus on quantifiable achievements and metrics in your experience section. For a ${selectedRole} role, emphasize your technical proficiency with ${analysis.keywords.missing[0]} and ${analysis.keywords.missing[1]} - even if you're still learning them. Consider taking a quick certification course in ${analysis.skillGaps[0].name} to strengthen your application.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAiSuggestion();
  }, [analysis, selectedRole]);

  const getFeedbackMessage = (score: number) => {
    if (score >= 85) return "Your resume is strong and should perform well against ATS systems!";
    if (score >= 70) return "Your resume is good but has some opportunities for improvement.";
    if (score >= 50) return "Your resume needs significant improvements to be competitive.";
    return "Your resume requires a major overhaul to be effective.";
  };
  
  const getSummaryColor = (score: number) => {
    if (score >= 85) return 'text-green-800 bg-green-50 border-green-100';
    if (score >= 70) return 'text-blue-800 bg-blue-50 border-blue-100';
    if (score >= 50) return 'text-amber-800 bg-amber-50 border-amber-100';
    return 'text-red-800 bg-red-50 border-red-100';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2">Resume Analysis</h2>
      <p className="text-gray-600 mb-5">For {selectedRole} position</p>
      
      <div className={`p-4 rounded-lg border mb-6 ${getSummaryColor(analysis.scores.overall)}`}>
        <div className="flex">
          {analysis.scores.overall >= 70 ? (
            <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          )}
          <div>
            <p className="font-medium">{getFeedbackMessage(analysis.scores.overall)}</p>
            <p className="text-sm mt-1">Overall score: {analysis.scores.overall}/100</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {analysis.improvements.critical.length > 0 && (
          <div>
            <h3 className="flex items-center text-lg font-medium mb-3 text-red-700">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Critical Improvements
            </h3>
            <ul className="space-y-2 text-gray-800">
              {analysis.improvements.critical.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-4 h-4 rounded-full bg-red-100 text-red-600 mr-2 flex-shrink-0 text-center text-xs leading-4">
                    !
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {analysis.improvements.recommended.length > 0 && (
          <div>
            <h3 className="flex items-center text-lg font-medium mb-3 text-amber-700">
              <Info className="h-5 w-5 mr-2" />
              Recommended Changes
            </h3>
            <ul className="space-y-2 text-gray-800">
              {analysis.improvements.recommended.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-4 h-4 rounded-full bg-amber-100 text-amber-600 mr-2 flex-shrink-0 text-center text-xs leading-4">
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {analysis.improvements.optional.length > 0 && (
          <div>
            <h3 className="flex items-center text-lg font-medium mb-3 text-blue-700">
              <MessageCircle className="h-5 w-5 mr-2" />
              Optional Enhancements
            </h3>
            <ul className="space-y-2 text-gray-800">
              {analysis.improvements.optional.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-4 h-4 rounded-full bg-blue-100 text-blue-600 mr-2 flex-shrink-0 text-center text-xs leading-4">
                    +
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="mt-8 pt-4 border-t border-gray-200">
        <h3 className="font-medium mb-2">AI-Powered Suggestions</h3>
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-5 w-5 text-indigo-500 animate-spin mr-2" />
            <span className="text-gray-600">Generating personalized suggestions...</span>
          </div>
        ) : error ? (
          <div className="p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        ) : (
          <p className="text-gray-600 text-sm">
            "{aiSuggestion}"
          </p>
        )}
      </div>
    </div>
  );
};

export default ResumeImprovements;