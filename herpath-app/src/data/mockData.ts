// ============================================================
// HERPATH MOCK DATA — Centralized realistic seed data
// ============================================================

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon?: string;
  relatedSkills?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  avatarColor: string;
  initials: string;
  role: string;
  location: string;
  languages: string[];
  skills: string[];
  canTeach: string[];
  wantToLearn: string[];
  goals: string[];
  availability: string[];
  bio: string;
  experience?: string;
  rating?: number;
  reviewCount?: number;
  matchScore?: number;
  isVerified?: boolean;
  isMentor?: boolean;
  projects?: number;
  certificates?: number;
  joinedAt?: string;
  sessionRate?: number;
  herpathId?: string;
  userType?: 'learner' | 'expert';
  phone?: string;
  language?: string;
}

export type AccessCategory = 'skills' | 'projects' | 'learningProgress' | 'certificates' | 'achievements' | 'assessments' | 'goals';

export interface AccessRequest {
  id: string;
  expertId: string;
  expertName: string;
  expertRole: string;
  expertAvatarColor: string;
  expertInitials: string;
  learnerId: string;
  learnerName: string;
  learnerHerPathId: string;
  requestedCategories: AccessCategory[];
  grantedCategories?: Record<AccessCategory, boolean>;
  purpose: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED' | 'REVOKED';
  createdAt: string;
  expiresAt?: string;
  durationHours?: number;
}

export interface LearningPath {
  id: string;
  skillId: string;
  skill: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  estimatedHours: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isEnrolled: boolean;
  modules?: Module[];
}

export interface Module {
  id: string;
  title: string;
  type: 'Video' | 'Article' | 'Practice' | 'Quiz';
  duration: string;
  completed: boolean;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: 'Freelance' | 'Mentor' | 'Collaborate' | 'Business' | 'Scheme' | 'Local';
  skills: string[];
  matchScore: number;
  location: string;
  isRemote: boolean;
  postedAt: string;
  description: string;
  budget?: string;
  duration?: string;
  link?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  thumbnail?: string;
  bgColor: string;
  createdAt: string;
  url?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuedAt: string;
  skill: string;
  bgColor: string;
}

export interface Booking {
  id: string;
  mentorId: string;
  mentorName: string;
  date: string;
  time: string;
  duration: number;
  mode: 'Online' | 'In-person';
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
}

export interface ContentItem {
  id: string;
  title: string;
  type: 'Video' | 'Article' | 'Post' | 'Short';
  skill: string;
  author: string;
  authorAvatar: string;
  avatarColor: string;
  duration?: string;
  views: string;
  thumbnail?: string;
  bgColor: string;
  description: string;
}

// ============================================================
// CURRENT USER (Demo: Riya Sharma)
// ============================================================
export const currentUser: User = {
  id: 'u1',
  name: 'Riya Sharma',
  email: 'riya.sharma@email.com',
  avatarColor: '#0F766E',
  initials: 'RS',
  role: 'Digital Creator & Entrepreneur',
  location: 'Mumbai',
  languages: ['Hindi', 'English', 'Marathi'],
  skills: ['Canva', 'Digital Marketing', 'Video Editing'],
  canTeach: ['Canva', 'Instagram Marketing'],
  wantToLearn: ['Generative AI', 'Freelancing'],
  goals: ['Start a business', 'Build my portfolio', 'Find a mentor'],
  availability: ['Weekdays', 'Evening', 'Flexible'],
  bio: 'Creative freelancer passionate about digital marketing and content creation. I help small businesses grow their online presence through Canva designs and social media strategy.',
  projects: 12,
  certificates: 3,
  joinedAt: '2024-03-15',
  isVerified: true,
  herpathId: 'HP-7K29-X4M8',
  userType: 'learner',
};

