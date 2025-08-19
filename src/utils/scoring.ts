import { Answer, AssessmentResults, PersonalityProfile } from '@/types/assessment';
import { assessmentQuestions } from '@/data/questions';

export class AssessmentScorer {
  private answers: Answer[];

  constructor(answers: Answer[]) {
    this.answers = answers;
  }

  calculateResults(): AssessmentResults {
    const psychometricScore = this.calculatePsychometricScore();
    const technicalScore = this.calculateTechnicalScore();
    const wiscarScores = this.calculateWiscarScores();
    
    const overallScore = this.calculateOverallScore(psychometricScore, technicalScore, wiscarScores);
    const recommendation = this.getRecommendation(overallScore, psychometricScore, technicalScore);
    const confidence = this.calculateConfidence(overallScore);

    return {
      scores: {
        psychometric: psychometricScore,
        technical: technicalScore,
        overall: overallScore,
        wiscar: wiscarScores
      },
      recommendation,
      confidence,
      strengths: this.identifyStrengths(psychometricScore, technicalScore, wiscarScores),
      improvements: this.identifyImprovements(psychometricScore, technicalScore, wiscarScores),
      careerPaths: this.suggestCareerPaths(recommendation, overallScore),
      nextSteps: this.generateNextSteps(recommendation, psychometricScore, technicalScore)
    };
  }

  private calculatePsychometricScore(): number {
    const psychometricAnswers = this.answers.filter(answer => {
      const question = assessmentQuestions.find(q => q.id === answer.questionId);
      return question?.category === 'psychometric';
    });

    if (psychometricAnswers.length === 0) return 0;

    let totalScore = 0;
    let totalWeight = 0;

    psychometricAnswers.forEach(answer => {
      const question = assessmentQuestions.find(q => q.id === answer.questionId);
      if (question) {
        const normalizedScore = this.normalizeScore(answer.value, question);
        const weight = question.weight || 1;
        totalScore += normalizedScore * weight;
        totalWeight += weight;
      }
    });

    return Math.round((totalScore / totalWeight) * 100);
  }

  private calculateTechnicalScore(): number {
    const technicalAnswers = this.answers.filter(answer => {
      const question = assessmentQuestions.find(q => q.id === answer.questionId);
      return question?.category === 'technical';
    });

    if (technicalAnswers.length === 0) return 0;

    let totalScore = 0;
    let totalWeight = 0;

    technicalAnswers.forEach(answer => {
      const question = assessmentQuestions.find(q => q.id === answer.questionId);
      if (question) {
        const score = this.calculateTechnicalQuestionScore(answer, question);
        const weight = question.weight || 1;
        totalScore += score * weight;
        totalWeight += weight;
      }
    });

    return Math.round((totalScore / totalWeight) * 100);
  }

  private calculateWiscarScores() {
    const wiscarAnswers = this.answers.filter(answer => {
      const question = assessmentQuestions.find(q => q.id === answer.questionId);
      return question?.category === 'wiscar';
    });

    const scores = {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability: 0,
      realWorld: 0
    };

    const counts = {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability: 0,
      realWorld: 0
    };

    wiscarAnswers.forEach(answer => {
      const question = assessmentQuestions.find(q => q.id === answer.questionId);
      if (question?.construct && question.construct in scores) {
        const normalizedScore = this.normalizeScore(answer.value, question);
        scores[question.construct as keyof typeof scores] += normalizedScore * 100;
        counts[question.construct as keyof typeof counts]++;
      }
    });

    // Average scores for each dimension
    Object.keys(scores).forEach(key => {
      const k = key as keyof typeof scores;
      if (counts[k] > 0) {
        scores[k] = Math.round(scores[k] / counts[k]);
      }
    });

    return scores;
  }

  private calculateOverallScore(psychometric: number, technical: number, wiscar: any): number {
    const wiscarAverage = (Object.values(wiscar) as number[]).reduce((a: number, b: number) => a + b, 0) / 6;
    return Math.round((psychometric * 0.3 + technical * 0.4 + wiscarAverage * 0.3));
  }

  private normalizeScore(value: any, question: any): number {
    if (question.type === 'likert' || question.type === 'rating') {
      const max = question.scale?.max || 5;
      const min = question.scale?.min || 1;
      return (Number(value) - min) / (max - min);
    }
    
    if (question.type === 'multiple-choice' || question.type === 'forced-choice') {
      // Custom scoring for different questions
      return this.getMultipleChoiceScore(question.id, value);
    }

    return 0.5; // Default neutral score
  }

  private calculateTechnicalQuestionScore(answer: Answer, question: any): number {
    const correctAnswers: { [key: string]: string | number } = {
      't1': 'Fine-tuning allows model weights to be updated for specific tasks',
      't2': 'Allowing the model to focus on relevant parts of the input sequence',
      't3': 'Combining a retrieval system with a language model',
      't5': 'Hugging Face Transformers'
    };

    if (question.id in correctAnswers) {
      return answer.value === correctAnswers[question.id] ? 1 : 0;
    }

    // For rating questions like t4 (Python proficiency)
    if (question.type === 'rating') {
      const score = Number(answer.value);
      return Math.min(score / 10, 1); // Normalize to 0-1
    }

    return 0.5; // Default score
  }

