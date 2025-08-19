export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'rating' | 'forced-choice';
  category: 'psychometric' | 'technical' | 'wiscar';
  section: string;
  question: string;
  options?: string[];
  scale?: {
    min: number;
    max: number;
    labels: { value: number; label: string }[];
  };
  construct?: string;
  weight?: number;
}

export interface Answer {
  questionId: string;
  value: number | string;
  timestamp: Date;
}

export interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  answers: Answer[];
  startTime: Date;
  isComplete: boolean;
}

export interface AssessmentResults {
  scores: {
    psychometric: number;
    technical: number;
    overall: number;
    wiscar: {
      will: number;
      interest: number;
      skill: number;
      cognitive: number;
      ability: number;
      realWorld: number;
    };
  };
  recommendation: 'yes' | 'maybe' | 'no';
  confidence: number;
  strengths: string[];
  improvements: string[];
  careerPaths: string[];
  nextSteps: string[];
}

export interface PersonalityProfile {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  grit: number;
  growthMindset: number;
}