// ============================================================
// MENTORS / EXPERTS
// ============================================================
export const mentors: User[] = [
  {
    id: 'm1',
    name: 'Priya Sharma',
    email: 'priya@email.com',
    avatarColor: '#0F766E',
    initials: 'PS',
    role: 'Digital Marketing Expert',
    location: 'Mumbai',
    languages: ['Hindi', 'English', 'Marathi'],
    skills: ['Canva', 'Digital Marketing', 'Social Media', 'Content Creation'],
    canTeach: ['Canva', 'Instagram Marketing', 'Digital Marketing'],
    wantToLearn: ['AI Marketing Tools'],
    goals: ['Teach others', 'Build portfolio'],
    availability: ['Weekdays', 'Weekends'],
    bio: 'Digital marketing specialist with 4+ years of experience helping women entrepreneurs grow their brands online. Certified in Google Digital Marketing.',
    experience: '4 years',
    rating: 4.8,
    reviewCount: 120,
    matchScore: 93,
    isMentor: true,
    isVerified: true,
    sessionRate: 500,
    herpathId: 'HP-9B41-M3K2',
    userType: 'expert',
  },
  {
    id: 'm2',
    name: 'Anjali Verma',
    email: 'anjali@email.com',
    avatarColor: '#0369A1',
    initials: 'AV',
    role: 'Finance & Business Coach',
    location: 'Pune',
    languages: ['Hindi', 'English'],
    skills: ['Excel', 'Business', 'Finance', 'Entrepreneurship'],
    canTeach: ['Excel', 'Financial Literacy', 'Business Planning'],
    wantToLearn: ['Canva', 'Digital Marketing'],
    goals: ['Teach others', 'Find a mentor'],
    availability: ['Weekends', 'Morning'],
    bio: 'CA and business coach with 6 years of experience helping women understand finance and launch sustainable businesses.',
    experience: '6 years',
    rating: 4.9,
    reviewCount: 85,
    matchScore: 78,
    isMentor: true,
    isVerified: true,
    herpathId: 'HP-82JD-9K21',
    userType: 'expert',
  },
  {
    id: 'm3',
    name: 'Sneha Kapoor',
    email: 'sneha@email.com',
    avatarColor: '#059669',
    initials: 'SK',
    role: 'Content Creator & Video Editor',
    location: 'Bengaluru',
    languages: ['English', 'Kannada', 'Hindi'],
    skills: ['Video Editing', 'Content Creation', 'YouTube', 'Reels', 'Photography'],
    canTeach: ['Video Editing', 'YouTube Strategy', 'Instagram Reels'],
    wantToLearn: ['AI Video Tools', 'Entrepreneurship'],
    goals: ['Teach others', 'Start a business'],
    availability: ['Weekdays', 'Evening'],
    bio: 'Content creator with 100K+ followers across platforms. Former video editor at a media company, now helping women build their creator careers from scratch.',
    experience: '5 years',
    rating: 4.7,
    reviewCount: 67,
    matchScore: 85,
    isMentor: true,
    isVerified: true,
    sessionRate: 600,
    herpathId: 'HP-5N12-V8P3',
    userType: 'expert',
  },
  {
    id: 'm4',
    name: 'Kavitha Reddy',
    email: 'kavitha@email.com',
    avatarColor: '#B45309',
    initials: 'KR',
    role: 'AI & Tech Educator',
    location: 'Hyderabad',
    languages: ['English', 'Telugu', 'Hindi'],
    skills: ['Generative AI', 'Prompt Engineering', 'Data Analysis', 'Coding'],
    canTeach: ['Generative AI Basics', 'Prompt Engineering', 'AI for Business'],
    wantToLearn: ['Business Skills'],
    goals: ['Teach others', 'Build portfolio'],
    availability: ['Weekdays', 'Afternoon'],
    bio: 'AI researcher and educator making technology accessible for non-tech women. Runs online workshops on using AI tools for business and creativity.',
    experience: '3 years',
    rating: 4.9,
    reviewCount: 156,
    matchScore: 91,
    isMentor: true,
    isVerified: true,
    sessionRate: 800,
    herpathId: 'HP-3X89-L4R1',
    userType: 'expert',
  },
];

