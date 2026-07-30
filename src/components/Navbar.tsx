import React from 'react';
import { Sparkles, Cpu, RefreshCw, ChevronDown, ShieldCheck } from 'lucide-react';
import { SAMPLE_RESUMES } from '../data/sampleResumes';

interface NavbarProps {
  onLoadSample: (sampleId: string) => void;
  onOpenMcpInspector: () => void;
  onOpenGuideModal: () => void;
  onReset: () => void;
  isAnalyzing: boolean;
  hasResult: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onLoadSample,
  onOpenMcpInspector,
  onOpenGuideModal,
  onReset,
  isAnalyzing,
  hasResult
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        
        {/* Professional Brand Logo & Badge */}
        <div 
          onClick={onOpenGuideModal}
          className="flex items-center gap-3 shrink-0 cursor-pointer group select-none"
          title="Click to view ATS Resume Pro features guide"
        >
          {/* Executive Shield & Geometric Emblem */}
          <div className="relative w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white shadow-sm overflow-hidden group-hover:border-indigo-500/80 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950 via-slate-900 to-indigo-900 opacity-90" />
            <ShieldCheck className="w-5 h-5 text-indigo-400 relative z-10 group-hover:scale-105 transition-transform" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-indigo-500 rounded-bl-md" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight font-sans">
                ATS <span className="text-indigo-600">RESUME PRO</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/90">
                ENTERPRISE
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 hidden sm:block -mt-0.5">
              Enterprise Resume Intelligence & Parsability Auditor
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          
          {/* Guide / Feature Modal Trigger */}
          <button
            onClick={onOpenGuideModal}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3.5 py-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all min-h-[38px]"
            title="View Application Features Guide"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Overview Guide</span>
          </button>

          {/* MCP Protocol Inspector Trigger */}
          <button
            onClick={onOpenMcpInspector}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all min-h-[38px]"
            title="Inspect Model Context Protocol (MCP) Architecture"
          >
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">MCP Spec</span>
          </button>

          {/* Quick Sample Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3.5 py-2 rounded-xl text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-2xs min-h-[38px]"
            >
              <span>Demo Resumes</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1 flex items-center justify-between">
                  <span>Industry Resume Demos ({SAMPLE_RESUMES.length})</span>
                  <span className="text-indigo-600 font-semibold">Select One</span>
                </div>
                
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {SAMPLE_RESUMES.map(sample => (
                    <button
                      key={sample.id}
                      onClick={() => {
                        onLoadSample(sample.id);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2.5 hover:bg-indigo-50/70 transition-colors flex flex-col gap-0.5 group/item text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 group-hover/item:text-indigo-700">
                          {sample.title}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 line-clamp-1">
                        {sample.subtitle}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* New Scan / Reset */}
          {hasResult && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3.5 py-2 rounded-xl text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs min-h-[38px]"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">New Resume</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
};

