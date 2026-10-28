export type AccentColor = 'emerald' | 'cyan' | 'violet';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI/ML' | 'Network' | 'Security' | 'Forensics' | 'Backend';
  description: string;
  architectureDetails: string[];
  techStack: string[];
  highlights: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  terminalCommand: string;
  metrics?: { label: string; value: string }[];
  featured: boolean;
}

export interface SkillCategory {
  category: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 1-100
    tag?: string;
    details?: string;
  }[];
}

export interface Honor {
  id: string;
  title: string;
  organization: string;
  year: string;
  badge: string;
  standing: string;
  description: string;
  verificationLink?: string;
  highlightStats: string;
}

export interface TerminalEntry {
  type: 'input' | 'output' | 'error' | 'system' | 'banner';
  content: string;
  timestamp?: string;
}

