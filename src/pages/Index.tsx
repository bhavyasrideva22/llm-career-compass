import { AssessmentLanding } from '@/components/AssessmentLanding';
import { AssessmentQuestion } from '@/components/AssessmentQuestion';
import { AssessmentResults } from '@/components/AssessmentResults';
import { useAssessment } from '@/hooks/useAssessment';

const Index = () => {
  const {
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
  } = useAssessment();

  // Show results if assessment is complete
  if (state.isComplete && results) {
    return (
      <AssessmentResults 
        results={results} 
        onRestart={startAssessment}
      />
    );
  }

  // Show question if assessment has started
  if (state.currentQuestion >= 0 && !state.isComplete) {
    const currentQuestion = getCurrentQuestion();
    const currentAnswer = getCurrentAnswer();
    
    if (!currentQuestion) {
      return (
        <AssessmentLanding onStartAssessment={startAssessment} />
      );
    }

    return (
      <AssessmentQuestion
        question={currentQuestion}
        answer={currentAnswer}
        onAnswer={answerQuestion}
        onNext={nextQuestion}
        onPrevious={previousQuestion}
        currentIndex={state.currentQuestion}
        totalQuestions={totalQuestions}
        canGoBack={canGoBack}
        isLastQuestion={isLastQuestion}
      />
    );
  }

  // Default landing page
  return (
    <AssessmentLanding onStartAssessment={startAssessment} />
  );
};

export default Index;
