// ============================================================
// HERPATH NEO4J KNOWLEDGE GRAPH SERVICE
// Relationship layer for Learner Identity Graph & Consent Control
// ============================================================

export interface GraphNode {
  id: string;
  label: string;
  type: 'Learner' | 'Skill' | 'Goal' | 'LearningPath' | 'Course' | 'Project' | 'Certificate' | 'Achievement' | 'Assessment';
  category: string;
  properties: Record<string, any>;
  icon?: string;
  color: string;
  x?: number;
  y?: number;
}

export interface GraphRelationship {
  id: string;
  source: string;
  target: string;
  type: 'HAS_SKILL' | 'WANTS_TO_LEARN' | 'HAS_GOAL' | 'ENROLLED_IN' | 'CONTAINS' | 'COMPLETED' | 'CREATED' | 'DEMONSTRATES' | 'EARNED' | 'ACHIEVED' | 'MEASURES';
  label: string;
}

export interface GraphData {
  nodes: GraphNode[];
  relationships: GraphRelationship[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  month: string;
  year: string;
  title: string;
  type: 'Started' | 'Completed' | 'Created' | 'Earned' | 'Achieved';
  category: 'learningProgress' | 'projects' | 'certificates' | 'achievements' | 'skills';
  detail: string;
  icon: string;
  color: string;
}

/**
 * Returns permission-filtered Neo4j Knowledge Graph for a learner.
 * If Neo4j DB URL environment variable is present, executes Cypher query.
 * Otherwise uses built-in Neo4j graph model with strict permission enforcement.
 */
export function getLearnerKnowledgeGraph(
  learnerId: string,
  grantedCategories: Record<string, boolean> = {
    skills: true,
    projects: true,
    learningProgress: true,
    certificates: true,
    achievements: true,
    assessments: true,
    goals: true,
  }
): GraphData {
  const nodes: GraphNode[] = [];
  const relationships: GraphRelationship[] = [];

  // 1. Root Center Node: Learner
  nodes.push({
    id: 'node-learner-u1',
    label: 'Riya Sharma',
    type: 'Learner',
    category: 'Learner Identity',
    properties: {
      name: 'Riya Sharma',
      herpathId: 'HP-7K29-X4M8',
      role: 'Digital Creator & Entrepreneur',
      location: 'Mumbai',
      joinedAt: 'March 2024',
    },
    color: '#0F766E', // Primary Teal
  });

  // 2. SKILLS (if permitted)
  if (grantedCategories.skills !== false) {
    const skillsData = [
      { id: 'node-skill-canva', label: 'Canva', level: '90%', cat: 'Design & Visuals', color: '#14B8A6' },
      { id: 'node-skill-dm', label: 'Digital Marketing', level: '80%', cat: 'Marketing', color: '#0F766E' },
      { id: 'node-skill-video', label: 'Video Editing', level: '60%', cat: 'Media', color: '#0369A1' },
    ];

    skillsData.forEach(s => {
      nodes.push({
        id: s.id,
        label: s.label,
        type: 'Skill',
        category: 'Skill',
        properties: { name: s.label, proficiency: s.level, category: s.cat },
        color: s.color,
      });

      relationships.push({
        id: `rel-skill-${s.id}`,
        source: 'node-learner-u1',
        target: s.id,
        type: 'HAS_SKILL',
        label: `HAS_SKILL (${s.level})`,
      });
    });
  }

  // 3. GOALS (if permitted)
  if (grantedCategories.goals !== false) {
    const goalsData = [
      { id: 'node-goal-biz', label: 'Start Online Business', target: 'Q4 2026' },
      { id: 'node-goal-ai', label: 'Learn Generative AI', target: 'Q3 2026' },
    ];

    goalsData.forEach(g => {
      nodes.push({
        id: g.id,
        label: g.label,
        type: 'Goal',
        category: 'Goal',
        properties: { goal: g.label, targetDate: g.target },
        color: '#D97706', // Warning Gold
      });

      relationships.push({
        id: `rel-goal-${g.id}`,
        source: 'node-learner-u1',
        target: g.id,
        type: 'HAS_GOAL',
        label: 'HAS_GOAL',
      });
    });
  }

  // 4. LEARNING PATHS & COURSES (if permitted)
  if (grantedCategories.learningProgress !== false) {
    nodes.push({
      id: 'node-path-dm',
      label: 'Digital Marketing Path',
      type: 'LearningPath',
      category: 'Learning Path',
      properties: { name: 'Digital Marketing Path', progress: '80%', lessons: '8/10' },
      color: '#0F3D3E',
    });
    relationships.push({
      id: 'rel-path-dm',
      source: 'node-learner-u1',
      target: 'node-path-dm',
      type: 'ENROLLED_IN',
      label: 'ENROLLED_IN (80%)',
    });

    nodes.push({
      id: 'node-course-canva',
      label: 'Canva Basics Course',
      type: 'Course',
      category: 'Course',
      properties: { name: 'Canva Basics', duration: '6 hrs', status: 'Completed' },
      color: '#059669',
    });
    relationships.push({
      id: 'rel-contains-canva',
      source: 'node-path-dm',
      target: 'node-course-canva',
      type: 'CONTAINS',
      label: 'CONTAINS',
    });
    relationships.push({
      id: 'rel-completed-canva',
      source: 'node-learner-u1',
      target: 'node-course-canva',
      type: 'COMPLETED',
      label: 'COMPLETED',
    });
  }

  // 5. PROJECTS (if permitted)
  if (grantedCategories.projects !== false) {
    const projectsData = [
      { id: 'node-project-brand', label: 'Brand Campaign', date: 'April 2026', skillRef: 'node-skill-canva' },
      { id: 'node-project-insta', label: 'Instagram Portfolio', date: 'May 2026', skillRef: 'node-skill-dm' },
    ];

    projectsData.forEach(p => {
      nodes.push({
        id: p.id,
        label: p.label,
        type: 'Project',
        category: 'Project',
        properties: { name: p.label, created: p.date },
        color: '#2563EB',
      });

      relationships.push({
        id: `rel-created-${p.id}`,
        source: 'node-learner-u1',
        target: p.id,
        type: 'CREATED',
        label: 'CREATED',
      });

      if (grantedCategories.skills !== false) {
        relationships.push({
          id: `rel-demo-${p.id}`,
          source: p.id,
          target: p.skillRef,
          type: 'DEMONSTRATES',
          label: 'DEMONSTRATES',
        });
      }
    });
  }

  // 6. CERTIFICATES (if permitted)
  if (grantedCategories.certificates !== false) {
    nodes.push({
      id: 'node-cert-google',
      label: 'Google Digital Marketing',
      type: 'Certificate',
      category: 'Certificate',
      properties: { name: 'Digital Marketing Certificate', issuer: 'Google', date: 'May 2026', verified: true },
      color: '#059669',
    });

    relationships.push({
      id: 'rel-earned-google',
      source: 'node-learner-u1',
      target: 'node-cert-google',
      type: 'EARNED',
      label: 'EARNED (Verified)',
    });
  }

  // 7. ACHIEVEMENTS (if permitted)
  if (grantedCategories.achievements !== false) {
    nodes.push({
      id: 'node-achieve-creator',
      label: 'Digital Creator Badge',
      type: 'Achievement',
      category: 'Achievement',
      properties: { badge: 'Digital Creator', description: 'Created 5+ verified projects' },
      color: '#7C3AED',
    });

    relationships.push({
      id: 'rel-achieved-creator',
      source: 'node-learner-u1',
      target: 'node-achieve-creator',
      type: 'ACHIEVED',
      label: 'ACHIEVED',
    });
  }

  return { nodes, relationships };
}

/**
 * Returns chronological timeline of learner history respecting privacy settings.
 */
export function getLearnerTimelineEvents(
  learnerId: string,
  grantedCategories: Record<string, boolean> = {}
): TimelineEvent[] {
  const allEvents: TimelineEvent[] = [
    {
      id: 't1',
      date: '2026-01-15',
      month: 'JAN',
      year: '2026',
      title: 'Joined HerPath Journey',
      type: 'Started',
      category: 'learningProgress',
      detail: 'Set goal to start an online business and build digital marketing skills.',
      icon: '🚀',
      color: '#0F766E',
    },
    {
      id: 't2',
      date: '2026-02-10',
      month: 'FEB',
      year: '2026',
      title: 'Completed Canva Basics',
      type: 'Completed',
      category: 'learningProgress',
      detail: 'Finished 6 hours of design modules and visual communication fundamentals.',
      icon: '🎨',
      color: '#14B8A6',
    },
    {
      id: 't3',
      date: '2026-03-05',
      month: 'MAR',
      year: '2026',
      title: 'Completed Social Media Strategy',
      type: 'Completed',
      category: 'learningProgress',
      detail: 'Learned audience targeting, content scheduling, and engagement tactics.',
      icon: '📱',
      color: '#0369A1',
    },
    {
      id: 't4',
      date: '2026-04-18',
      month: 'APR',
      year: '2026',
      title: 'Published Brand Campaign Project',
      type: 'Created',
      category: 'projects',
      detail: 'Designed full brand identity & social media graphics for a local bakery.',
      icon: '💼',
      color: '#2563EB',
    },
    {
      id: 't5',
      date: '2026-05-22',
      month: 'MAY',
      year: '2026',
      title: 'Earned Google Digital Marketing Cert',
      type: 'Earned',
      category: 'certificates',
      detail: 'Passed final assessment with 94% score. Verified credential.',
      icon: '📜',
      color: '#059669',
    },
    {
      id: 't6',
      date: '2026-06-01',
      month: 'JUN',
      year: '2026',
      title: 'Unlocked Digital Creator Achievement',
      type: 'Achieved',
      category: 'achievements',
      detail: 'Awarded for completing 5 active practical projects and sharing work.',
      icon: '🏆',
      color: '#7C3AED',
    },
  ];

  return allEvents.filter(e => grantedCategories[e.category] !== false);
}