// ============================================================
// SEED ACCESS REQUESTS
// ============================================================
export const initialAccessRequests: AccessRequest[] = [
  {
    id: 'req-1',
    expertId: 'm1',
    expertName: 'Priya Sharma',
    expertRole: 'Digital Marketing Expert',
    expertAvatarColor: '#0F766E',
    expertInitials: 'PS',
    learnerId: 'u1',
    learnerName: 'Riya Sharma',
    learnerHerPathId: 'HP-7K29-X4M8',
    requestedCategories: ['skills', 'projects', 'learningProgress', 'certificates', 'achievements', 'goals'],
    grantedCategories: {
      skills: true,
      projects: true,
      learningProgress: true,
      certificates: true,
      achievements: true,
      assessments: false,
      goals: true,
    },
    purpose: 'Mentorship & Social Media Strategy Guidance',
    status: 'APPROVED',
    createdAt: '2026-09-28T10:00:00.000Z',
    expiresAt: '2026-10-06T10:00:00.000Z',
    durationHours: 168,
  },
  {
    id: 'req-2',
    expertId: 'm2',
    expertName: 'Anjali Verma',
    expertRole: 'Finance & Business Coach',
    expertAvatarColor: '#0369A1',
    expertInitials: 'AV',
    learnerId: 'u1',
    learnerName: 'Riya Sharma',
    learnerHerPathId: 'HP-7K29-X4M8',
    requestedCategories: ['skills', 'learningProgress', 'goals'],
    purpose: 'Business Plan Review & Financial Roadmap',
    status: 'PENDING',
    createdAt: '2026-09-29T08:30:00.000Z',
    durationHours: 168,
  }
];

// ============================================================
// ALL USERS (for Discover)
// ============================================================
export const allUsers: User[] = [
  ...mentors,
  {
    id: 'u2',
    name: 'Meera Joshi',
    email: 'meera@email.com',
    avatarColor: '#BE185D',
    initials: 'MJ',
    role: 'Homemaker & Aspiring Entrepreneur',
    location: 'Mumbai',
    languages: ['Hindi', 'Marathi'],
    skills: ['Cooking', 'Teaching'],
    canTeach: ['Cooking', 'Home Management'],
    wantToLearn: ['Digital Marketing', 'Canva', 'Freelancing'],
    goals: ['Start a business', 'Become a freelancer'],
    availability: ['Morning', 'Afternoon'],
    bio: 'Homemaker looking to launch an online food business. Love cooking and want to turn my passion into income.',
    matchScore: 82,
  },
  {
    id: 'u3',
    name: 'Divya Nair',
    email: 'divya@email.com',
    avatarColor: '#0F766E',
    initials: 'DN',
    role: 'Student',
    location: 'Chennai',
    languages: ['English', 'Tamil'],
    skills: ['Communication', 'Canva', 'Social Media'],
    canTeach: ['Communication'],
    wantToLearn: ['Digital Marketing', 'Coding', 'AI'],
    goals: ['Get a job', 'Improve my skills'],
    availability: ['Evenings', 'Weekends'],
    bio: 'Final year student passionate about tech and marketing. Looking for mentors to guide my career journey.',
    matchScore: 76,
  },
];

// ============================================================
// SKILLS
// ============================================================
export const skills: Skill[] = [
  { id: 's1', name: 'Canva', category: 'Design', relatedSkills: ['Digital Marketing', 'Social Media', 'Photography'] },
  { id: 's2', name: 'Digital Marketing', category: 'Marketing', relatedSkills: ['Social Media', 'Canva', 'Content Creation'] },
  { id: 's3', name: 'Video Editing', category: 'Content', relatedSkills: ['Content Creation', 'YouTube', 'Photography'] },
  { id: 's4', name: 'Generative AI', category: 'Technology', relatedSkills: ['Prompt Engineering', 'Data Analysis', 'Coding'] },
  { id: 's5', name: 'Freelancing', category: 'Business', relatedSkills: ['Digital Marketing', 'Finance', 'Communication'] },
  { id: 's6', name: 'Excel', category: 'Productivity', relatedSkills: ['Finance', 'Data Analysis', 'Business'] },
  { id: 's7', name: 'Social Media', category: 'Marketing', relatedSkills: ['Canva', 'Digital Marketing', 'Content Creation'] },
  { id: 's8', name: 'Financial Literacy', category: 'Finance', relatedSkills: ['Business', 'Entrepreneurship', 'Excel'] },
  { id: 's9', name: 'Photography', category: 'Content', relatedSkills: ['Canva', 'Video Editing', 'Instagram'] },
  { id: 's10', name: 'Communication', category: 'Soft Skills', relatedSkills: ['Teaching', 'Leadership', 'Business'] },
  { id: 's11', name: 'Coding', category: 'Technology', relatedSkills: ['AI', 'Data Analysis', 'Web Development'] },
  { id: 's12', name: 'Content Creation', category: 'Content', relatedSkills: ['Social Media', 'Video Editing', 'Photography'] },
  { id: 's13', name: 'Entrepreneurship', category: 'Business', relatedSkills: ['Business', 'Finance', 'Digital Marketing'] },
  { id: 's14', name: 'Teaching', category: 'Education', relatedSkills: ['Communication', 'Content Creation'] },
  { id: 's15', name: 'Cooking', category: 'Home Services', relatedSkills: ['Baking', 'Home Management'] },
  { id: 's16', name: 'Tailoring', category: 'Fashion & Design', relatedSkills: ['Handicrafts', 'Design'] },
  { id: 's17', name: 'Baking', category: 'Home Services', relatedSkills: ['Cooking'] },
];

