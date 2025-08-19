import { useState, useCallback } from 'react';
import { AssessmentState, Answer, AssessmentResults } from '@/types/assessment';
import { assessmentQuestions } from '@/data/questions';
import { AssessmentScorer } from '@/utils/scoring';

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>({
    currentSection: 0,
    currentQuestion: 0,
    answers: [],
    startTime: new Date(),
    isComplete: false
  });

  const [results, setResults] = useState<AssessmentResults | null>(null);

  const startAssessment = useCallback(() => {
    setState({
      currentSection: 0,
      currentQuestion: 0,
      answers: [],
      startTime: new Date(),
      isComplete: false
    });
    setResults(null);
  }, []);

  const answerQuestion = useCallback((answer: Answer) => {
    setState(prev => {
      const newAnswers = prev.answers.filter(a => a.questionId !== answer.questionId);
      newAnswers.push(answer);
      
      return {
        ...prev,
        answers: newAnswers
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prev => {
      const nextIndex = prev.currentQuestion + 1;
      
      if (nextIndex >= assessmentQuestions.length) {
        // Assessment complete
        const scorer = new AssessmentScorer(prev.answers);
        const assessmentResults = scorer.calculateResults();
        setResults(assessmentResults);
        
        return {
          ...prev,
          isComplete: true
        };
      }
      
      return {
        ...prev,
        currentQuestion: nextIndex
      };
    });
  }, []);

  const previousQuestion = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentQuestion: Math.max(0, prev.currentQuestion - 1)
    }));
  }, []);

  const getCurrentQuestion = () => {
    return assessmentQuestions[state.currentQuestion];
  };

  const getCurrentAnswer = () => {
    const currentQuestion = getCurrentQuestion();
    return state.answers.find(a => a.questionId === currentQuestion?.id);
  };

  const canGoBack = state.currentQuestion > 0;
  const isLastQuestion = state.currentQuestion === assessmentQuestions.length - 1;
  const totalQuestions = assessmentQuestions.length;

  return {
    state,
    results,
    startAssessment,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    getCurrentQuestion,
    getCurrentAnswer,
    canGoBack,
    isLastQuestion,
    totalQuestions
  };
};