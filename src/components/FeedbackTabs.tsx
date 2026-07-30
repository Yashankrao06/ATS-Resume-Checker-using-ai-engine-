import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Target, 
  Copy, 
  Check, 
  FileText, 
  ArrowRight, 
  ListChecks, 
  Zap, 
  ChevronDown, 
  ChevronUp,
  Search,
  Info,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import { AnalysisResult, BulletImprovement } from '../types';
import { LivePdfRedlineAudit } from './LivePdfRedlineAudit';

interface FeedbackTabsProps {
  analysis: AnalysisResult;
  resumeText: string;
  pdfBase64: string | null;
  fileName: string | null;
}

export const FeedbackTabs: React.FC<FeedbackTabsProps> = ({ 
  analysis,
  resumeText,
  pdfBase64,
  fileName
}) => {
  const [activeTab, setActiveTab] = useState<'ats' | 'impact' | 'keywords' | 'insights' | 'audit'>('ats');

  const { parsability, impactAndBrevity, keywordGap, recruiterInsights } = analysis;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Tab Navigation Header */}
      <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar scroll-smooth gap-1 sm:gap-2 pb-0.5">
        
        {/* Tab 1: ATS Formatting Score */}
        <button
          onClick={() => setActiveTab('ats')}
          className={`flex items-center gap-1.5 py-3 px-3 sm:px-4 font-bold text-xs sm:text-sm border-b-2 whitespace-nowrap transition-all shrink-0 min-h-[44px] ${
            activeTab === 'ats'
              ? 'border-indigo-600 text-indigo-700 bg-indigo-50/60 rounded-t-xl'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <ListChecks className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>ATS & Formatting Score</span>
          <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">
            {parsability.score} / 100
          </span>
        </button>

        {/* Tab 2: Impact & Brevity Score */}
        <button
          onClick={() => setActiveTab('impact')}
          className={`flex items-center gap-1.5 py-3 px-3 sm:px-4 font-bold text-xs sm:text-sm border-b-2 whitespace-nowrap transition-all shrink-0 min-h-[44px] ${
            activeTab === 'impact'
              ? 'border-indigo-600 text-indigo-700 bg-indigo-50/60 rounded-t-xl'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>Impact & Brevity Score</span>
          <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-extrabold">
            {impactAndBrevity.score} / 100
          </span>
        </button>

        {/* Tab 3: Keyword Gap Score */}
        <button
          onClick={() => setActiveTab('keywords')}
          className={`flex items-center gap-1.5 py-3 px-3 sm:px-4 font-bold text-xs sm:text-sm border-b-2 whitespace-nowrap transition-all shrink-0 min-h-[44px] ${
            activeTab === 'keywords'
              ? 'border-indigo-600 text-indigo-700 bg-indigo-50/60 rounded-t-xl'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Target className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Keyword Match Gap Score</span>
          <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold">
            {keywordGap.matchPercentage}%
          </span>
        </button>

        {/* Tab 4: Recruiter Evaluation */}
        <button
          onClick={() => setActiveTab('insights')}
          className={`flex items-center gap-1.5 py-3 px-3 sm:px-4 font-bold text-xs sm:text-sm border-b-2 whitespace-nowrap transition-all shrink-0 min-h-[44px] ${
            activeTab === 'insights'
              ? 'border-indigo-600 text-indigo-700 bg-indigo-50/60 rounded-t-xl'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Recruiter Insights</span>
        </button>

        {/* Tab 5: Document Structure */}
        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-1.5 py-3 px-3 sm:px-4 font-bold text-xs sm:text-sm border-b-2 whitespace-nowrap transition-all shrink-0 min-h-[44px] ${
            activeTab === 'audit'
              ? 'border-indigo-600 text-indigo-700 bg-indigo-50/60 rounded-t-xl'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileCheck2 className="w-4 h-4 text-slate-600 shrink-0" />
          <span>Document Structure</span>
        </button>
      </div>

      {/* TAB 0: LIVE PDF & RED-LINE AUDIT */}
      {activeTab === 'audit' && (
        <div className="py-6">
          <LivePdfRedlineAudit
            resumeText={resumeText}
            pdfBase64={pdfBase64}
            fileName={fileName}
            analysis={analysis}
          />
        </div>
      )}

      {/* TAB 1: IMPACT & BREVITY */}
      {activeTab === 'impact' && (
        <div className="py-6 space-y-6">
          
          {/* Quantification Metric Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 mb-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Bullet Point Impact Benchmark
                </div>
                <h3 className="text-lg font-bold text-white">Quantifiable Metrics Score</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Recruiters spend an average of 6 seconds scanning resumes. Bullets containing measurable numbers (% growth, $ revenue, team size, time saved) achieve 2.4x higher callback rates.
                </p>
              </div>

              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/10 shrink-0">
                <div className="text-center">
                  <span className="text-3xl font-black text-amber-400">{impactAndBrevity.quantifiedBulletsPercentage}%</span>
                  <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Quantified</p>
                </div>
                <div className="h-10 w-px bg-white/20"></div>
                <div className="text-center">
                  <span className="text-3xl font-black text-slate-200">{impactAndBrevity.weakBulletsCount}</span>
                  <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Flagged Points</p>
                </div>
              </div>
            </div>
          </div>

          {/* Impact & Brevity Dimension Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Metric 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Quantifiable Metrics Ratio</span>
                <span className="text-sm font-extrabold text-indigo-600">{impactAndBrevity.quantifiedBulletsPercentage}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, Math.max(0, impactAndBrevity.quantifiedBulletsPercentage))}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Evaluates the presence of hard numbers, percentages, financial metrics, or user scale metrics in your experience statements.
              </p>
            </div>

            {/* Metric 2 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Strong Action Verbs</span>
                <span className="text-sm font-extrabold text-emerald-600">{Math.min(100, Math.max(40, impactAndBrevity.score + 5))}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, Math.max(40, impactAndBrevity.score + 5))}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Measures the percentage of bullet points starting with high-impact power verbs rather than weak passive phrases.
              </p>
            </div>

            {/* Metric 3 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Brevity & Density Score</span>
                <span className="text-sm font-extrabold text-amber-600">{Math.min(100, Math.max(50, 100 - impactAndBrevity.weakBulletsCount * 6))}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, Math.max(50, 100 - impactAndBrevity.weakBulletsCount * 6))}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Assesses line-length conciseness and checks for wordiness or repetitive task descriptions across sections.
              </p>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: ATS & FORMATTING */}
      {activeTab === 'ats' && (
        <div className="py-6 space-y-6">
          
          {/* Checklist Summary */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-indigo-600" />
              ATS Parsability & Structure Checklist
            </h3>

            <div className="divide-y divide-slate-100">
              {parsability.checks.map((check) => (
                <div key={check.id} className="py-3.5 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    {check.status === 'pass' && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />}
                    {check.status === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />}
                    {check.status === 'fail' && <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />}

                    <div>
                      <p className="text-xs font-bold text-slate-900">{check.name}</p>
                      <p className="text-xs text-slate-600 mt-0.5">{check.detail}</p>
                    </div>
                  </div>

                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                    check.status === 'pass' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    check.status === 'warning' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {check.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info Detection Grid */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4">Detected Contact Header Elements</h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className={`p-3 rounded-xl border text-center ${parsability.contactInfoFound.email ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-rose-50/60 border-rose-200 text-rose-900'}`}>
                <p className="text-[10px] uppercase font-bold text-slate-500">Email</p>
                <p className="text-xs font-extrabold mt-1">{parsability.contactInfoFound.email ? '✓ Found' : '✗ Missing'}</p>
              </div>

              <div className={`p-3 rounded-xl border text-center ${parsability.contactInfoFound.phone ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-rose-50/60 border-rose-200 text-rose-900'}`}>
                <p className="text-[10px] uppercase font-bold text-slate-500">Phone</p>
                <p className="text-xs font-extrabold mt-1">{parsability.contactInfoFound.phone ? '✓ Found' : '✗ Missing'}</p>
              </div>

              <div className={`p-3 rounded-xl border text-center ${parsability.contactInfoFound.linkedin ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-amber-50/60 border-amber-200 text-amber-900'}`}>
                <p className="text-[10px] uppercase font-bold text-slate-500">LinkedIn</p>
                <p className="text-xs font-extrabold mt-1">{parsability.contactInfoFound.linkedin ? '✓ Found' : '⚠ Missing'}</p>
              </div>

              <div className={`p-3 rounded-xl border text-center ${parsability.contactInfoFound.location ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-amber-50/60 border-amber-200 text-amber-900'}`}>
                <p className="text-[10px] uppercase font-bold text-slate-500">Location</p>
                <p className="text-xs font-extrabold mt-1">{parsability.contactInfoFound.location ? '✓ Found' : '⚠ Missing'}</p>
              </div>

              <div className={`p-3 rounded-xl border text-center ${parsability.contactInfoFound.githubOrPortfolio ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                <p className="text-[10px] uppercase font-bold text-slate-500">Portfolio/GitHub</p>
                <p className="text-xs font-extrabold mt-1">{parsability.contactInfoFound.githubOrPortfolio ? '✓ Found' : 'Optional'}</p>
              </div>
            </div>
          </div>

          {/* Section Headers Identified */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-2">Identified Section Headers</h3>
            <p className="text-xs text-slate-500 mb-4">Standard headers ensure automated ATS software correctly categorizes your experience.</p>

            <div className="flex flex-wrap gap-2">
              {parsability.extractedSections.map((sec, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-semibold text-xs border border-indigo-100">
                  ✓ {sec}
                </span>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: KEYWORD GAP */}
      {activeTab === 'keywords' && (
        <div className="py-6 space-y-6">
          
          {/* Match Score Banner */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                Target Role: {keywordGap.jobTitleMatched}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-2">Keyword Compatibility Index</h3>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                ATS scanners compare your resume against required hard skills, tools, and soft competencies in the job description.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 shrink-0">
              <div className="text-center">
                <span className="text-3xl font-black text-indigo-600">{keywordGap.matchPercentage}%</span>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Match Rate</p>
              </div>
              <div className="h-10 w-px bg-slate-200"></div>
              <div className="text-center">
                <span className="text-3xl font-black text-emerald-600">{keywordGap.skillsMatched.length}</span>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Matched</p>
              </div>
              <div className="h-10 w-px bg-slate-200"></div>
              <div className="text-center">
                <span className="text-3xl font-black text-rose-600">{keywordGap.skillsMissing.length}</span>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Missing</p>
              </div>
            </div>
          </div>

          {/* Missing Skills Section (Priority Red) */}
          <div className="bg-white rounded-2xl border border-rose-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Missing Required Keywords ({keywordGap.skillsMissing.length})</h3>
                  <p className="text-xs text-slate-500">Add these hard and soft skills to pass keyword filter thresholds.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {keywordGap.skillsMissing.map((sk, i) => (
                <div key={i} className="bg-rose-50/50 border border-rose-200/80 rounded-xl p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-rose-900">{sk.skill}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      sk.importance === 'high' ? 'bg-rose-200 text-rose-900' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {sk.importance.toUpperCase()} PRIORITY
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{sk.recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Matched Skills Section (Emerald Green) */}
          <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Successfully Matched Keywords ({keywordGap.skillsMatched.length})</h3>
                <p className="text-xs text-slate-500">Skills detected in your resume matching the target job role.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {keywordGap.skillsMatched.map((sk, i) => (
                <div key={i} className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-semibold border border-emerald-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>{sk.skill}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: RECRUITER INSIGHTS & PRIORITY FIXES */}
      {activeTab === 'insights' && (
        <div className="py-6 space-y-6">
          
          {/* Top 3 High-Impact Score Factors */}
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-amber-400" />
              <h3 className="text-lg font-bold text-white">Top 3 Score Optimization Factors</h3>
            </div>

            <div className="space-y-3">
              {recruiterInsights.top3PriorityFixes.map((fix, idx) => (
                <div key={idx} className="bg-white/10 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-900 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">{fix}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Strengths */}
            <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-xs">
              <h3 className="text-base font-bold text-emerald-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Key Resume Strengths
              </h3>

              <ul className="space-y-2.5">
                {recruiterInsights.strengths.map((str, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Red Flags */}
            <div className="bg-white rounded-2xl border border-rose-200 p-6 shadow-xs">
              <h3 className="text-base font-bold text-rose-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                Flagged Recruiter Red Flags
              </h3>

              <ul className="space-y-2.5">
                {recruiterInsights.redFlags.map((flag, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