// ============================================================
// LEARNING PATHS
// ============================================================
export const learningPaths: LearningPath[] = [
  {
    id: 'lp1',
    skillId: 's2',
    skill: 'Digital Marketing',
    description: 'Master digital marketing from strategy to execution. Learn SEO, social media, email marketing, and analytics.',
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    estimatedHours: 12,
    difficulty: 'Intermediate',
    isEnrolled: true,
    modules: [
      { id: 'mod1', title: 'Introduction to Digital Marketing', type: 'Video', duration: '18 min', completed: true },
      { id: 'mod2', title: 'Building Your Brand Online', type: 'Article', duration: '12 min', completed: true },
      { id: 'mod3', title: 'Social Media Strategy', type: 'Video', duration: '25 min', completed: true },
      { id: 'mod4', title: 'Content Calendar Planning', type: 'Practice', duration: '30 min', completed: true },
      { id: 'mod5', title: 'SEO Basics', type: 'Video', duration: '20 min', completed: false },
      { id: 'mod6', title: 'Email Marketing Fundamentals', type: 'Video', duration: '22 min', completed: false },
    ],
  },
  {
    id: 'lp2',
    skillId: 's4',
    skill: 'Generative AI',
    description: 'Learn how to use AI tools for business and creativity. Master prompt engineering, ChatGPT, and AI automation.',
    progress: 20,
    totalLessons: 18,
    completedLessons: 4,
    estimatedHours: 10,
    difficulty: 'Beginner',
    isEnrolled: true,
    modules: [
      { id: 'mod7', title: 'What is Generative AI?', type: 'Video', duration: '15 min', completed: true },
      { id: 'mod8', title: 'Prompt Engineering Basics', type: 'Article', duration: '20 min', completed: true },
      { id: 'mod9', title: 'Using ChatGPT for Business', type: 'Video', duration: '28 min', completed: false },
      { id: 'mod10', title: 'AI for Content Creation', type: 'Practice', duration: '35 min', completed: false },
    ],
  },
  {
    id: 'lp3',
    skillId: 's5',
    skill: 'Freelancing',
    description: 'From beginner to professional freelancer. Learn how to find clients, price your work, and build a sustainable income.',
    progress: 0,
    totalLessons: 20,
    completedLessons: 0,
    estimatedHours: 8,
    difficulty: 'Beginner',
    isEnrolled: false,
    modules: [
      { id: 'mod11', title: 'Freelancing 101', type: 'Video', duration: '20 min', completed: false },
      { id: 'mod12', title: 'Finding Your First Client', type: 'Article', duration: '15 min', completed: false },
    ],
  },
  {
    id: 'lp4',
    skillId: 's1',
    skill: 'Canva',
    description: 'Create stunning designs without design experience. Master Canva for social media, presentations, and business.',
    progress: 100,
    totalLessons: 12,
    completedLessons: 12,
    estimatedHours: 6,
    difficulty: 'Beginner',
    isEnrolled: true,
  },
];

