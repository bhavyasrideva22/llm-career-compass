import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Clock, Target, TrendingUp, Zap, Users } from 'lucide-react';

interface AssessmentLandingProps {
  onStartAssessment: () => void;
}

export const AssessmentLanding = ({ onStartAssessment }: AssessmentLandingProps) => {
  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              AI Career Assessment
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              C.L.A.R.I.T.Y.
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Cognitive & Learning Alignment for Role-Integrated Technology in You
            </p>
            <p className="text-lg text-muted-foreground">
              Should you become a Large Language Model Developer?
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-lg leading-relaxed text-foreground/90">
              This comprehensive diagnostic tool evaluates your psychological fit, technical aptitude, 
              and career alignment to determine your suitability for LLM development roles.
            </p>
          </div>

          <Button 
            onClick={onStartAssessment}
            variant="gradient"
            size="lg"
            className="px-8 py-4 text-lg font-semibold animate-pulse-glow"
          >
            <Zap className="mr-2 h-5 w-5" />
            Start Assessment
          </Button>
          
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              20-30 minutes
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              Personalized results
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Career guidance
            </div>
          </div>
        </div>

        {/* What is an LLM Developer Section */}
        <Card className="mb-12 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="h-8 w-8 text-ai-primary" />
              <h2 className="text-2xl font-bold">What is an LLM Developer?</h2>
            </div>
            <p className="text-lg mb-6 text-foreground/90">
              An LLM Developer builds and fine-tunes large-scale language models (like GPT, Claude, LLaMA) 
              for specific tasks such as chatbots, code generation, search engines, or enterprise AI platforms.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-ai-secondary">Typical Roles:</h3>
                <ul className="space-y-2 text-foreground/80">
                  <li>• LLM Engineer / Developer</li>
                  <li>• Prompt Engineer</li>
                  <li>• AI Research Engineer</li>
                  <li>• NLP Engineer</li>
                  <li>• Applied Scientist (LLM)</li>
                  <li>• MLOps + LLM Integration Specialist</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-ai-accent">Key Traits for Success:</h3>
                <ul className="space-y-2 text-foreground/80">
                  <li>• Curiosity + continuous learner mindset</li>
                  <li>• Mathematical & programming fluency</li>
                  <li>• Deep focus and resilience</li>
                  <li>• Research rigor & practical balance</li>
                  <li>• Ethics-awareness and responsibility</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Psychometric</h3>
              <p className="text-muted-foreground">
                Personality, working style, interests, and motivation assessment
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-secondary rounded-full flex items-center justify-center">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Technical</h3>
              <p className="text-muted-foreground">
                Programming skills, AI knowledge, and domain-specific expertise
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-accent rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">WISCAR</h3>
              <p className="text-muted-foreground">
                Will, Interest, Skill, Cognitive readiness, Ability, Real-world alignment
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-lg mb-6 text-foreground/80">
            Ready to discover your potential as an LLM Developer?
          </p>
          <Button 
            onClick={onStartAssessment}
            variant="gradient"
            size="lg"
            className="px-8 py-3"
          >
            Begin Your Assessment Journey
          </Button>
        </div>
      </div>
    </div>
  );
};