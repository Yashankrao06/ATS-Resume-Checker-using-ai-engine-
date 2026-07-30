import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ArrowRight,
  FileCheck,
  Briefcase,
  Layers,
  Zap,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { extractTextFromPdfFile } from '../utils/pdfParser';

interface HeroUploadZoneProps {
  resumeText: string;
  setResumeText: (text: string) => void;
  jobDescription: string;
  setJobDescription: (jd: string) => void;
  fileName: string | null;
  setFileName: (name: string | null) => void;
  pdfBase64: string | null;
  setPdfBase64: (base64: string | null) => void;
  onRunAnalysis: () => void;
  isAnalyzing: boolean;
  onLoadSample: (sampleId: string) => void;
  wordCount: number;
}

export const HeroUploadZone: React.FC<HeroUploadZoneProps> = ({
  resumeText,
  setResumeText,
  jobDescription,
  setJobDescription,
  fileName,
  setFileName,
  pdfBase64,
  setPdfBase64,
  onRunAnalysis,
  isAnalyzing,
  onLoadSample,
  wordCount
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'text'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [parsingPdf, setParsingPdf] = useState(false);
  const [showAllDemosMobile, setShowAllDemosMobile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle PDF file selection
  const processFile = async (file: File) => {
    setUploadError(null);
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setUploadError('Please upload a valid PDF document (.pdf)');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setUploadError('File size exceeds 15MB limit.');
      return;
    }

    setFileName(file.name);
    setParsingPdf(true);

    // Save base64 for preview / analysis if needed
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPdfBase64(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Extract text via client-side PDF.js with server fallback
      const extractedText = await extractTextFromPdfFile(file);
      if (extractedText && extractedText.trim().length > 10) {
        setResumeText(extractedText);
        setUploadError(null);
      } else {
        setUploadError('No readable text found in PDF. If this is a scanned image PDF, please paste your resume text manually.');
      }
    } catch (err: any) {
      console.error('PDF parsing error:', err);
      setUploadError(err.message || 'Could not parse text from PDF. Please copy and paste your resume text directly into the Text Editor tab.');
    } finally {
      setParsingPdf(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleClearFile = () => {
    setFileName(null);
    setPdfBase64(null);
    setResumeText('');
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Hero Headline & Subtitle */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold mb-3 sm:mb-4 shadow-2xs max-w-full">
          <Zap className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600 shrink-0" />
          <span className="truncate sm:whitespace-normal">Enterprise ATS Engine • Instant Parsability & Metric Analysis</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Grade & Optimize Your Resume for Enterprise ATS Systems
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Verify ATS section parsability, audit high-impact bullet points with quantitative benchmarks, and match core competencies against job description requirements.
        </p>

        {/* Preset Sample Quick Bar - Compact & Clean on Mobile */}
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider w-full sm:w-auto mb-1 sm:mb-0">
            Sample Industry Resumes:
          </span>
          
          {SAMPLE_RESUMES.map((sample, idx) => {
            // On mobile (<sm), only show first 2 unless expanded
            const isHiddenOnMobile = !showAllDemosMobile && idx >= 2;
            return (
              <button
                key={sample.id}
                onClick={() => onLoadSample(sample.id)}
                className={`items-center gap-1.5 text-xs font-semibold px-3 py-2 sm:py-1.5 rounded-xl bg-white border border-slate-200/90 text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:bg-slate-50 shadow-2xs transition-all active:scale-95 ${
                  isHiddenOnMobile ? 'hidden sm:inline-flex' : 'inline-flex'
                }`}
              >
                <FileCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{sample.title}</span>
              </button>
            );
          })}

          {/* Toggle button on mobile to view remaining demos */}
          {!showAllDemosMobile && (
            <button
              onClick={() => setShowAllDemosMobile(true)}
              className="sm:hidden inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200"
            >
              +{SAMPLE_RESUMES.length - 2} More Demos
            </button>
          )}
        </div>
      </div>

      {/* Main Dual Card Upload Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Left Side: Resume Upload / Text Area */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col h-full">
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">1</div>
              <h2 className="text-base font-bold text-slate-900">Resume Source</h2>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium text-slate-600">
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-3 py-1 rounded-lg transition-all ${activeTab === 'upload' ? 'bg-white text-indigo-700 font-bold shadow-2xs' : 'hover:text-slate-900'}`}
              >
                PDF Upload
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`px-3 py-1 rounded-lg transition-all ${activeTab === 'text' ? 'bg-white text-indigo-700 font-bold shadow-2xs' : 'hover:text-slate-900'}`}
              >
                Paste Text
              </button>
            </div>
          </div>

          {/* Upload Tab View */}
          {activeTab === 'upload' ? (
            <div className="flex-1 flex flex-col">
              {!fileName ? (
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center flex-1 min-h-[220px] ${
                    isDragging ? 'border-indigo-500 bg-indigo-50/50 scale-[0.99]' : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50/80'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    Click to upload or drag & drop your PDF resume
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    PDF files up to 15MB • In-memory client side processing
                  </p>
                </div>
              ) : (
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/80 flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        PDF
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 truncate max-w-[240px] sm:max-w-[320px]">
                          {fileName}
                        </p>
                        <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          {parsingPdf ? (
                            <span className="text-indigo-600 font-semibold animate-pulse">Extracting text...</span>
                          ) : (
                            <span className="text-emerald-700 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              {wordCount > 0 ? `${wordCount} words extracted` : 'Text parsed'}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleClearFile}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                      title="Remove PDF"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Extracted snippet preview */}
                  <div className="mt-4 bg-white border border-slate-200/80 rounded-xl p-3.5 text-xs text-slate-600 font-mono max-h-36 overflow-y-auto leading-relaxed">
                    {resumeText ? (
                      resumeText.slice(0, 450) + (resumeText.length > 450 ? '...' : '')
                    ) : (
                      <span className="italic text-slate-400">Extracting text preview...</span>
                    )}
                  </div>
                </div>
              )}

              {uploadError && (
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 p-2.5 rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your raw resume text here (Summary, Work Experience, Education, Skills)..."
                className="w-full h-56 p-3.5 text-xs font-mono border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none leading-relaxed resize-none bg-slate-50/50 text-slate-800"
              />
              <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                <span>Word count: <strong className="text-slate-800">{wordCount} words</strong></span>
                <span>Recommended: 250 - 900 words</span>
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Target Job Description */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col h-full">
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">2</div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Target Job Description</h2>
                <span className="text-xs text-slate-500">(Optional for Keyword Gap Analysis)</span>
              </div>
            </div>

            <Briefcase className="w-4 h-4 text-slate-400" />
          </div>

          <div className="flex-1 flex flex-col">
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the target Job Description (JD) here to perform hard & soft skill keyword gap matching..."
              className="w-full h-56 p-3.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none leading-relaxed resize-none bg-slate-50/50 text-slate-800"
            />
            
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {jobDescription ? (
                  <strong className="text-indigo-700">{jobDescription.split(/\s+/).filter(Boolean).length} words in JD attached</strong>
                ) : (
                  'No JD attached — standard domain ATS keywords applied'
                )}
              </span>

              {jobDescription && (
                <button
                  onClick={() => setJobDescription('')}
                  className="text-xs font-semibold text-rose-600 hover:underline"
                >
                  Clear Job Description
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Submit / Run Analysis CTA Bar */}
      <div className="mt-8 flex flex-col items-center justify-center">
        <button
          onClick={onRunAnalysis}
          disabled={isAnalyzing || !resumeText || resumeText.trim().length < 20}
          className={`w-full sm:w-auto min-w-[300px] px-8 py-4 rounded-xl font-bold text-base text-white shadow-lg transition-all flex items-center justify-center gap-3 ${
            isAnalyzing || !resumeText || resumeText.trim().length < 20
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-slate-900 hover:from-indigo-700 hover:to-slate-950 shadow-indigo-600/25 hover:shadow-indigo-600/35 hover:-translate-y-0.5 active:translate-y-0'
          }`}
        >
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing Resume Layout & Keywords...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-indigo-200" />
              <span>Run ATS Resume Analysis</span>
              <ArrowRight className="w-5 h-5 opacity-80" />
            </>
          )}
        </button>

        {!resumeText && (
          <p className="text-xs text-slate-500 mt-2.5">
            Upload a PDF resume or select a sample resume above to grade instantly
          </p>
        )}
      </div>

    </div>
  );
};
