import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroUploadZone } from './components/HeroUploadZone';
import { ScoreHeader } from './components/ScoreHeader';
import { FeedbackTabs } from './components/FeedbackTabs';
import { McpInspectorModal } from './components/McpInspectorModal';
import { WelcomeGuideModal } from './components/WelcomeGuideModal';
import { SAMPLE_RESUMES } from './data/sampleResumes';
import { AnalysisResult } from './types';
import { analyzeResumeClientSide } from './utils/atsEngine';
import { PREBUILT_THEMES } from './utils/themes';
import { AlertCircle, ShieldCheck, Edit3, Linkedin, Github, ExternalLink, Heart } from 'lucide-react';

export default function App() {
  const [resumeText, setResumeText] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isMcpOpen, setIsMcpOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(true); // Auto popup on launch
  const [currentThemeId] = useState<string>('indigo');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activeTheme = PREBUILT_THEMES.find(t => t.id === currentThemeId) || PREBUILT_THEMES[0];
  const wordCount = resumeText.split(/\s+/).filter(Boolean).length;

  // Load preset sample resume
  const handleLoadSample = (sampleId: string) => {
    const sample = SAMPLE_RESUMES.find(s => s.id === sampleId) || SAMPLE_RESUMES[0];
    setResumeText(sample.resumeText);
    setJobDescription(sample.jobDescription);
    setFileName(`${sample.title.replace(/\s+/g, '_')}_Resume.pdf`);
    setPdfBase64(null);
    setErrorMessage(null);
    setAnalysis(null);
  };

  // Run ATS Analysis via Client-Side Engine (Minimum Server Compute)
  const handleRunAnalysis = async () => {
    if (!resumeText || resumeText.trim().length < 20) {
      setErrorMessage('Please upload a PDF or enter resume text before running analysis.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);

    // Instant client-side execution with smooth 350ms tick to feel crisp
    setTimeout(() => {
      try {
        const result = analyzeResumeClientSide(
          resumeText,
          jobDescription,
          fileName ? fileName.replace(/_/g, ' ').replace(/\.pdf$/i, '') : undefined
        );
        setAnalysis(result);
      } catch (err: any) {
        console.error('Client ATS analysis error:', err);
        setErrorMessage('Could not analyze resume text. Please check input formatting.');
      } finally {
        setIsAnalyzing(false);
      }
    }, 350);
  };

  const handleReset = () => {
    setResumeText('');
    setJobDescription('');
    setFileName(null);
    setPdfBase64(null);
    setAnalysis(null);
    setErrorMessage(null);
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-200 selection:bg-indigo-500 selection:text-white ${activeTheme.bgClass}`}>
      
      {/* Navigation Header */}
      <Navbar
        onLoadSample={handleLoadSample}
        onOpenMcpInspector={() => setIsMcpOpen(true)}
        onOpenGuideModal={() => setIsGuideOpen(true)}
        onReset={handleReset}
        isAnalyzing={isAnalyzing}
        hasResult={!!analysis}
      />

      {/* Main Page Area */}
      <main className="flex-1">
        
        {/* Global Error Banner */}
        {errorMessage && (
          <div className="max-w-7xl mx-auto px-4 mt-4">
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center justify-between text-rose-800 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-rose-600 hover:underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Hero & Upload Zone (Visible if no result or if editing) */}
        {!analysis ? (
          <HeroUploadZone
            resumeText={resumeText}
            setResumeText={setResumeText}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            fileName={fileName}
            setFileName={setFileName}
            pdfBase64={pdfBase64}
            setPdfBase64={setPdfBase64}
            onRunAnalysis={handleRunAnalysis}
            isAnalyzing={isAnalyzing}
            onLoadSample={handleLoadSample}
            wordCount={wordCount}
          />
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Quick action bar to edit inputs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex items-center justify-between">
              <button
                onClick={() => setAnalysis(null)}
                className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 px-3.5 py-2 rounded-xl border border-indigo-200/80 transition-colors"
              >
                <Edit3 className="w-4 h-4 text-indigo-600" />
                <span>Edit Resume or Job Description</span>
              </button>
            </div>

            {/* Score Summary Header */}
            <ScoreHeader
              analysis={analysis}
              onReset={handleReset}
            />

            {/* Detailed Feedback Tabs */}
            <FeedbackTabs
              analysis={analysis}
              resumeText={resumeText}
              pdfBase64={pdfBase64}
              fileName={fileName}
            />
          </div>
        )}

      </main>

      {/* Model Context Protocol (MCP) Primitive Inspector Modal */}
      <McpInspectorModal
        isOpen={isMcpOpen}
        onClose={() => setIsMcpOpen(false)}
        analysis={analysis}
      />

      {/* Website Features Welcome Guide Modal */}
      <WelcomeGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Security Note */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Enterprise Encrypted ATS Analyzer • Instant Client-Side Privacy</span>
          </div>

          {/* Center Attribution: Created by Yashank Rao */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <span>Created by</span>
            <span className="text-indigo-600 font-extrabold text-sm">Yashank Rao</span>
          </div>

          {/* Right Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/yashank-rao-ben-61761533b/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-blue-200 transition-all shadow-2xs"
            >
              <Linkedin className="w-4 h-4 text-blue-600" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>

            <a
              href="https://github.com/Yashankrao06"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-2xs"
            >
              <Github className="w-4 h-4 text-slate-900" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}

