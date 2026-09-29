// ============================================================
// HERPATH AI SERVICE — Mock AI with realistic responses
// ============================================================

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  learningPath?: LearningPathSuggestion[];
}

export interface LearningPathSuggestion {
  skill: string;
  reason: string;
  estimatedHours: number;
  priority: 'High' | 'Medium' | 'Low';
}

// Pattern matching for contextual responses
const responsePatterns: Array<{
  patterns: RegExp[];
  response: (input: string) => AIResponse;
}> = [
  {
    patterns: [/bakery|baking|food|cook/i],
    response: () => ({
      text: "Starting a home bakery is a wonderful idea! 🎂\n\nBased on your profile, here's your personalized path to launch your food business:",
      learningPath: [
        { skill: 'Digital Marketing', reason: 'Promote your bakery online', estimatedHours: 12, priority: 'High' },
        { skill: 'Canva', reason: 'Create beautiful product visuals', estimatedHours: 6, priority: 'High' },
        { skill: 'Product Photography', reason: 'Showcase your creations', estimatedHours: 4, priority: 'High' },
        { skill: 'Social Media', reason: 'Build a following on Instagram', estimatedHours: 8, priority: 'Medium' },
        { skill: 'Financial Literacy', reason: 'Manage your business finances', estimatedHours: 6, priority: 'Medium' },
        { skill: 'Freelancing', reason: 'Accept orders and payments online', estimatedHours: 4, priority: 'Low' },
      ],
      suggestions: ['Show me mentors for food business', 'Find business opportunities', 'Create my portfolio'],
    }),
  },
  {
    patterns: [/mentor|guidance|help me/i],
    response: () => ({
      text: "Based on your profile and goals, I found the best mentor matches for you:",
      mentors: ['Priya Sharma (93% match) — Canva & Digital Marketing, Mumbai', 'Kavitha Reddy (91% match) — AI & Tech, Hyderabad', 'Sneha Kapoor (85% match) — Video Editing, Bengaluru'],
      suggestions: ['Book a session with Priya', 'See all mentors', 'What can they teach me?'],
    }),
  },
  {
    patterns: [/freelanc/i],
    response: () => ({
      text: "Great! Freelancing is one of the fastest ways to monetize your skills. 💼\n\nYou already have Canva and Digital Marketing — that's a strong foundation. Here's how to get your first client:",
      learningPath: [
        { skill: 'Freelancing Basics', reason: 'Learn to pitch and price your work', estimatedHours: 6, priority: 'High' },
        { skill: 'Portfolio Building', reason: 'Showcase your best work', estimatedHours: 4, priority: 'High' },
        { skill: 'Communication', reason: 'Client communication skills', estimatedHours: 3, priority: 'Medium' },
        { skill: 'Financial Literacy', reason: 'Invoicing and income management', estimatedHours: 4, priority: 'Medium' },
      ],
      suggestions: ['See freelance opportunities', 'Build my portfolio', 'Find a freelancing mentor'],
    }),
  },
  {
    patterns: [/ai|artificial intelligence|chatgpt|machine learning/i],
    response: () => ({
      text: "AI is transforming every industry — and you can use it to supercharge your skills! 🤖\n\nHere's a beginner-friendly AI learning path tailored for creative entrepreneurs like you:",
      learningPath: [
        { skill: 'Generative AI Basics', reason: 'Understand what AI can do for you', estimatedHours: 4, priority: 'High' },
        { skill: 'Prompt Engineering', reason: 'Get the best results from AI tools', estimatedHours: 3, priority: 'High' },
        { skill: 'AI for Content Creation', reason: 'Create content 10x faster', estimatedHours: 5, priority: 'High' },
        { skill: 'AI for Business', reason: 'Automate your business tasks', estimatedHours: 6, priority: 'Medium' },
      ],
      suggestions: ['Find an AI mentor', 'Start the AI course', 'AI opportunities near me'],
    }),
  },
  {
    patterns: [/job|career|work|employment/i],
    response: () => ({
      text: "Let's find the right career path for you! 🎯\n\nBased on your skills in Canva and Digital Marketing, here are the best job opportunities:",
      suggestions: ['See job opportunities', 'Update my portfolio', 'Connect with HR professionals'],
    }),
  },
  {
    patterns: [/business|startup|entrepreneur/i],
    response: () => ({
      text: "Starting a business is a bold and exciting move! 🚀\n\nHere's your HerPath business launch roadmap:",
      learningPath: [
        { skill: 'Business Planning', reason: 'Define your business model', estimatedHours: 5, priority: 'High' },
        { skill: 'Digital Marketing', reason: 'Market your business online', estimatedHours: 12, priority: 'High' },
        { skill: 'Financial Literacy', reason: 'Manage revenue and expenses', estimatedHours: 6, priority: 'High' },
        { skill: 'Canva', reason: 'Create your brand identity', estimatedHours: 4, priority: 'Medium' },
        { skill: 'Social Media', reason: 'Build brand awareness', estimatedHours: 8, priority: 'Medium' },
      ],
      suggestions: ['Find a business mentor', 'See collaboration opportunities', 'Build my brand portfolio'],
    }),
  },
];

