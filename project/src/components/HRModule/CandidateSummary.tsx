import React, { useState } from 'react';
import { 
  FileText, 
  Star, 
  CheckCircle, 
  PhoneCall, 
  Mail, 
  Download, 
  BookOpen, 
  Briefcase, 
  Award, 
  ThumbsUp, 
  AlertCircle 
} from 'lucide-react';

type ApplicationStatus = 'pending' | 'reviewed' | 'interview' | 'rejected' | 'hired';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  skillMatch: number;
  lastCompany: string;
  experience: number;
  status: ApplicationStatus;
  appliedDate: string;
  resumeUrl: string;
}

interface CandidateSummaryProps {
  candidate: Candidate;
  onSendInterview: () => void;
}

const CandidateSummary: React.FC<CandidateSummaryProps> = ({ candidate, onSendInterview }) => {
  const [tab, setTab] = useState<'summary' | 'resume'>('summary');
  
  const aiSummary = `${candidate.name} is a promising candidate with ${candidate.experience} years of experience, most recently at ${candidate.lastCompany}. Their skill set demonstrates a ${candidate.skillMatch}% match with the job requirements. 

They have shown strong capabilities in front-end development, particularly with React and modern JavaScript. Their portfolio showcases clean code and attention to user experience.

Based on their experience and skills, they would be a valuable addition to the team, bringing both technical expertise and collaborative skills.`;

  const strengthsAndWeaknesses = {
    strengths: [
      'Strong proficiency in React and modern JavaScript',
      'Experience with responsive design and accessibility',
      'History of successful project delivery at top companies',
      'Good communication skills evidenced in cover letter',
    ],
    weaknesses: [
      'Limited experience with back-end technologies',
      'Could benefit from more experience with GraphQL',
      'No mention of testing frameworks in resume',
    ],
  };
  
  const canSendInterview = candidate.status === 'pending' || candidate.status === 'reviewed';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
            <p className="text-gray-500">{candidate.lastCompany} • {candidate.experience} {candidate.experience === 1 ? 'year' : 'years'} experience</p>
          </div>
          <div className="mt-2 sm:mt-0 flex items-center">
            <div className="rounded-full bg-indigo-100 text-indigo-800 px-3 py-1 text-sm font-medium mr-2">
              {candidate.skillMatch}% Match
            </div>
            {candidate.status === 'interview' && (
              <div className="rounded-full bg-green-100 text-green-800 px-3 py-1 text-sm font-medium">
                Interview Scheduled
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <a href={`mailto:${candidate.email}`} className="flex items-center text-sm text-gray-600 hover:text-indigo-600">
            <Mail className="h-4 w-4 mr-1" />
            {candidate.email}
          </a>
          <a href={`tel:${candidate.phone}`} className="flex items-center text-sm text-gray-600 hover:text-indigo-600">
            <PhoneCall className="h-4 w-4 mr-1" />
            {candidate.phone}
          </a>
          <a href={candidate.resumeUrl} className="flex items-center text-sm text-indigo-600 hover:text-indigo-800">
            <Download className="h-4 w-4 mr-1" />
            Download Resume
          </a>
        </div>
      </div>
      
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            tab === 'summary'
              ? 'border-b-2 border-indigo-500 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setTab('summary')}
        >
          AI Summary
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            tab === 'resume'
              ? 'border-b-2 border-indigo-500 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setTab('resume')}
        >
          Resume
        </button>
      </div>
      
      <div className="p-6">
        {tab === 'summary' ? (
          <div>
            <div className="flex items-start mb-6">
              <div className="flex-shrink-0 mr-4 bg-indigo-100 p-3 rounded-lg">
                <Star className="h-6 w-6 text-indigo-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">AI-Generated Summary</h3>
                <p className="text-gray-700 whitespace-pre-line">{aiSummary}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <ThumbsUp className="h-4 w-4 text-green-500 mr-1" />
                  Strengths
                </h4>
                <ul className="space-y-2">
                  {strengthsAndWeaknesses.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />
                  Areas for Improvement
                </h4>
                <ul className="space-y-2">
                  {strengthsAndWeaknesses.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <div className="h-4 w-4 text-amber-500 mr-2 mt-0.5 relative flex items-center justify-center">
                        <span className="absolute text-xs font-bold">!</span>
                      </div>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">AI Recommendation</h4>
              <p className="text-sm text-gray-700">
                Based on the candidate's profile and skill match, we recommend proceeding to an interview. 
                Their experience at {candidate.lastCompany} and {candidate.skillMatch}% skill match 
                suggest they would be a strong addition to the team.
              </p>
            </div>
          </div>
        ) : (
          <div className="border rounded-lg p-6">
            <div className="mb-6 pb-4 border-b">
              <h2 className="text-xl font-bold text-center mb-1">{candidate.name}</h2>
              <p className="text-center text-gray-600">{candidate.email} • {candidate.phone}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <Briefcase className="h-5 w-5 text-indigo-500 mr-2" />
                Work Experience
              </h3>
              
              <div className="mb-4 pl-4 border-l-2 border-gray-200">
                <h4 className="font-medium">Senior Frontend Developer</h4>
                <p className="text-sm text-indigo-600">{candidate.lastCompany}</p>
                <p className="text-sm text-gray-500">January 2023 - Present</p>
                <ul className="mt-2 text-sm list-disc pl-5 text-gray-700">
                  <li>Led development of the company's core product interface using React and TypeScript</li>
                  <li>Improved page load performance by 40% through code optimization and lazy loading</li>
                  <li>Mentored junior developers and conducted code reviews</li>
                </ul>
              </div>
              
              <div className="pl-4 border-l-2 border-gray-200">
                <h4 className="font-medium">Frontend Developer</h4>
                <p className="text-sm text-indigo-600">Previous Tech Inc.</p>
                <p className="text-sm text-gray-500">June 2019 - December 2022</p>
                <ul className="mt-2 text-sm list-disc pl-5 text-gray-700">
                  <li>Developed responsive web applications using React, Redux, and SCSS</li>
                  <li>Implemented unit and integration tests with Jest and React Testing Library</li>
                  <li>Collaborated with designers to ensure pixel-perfect implementation</li>
                </ul>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <BookOpen className="h-5 w-5 text-indigo-500 mr-2" />
                Education
              </h3>
              
              <div className="pl-4 border-l-2 border-gray-200">
                <h4 className="font-medium">Bachelor of Science in Computer Science</h4>
                <p className="text-sm text-indigo-600">University of Technology</p>
                <p className="text-sm text-gray-500">2015 - 2019</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium flex items-center mb-3">
                <Award className="h-5 w-5 text-indigo-500 mr-2" />
                Skills
              </h3>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">JavaScript</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">TypeScript</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">HTML/CSS</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Redux</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Jest</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Git</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Responsive Design</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">API Integration</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6 bg-gray-50 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-500">
          <FileText className="h-4 w-4 inline-block mr-1" />
          Applied on {new Date(candidate.appliedDate).toLocaleDateString()}
        </div>
        
        <div className="flex space-x-3">
          <button
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            onClick={() => setTab(tab === 'summary' ? 'resume' : 'summary')}
          >
            View {tab === 'summary' ? 'Resume' : 'Summary'}
          </button>
          
          <button
            onClick={onSendInterview}
            disabled={!canSendInterview}
            className={`px-4 py-2 rounded-md flex items-center ${
              canSendInterview
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <PhoneCall className="h-4 w-4 mr-2" />
            Send Interview Invite
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateSummary;