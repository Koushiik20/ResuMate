import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

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

interface ResumeAnalyticsProps {
  analysis: ResumeAnalysis;
}

const ScoreGauge: React.FC<{ score: number; label: string }> = ({ score, label }) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
  };
  
  const getScoreBgColor = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-blue-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  const getBgLightColor = (score: number) => {
    if (score >= 85) return 'bg-green-100';
    if (score >= 70) return 'bg-blue-100';
    if (score >= 50) return 'bg-amber-100';
    return 'bg-red-100';
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 mb-2">
        <div className={`w-24 h-24 rounded-full ${getBgLightColor(score)} flex items-center justify-center`}>
          <div className="absolute inset-0">
            <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={getScoreBgColor(score)}
                strokeWidth="8"
                strokeDasharray={`${score * 2.83} 283`}
              />
            </svg>
          </div>
          <span className={`text-2xl font-bold ${getScoreColor(score)} z-10`}>{score}</span>
        </div>
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
};

const ResumeAnalytics: React.FC<ResumeAnalyticsProps> = ({ analysis }) => {
  const renderStars = (importance: 'high' | 'medium' | 'low') => {
    const count = importance === 'high' ? 3 : importance === 'medium' ? 2 : 1;
    return (
      <div className="flex">
        {[...Array(3)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < count ? 'text-amber-500' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };
  
  const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return '';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Resume Score</h2>
        
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <ScoreGauge score={analysis.scores.overall} label="Overall" />
          <ScoreGauge score={analysis.scores.keywords} label="Keywords" />
          <ScoreGauge score={analysis.scores.content} label="Content" />
          <ScoreGauge score={analysis.scores.format} label="Format" />
          <ScoreGauge score={analysis.scores.skills} label="Skills" />
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-3">Score Breakdown</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">ATS Compatibility</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${analysis.scores.keywords}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Content Quality</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${analysis.scores.content}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Formatting</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${analysis.scores.format}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Skill Match</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-amber-500 h-2.5 rounded-full" 
                  style={{ width: `${analysis.scores.skills}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Keyword Analysis</h2>
          
          <div className="mb-6">
            <h3 className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              Keywords Found
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.found.map((keyword, index) => (
                <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />
              Missing Important Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.missing.map((keyword, index) => (
                <span key={index} className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Skill Gap Analysis</h2>
          
          <div className="space-y-3">
            {analysis.skillGaps.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12">{renderStars(skill.importance)}</div>
                  <span className="text-gray-800 ml-2">{skill.name}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(skill.difficulty)}`}>
                  {skill.difficulty} to learn
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Legend:</span> Stars indicate importance for your target role
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalytics;