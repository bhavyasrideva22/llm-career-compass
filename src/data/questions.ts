import { Question } from '@/types/assessment';

export const assessmentQuestions: Question[] = [
  // Psychometric Section
  {
    id: 'p1',
    type: 'likert',
    category: 'psychometric',
    section: 'Personality & Motivation',
    question: 'I enjoy solving abstract, complex problems for extended periods.',
    scale: {
      min: 1,
      max: 5,
      labels: [
        { value: 1, label: 'Strongly Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 5, label: 'Strongly Agree' }
      ]
    },
    construct: 'openness',
    weight: 1.2
  },
  {
    id: 'p2',
    type: 'likert',
    category: 'psychometric',
    section: 'Personality & Motivation',
    question: 'I prefer working on projects that require deep research and experimentation.',
    scale: {
      min: 1,
      max: 5,
      labels: [
        { value: 1, label: 'Strongly Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 5, label: 'Strongly Agree' }
      ]
    },
    construct: 'conscientiousness',
    weight: 1.0
  },
  {
    id: 'p3',
    type: 'forced-choice',
    category: 'psychometric',
    section: 'Personality & Motivation',
    question: 'Given the choice, I would rather:',
    options: [
      'Build a working prototype quickly',
      'Write a comprehensive research paper',
      'Create detailed documentation',
      'Optimize existing systems'
    ],
    construct: 'workStyle',
    weight: 1.1
  },
  {
    id: 'p4',
    type: 'likert',
    category: 'psychometric',
    section: 'Personality & Motivation',
    question: 'I actively follow AI research news and developments.',
    scale: {
      min: 1,
      max: 5,
      labels: [
        { value: 1, label: 'Never' },
        { value: 3, label: 'Sometimes' },
        { value: 5, label: 'Daily' }
      ]
    },
    construct: 'interest',
    weight: 1.3
  },
  {
    id: 'p5',
    type: 'multiple-choice',
    category: 'psychometric',
    section: 'Personality & Motivation',
    question: 'What motivates you most about working with LLMs?',
    options: [
      'The cutting-edge technology and innovation',
      'Solving real-world problems at scale',
      'The intellectual challenge',
      'Career advancement opportunities',
      'Building products people will use'
    ],
    construct: 'motivation',
    weight: 1.0
  },

  // Technical Section
  {
    id: 't1',
    type: 'multiple-choice',
    category: 'technical',
    section: 'Core Knowledge',
    question: 'What is the primary advantage of fine-tuning over prompt engineering?',
    options: [
      'Fine-tuning is always faster',
      'Fine-tuning allows model weights to be updated for specific tasks',
      'Prompt engineering requires more computational resources',
      'Fine-tuning works better with smaller datasets'
    ],
    weight: 1.5
  },
  {
    id: 't2',
    type: 'multiple-choice',
    category: 'technical',
    section: 'Core Knowledge',
    question: 'In transformer architecture, what does "attention" primarily help with?',
    options: [
      'Reducing memory usage',
      'Allowing the model to focus on relevant parts of the input sequence',
      'Speeding up training time',
      'Preventing overfitting'
    ],
    weight: 1.4
  },
  {
    id: 't3',
    type: 'multiple-choice',
    category: 'technical',
    section: 'Practical Application',
    question: 'Which approach would be most effective for a RAG (Retrieval-Augmented Generation) system?',
    options: [
      'Using only the largest available language model',
      'Combining a retrieval system with a language model',
      'Fine-tuning on all available data',
      'Using multiple small models in parallel'
    ],
    weight: 1.3
  },
  {
    id: 't4',
    type: 'rating',
    category: 'technical',
    section: 'Programming Skills',
    question: 'Rate your proficiency with Python for data science and ML tasks:',
    scale: {
      min: 1,
      max: 10,
      labels: [
        { value: 1, label: 'Beginner' },
        { value: 5, label: 'Intermediate' },
        { value: 10, label: 'Expert' }
      ]
    },
    weight: 1.2
  },
  {
    id: 't5',
    type: 'multiple-choice',
    category: 'technical',
    section: 'Tools & Frameworks',
    question: 'Which library is most commonly used for working with pre-trained transformers?',
    options: [
      'TensorFlow',
      'PyTorch',
      'Hugging Face Transformers',
      'Scikit-learn'
    ],
    weight: 1.1
  },

  // WISCAR Section
  {
    id: 'w1',
    type: 'rating',
    category: 'wiscar',
    section: 'Will & Motivation',
    question: 'How many hours per week do you currently spend on coding or AI-related projects?',
    scale: {
      min: 0,
      max: 20,
      labels: [
        { value: 0, label: '0 hours' },
        { value: 10, label: '10 hours' },
        { value: 20, label: '20+ hours' }
      ]
    },
    construct: 'will',
    weight: 1.3
  },
  {
    id: 'w2',
    type: 'likert',
    category: 'wiscar',
    section: 'Interest & Curiosity',
    question: 'I regularly experiment with new AI tools and models in my free time.',
    scale: {
      min: 1,
      max: 5,
      labels: [
        { value: 1, label: 'Never' },
        { value: 3, label: 'Sometimes' },
        { value: 5, label: 'Very Often' }
      ]
    },
    construct: 'interest',
    weight: 1.2
  },
  {
    id: 'w3',
    type: 'multiple-choice',
    category: 'wiscar',
    section: 'Skill Assessment',
    question: 'Which best describes your current experience with machine learning?',
    options: [
      'Complete beginner',
      'Taken courses, no practical experience',
      'Built simple projects and experiments',
      'Professional experience with ML systems',
      'Advanced practitioner with research experience'
    ],
    construct: 'skill',
    weight: 1.4
  },
  {
    id: 'w4',
    type: 'likert',
    category: 'wiscar',
    section: 'Cognitive Readiness',
    question: 'I can easily break down complex problems into smaller, manageable components.',
    scale: {
      min: 1,
      max: 5,
      labels: [
        { value: 1, label: 'Rarely' },
        { value: 3, label: 'Sometimes' },
        { value: 5, label: 'Always' }
      ]
    },
    construct: 'cognitive',
    weight: 1.2
  },
  {
    id: 'w5',
    type: 'likert',
    category: 'wiscar',
    section: 'Learning Ability',
    question: 'I actively seek feedback and use it to improve my work.',
    scale: {
      min: 1,
      max: 5,
      labels: [
        { value: 1, label: 'Rarely' },
        { value: 3, label: 'Sometimes' },
        { value: 5, label: 'Always' }
      ]
    },
    construct: 'ability',
    weight: 1.1
  },
  {
    id: 'w6',
    type: 'multiple-choice',
    category: 'wiscar',
    section: 'Real-World Understanding',
    question: 'What do you think is the biggest challenge in deploying LLMs in production?',
    options: [
      'Computational costs and latency',
      'Ensuring accuracy and reducing hallucinations',
      'Data privacy and security concerns',
      'Integration with existing systems',
      'All of the above'
    ],
    construct: 'realWorld',
    weight: 1.3
  }
];

export const sectionInfo = {
  'Personality & Motivation': {
    description: 'Understanding your psychological fit and motivation for LLM development',
    duration: '8-10 minutes'
  },
  'Core Knowledge': {
    description: 'Assessing your technical understanding of LLMs and AI concepts',
    duration: '6-8 minutes'
  },
  'Practical Application': {
    description: 'Evaluating your practical knowledge and problem-solving approach',
    duration: '4-6 minutes'
  },
  'Programming Skills': {
    description: 'Understanding your coding abilities and technical toolkit',
    duration: '3-5 minutes'
  },
  'Tools & Frameworks': {
    description: 'Assessing familiarity with LLM development tools',
    duration: '2-3 minutes'
  },
  'Will & Motivation': {
    description: 'Measuring your drive and commitment to the field',
    duration: '3-4 minutes'
  },
  'Interest & Curiosity': {
    description: 'Evaluating your genuine interest in AI and LLMs',
    duration: '2-3 minutes'
  },
  'Skill Assessment': {
    description: 'Current skill level and experience evaluation',
    duration: '3-4 minutes'
  },
  'Cognitive Readiness': {
    description: 'Problem-solving and analytical thinking capabilities',
    duration: '3-4 minutes'
  },
  'Learning Ability': {
    description: 'Growth mindset and adaptability assessment',
    duration: '2-3 minutes'
  },
  'Real-World Understanding': {
    description: 'Practical awareness of industry challenges',
    duration: '2-3 minutes'
  }
};