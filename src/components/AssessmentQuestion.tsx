import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Question, Answer } from '@/types/assessment';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AssessmentQuestionProps {
  question: Question;
  answer?: Answer;
  onAnswer: (answer: Answer) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentIndex: number;
  totalQuestions: number;
  canGoBack: boolean;
  isLastQuestion: boolean;
}

export const AssessmentQuestion = ({
  question,
  answer,
  onAnswer,
  onNext,
  onPrevious,
  currentIndex,
  totalQuestions,
  canGoBack,
  isLastQuestion
}: AssessmentQuestionProps) => {
  const [currentValue, setCurrentValue] = useState<string | number>('');
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    if (answer) {
      setCurrentValue(answer.value);
      setHasAnswered(true);
    } else {
      setCurrentValue('');
      setHasAnswered(false);
    }
  }, [answer, question.id]);

  const handleValueChange = (value: string | number) => {
    setCurrentValue(value);
    setHasAnswered(true);
    
    const newAnswer: Answer = {
      questionId: question.id,
      value,
      timestamp: new Date()
    };
    
    onAnswer(newAnswer);
  };

  const handleNext = () => {
    if (hasAnswered) {
      onNext();
    }
  };

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'likert':
      case 'rating':
        return (
          <div className="space-y-6">
            {question.scale && (
              <div className="space-y-4">
                <Slider
                  value={[Number(currentValue) || question.scale.min]}
                  onValueChange={(value) => handleValueChange(value[0])}
                  min={question.scale.min}
                  max={question.scale.max}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  {question.scale.labels.map((label) => (
                    <span key={label.value} className="text-center">
                      {label.label}
                    </span>
                  ))}
                </div>
                <div className="text-center text-lg font-semibold text-ai-primary">
                  Selected: {currentValue || question.scale.min}
                </div>
              </div>
            )}
          </div>
        );

      case 'multiple-choice':
      case 'forced-choice':
        return (
          <RadioGroup
            value={currentValue.toString()}
            onValueChange={handleValueChange}
            className="space-y-3"
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1 text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'psychometric':
        return 'text-ai-primary';
      case 'technical':
        return 'text-ai-secondary';
      case 'wiscar':
        return 'text-ai-accent';
      default:
        return 'text-foreground';
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'psychometric':
        return 'Personality & Mindset';
      case 'technical':
        return 'Technical Knowledge';
      case 'wiscar':
        return 'WISCAR Framework';
      default:
        return 'Assessment';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="border-border/50 bg-card/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-sm font-medium px-2 py-1 rounded-full bg-background/50 ${getCategoryColor(question.category)}`}>
                {getCategoryBadge(question.category)}
              </span>
              <span className="text-sm text-muted-foreground">
                {question.section}
              </span>
            </div>
            <CardTitle className="text-xl leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {renderQuestionInput()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={!canGoBack}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!hasAnswered}
                variant="gradient"
                className="flex items-center gap-2"
              >
                {isLastQuestion ? 'Complete Assessment' : 'Next'}
                {!isLastQuestion && <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="text-center mt-4 text-sm text-muted-foreground">
          Answer honestly for the most accurate results. You can review and change your answers.
        </div>
      </div>
    </div>
  );
};