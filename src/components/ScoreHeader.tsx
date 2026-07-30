import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Award, 
  Clock, 
  Download, 
  RefreshCw,
  FileText,
  Target,
  Zap,
  Sparkles
} from 'lucide-react';
import { AnalysisResult } from '../types';

interface ScoreHeaderProps {
  analysis: AnalysisResult;
  onReset: () => void;
}

export const ScoreHeader: React.FC<ScoreHeaderProps> = ({ analysis, onReset }) => {
  const { overallScore, summary, parsability, impactAndBrevity, keywordGap, recruiterInsights } = analysis;

  // Determine score color badge
  const getScoreTheme = (score: number) => {
    if (score >= 85) {
      return {
        stroke: '#10b981', // Emerald green
        badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        textColor: 'text-emerald-600',
        label: 'Strong Candidate Match',
        grade: 'A+'
      };
    }
    if (score >= 70) {
      return {
        stroke: '#f59e0b', // Amber yellow
        badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
        textColor: 'text-amber-600',
        label: 'Good — Needs Optimization',
        grade: 'B'
      };
    }
    return {
      stroke: '#f43f5e', // Rose red
      badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
      textColor: 'text-rose-600',
      label: 'Needs Significant Work',
      grade: 'C / Rejection Risk'
    };
  };

  const theme = getScoreTheme(overallScore);

  // SVG Gauge calculations
  const radius = 64;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 shadow-2xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Summary Row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-800">
          
          {/* Main Score Gauge */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
                <circle
                  stroke="currentColor"
                  className="text-slate-200 dark:text-slate-800"
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <circle
                  stroke={theme.stroke}
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${circumference} ${circumference}`}
                  style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }}
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
              </svg>
              
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{overallScore}</span>
                <span className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-slate-500 tracking-wider">Out of 100</span>
              </div>
            </div>

            <div className="text-center sm:text-left max-w-lg">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${theme.badgeBg}`}>
                  {theme.label}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  Grade: {theme.grade}
                </span>
              </div>

              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">ATS Overall Match Index</h2>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{summary}</p>
              
              <div className="mt-3 flex items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Estimated Recruiter Scan: <strong className="text-slate-800 dark:text-slate-200">{recruiterInsights.estimatedReadTimeSeconds}s</strong>
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  Word Count: <strong className="text-slate-800 dark:text-slate-200">{parsability.wordCount}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-colors"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Print / Export PDF</span>
            </button>
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100/80 transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Analyze Another Resume</span>
            </button>
          </div>

        </div>

        {/* Sub-Score Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          
          {/* Card 1: Parsability */}
          <div className="bg-slate-50/80 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">1. ATS & Formatting</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{parsability.score}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">/ 100</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {parsability.score >= 80 ? 'Standard headers & clear contact info' : 'Section or formatting flags detected'}
              </p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${parsability.score >= 80 ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-amber-100 text-amber-700'}`}>
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          {/* Card 2: Impact & Brevity */}
          <div className="bg-slate-50/80 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">2. Impact & Brevity</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{impactAndBrevity.score}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">/ 100</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                <strong className="text-indigo-600 dark:text-indigo-400">{impactAndBrevity.quantifiedBulletsPercentage}%</strong> bullets feature metric data
              </p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${impactAndBrevity.score >= 80 ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'}`}>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          {/* Card 3: Keyword Match */}
          <div className="bg-slate-50/80 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">3. JD Keyword Gap</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{keywordGap.matchPercentage}%</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Match Rate</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {keywordGap.skillsMissing.length} high-priority missing skills
              </p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${keywordGap.matchPercentage >= 75 ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-amber-100 text-amber-700'}`}>
              <Target className="w-5 h-5" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
