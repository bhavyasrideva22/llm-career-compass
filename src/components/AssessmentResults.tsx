import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AssessmentResults as ResultsType } from '@/types/assessment';
import { 
  Brain, 
  Code, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Target,
  BookOpen,
  Users,
  Zap,
  Star,
  ArrowRight
} from 'lucide-react';

interface AssessmentResultsProps {
  results: ResultsType;
  onRestart: () => void;
}

export const AssessmentResults = ({ results, onRestart }: AssessmentResultsProps) => {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'yes':
        return <CheckCircle className="h-6 w-6 text-ai-success" />;
      case 'maybe':
        return <AlertCircle className="h-6 w-6 text-ai-warning" />;
      case 'no':
        return <XCircle className="h-6 w-6 text-destructive" />;
    }
  };

  const getRecommendationText = () => {
    switch (results.recommendation) {
      case 'yes':
        return 'Excellent Fit';
      case 'maybe':
        return 'Potential with Development';
      case 'no':
        return 'Consider Alternative Paths';
    }
  };

  const getRecommendationDescription = () => {
    switch (results.recommendation) {
      case 'yes':
        return 'You show strong alignment for LLM development. You have the right mindset, technical foundation, and motivation to succeed in this field.';
      case 'maybe':
        return 'You have potential for LLM development but would benefit from targeted skill development and experience. With focused effort, you could transition into this field.';
      case 'no':
        return 'LLM development may not be the best immediate fit, but there are many related AI and tech roles where your skills could flourish.';
    }
  };

  const WiscarRadarChart = () => {
    const wiscar = results.scores.wiscar;
    const dimensions = [
      { name: 'Will', value: wiscar.will, key: 'will' },
      { name: 'Interest', value: wiscar.interest, key: 'interest' },
      { name: 'Skill', value: wiscar.skill, key: 'skill' },
      { name: 'Cognitive', value: wiscar.cognitive, key: 'cognitive' },
      { name: 'Ability', value: wiscar.ability, key: 'ability' },
      { name: 'Real World', value: wiscar.realWorld, key: 'realWorld' }
    ];

    return (
      <div className="space-y-4">
        {dimensions.map((dim) => (
          <div key={dim.key} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{dim.name}</span>
              <span className="text-muted-foreground">{dim.value}%</span>
            </div>
            <Progress value={dim.value} className="h-2" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Your Assessment Results
          </h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive analysis of your LLM Developer potential
          </p>
        </div>

        {/* Main Recommendation */}
        <Card className="mb-8 border-border/50 bg-card/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              {getRecommendationIcon()}
              <div>
                <h2 className="text-2xl font-bold">{getRecommendationText()}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">Confidence:</span>
                  <Badge variant="secondary">{results.confidence}%</Badge>
                </div>
              </div>
            </div>
            <p className="text-lg text-foreground/90 mb-6">
              {getRecommendationDescription()}
            </p>
            <div className="text-center">
              <div className="text-3xl font-bold text-ai-primary mb-2">
                {results.scores.overall}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Scores */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Brain className="h-5 w-5 text-ai-primary" />
                Psychometric
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-ai-primary mb-2">
                  {results.scores.psychometric}%
                </div>
                <Progress value={results.scores.psychometric} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Code className="h-5 w-5 text-ai-secondary" />
                Technical
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-ai-secondary mb-2">
                  {results.scores.technical}%
                </div>
                <Progress value={results.scores.technical} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-ai-accent" />
                Overall
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-ai-accent mb-2">
                  {results.scores.overall}%
                </div>
                <Progress value={results.scores.overall} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* WISCAR Analysis */}
        <Card className="mb-8 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-ai-accent" />
              WISCAR Framework Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WiscarRadarChart />
          </CardContent>
        </Card>

        {/* Strengths and Improvements */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-ai-success">
                <Star className="h-5 w-5" />
                Your Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-ai-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-ai-warning">
                <Target className="h-5 w-5" />
                Areas for Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-ai-warning mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Career Guidance */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-ai-primary" />
                Recommended Career Paths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.careerPaths.map((path, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-ai-primary" />
                    <span className="text-sm font-medium">{path}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-ai-secondary" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-ai-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-ai-secondary">{index + 1}</span>
                    </div>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Button 
            onClick={onRestart}
            size="lg"
            variant="outline"
            className="mr-4"
          >
            Take Assessment Again
          </Button>
          <Button 
            size="lg"
            variant="gradient"
          >
            Get Learning Recommendations
          </Button>
          
          <div className="text-sm text-muted-foreground mt-4">
            Share your results or save them for future reference
          </div>
        </div>
      </div>
    </div>
  );
};