  private getMultipleChoiceScore(questionId: string, value: any): number {
    const scores: { [key: string]: { [key: string]: number } } = {
      'p3': {
        'Build a working prototype quickly': 0.7,
        'Write a comprehensive research paper': 0.9,
        'Create detailed documentation': 0.6,
        'Optimize existing systems': 0.8
      },
      'p5': {
        'The cutting-edge technology and innovation': 0.9,
        'Solving real-world problems at scale': 0.8,
        'The intellectual challenge': 0.9,
        'Career advancement opportunities': 0.5,
        'Building products people will use': 0.7
      },
      'w3': {
        'Complete beginner': 0.2,
        'Taken courses, no practical experience': 0.4,
        'Built simple projects and experiments': 0.6,
        'Professional experience with ML systems': 0.8,
        'Advanced practitioner with research experience': 1.0
      },
      'w6': {
        'Computational costs and latency': 0.7,
        'Ensuring accuracy and reducing hallucinations': 0.8,
        'Data privacy and security concerns': 0.7,
        'Integration with existing systems': 0.6,
        'All of the above': 1.0
      }
    };

    return scores[questionId]?.[value as string] || 0.5;
  }

  private getRecommendation(overall: number, psychometric: number, technical: number): 'yes' | 'maybe' | 'no' {
    if (overall >= 75 && psychometric >= 70 && technical >= 65) return 'yes';
    if (overall >= 60 && (psychometric >= 65 || technical >= 60)) return 'maybe';
    return 'no';
  }

  private calculateConfidence(overallScore: number): number {
    // Higher confidence for extreme scores, lower for middle scores
    const distance = Math.abs(overallScore - 50);
    return Math.min(50 + distance, 95);
  }

  private identifyStrengths(psychometric: number, technical: number, wiscar: any): string[] {
    const strengths: string[] = [];
    
    if (psychometric >= 75) strengths.push('Strong psychological fit for LLM development');
    if (technical >= 75) strengths.push('Solid technical foundation');
    if (wiscar.will >= 80) strengths.push('High motivation and commitment');
    if (wiscar.interest >= 80) strengths.push('Genuine passion for AI technology');
    if (wiscar.cognitive >= 75) strengths.push('Excellent problem-solving abilities');
    if (wiscar.ability >= 75) strengths.push('Strong learning and adaptation skills');

    return strengths.length > 0 ? strengths : ['Willingness to learn and improve'];
  }

  private identifyImprovements(psychometric: number, technical: number, wiscar: any): string[] {
    const improvements: string[] = [];
    
    if (technical < 60) improvements.push('Strengthen technical knowledge in AI/ML fundamentals');
    if (wiscar.skill < 60) improvements.push('Gain more hands-on experience with coding projects');
    if (wiscar.realWorld < 60) improvements.push('Learn about production challenges and best practices');
    if (psychometric < 60) improvements.push('Develop deeper interest in research and complex problem-solving');
    if (wiscar.will < 60) improvements.push('Build more consistent learning and practice habits');

    return improvements.length > 0 ? improvements : ['Continue building on your existing foundation'];
  }

  private suggestCareerPaths(recommendation: string, overallScore: number): string[] {
    if (recommendation === 'yes') {
      return [
        'LLM Developer/Engineer',
        'Prompt Engineer',
        'AI Research Engineer',
        'NLP Engineer',
        'MLOps + LLM Integration Specialist'
      ];
    } else if (recommendation === 'maybe') {
      return [
        'Junior LLM Developer (with mentorship)',
        'AI Integration Specialist',
        'Data Engineer (AI focus)',
        'Technical AI Product Manager',
        'AI Research Assistant'
      ];
    } else {
      return [
        'Data Analyst/Scientist',
        'Software Developer (with AI components)',
        'AI Product Manager',
        'Technical Writer (AI documentation)',
        'AI Ethics and Policy Specialist'
      ];
    }
  }

  private generateNextSteps(recommendation: string, psychometric: number, technical: number): string[] {
    const steps: string[] = [];

    if (recommendation === 'yes') {
      steps.push('Start building LLM projects with Hugging Face Transformers');
      steps.push('Contribute to open-source LLM repositories');
      steps.push('Join LLM/AI communities (EleutherAI, Cohere Discord)');
      steps.push('Apply for LLM developer positions or internships');
    } else if (recommendation === 'maybe') {
      if (technical < 70) steps.push('Complete a comprehensive ML/AI course');
      if (psychometric < 70) steps.push('Engage more deeply with AI research and experimentation');
      steps.push('Build 2-3 substantial AI projects for your portfolio');
      steps.push('Seek mentorship from experienced LLM developers');
    } else {
      steps.push('Start with AI fundamentals and programming basics');
      steps.push('Explore adjacent technical roles in the AI ecosystem');
      steps.push('Consider AI-focused product or business roles');
      steps.push('Re-evaluate after 6-12 months of learning');
    }

    return steps;
  }
}