// ============================================================
// OPPORTUNITIES
// ============================================================
export const opportunities: Opportunity[] = [
  {
    id: 'op1',
    title: 'Social Media Designer',
    company: 'StartupBharat',
    type: 'Freelance',
    skills: ['Canva', 'Instagram', 'Content Creation'],
    matchScore: 92,
    location: 'Remote',
    isRemote: true,
    postedAt: '2 days ago',
    description: 'We need a talented social media designer to create stunning posts for our startup brand. 10-15 posts per week.',
    budget: '₹15,000–₹25,000/month',
    duration: '3 months',
  },
  {
    id: 'op2',
    title: 'Junior Digital Marketer',
    company: 'Kalakar Studio',
    type: 'Freelance',
    skills: ['Digital Marketing', 'Social Media', 'Analytics'],
    matchScore: 87,
    location: 'Mumbai',
    isRemote: false,
    postedAt: '1 week ago',
    description: 'Growing creative agency looking for a digital marketing coordinator. Manage campaigns and analyze results.',
    budget: '₹20,000/month',
    duration: 'Ongoing',
  },
  {
    id: 'op3',
    title: 'Canva Mentor',
    company: 'HerPath Community',
    type: 'Mentor',
    skills: ['Canva', 'Communication', 'Teaching'],
    matchScore: 95,
    location: 'Online',
    isRemote: true,
    postedAt: '3 days ago',
    description: 'Teach Canva to beginners in our community. Flexible timings, earn while you teach.',
    budget: '₹500–₹800/session',
    duration: 'Ongoing',
  },
  {
    id: 'op4',
    title: 'Video Editing Freelancer',
    company: 'ContentKing',
    type: 'Freelance',
    skills: ['Video Editing', 'Content Creation', 'Instagram Reels'],
    matchScore: 82,
    location: 'Remote',
    isRemote: true,
    postedAt: '4 days ago',
    description: 'Looking for a video editor for short-form content. Reels, TikTok-style videos.',
    budget: '₹1,500–₹3,000/video',
  },
  {
    id: 'op5',
    title: 'Co-founder (Marketing)',
    company: 'Vyapaar App',
    type: 'Business',
    skills: ['Digital Marketing', 'Social Media', 'Entrepreneurship'],
    matchScore: 74,
    location: 'Mumbai',
    isRemote: false,
    postedAt: '1 week ago',
    description: 'Early-stage e-commerce startup looking for a marketing co-founder. Equity-based.',
  },
  {
    id: 'op6',
    title: 'AI Skills Trainer',
    company: 'TechSakhi NGO',
    type: 'Collaborate',
    skills: ['Generative AI', 'Teaching', 'Communication'],
    matchScore: 79,
    location: 'Online',
    isRemote: true,
    postedAt: '5 days ago',
    description: 'Train women from rural India in basic AI tools. Part-time, volunteer + stipend.',
    budget: '₹10,000 stipend/month',
  },
  {
    id: 'op7',
    title: 'Mahila Samman Savings Certificate',
    company: 'Govt of India',
    type: 'Scheme',
    skills: ['Finance'],
    matchScore: 90,
    location: 'Pan India',
    isRemote: true,
    postedAt: 'Always Open',
    description: 'A small savings scheme exclusively for women and girls offering attractive interest rates.',
    link: 'https://www.indiapost.gov.in/',
  },
  {
    id: 'op8',
    title: 'Stand Up India Scheme',
    company: 'Govt of India',
    type: 'Scheme',
    skills: ['Entrepreneurship', 'Business'],
    matchScore: 88,
    location: 'Pan India',
    isRemote: true,
    postedAt: 'Always Open',
    description: 'Facilitates bank loans between ₹10 lakh and ₹1 crore to at least one woman borrower per bank branch for setting up a greenfield enterprise.',
    link: 'https://www.standupmitra.in/',
  },
  {
    id: 'op9',
    title: 'Local Bakery Assistant',
    company: 'Sweet Treats Bakery',
    type: 'Local',
    skills: ['Cooking', 'Baking'],
    matchScore: 85,
    location: 'Mumbai, MH',
    isRemote: false,
    postedAt: '2h ago',
    description: 'Looking for a passionate local baker to help out in our growing neighborhood bakery.',
    budget: '₹8,000/month',
  }
];

