import React, { useState } from 'react';
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  FileCheck2, 
  Target, 
  ShieldAlert
} from 'lucide-react';
import { AnalysisResult } from '../types';

interface LivePdfRedlineAuditProps {
  resumeText: string;
  pdfBase64: string | null;
  fileName: string | null;
  analysis: AnalysisResult;
}

export const LivePdfRedlineAudit: React.FC<LivePdfRedlineAuditProps> = ({
  resumeText,
  pdfBase64,
  fileName,
  analysis
}) => {
  const [viewMode, setViewMode] = useState<'redline' | 'pdf'>('redline');

  const { parsability, impactAndBrevity, keywordGap } = analysis;

  // Process resume lines to detect which lines match weak bullet points or missing contact info
  const lines = resumeText.split('\n').map(l => l.trim()).filter(Boolean);

  // Map weak bullet improvements to line indices or content matching
  const redlinedLines = lines.map((line, index) => {
    const isWeak = impactAndBrevity.bulletImprovements.find(imp => {
      const orig = imp.original.toLowerCase().trim();
      const curr = line.toLowerCase().trim();
      return curr.includes(orig.slice(0, 20)) || orig.includes(curr.slice(0, 20));
    });

    const isHeaderLine = index < 3;
    const isMissingLinkedin = isHeaderLine && !parsability.contactInfoFound.linkedin && (line.includes('@') || line.includes('http') || index === 0);

    return {
      index,
      text: line,
      isWeak,
      isMissingLinkedin
    };
  });

  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-lg border border-indigo-900/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold mb-2">
              <FileCheck2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>ATS Parsed Document Structure</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Resume Structure & Parsability Breakdown
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Shows how automated ATS parsers read your document structure. Highlights line items affecting your overall score.
            </p>
          </div>

          {/* Toggle between Document Structure & Embedded PDF Viewer */}
          <div className="flex items-center bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/80 text-xs font-semibold shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setViewMode('redline')}
              className={`flex-1 sm:flex-initial justify-center px-3 py-2 sm:py-1.5 rounded-lg transition-all flex items-center gap-1.5 min-h-[38px] ${
                viewMode === 'redline' ? 'bg-indigo-600 text-white font-bold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5 shrink-0" />
              <span>Parsed Layout</span>
            </button>
            {pdfBase64 && (
              <button
                onClick={() => setViewMode('pdf')}
                className={`flex-1 sm:flex-initial justify-center px-3 py-2 sm:py-1.5 rounded-lg transition-all flex items-center gap-1.5 min-h-[38px] ${
                  viewMode === 'pdf' ? 'bg-indigo-600 text-white font-bold shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5 shrink-0" />
                <span>PDF Document</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Left Side Document View, Right Side Structure Score Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Document Preview Column (7 cols) */}
        <div className="lg:col-span-7 bg-slate-100 p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-inner">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-slate-700" />
              {fileName || 'Analyzed Resume Document'} (A4 Layout)
            </span>
            <span className="text-xs font-semibold text-slate-700 bg-slate-200 border border-slate-300 px-2.5 py-0.5 rounded-full">
              {parsability.wordCount} Words Analyzed
            </span>
          </div>

          {viewMode === 'redline' ? (
            /* Rendered A4 Document Page */
            <div className="bg-white rounded-xl shadow-md border border-slate-300 p-6 sm:p-8 min-h-[550px] font-sans text-xs text-slate-800 leading-relaxed space-y-2 select-text">
              
              {/* Document Header Flag if missing contact info */}
              {!parsability.contactInfoFound.linkedin && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 mb-4 flex items-center justify-between text-[11px] font-semibold">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>[HEADER SCORE NOTE] LinkedIn profile link not detected</span>
                  </div>
                  <span className="text-[10px] text-amber-800 font-bold bg-amber-200 px-2 py-0.5 rounded">Contact Flag</span>
                </div>
              )}

              {/* Render lines */}
              {redlinedLines.map((item, idx) => {
                // Header line
                if (item.isHeaderLine && idx === 0) {
                  return (
                    <div key={idx} className="border-b pb-2 mb-3">
                      <h1 className="text-base font-extrabold text-slate-900 uppercase tracking-tight">{item.text}</h1>
                    </div>
                  );
                }

                // Section Headers
                if (/^(EXPERIENCE|SUMMARY|EDUCATION|SKILLS|PROJECTS|WORK HISTORY)/i.test(item.text)) {
                  return (
                    <h2 key={idx} className="text-xs font-bold text-indigo-700 uppercase tracking-wider border-b border-slate-200 pt-3 pb-1 mt-3">
                      {item.text}
                    </h2>
                  );
                }

                // Bullet or normal text line
                return (
                  <p key={idx} className={`text-xs leading-relaxed px-1 ${item.isWeak ? 'text-slate-800 font-medium bg-amber-50/60 rounded px-1.5 py-0.5 my-0.5' : 'text-slate-700'}`}>
                    {item.text}
                  </p>
                );
              })}

            </div>
          ) : (
            /* Embedded Native PDF Viewer */
            <div className="bg-white rounded-xl shadow-md border border-slate-300 overflow-hidden h-[600px]">
              {pdfBase64 ? (
                <iframe
                  src={pdfBase64}
                  title="PDF Viewer"
                  className="w-full h-full border-none"
                />
              ) : (
                <div className="p-8 text-center text-slate-500">
                  No original PDF binary loaded.
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Column: Structure & Score Metrics Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">ATS Structure Breakdown</h3>
                <p className="text-xs text-slate-500">Sub-scores influencing final ATS ranking</p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              
              {/* Score Metric 1 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">1. Contact Info & Links</span>
                  <span className={parsability.contactInfoFound.email && parsability.contactInfoFound.phone ? 'text-emerald-600' : 'text-amber-600'}>
                    {parsability.contactInfoFound.email && parsability.contactInfoFound.phone ? 'Passed' : 'Incomplete'}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Detected Email ({parsability.contactInfoFound.email ? '✓' : '✗'}), Phone ({parsability.contactInfoFound.phone ? '✓' : '✗'}), LinkedIn ({parsability.contactInfoFound.linkedin ? '✓' : '✗'}).
                </p>
              </div>

              {/* Score Metric 2 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">2. Section Headers Parsed</span>
                  <span className="text-indigo-600">{parsability.extractedSections.length} Sections</span>
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {parsability.extractedSections.map((sec, i) => (
                    <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                      {sec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Score Metric 3 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">3. Keyword Match Coverage</span>
                  <span className="text-indigo-600">{keywordGap.matchPercentage}%</span>
                </div>
                <p className="text-xs text-slate-600">
                  {keywordGap.skillsMatched.length} skills matched target role requirements.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

