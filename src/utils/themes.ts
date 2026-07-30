export interface ThemeConfig {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  previewColors: string[];
  bgClass: string;
  cardBgClass: string;
  textPrimaryClass: string;
  accentClass: string;
  navbarBgClass: string;
}

export const PREBUILT_THEMES: ThemeConfig[] = [
  {
    id: 'indigo',
    name: 'Corporate Slate & Blue (Default)',
    subtitle: 'Refined corporate layout with slate neutrals, crisp borders, and cobalt blue',
    badge: 'Standard',
    previewColors: ['#1e293b', '#2563eb', '#3b82f6', '#f8fafc'],
    bgClass: 'bg-slate-50 text-slate-900',
    cardBgClass: 'bg-white border-slate-200/90 shadow-2xs',
    textPrimaryClass: 'text-blue-700',
    accentClass: 'from-slate-900 via-indigo-950 to-blue-900',
    navbarBgClass: 'bg-white/95 border-slate-200/80',
  },
  {
    id: 'executive_navy',
    name: 'Executive Midnight Navy',
    subtitle: 'High-density institutional theme with deep midnight headers and gold highlights',
    badge: 'Executive',
    previewColors: ['#0f172a', '#1e1b4b', '#d97706', '#f8fafc'],
    bgClass: 'bg-slate-100/70 text-slate-900',
    cardBgClass: 'bg-white border-slate-300/80 shadow-2xs',
    textPrimaryClass: 'text-indigo-900',
    accentClass: 'from-slate-950 via-slate-900 to-indigo-950',
    navbarBgClass: 'bg-slate-900 text-white border-slate-800',
  },
  {
    id: 'emerald',
    name: 'Enterprise Emerald & Mint',
    subtitle: 'Clean tech aesthetic with muted emerald green indicators and zinc structure',
    badge: 'Enterprise',
    previewColors: ['#064e3b', '#047857', '#10b981', '#f0fdf4'],
    bgClass: 'bg-zinc-50 text-zinc-900',
    cardBgClass: 'bg-white border-zinc-200/90 shadow-2xs',
    textPrimaryClass: 'text-emerald-700',
    accentClass: 'from-zinc-900 via-emerald-950 to-zinc-900',
    navbarBgClass: 'bg-white/95 border-zinc-200/80',
  },
  {
    id: 'monochrome',
    name: 'Monochrome Minimalist',
    subtitle: 'Ultra-clean Swiss minimalist design with high-contrast typography and razor borders',
    badge: 'Minimalist',
    previewColors: ['#09090b', '#27272a', '#71717a', '#ffffff'],
    bgClass: 'bg-zinc-50 text-zinc-950',
    cardBgClass: 'bg-white border-zinc-300 shadow-2xs',
    textPrimaryClass: 'text-zinc-900',
    accentClass: 'from-zinc-950 via-zinc-900 to-zinc-950',
    navbarBgClass: 'bg-white/95 border-zinc-300/80',
  },
  {
    id: 'obsidian',
    name: 'Obsidian Dark Console',
    subtitle: 'Professional low-glare dark environment tailored for long auditing sessions',
    badge: 'Dark Mode',
    previewColors: ['#090d16', '#1e293b', '#3b82f6', '#f8fafc'],
    bgClass: 'bg-slate-950 text-slate-100',
    cardBgClass: 'bg-slate-900 border-slate-800 shadow-2xs',
    textPrimaryClass: 'text-blue-400',
    accentClass: 'from-slate-900 via-indigo-950 to-slate-950',
    navbarBgClass: 'bg-slate-900/95 border-slate-800',
  }
];