// ============================================================
// PROJECTS
// ============================================================
export const projects: Project[] = [
  {
    id: 'proj1',
    title: 'Brand Campaign – Meera Bakes',
    description: 'Complete brand identity and social media campaign for a home bakery business.',
    skills: ['Canva', 'Digital Marketing', 'Social Media'],
    bgColor: '#F0FDF4',
    createdAt: '2024-08-15',
  },
  {
    id: 'proj2',
    title: 'Instagram Reels – Fashion Brand',
    description: '30 short-form video reels for a Mumbai-based fashion label.',
    skills: ['Video Editing', 'Content Creation', 'Instagram'],
    bgColor: '#EFF6FF',
    createdAt: '2024-07-22',
  },
  {
    id: 'proj3',
    title: 'Product Catalogue – Organic Store',
    description: 'Designed a complete product catalogue and pricing brochure using Canva.',
    skills: ['Canva', 'Photography', 'Design'],
    bgColor: '#FFF7ED',
    createdAt: '2024-06-10',
  },
  {
    id: 'proj4',
    title: 'Social Media Strategy – Fitness Coach',
    description: 'Developed a 3-month content strategy and managed posting schedule.',
    skills: ['Digital Marketing', 'Social Media', 'Content Creation'],
    bgColor: '#F5F3FF',
    createdAt: '2024-05-30',
  },
];

// ============================================================
// CERTIFICATES
// ============================================================
export const certificates: Certificate[] = [
  {
    id: 'cert1',
    title: 'Canva Design Fundamentals',
    issuer: 'HerPath',
    issuedAt: '2024-06-01',
    skill: 'Canva',
    bgColor: '#F0FDF4',
  },
  {
    id: 'cert2',
    title: 'Digital Marketing Essentials',
    issuer: 'Google Digital Garage',
    issuedAt: '2024-07-15',
    skill: 'Digital Marketing',
    bgColor: '#EFF6FF',
  },
  {
    id: 'cert3',
    title: 'Social Media Marketing',
    issuer: 'HerPath',
    issuedAt: '2024-08-20',
    skill: 'Social Media',
    bgColor: '#FFF7ED',
  },
];

// ============================================================
// CONTENT FEED
// ============================================================
export const contentItems: ContentItem[] = [
  {
    id: 'c1',
    title: 'How I use Canva to run my entire business',
    type: 'Video',
    skill: 'Canva',
    author: 'Priya Sharma',
    authorAvatar: 'PS',
    avatarColor: '#7C3AED',
    duration: '8 min',
    views: '12.4K',
    bgColor: '#F0FDF4',
    description: 'A complete walkthrough of how I create logos, social posts, brochures, and presentations using Canva.',
  },
  {
    id: 'c2',
    title: '5 digital marketing hacks for small businesses',
    type: 'Article',
    skill: 'Digital Marketing',
    author: 'Anjali Verma',
    authorAvatar: 'AV',
    avatarColor: '#0369A1',
    duration: '6 min read',
    views: '8.2K',
    bgColor: '#EFF6FF',
    description: 'Practical tips that actually work for women entrepreneurs with limited budgets.',
  },
  {
    id: 'c3',
    title: 'AI tools every freelancer should know',
    type: 'Video',
    skill: 'Generative AI',
    author: 'Kavitha Reddy',
    authorAvatar: 'KR',
    avatarColor: '#B45309',
    duration: '12 min',
    views: '21K',
    bgColor: '#FFF7ED',
    description: 'From ChatGPT to Midjourney — tools that will 10x your freelancing productivity.',
  },
  {
    id: 'c4',
    title: 'How to price your freelance work',
    type: 'Post',
    skill: 'Freelancing',
    author: 'Sneha Kapoor',
    authorAvatar: 'SK',
    avatarColor: '#059669',
    views: '5.7K',
    bgColor: '#F5F3FF',
    description: 'Stop undercharging! Here is how I finally figured out my pricing as a freelance video editor.',
  },
  {
    id: 'c5',
    title: 'Excel formulas that changed my life',
    type: 'Short',
    skill: 'Excel',
    author: 'Anjali Verma',
    authorAvatar: 'AV',
    avatarColor: '#0369A1',
    duration: '3 min',
    views: '9.1K',
    bgColor: '#F0FDF4',
    description: 'These 10 Excel formulas help me manage my business finances without a CA.',
  },
];

// ============================================================
// SKILL EXCHANGE
// ============================================================
export interface SkillExchange {
  id: string;
  user: User;
  offersSkill: string;
  wantsSkill: string;
  matchScore: number;
  note?: string;
}

