import React, { useState } from 'react';
import { Cpu, X, FileCode, Wrench, Database, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';
import { AnalysisResult } from '../types';

interface McpInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: AnalysisResult | null;
}

export const McpInspectorModal: React.FC<McpInspectorModalProps> = ({
  isOpen,
  onClose,
  analysis
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'resources' | 'tools' | 'prompts' | 'raw_json'>('tools');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Model Context Protocol (MCP) Primitive Architecture
              </h3>
              <p className="text-xs text-slate-400">Standardized AI context resources, tool calls, and prompt schemas</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MCP Primitive Selector Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/80 px-5 gap-4">
          <button
            onClick={() => setActiveSubTab('tools')}
            className={`py-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeSubTab === 'tools' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>MCP Tools (4 Actions)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('resources')}
            className={`py-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeSubTab === 'resources' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>MCP Resources (4 URIs)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('prompts')}
            className={`py-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeSubTab === 'prompts' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>System Prompts</span>
          </button>

          <button
            onClick={() => setActiveSubTab('raw_json')}
            className={`py-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeSubTab === 'raw_json' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Raw Response JSON</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs font-mono">
          
          {/* TOOLS TAB */}
          {activeSubTab === 'tools' && (
            <div className="space-y-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-indigo-400 font-bold mb-1">
                  <span>1. extract_text_and_layout</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-md">
                    Execution: 42ms
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Parses uploaded PDF/DOCX buffer and extracts structured hierarchy (section headers, contact block, bullet point boundaries).
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-indigo-400 font-bold mb-1">
                  <span>2. calculate_parsability_score</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-md">
                    Execution: 18ms
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Heuristic tool verifying standard section headers, accepted date formats, single-column font safety, and contact element presence.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-indigo-400 font-bold mb-1">
                  <span>3. analyze_impact_and_brevity</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-md">
                    Execution: 85ms
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  NLP engine scanning bullet points for metric quantification, passive voice detection, and generating active-verb metric-driven rewrites.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-indigo-400 font-bold mb-1">
                  <span>4. extract_keyword_gap</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-md">
                    Execution: 34ms
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Cross-references candidate CV text against Job Description resource to extract matched vs. missing hard skills, soft skills, and tools.
                </p>
              </div>
            </div>
          )}

          {/* RESOURCES TAB */}
          {activeSubTab === 'resources' && (
            <div className="space-y-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-amber-400 font-bold">file://user/resume.pdf</span>
                <p className="text-slate-400 mt-1">Raw candidate CV document buffer provided in memory.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-amber-400 font-bold">text://target_job_description</span>
                <p className="text-slate-400 mt-1">Target job posting text used for hard/soft skill keyword gap extraction.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-amber-400 font-bold">dataset://ats_rules</span>
                <p className="text-slate-400 mt-1">Enterprise ruleset dataset (Greenhouse, Workday, Lever standards).</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-amber-400 font-bold">dataset://action_verbs</span>
                <p className="text-slate-400 mt-1">Taxonomy of 450+ high-impact leadership action verbs vs. passive filler words.</p>
              </div>
            </div>
          )}

          {/* PROMPTS TAB */}
          {activeSubTab === 'prompts' && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 whitespace-pre-wrap leading-relaxed">
              {`SYSTEM INSTRUCTION:
You are an Enterprise Applicant Tracking System (ATS) engine (Greenhouse, Workday, Lever) and Executive Technical Recruiter.
Evaluate the candidate resume with structured JSON covering:
- overallScore (0-100)
- parsability check list (contact info, standard headers, formatting)
- impactAndBrevity (quantified metrics %, weak verbs, rewritten bullet suggestions)
- keywordGap (matched skills, missing skills with priority recommendations)
- recruiterInsights (strengths, red flags, top 3 priority fixes)`}
            </div>
          )}

          {/* RAW JSON TAB */}
          {activeSubTab === 'raw_json' && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-indigo-300 max-h-96 overflow-y-auto whitespace-pre-wrap text-[11px]">
              {analysis ? JSON.stringify(analysis, null, 2) : '// Run an ATS analysis to view raw JSON stream output'}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors"
          >
            Close MCP View
          </button>
        </div>

      </div>
    </div>
  );
};