interface AIResponse {
  text: string;
  learningPath?: LearningPathSuggestion[];
  mentors?: string[];
  suggestions?: string[];
}

function getAIResponse(input: string): AIResponse {
  for (const { patterns, response } of responsePatterns) {
    if (patterns.some(p => p.test(input))) {
      return response(input);
    }
  }

  // Default response
  return {
    text: "That's a great question! Based on your profile and goals, I can help you find the right path. Could you tell me more about what you want to achieve?\n\nFor example:\n• Start or grow a business\n• Learn specific skills\n• Find a mentor\n• Explore freelancing opportunities",
    suggestions: ['I want to start a business', 'Help me learn AI', 'Find me a mentor', 'Show freelance opportunities'],
  };
}

let messageId = 0;
function newId() { return `msg-${++messageId}-${Date.now()}`; }

export async function sendMessage(userInput: string): Promise<AIMessage> {
  // Simulate API delay
  await new Promise(r => setTimeout(r, 800 + Math.random() * 600));

  const response = getAIResponse(userInput);

  let content = response.text;
  if (response.learningPath) {
    content += '\n\n**Recommended Learning Path:**\n' + 
      response.learningPath.map((item, i) => 
        `${i + 1}. **${item.skill}** — ${item.reason} (~${item.estimatedHours}h)`
      ).join('\n');
  }
  if (response.mentors) {
    content += '\n\n**Best Mentor Matches:**\n' + response.mentors.map(m => `• ${m}`).join('\n');
  }

  return {
    id: newId(),
    role: 'assistant',
    content,
    timestamp: new Date(),
    suggestions: response.suggestions,
    learningPath: response.learningPath,
  };
}

export function generateLearningPath(goal: string): LearningPathSuggestion[] {
  const response = getAIResponse(goal);
  return response.learningPath || [
    { skill: 'Digital Marketing', reason: 'Essential for any online goal', estimatedHours: 12, priority: 'High' },
    { skill: 'Canva', reason: 'Create professional visuals', estimatedHours: 6, priority: 'High' },
    { skill: 'Communication', reason: 'Build professional relationships', estimatedHours: 4, priority: 'Medium' },
  ];
}

export function getWelcomeMessage(): AIMessage {
  return {
    id: newId(),
    role: 'assistant',
    content: "Hi Riya! 👋 I'm your HerPath AI assistant.\n\nI can help you:\n• **Plan your learning journey**\n• **Find the right mentors**\n• **Discover opportunities**\n• **Build your skill profile**\n\nWhat would you like to achieve today?",
    timestamp: new Date(),
    suggestions: [
      'I want to start a business',
      'Help me learn AI tools',
      'Find a mentor for Digital Marketing',
      'Show me freelance opportunities',
    ],
  };
}

// Matching service
export interface MatchReason {
  factor: string;
  match: boolean;
  detail: string;
}

export function calculateMatchReasons(userSkills: string[], mentorSkills: string[], userLocation: string, mentorLocation: string, userLanguages: string[], mentorLanguages: string[]): MatchReason[] {
  const sharedSkills = userSkills.filter(s => mentorSkills.includes(s));
  const sharedLanguages = userLanguages.filter(l => mentorLanguages.includes(l));
  
  return [
    {
      factor: 'Skill Match',
      match: sharedSkills.length > 0,
      detail: sharedSkills.length > 0 ? `Teaches ${sharedSkills[0]}` : 'No direct skill overlap',
    },
    {
      factor: 'Language Match',
      match: sharedLanguages.length > 0,
      detail: sharedLanguages.length > 0 ? `Speaks ${sharedLanguages.join(', ')}` : 'Different languages',
    },
    {
      factor: 'Location Match',
      match: userLocation === mentorLocation,
      detail: mentorLocation,
    },
    {
      factor: 'Goal Alignment',
      match: true,
      detail: 'Supports your business goal',
    },
    {
      factor: 'Availability',
      match: true,
      detail: 'Available on weekdays',
    },
  ];
}