export const skillExchanges: SkillExchange[] = [
  {
    id: 'se1',
    user: mentors[1], // Anjali
    offersSkill: 'Excel',
    wantsSkill: 'Canva',
    matchScore: 96,
    note: 'Looking to learn Canva for creating my financial reports visually. Can teach Excel and financial basics.',
  },
  {
    id: 'se2',
    user: allUsers[5], // Meera
    offersSkill: 'Cooking',
    wantsSkill: 'Digital Marketing',
    matchScore: 78,
    note: 'Home baker wanting to market my products online. Can share baking skills.',
  },
];

// ============================================================
// AI RESPONSES (mock)
// ============================================================
export const aiResponses: Record<string, string[]> = {
  business: [
    'That\'s a great goal! Based on your profile, here\'s your personalized learning path:',
    '**1. Digital Marketing** — Learn to promote your business online\n**2. Canva** — Create professional visuals for your brand\n**3. Product Photography** — Showcase your products beautifully\n**4. Social Media Strategy** — Build your audience\n**5. Financial Literacy** — Manage your business finances\n**6. Freelancing Basics** — Set your pricing and find clients',
  ],
  learn: [
    'Based on your current skills and goals, I recommend starting with:',
    '**Generative AI** will help you create content faster, manage your business with AI tools, and stay ahead of the competition. Your next lesson: "AI Tools for Creative Entrepreneurs"',
  ],
  mentor: [
    'Based on your profile, **Priya Sharma** (93% match) is your best mentor match.',
    'She can teach you Canva and Digital Marketing in Hindi. She\'s based in Mumbai — same as you! Book a session to get started.',
  ],
};

// ============================================================
// JOURNEY STAGES
// ============================================================
export const journeyStages = [
  { id: 'discover', label: 'Discover', completed: true, current: false },
  { id: 'learn', label: 'Learn', completed: true, current: false },
  { id: 'practice', label: 'Practice', completed: false, current: true },
  { id: 'showcase', label: 'Showcase', completed: false, current: false },
  { id: 'connect', label: 'Connect', completed: false, current: false },
  { id: 'opportunity', label: 'Opportunity', completed: false, current: false },
  { id: 'earn', label: 'Earn', completed: false, current: false },
];

// ============================================================
// ONBOARDING OPTIONS
// ============================================================
export const roleOptions = [
  { id: 'student', label: 'Student', icon: '🎓' },
  { id: 'professional', label: 'Professional', icon: '💼' },
  { id: 'homemaker', label: 'Homemaker', icon: '🏡' },
  { id: 'freelancer', label: 'Freelancer', icon: '💻' },
  { id: 'business-owner', label: 'Business Owner', icon: '🏢' },
  { id: 'job-seeker', label: 'Job Seeker', icon: '🔍' },
  { id: 'entrepreneur', label: 'Entrepreneur', icon: '🚀' },
  { id: 'other', label: 'Other', icon: '✨' },
];

export const skillOptions = [
  'Canva', 'Digital Marketing', 'Cooking', 'Coding', 'Finance',
  'Video Editing', 'Photography', 'Communication', 'Social Media',
  'AI', 'Excel', 'Teaching', 'Design', 'Entrepreneurship',
  'Writing', 'Public Speaking', 'Accounting', 'Tailoring', 'Baking', 'Handicrafts'
];

export const learnOptions = [
  'Generative AI', 'Digital Marketing', 'Freelancing', 'Financial Literacy',
  'Cybersecurity', 'Canva', 'Business', 'Social Media', 'Data Analysis',
  'Communication', 'Video Editing', 'Coding', 'Photography', 'Excel',
];

export const goalOptions = [
  { id: 'job', label: 'Get a job', icon: '💼' },
  { id: 'business', label: 'Start a business', icon: '🚀' },
  { id: 'freelance', label: 'Become a freelancer', icon: '💻' },
  { id: 'improve', label: 'Improve my skills', icon: '📈' },
  { id: 'mentor', label: 'Find a mentor', icon: '🤝' },
  { id: 'teach', label: 'Teach others', icon: '🎓' },
  { id: 'portfolio', label: 'Build my portfolio', icon: '✨' },
];

export const languageOptions = ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Gujarati'];

export const availabilityOptions = [
  'Weekdays', 'Weekends', 'Morning', 'Afternoon', 'Evening', 'Flexible',
];
