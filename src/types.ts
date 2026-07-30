export type ScoreCategory = 'overall' | 'parsability' | 'impact' | 'keywords';

export interface CheckItem {
  id: string;
  name: string;
  status: 'pass' | 'warning' | 'fail';
  detail: string;
}

export interface BulletImprovement {
  id: string;
  original: string;
  issue: string;
  rewritten: string;
  category: 'quantification' | 'action_verb' | 'conciseness' | 'passive_voice';
}

export interface SkillMatch {
  skill: string;
  category: 'hard' | 'soft' | 'tool';
  proficiencyContext?: string;
}

export interface SkillMissing {
  skill: string;
  category: 'hard' | 'soft' | 'tool';
  importance: 'high' | 'medium' | 'low';
  recommendation: string;
}

export interface AnalysisResult {
  overallScore: number;
  summary: string;
  
  parsability: {
    score: number;
    status: 'pass' | 'warning' | 'fail';
    checks: CheckItem[];
    extractedSections: string[];
    contactInfoFound: {
      email: boolean;
      phone: boolean;
      linkedin: boolean;
      location: boolean;
      githubOrPortfolio: boolean;
    };
    pageCount: number;
    wordCount: number;
  };
  
  impactAndBrevity: {
    score: number;
    totalBulletsAnalyzed: number;
    weakBulletsCount: number;
    quantifiedBulletsPercentage: number;
    bulletImprovements: BulletImprovement[];
  };

  keywordGap: {
    matchPercentage: number;
    jobTitleMatched: string;
    skillsMatched: SkillMatch[];
    skillsMissing: SkillMissing[];
    keywordDensityScore: number;
  };

  recruiterInsights: {
    strengths: string[];
    redFlags: string[];
    top3PriorityFixes: string[];
    estimatedReadTimeSeconds: number;
  };

  mcpTrace?: {
    resourcesUsed: string[];
    toolsExecuted: { tool: string; durationMs: number; status: 'ok' | 'warning' }[];
  };
}

export interface SampleResumeItem {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  resumeText: string;
  jobDescription: string;
}
