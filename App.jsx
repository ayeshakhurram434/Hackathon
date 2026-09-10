import { useState, useMemo, useRef } from 'react';
import {
  CalendarDays, BookOpen, Compass, TrendingUp, Settings2,
  Sun, Moon, Languages, Plus, Check, ChevronRight, Sparkles, Target,
  GraduationCap, Circle, CheckCircle2, X, Camera, Trash2, ExternalLink,
} from 'lucide-react';
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from 'recharts';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap');

:root {
  --background: 39 39% 95%; --foreground: 219 31% 16%; --border: 38 24% 85%;
  --card: 42 45% 98%; --card-foreground: 219 31% 16%;
  --sidebar: 218 35% 16%; --sidebar-foreground: 40 43% 96%; --sidebar-border: 218 27% 24%;
  --sidebar-primary: 38 95% 63%; --sidebar-primary-foreground: 218 35% 16%;
  --sidebar-accent: 218 28% 23%; --sidebar-accent-foreground: 40 43% 96%;
  --primary: 218 35% 16%; --primary-foreground: 40 43% 96%;
  --secondary: 39 27% 91%; --secondary-foreground: 219 31% 16%;
  --muted: 39 27% 91%; --muted-foreground: 218 12% 45%;
  --accent: 38 95% 63%; --accent-foreground: 218 35% 16%;
  --destructive: 4 67% 52%; --destructive-foreground: 40 43% 96%;
  --input: 38 23% 79%; --ring: 38 95% 63%; --teal: 161 33% 42%;
  --app-font-sans: 'Manrope', sans-serif; --app-font-mono: 'DM Mono', monospace;
}
.dark {
  --background: 218 35% 10%; --foreground: 40 43% 96%; --border: 218 27% 24%;
  --card: 218 31% 14%; --card-foreground: 40 43% 96%;
  --sidebar: 218 39% 8%; --sidebar-foreground: 40 43% 96%; --sidebar-border: 218 27% 18%;
  --sidebar-primary: 38 95% 63%; --sidebar-primary-foreground: 218 35% 16%;
  --sidebar-accent: 218 28% 17%; --sidebar-accent-foreground: 40 43% 96%;
  --primary: 38 95% 63%; --primary-foreground: 218 35% 16%;
  --secondary: 218 28% 17%; --secondary-foreground: 40 43% 96%;
  --muted: 218 28% 17%; --muted-foreground: 40 20% 70%;
  --accent: 38 95% 63%; --accent-foreground: 218 35% 16%;
  --input: 218 27% 32%; --teal: 161 33% 52%;
}
* { box-sizing: border-box; }
.demo-root { margin: 0; min-height: 100%; font-family: var(--app-font-sans); background: hsl(var(--background)); color: hsl(var(--foreground)); -webkit-font-smoothing: antialiased; transition: background .2s, color .2s; }
button, input, select { font: inherit; }
button { -webkit-tap-highlight-color: transparent; cursor: pointer; }
.app-shell { min-height: 100dvh; position: relative; }
.sidebar { position: fixed; inset: 0 auto 0 0; z-index: 30; width: 248px; display: none; flex-direction: column; background: hsl(var(--sidebar)); color: hsl(var(--sidebar-foreground)); padding: 22px 20px; }
@media (min-width: 768px) { .sidebar { display: flex; } }
.sidebar-user { display: flex; align-items: center; gap: 12px; margin-bottom: 26px; }
.avatar-btn { position: relative; height: 46px; width: 46px; flex: 0 0 46px; border-radius: 999px; border: 2px solid hsl(var(--sidebar-primary) / .5); background: hsl(var(--sidebar-accent)); color: hsl(var(--sidebar-foreground)); display: grid; place-items: center; overflow: hidden; font-weight: 800; padding: 0; }
.avatar-btn img { height: 100%; width: 100%; object-fit: cover; }
.avatar-btn .cam { position: absolute; right: -2px; bottom: -2px; height: 18px; width: 18px; border-radius: 999px; background: hsl(var(--sidebar-primary)); color: hsl(var(--sidebar-primary-foreground)); display: grid; place-items: center; border: 2px solid hsl(var(--sidebar)); }
.sidebar-user-name { font-size: 13px; font-weight: 800; }
.sidebar-user-sub { font-size: 10.5px; color: hsl(var(--sidebar-foreground) / .5); margin-top: 1px; }
.brand { display: flex; align-items: center; gap: 12px; margin-bottom: 26px; }
.brand-mark { display: grid; place-items: center; height: 36px; width: 36px; border-radius: 12px; background: hsl(var(--sidebar-primary)); color: hsl(var(--sidebar-primary-foreground)); font-weight: 800; font-size: 13px; }
.brand-name { font-family: 'Space Grotesk', sans-serif; font-size: 17px; font-weight: 700; letter-spacing: -.03em; }
.nav-main { display: flex; flex-direction: column; gap: 6px; }
.nav-item { display: flex; width: 100%; align-items: center; gap: 12px; border: 0; border-radius: 12px; padding: 12px; color: hsl(var(--sidebar-foreground) / .6); background: transparent; font-size: 13px; font-weight: 700; text-align: left; transition: background .18s, color .18s; }
.nav-item:hover { background: hsl(var(--sidebar-accent) / .75); color: hsl(var(--sidebar-foreground)); }
.nav-item.active { background: hsl(var(--sidebar-accent)); color: hsl(var(--sidebar-primary)); }
.sidebar-bottom { margin-top: auto; display: flex; flex-direction: column; gap: 10px; }
.topbar { position: sticky; top: 0; z-index: 20; display: flex; height: 64px; align-items: center; justify-content: space-between; border-bottom: 1px solid hsl(var(--border) / .8); background: hsl(var(--background) / .92); padding: 0 16px; backdrop-filter: blur(8px); }
@media (min-width: 768px) { .topbar { margin-left: 248px; padding: 0 36px; } }
.topbar-brand { display: flex; align-items: center; gap: 10px; font-family: 'Space Grotesk', sans-serif; font-weight: 700; }
@media (min-width: 768px) { .topbar-brand { display: none; } }
.topbar-right { display: flex; align-items: center; gap: 8px; margin-left: auto; }
@media (min-width: 768px) { .topbar-right .avatar-btn { display: none; } }
.icon-btn { height: 34px; width: 34px; display: inline-flex; align-items: center; justify-content: center; border-radius: 12px; border: 1px solid hsl(var(--border)); background: hsl(var(--card)); color: hsl(var(--muted-foreground)); padding: 0; transition: transform .15s, color .15s; }
.icon-btn:hover { color: hsl(var(--foreground)); transform: translateY(-1px); }
.main-content { position: relative; min-height: calc(100dvh - 64px); padding: 24px 16px 96px; }
@media (min-width: 768px) { .main-content { margin-left: 248px; padding: 32px 32px 48px; } }
.content-inner { max-width: 1180px; margin: 0 auto; }
.bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; z-index: 30; display: flex; border-top: 1px solid hsl(var(--border)); background: hsl(var(--card) / .97); padding: 6px; backdrop-filter: blur(8px); }
@media (min-width: 768px) { .bottom-nav { display: none; } }
.bottom-nav .nav-item { flex: 1; flex-direction: column; gap: 3px; align-items: center; padding: 7px 2px; color: hsl(var(--muted-foreground)); font-size: 10px; }
.bottom-nav .nav-item.active { color: hsl(var(--foreground)); background: transparent; }
.surface { border: 1px solid hsl(var(--border)); border-radius: 16px; background: hsl(var(--card) / .9); box-shadow: 0 12px 35px hsl(218 35% 16% / .06); }
.card-pad { padding: 20px; }
.page-heading { display: flex; flex-direction: column; gap: 14px; justify-content: space-between; margin-bottom: 24px; }
@media (min-width: 640px) { .page-heading { flex-direction: row; align-items: flex-end; } }
.eyebrow { margin: 0 0 6px; color: hsl(var(--muted-foreground)); font-family: var(--app-font-mono); font-size: 10px; letter-spacing: .18em; text-transform: uppercase; }
.page-title { margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 32px; font-weight: 700; letter-spacing: -.04em; line-height: 1; }
@media (min-width: 768px) { .page-title { font-size: 40px; } }
.page-detail { max-width: 520px; margin-top: 6px; color: hsl(var(--muted-foreground)); font-size: 13px; line-height: 1.5; }
.btn-primary, .btn-outline, .btn-ghost { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 12px; font-size: 12px; font-weight: 800; transition: transform .15s, background .15s; border: 0; }
.btn-primary { background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); padding: 11px 16px; }
.btn-outline { border: 1px solid hsl(var(--border)); background: hsl(var(--card)); color: hsl(var(--foreground)); padding: 11px 16px; }
.btn-sm { padding: 7px 11px; font-size: 11px; }
.btn-primary:hover, .btn-outline:hover { transform: translateY(-1px); }
.grid-layout { display: grid; gap: 16px; }
.two-col { grid-template-columns: 1.2fr .8fr; }
.three-col { grid-template-columns: repeat(3, 1fr); }
@media (max-width: 900px) { .two-col, .three-col { grid-template-columns: 1fr; } }
.chip { display: inline-flex; align-items: center; gap: 6px; border: 1px solid hsl(var(--border)); border-radius: 10px; background: hsl(var(--card)); padding: 8px 12px; color: hsl(var(--foreground)); font-size: 12px; transition: background .15s, border-color .15s; }
.chip:hover { border-color: hsl(var(--primary) / .5); }
.chip.selected { border-color: hsl(var(--primary)); background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); }
.badge { display: inline-flex; align-items: center; border-radius: 999px; padding: 4px 10px; font-size: 10px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; }
.badge-teal { background: hsl(var(--teal) / .15); color: hsl(var(--teal)); }
.badge-saffron { background: hsl(var(--accent) / .22); color: hsl(38 70% 35%); }
.stat-number { font-family: 'Space Grotesk', sans-serif; font-size: 30px; font-weight: 700; letter-spacing: -.04em; }
.muted { color: hsl(var(--muted-foreground)); }
.section-title { margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 16px; letter-spacing: -.02em; }
.section-link { font-size: 11px; font-weight: 800; color: hsl(var(--primary)); display: inline-flex; align-items: center; gap: 2px; border: 0; background: transparent; padding: 0; }
.list-row { display: flex; align-items: center; gap: 12px; border-bottom: 1px solid hsl(var(--border) / .7); padding: 12px 0; }
.list-row:last-child { border-bottom: 0; padding-bottom: 0; }
.list-row:first-child { padding-top: 0; }
.row-icon { display: grid; place-items: center; height: 32px; width: 32px; flex: 0 0 32px; border-radius: 10px; }
.row-main { min-width: 0; flex: 1; }
.row-main strong { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12.5px; }
.row-main span { display: block; margin-top: 2px; color: hsl(var(--muted-foreground)); font-size: 11px; }
.row-del { border: 0; background: transparent; color: hsl(var(--muted-foreground)); padding: 4px; border-radius: 8px; flex: 0 0 auto; }
.row-del:hover { color: hsl(var(--destructive)); background: hsl(var(--destructive) / .1); }
.field { width: 100%; border: 1px solid hsl(var(--input)); border-radius: 11px; outline: none; background: hsl(var(--background) / .55); color: hsl(var(--foreground)); padding: 10px 12px; font-size: 12px; }
.field:focus { border-color: hsl(var(--primary)); }
.field-label { display: block; margin-bottom: 6px; font-size: 11px; font-weight: 800; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
@media (max-width: 480px) { .form-grid { grid-template-columns: 1fr; } }

.hero-v2 { position: relative; overflow: hidden; border-radius: 22px; background: linear-gradient(135deg, hsl(218 45% 12%), hsl(218 40% 18%) 55%, hsl(230 45% 22%)); color: hsl(40 43% 96%); padding: 28px 24px; display: grid; gap: 22px; }
@media (min-width: 900px) { .hero-v2 { grid-template-columns: 1.3fr .7fr; align-items: center; padding: 36px; } }
.hero-v2:before { content: ''; position: absolute; right: -60px; top: -80px; height: 260px; width: 260px; border-radius: 999px; background: radial-gradient(circle, hsl(var(--accent) / .35), transparent 70%); }
.hero-v2:after { content: ''; position: absolute; left: 20%; bottom: -120px; height: 220px; width: 220px; border-radius: 999px; background: radial-gradient(circle, hsl(161 60% 55% / .25), transparent 70%); }
.hero-v2 > * { position: relative; z-index: 1; }
.hero-hi { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: hsl(40 43% 96% / .75); margin: 0 0 10px; }
.hero-h1 { margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: clamp(26px, 4.2vw, 40px); line-height: 1.08; letter-spacing: -.03em; }
.hero-h1 .accent-grad { background: linear-gradient(90deg, hsl(var(--accent)), hsl(161 60% 60%)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.hero-sub { max-width: 460px; margin: 12px 0 0; font-size: 13px; line-height: 1.6; color: hsl(40 43% 96% / .68); }
.pill-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
.pill { display: inline-flex; align-items: center; gap: 6px; border: 1px solid hsl(40 43% 96% / .16); background: hsl(40 43% 96% / .07); border-radius: 999px; padding: 7px 12px; font-size: 11px; font-weight: 700; }
.hero-cta { margin-top: 20px; background: hsl(var(--accent)); color: hsl(218 35% 14%); border: 0; }
.hero-side-card { background: hsl(40 43% 96% / .08); border: 1px solid hsl(40 43% 96% / .16); border-radius: 18px; padding: 18px; backdrop-filter: blur(6px); }
.hero-side-title { font-size: 11px; color: hsl(40 43% 96% / .65); margin: 0 0 12px; display: flex; justify-content: space-between; align-items: center; }
.ring-wrap { display: flex; align-items: center; gap: 14px; }
.progress-ring { position: relative; height: 78px; width: 78px; border-radius: 999px; flex: 0 0 78px; display: grid; place-items: center; }
.progress-ring-inner { position: absolute; inset: 7px; border-radius: 999px; background: hsl(218 42% 14%); display: grid; place-items: center; flex-direction: column; }
.progress-ring-inner b { font-family: 'Space Grotesk', sans-serif; font-size: 17px; }
.hero-mini-stats { display: flex; gap: 14px; margin-top: 14px; padding-top: 14px; border-top: 1px solid hsl(40 43% 96% / .14); }
.hero-mini-stat { flex: 1; }
.hero-mini-stat b { display: block; font-family: 'Space Grotesk', sans-serif; font-size: 16px; }
.hero-mini-stat span { font-size: 10px; color: hsl(40 43% 96% / .6); }

.dot { height: 8px; width: 8px; border-radius: 999px; flex: 0 0 8px; }
.legend-row { display: flex; align-items: center; gap: 8px; font-size: 11px; margin-top: 8px; }
.legend-row b { margin-left: auto; }
.course-bar-row + .course-bar-row { margin-top: 14px; }
.course-bar-track { height: 6px; border-radius: 999px; background: hsl(var(--muted)); margin-top: 6px; overflow: hidden; }
.course-bar-fill { height: 100%; border-radius: inherit; }
.gauge-wrap { display: flex; flex-direction: column; align-items: center; text-align: center; padding-top: 6px; }
.gauge-ring { position: relative; height: 110px; width: 110px; border-radius: 999px; display: grid; place-items: center; }
.gauge-ring-inner { position: absolute; inset: 9px; border-radius: 999px; background: hsl(var(--card)); display: grid; place-items: center; }
.gauge-ring-inner b { font-family: 'Space Grotesk', sans-serif; font-size: 20px; }
.todo-row { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid hsl(var(--border) / .6); font-size: 12.5px; }
.todo-row:last-child { border-bottom: 0; }
.todo-row.done span { text-decoration: line-through; color: hsl(var(--muted-foreground)); }
.footer-stats { display: flex; flex-wrap: wrap; gap: 20px; justify-content: space-around; text-align: center; border-radius: 18px; background: hsl(var(--card)); border: 1px solid hsl(var(--border)); padding: 22px; margin-top: 16px; }
.footer-stats b { display: block; font-family: 'Space Grotesk', sans-serif; font-size: 22px; }
.footer-stats span { font-size: 11px; color: hsl(var(--muted-foreground)); }

.modal-overlay { position: fixed; inset: 0; z-index: 50; display: flex; align-items: flex-start; justify-content: center; overflow-y: auto; background: hsl(218 35% 10% / .55); padding: 24px 16px; backdrop-filter: blur(2px); }
.modal-card { width: 100%; max-width: 440px; margin-top: 40px; border: 1px solid hsl(var(--border)); border-radius: 16px; background: hsl(var(--card)); padding: 22px; box-shadow: 0 24px 58px hsl(218 35% 16% / .25); }
.modal-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.uni-card { border: 1px solid hsl(var(--border)); border-radius: 14px; padding: 14px; }
.uni-card + .uni-card { margin-top: 10px; }
`;

const navConfig = [
  { key: 'home', label: { en: 'Overview', ur: 'جائزہ' }, icon: CalendarDays },
  { key: 'study', label: { en: 'Study room', ur: 'مطالعہ' }, icon: BookOpen },
  { key: 'career', label: { en: 'Career path', ur: 'کیریئر' }, icon: Compass },
  { key: 'progress', label: { en: 'Progress', ur: 'پیش رفت' }, icon: TrendingUp },
  { key: 'settings', label: { en: 'Settings', ur: 'ترتیبات' }, icon: Settings2 },
];

const initialCourses = [
  { id: 'c1', code: 'CS201', name: 'Data Structures', subject: 'Computer Science', topics: ['Binary trees', 'Recursion', 'Hash maps'], progress: 72, color: 'hsl(var(--accent))' },
  { id: 'c2', code: 'PHY102', name: 'Mechanics', subject: 'Physics', topics: ["Newton's laws", 'Circular motion'], progress: 45, color: 'hsl(var(--teal))' },
  { id: 'c3', code: 'ECO101', name: 'Principles of Economics', subject: 'Economics', topics: ['Opportunity cost', 'Market equilibrium'], progress: 88, color: 'hsl(4 67% 58%)' },
];
const courseColors = ['hsl(var(--accent))', 'hsl(var(--teal))', 'hsl(4 67% 58%)', 'hsl(219 50% 55%)'];

const interestOptions = ['Technology & building', 'Medicine & health', 'Numbers & analysis', 'Business & entrepreneurship', 'Writing & communication', 'Design & creativity'];
const cityOptions = ['Lahore', 'Islamabad', 'Rawalpindi', 'Karachi', 'Peshawar', 'Multan', 'Faisalabad', 'Any city'];
const budgetOptions = ['Under 100,000 PKR/yr', '100,000 – 300,000 PKR/yr', '300,000 – 600,000 PKR/yr', '600,000+ PKR/yr'];
const budgetCeilings = [100000, 300000, 600000, Infinity];

const pathwayData = [
  { id: 'computing', title: 'Computing & software', tags: ['Technology & building', 'Numbers & analysis'], description: 'A practical route for learners who enjoy logic, systems, and building useful digital things.', programs: ['Computer Science', 'Software Engineering', 'Data Science'] },
  { id: 'health', title: 'Health & allied sciences', tags: ['Medicine & health'], description: 'For learners curious about biology, care, and evidence-led health work.', programs: ['Allied Health Sciences', 'Nursing', 'Pharmacy'] },
  { id: 'business', title: 'Business & finance', tags: ['Business & entrepreneurship', 'Numbers & analysis'], description: 'A practical direction into accounting, finance, operations, and entrepreneurship.', programs: ['Business', 'Commerce', 'Accounting & Finance'] },
];

const institutions = [
  { name: 'University of the Punjab', city: 'Lahore', sector: 'Public', programs: ['Social Sciences', 'Computer Science', 'Commerce'], fee: 120000 },
  { name: 'UET Lahore', city: 'Lahore', sector: 'Public', programs: ['Engineering', 'Computer Science', 'Data Science'], fee: 180000 },
  { name: 'COMSATS University Islamabad', city: 'Islamabad', sector: 'Public', programs: ['Computer Science', 'Software Engineering', 'Business'], fee: 260000 },
  { name: 'Quaid-i-Azam University', city: 'Islamabad', sector: 'Public', programs: ['Social Sciences', 'Computer Science'], fee: 140000 },
  { name: 'NED University', city: 'Karachi', sector: 'Public', programs: ['Engineering', 'Computer Science', 'Architecture'], fee: 160000 },
  { name: 'Virtual University of Pakistan', city: 'Any city', sector: 'Public (online)', programs: ['Computer Science', 'Business', 'Commerce'], fee: 90000 },
  { name: 'LUMS', city: 'Lahore', sector: 'Private', programs: ['Business', 'Computer Science', 'Social Sciences'], fee: 900000 },
  { name: 'University of Health Sciences, Lahore', city: 'Lahore', sector: 'Public (health)', programs: ['Allied Health Sciences', 'Nursing', 'Pharmacy'] , fee: 150000 },
];

const weeklyData = [
  { day: 'Mon', done: 2, hours: 4 }, { day: 'Tue', done: 1, hours: 3 }, { day: 'Wed', done: 3, hours: 6 },
  { day: 'Thu', done: 0, hours: 1 }, { day: 'Fri', done: 2, hours: 5 }, { day: 'Sat', done: 1, hours: 2 }, { day: 'Sun', done: 0, hours: 1 },
];
const totalWeeklyHours = weeklyData.reduce((sum, d) => sum + d.hours, 0);

const analyticsData = [
  { name: 'Completed', value: 12, color: 'hsl(var(--teal))' },
  { name: 'In Progress', value: 5, color: 'hsl(var(--accent))' },
  { name: 'Not Started', value: 3, color: 'hsl(var(--border))' },
];

const initialTimetable = [
  { id: 't1', title: 'Web Development (HTML, CSS, JS)', time: '08:00 AM', color: 'hsl(var(--accent))', icon: BookOpen },
  { id: 't2', title: 'Study Session — DSA Practice', time: '11:00 AM', color: 'hsl(var(--teal))', icon: Sparkles },
  { id: 't3', title: 'Career Counselling', time: '02:00 PM', color: 'hsl(4 67% 58%)', icon: Compass },
];

const featurePills = [
  { icon: Target, label: { en: 'Personalized Study Plans', ur: 'ذاتی منصوبے' } },
  { icon: Sparkles, label: { en: 'Smart Quizzes', ur: 'اسمارٹ کوئز' } },
  { icon: Compass, label: { en: 'Career Counselling', ur: 'کیریئر مشاورت' } },
  { icon: TrendingUp, label: { en: 'Progress Tracking', ur: 'پیش رفت' } },
];

const initialTodos = [
  { id: 'd1', label: 'Complete Web Development Quiz', done: true },
  { id: 'd2', label: 'Read WordPress Module 2', done: true },
  { id: 'd3', label: 'Add Notes to Database', done: false },
];

function t(lang, en, ur) { return lang === 'ur' ? ur : en; }

function ProgressRing({ percent, size = 78, label, sub }) {
  return (
    <div className="progress-ring" style={{ height: size, width: size, flexBasis: size, background: `conic-gradient(hsl(var(--accent)) ${percent * 3.6}deg, hsl(40 43% 96% / .15) 0deg)` }}>
      <div className="progress-ring-inner">
        <b>{label ?? `${percent}%`}</b>
        {sub && <span style={{ fontSize: 8, opacity: .7 }}>{sub}</span>}
      </div>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <p className="section-title">{title}</p>
          <button className="icon-btn" onClick={onClose}><X size={15} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  const [name, setName] = useState('Ayesha');
  const [avatar, setAvatar] = useState(null);
  const fileRef = useRef(null);

  const [timetable, setTimetable] = useState(initialTimetable);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('');

  const [courseCatalog, setCourseCatalog] = useState(initialCourses);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseSubject, setNewCourseSubject] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('c1');
  const [selectedTopic, setSelectedTopic] = useState('Binary trees');

  const [interests, setInterests] = useState([]);
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [uniModal, setUniModal] = useState(null);

  const [todos, setTodos] = useState(initialTodos);

  const selectedCourse = useMemo(() => courseCatalog.find((c) => c.id === selectedCourseId), [courseCatalog, selectedCourseId]);
  const prompt = selectedTopic
    ? `If you had to teach "${selectedTopic}" to a friend without looking at notes, what would you say first — and what example would prove it?`
    : 'Choose a course and topic. The room will give you a question, not a lecture.';

  const matchedPathways = useMemo(() => {
    if (interests.length === 0) return [];
    return pathwayData
      .map((p) => ({ ...p, score: p.tags.filter((tag) => interests.includes(tag)).length }))
      .filter((p) => p.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [interests]);

  const matchedInstitutions = useMemo(() => {
    if (!budget && !location) return [];
    const ceiling = budget ? budgetCeilings[budgetOptions.indexOf(budget)] : Infinity;
    const wantedPrograms = new Set((matchedPathways.length ? matchedPathways : pathwayData).flatMap((p) => p.programs));
    return institutions.filter((u) => {
      const cityOk = !location || location === 'Any city' || u.city === location || u.city === 'Any city';
      const budgetOk = !budget || u.fee <= ceiling;
      const programOk = u.programs.some((p) => wantedPrograms.has(p));
      return cityOk && budgetOk && programOk;
    });
  }, [budget, location, matchedPathways]);

  const toggleInterest = (opt) => setInterests((cur) => cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt]);
  const toggleTodo = (id) => setTodos((cur) => cur.map((td) => td.id === id ? { ...td, done: !td.done } : td));
  const doneCount = todos.filter((td) => td.done).length;

  const addSchedule = () => {
    if (!newTitle.trim()) return;
    setTimetable((cur) => [...cur, {
      id: `t-${Date.now()}`, title: newTitle.trim(), time: newTime.trim() || 'No time set',
      color: courseColors[cur.length % courseColors.length], icon: BookOpen,
    }]);
    setNewTitle(''); setNewTime(''); setScheduleModalOpen(false);
  };
  const removeSchedule = (id) => setTimetable((cur) => cur.filter((s) => s.id !== id));

  const addCourse = () => {
    if (!newCourseName.trim()) return;
    const id = `c-${Date.now()}`;
    setCourseCatalog((cur) => [...cur, {
      id, code: 'NEW', name: newCourseName.trim(), subject: newCourseSubject.trim() || 'General',
      topics: ['Getting started'], progress: 0, color: courseColors[cur.length % courseColors.length],
    }]);
    setSelectedCourseId(id); setSelectedTopic('Getting started');
    setNewCourseName(''); setNewCourseSubject(''); setCourseModalOpen(false);
  };

  const onAvatarPick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const Avatar = ({ size = 46 }) => (
    <button className="avatar-btn" style={{ height: size, width: size, flexBasis: size }} onClick={() => fileRef.current?.click()} title={t(language, 'Change avatar', 'تصویر تبدیل کریں')}>
      {avatar ? <img src={avatar} alt="avatar" /> : (name.trim() ? name.trim()[0].toUpperCase() : 'G')}
      <span className="cam"><Camera size={10} /></span>
    </button>
  );

  const NavList = ({ vertical = true }) => navConfig.map((item) => {
    const Icon = item.icon;
    const active = page === item.key;
    return (
      <button key={item.key} className={`nav-item${active ? ' active' : ''}`} onClick={() => setPage(item.key)}>
        <Icon size={vertical ? 18 : 20} />
        <span>{item.label[language]}</span>
      </button>
    );
  });

  return (
    <div className={`demo-root${theme === 'dark' ? ' dark' : ''}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
      <style>{CSS}</style>
      <input type="file" accept="image/*" ref={fileRef} style={{ display: 'none' }} onChange={onAvatarPick} />
      <div className="app-shell">
        <aside className="sidebar">
          <div className="sidebar-user">
            <Avatar />
            <div>
              <div className="sidebar-user-name">{name || 'Guest'}</div>
              <div className="sidebar-user-sub">{t(language, 'Tap photo to change', 'تبدیل کرنے کے لیے تھپتھپائیں')}</div>
            </div>
          </div>
          <div className="brand">
            <div className="brand-mark">AI</div>
            <div className="brand-name">Study Tool</div>
          </div>
          <nav className="nav-main"><NavList /></nav>
          <div className="sidebar-bottom">
            <button className="nav-item" onClick={() => setLanguage((l) => l === 'en' ? 'ur' : 'en')}>
              <Languages size={18} /><span>{language === 'en' ? 'اردو' : 'English'}</span>
            </button>
            <button className="nav-item" onClick={() => setTheme((th) => th === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              <span>{t(language, theme === 'dark' ? 'Light mode' : 'Dark mode', theme === 'dark' ? 'لائٹ موڈ' : 'ڈارک موڈ')}</span>
            </button>
          </div>
        </aside>

        <header className="topbar">
          <div className="topbar-brand">
            <Avatar size={30} />
            Study Tool
          </div>
          <div className="topbar-right">
            <button className="icon-btn" onClick={() => setLanguage((l) => l === 'en' ? 'ur' : 'en')} title="Language"><Languages size={16} /></button>
            <button className="icon-btn" onClick={() => setTheme((th) => th === 'dark' ? 'light' : 'dark')} title="Theme">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        <main className="main-content">
          <div className="content-inner">

            {page === 'home' && (
              <>
                <div className="hero-v2">
                  <div>
                    <p className="hero-hi">👋 {t(language, `Hello ${name}`, `ہیلو ${name}`)}</p>
                    <h1 className="hero-h1">
                      {t(language, 'Your Future Starts with', 'آپ کا مستقبل شروع ہوتا ہے')}<br />
                      <span className="accent-grad">{t(language, 'Smart Learning', 'اسمارٹ لرننگ')}</span>
                    </h1>
                    <p className="hero-sub">{t(language, 'AI Study Tool helps you study, plan, and achieve your goals — with the power of AI.', 'AI اسٹڈی ٹول آپ کی مدد کرتا ہے۔')}</p>
                    <div className="pill-row">
                      {featurePills.map((p) => {
                        const Icon = p.icon;
                        return <span className="pill" key={p.label.en}><Icon size={13} />{p.label[language]}</span>;
                      })}
                    </div>
                    <button className="btn-primary hero-cta" onClick={() => setPage('study')}>{t(language, 'Start Studying', 'پڑھائی شروع کریں')} <ChevronRight size={14} /></button>
                  </div>
                  <div className="hero-side-card">
                    <p className="hero-side-title"><span>{t(language, 'Overall Progress', 'مجموعی پیش رفت')}</span></p>
                    <div className="ring-wrap">
                      <ProgressRing percent={68} label="68%" sub={t(language, 'On Track', 'ٹریک پر')} />
                      <div>
                        <b style={{ display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontSize: 15 }}>{t(language, 'On Track', 'ٹریک پر')}</b>
                        <span style={{ fontSize: 11, color: 'hsl(40 43% 96% / .6)' }}>{courseCatalog.length} {t(language, 'active courses', 'فعال کورسز')}</span>
                      </div>
                    </div>
                    <div className="hero-mini-stats">
                      <div className="hero-mini-stat"><b>{courseCatalog.length}</b><span>{t(language, 'Courses', 'کورسز')}</span></div>
                      <div className="hero-mini-stat"><b>92%</b><span>{t(language, 'Quiz Score', 'کوئز اسکور')}</span></div>
                      <div className="hero-mini-stat"><b>7</b><span>{t(language, 'Day Streak', 'دن کا سلسلہ')}</span></div>
                    </div>
                  </div>
                </div>

                <div className="grid-layout three-col" style={{ marginTop: 18 }}>
                  <div className="surface card-pad">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p className="section-title">{t(language, 'My Schedule', 'میرا شیڈول')}</p>
                      <button className="section-link" onClick={() => setScheduleModalOpen(true)}><Plus size={13} />{t(language, 'Add', 'شامل کریں')}</button>
                    </div>
                    <div style={{ marginTop: 10 }}>
                      {timetable.length === 0 && <p className="muted" style={{ fontSize: 12 }}>{t(language, 'Nothing scheduled yet.', 'ابھی کچھ طے نہیں۔')}</p>}
                      {timetable.map((item) => {
                        const Icon = item.icon;
                        return (
                          <div className="list-row" key={item.id}>
                            <div className="row-icon" style={{ background: `${item.color.replace(')', ' / .15)')}`, color: item.color }}><Icon size={15} /></div>
                            <div className="row-main">
                              <strong>{item.title}</strong>
                              <span>{item.time}</span>
                            </div>
                            <button className="row-del" onClick={() => removeSchedule(item.id)} title={t(language, 'Delete', 'حذف کریں')}><Trash2 size={14} /></button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="surface card-pad">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p className="section-title">{t(language, 'Study Analytics', 'اسٹڈی تجزیہ')}</p>
                      <button className="section-link" onClick={() => setPage('progress')}>{t(language, 'Details', 'تفصیلات')} <ChevronRight size={12} /></button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}>
                      <div style={{ height: 120, width: 120, flex: '0 0 120px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={analyticsData} dataKey="value" innerRadius={34} outerRadius={52} paddingAngle={3} startAngle={90} endAngle={-270}>
                              {analyticsData.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div style={{ flex: 1 }}>
                        {analyticsData.map((d) => (
                          <div className="legend-row" key={d.name}>
                            <span className="dot" style={{ background: d.color }} />
                            <span className="muted">{d.name}</span>
                            <b>{d.value}</b>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="surface card-pad">
                    <p className="section-title">{t(language, 'Weekly Study Hours', 'ہفتہ وار اوقات')}</p>
                    <p className="muted" style={{ fontSize: 11, margin: '2px 0 0' }}>{totalWeeklyHours}h {t(language, 'total', 'کل')}</p>
                    <div style={{ height: 150, marginTop: 6 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={weeklyData} outerRadius="70%">
                          <PolarGrid stroke="hsl(var(--border))" />
                          <PolarAngleAxis dataKey="day" tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} />
                          <Radar dataKey="hours" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.4} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="grid-layout three-col" style={{ marginTop: 16 }}>
                  <div className="surface card-pad">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p className="section-title">{t(language, 'Course Progress', 'کورس کی پیش رفت')}</p>
                      <button className="section-link" onClick={() => setPage('study')}>{t(language, 'Manage', 'انتظام')} <ChevronRight size={12} /></button>
                    </div>
                    <div style={{ marginTop: 14 }}>
                      {courseCatalog.map((c) => (
                        <div className="course-bar-row" key={c.id}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5 }}>
                            <span>{c.name}</span>
                            <b>{c.progress}%</b>
                          </div>
                          <div className="course-bar-track"><div className="course-bar-fill" style={{ width: `${c.progress}%`, background: c.color }} /></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="surface card-pad">
                    <p className="section-title">{t(language, 'Study Speed', 'رفتار')}</p>
                    <div className="gauge-wrap">
                      <div className="gauge-ring" style={{ background: 'conic-gradient(hsl(var(--teal)) 252deg, hsl(var(--muted)) 0deg)' }}>
                        <div className="gauge-ring-inner"><b>2.5x</b></div>
                      </div>
                      <p style={{ marginTop: 10, fontSize: 11.5, fontWeight: 700 }}>{t(language, 'Faster Learning', 'تیز تر سیکھنا')}</p>
                      <p className="muted" style={{ fontSize: 10.5, marginTop: 2 }}>{t(language, 'vs. your first month', 'پہلے مہینے کے مقابلے میں')}</p>
                    </div>
                  </div>

                  <div className="surface card-pad">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p className="section-title">{t(language, 'Tasks / To-Do', 'کام کی فہرست')}</p>
                      <span className="section-link" style={{ cursor: 'default' }}>{doneCount}/{todos.length}</span>
                    </div>
                    <div style={{ marginTop: 6 }}>
                      {todos.map((td) => (
                        <div className={`todo-row${td.done ? ' done' : ''}`} key={td.id} onClick={() => toggleTodo(td.id)} style={{ cursor: 'pointer' }}>
                          {td.done ? <CheckCircle2 size={16} color="hsl(var(--teal))" /> : <Circle size={16} color="hsl(var(--muted-foreground))" />}
                          <span>{td.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="footer-stats">
                  <div><b>1000+</b><span>{t(language, 'Students Trust Us', 'طلباء کا اعتماد')}</span></div>
                  <div><b>50+</b><span>{t(language, 'Courses & Resources', 'کورسز اور وسائل')}</span></div>
                  <div><b>24/7</b><span>{t(language, 'AI Support', 'AI سپورٹ')}</span></div>
                </div>
              </>
            )}

            {page === 'study' && (
              <>
                <div className="page-heading">
                  <div>
                    <p className="eyebrow">{t(language, 'Study room', 'مطالعہ')}</p>
                    <h1 className="page-title">{t(language, 'Practice, not a lecture', 'مشق، لیکچر نہیں')}</h1>
                    <p className="page-detail">{t(language, 'Pick a course and topic — the room asks you a question instead of giving you notes.', 'کورس اور موضوع منتخب کریں۔')}</p>
                  </div>
                </div>
                <div className="grid-layout two-col">
                  <div className="surface card-pad">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p className="section-title">{t(language, 'Your courses', 'آپ کے کورسز')}</p>
                      <button className="section-link" onClick={() => setCourseModalOpen(true)}><Plus size={13} />{t(language, 'Add course', 'کورس شامل کریں')}</button>
                    </div>
                    <div style={{ marginTop: 10 }}>
                      {courseCatalog.map((c) => (
                        <button
                          key={c.id}
                          className="list-row"
                          style={{ width: '100%', border: 0, background: 'transparent', cursor: 'pointer', textAlign: 'left' }}
                          onClick={() => { setSelectedCourseId(c.id); setSelectedTopic(c.topics[0]); }}
                        >
                          <div className="row-icon" style={{ background: 'hsl(var(--muted))' }}><BookOpen size={16} /></div>
                          <div className="row-main">
                            <strong>{c.code} · {c.name}</strong>
                            <span>{c.subject}</span>
                          </div>
                          {selectedCourseId === c.id && <Check size={16} color="hsl(var(--primary))" />}
                        </button>
                      ))}
                    </div>
                    {selectedCourse && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                        {selectedCourse.topics.map((topic) => (
                          <span key={topic} className={`chip${selectedTopic === topic ? ' selected' : ''}`} onClick={() => setSelectedTopic(topic)}>{topic}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="surface card-pad">
                    <p className="section-title">{t(language, 'Socratic prompt', 'سقراطی سوال')}</p>
                    <p className="muted" style={{ fontSize: 13, lineHeight: 1.55, marginTop: 12 }}>{prompt}</p>
                    <textarea className="field" rows={4} style={{ marginTop: 14, resize: 'vertical' }} placeholder={t(language, 'Type your answer…', 'اپنا جواب لکھیں…')} />
                    <button className="btn-primary" style={{ marginTop: 12 }}><Sparkles size={14} />{t(language, 'Log attempt', 'ریکارڈ کریں')}</button>
                  </div>
                </div>
              </>
            )}

            {page === 'career' && (
              <>
                <div className="page-heading">
                  <div>
                    <p className="eyebrow">{t(language, 'Career path', 'کیریئر')}</p>
                    <h1 className="page-title">{t(language, 'Where could this lead?', 'یہ کہاں لے جا سکتا ہے؟')}</h1>
                    <p className="page-detail">{t(language, 'Tell us your interests, budget, and city — matches update instantly.', 'دلچسپی، بجٹ اور شہر بتائیں۔')}</p>
                  </div>
                </div>
                <div className="surface card-pad">
                  <p className="section-title">{t(language, 'What pulls you in?', 'کیا چیز آپ کو کھینچتی ہے؟')}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                    {interestOptions.map((opt) => (
                      <span key={opt} className={`chip${interests.includes(opt) ? ' selected' : ''}`} onClick={() => toggleInterest(opt)}>{opt}</span>
                    ))}
                  </div>
                  <div className="form-grid" style={{ marginTop: 16 }}>
                    <div>
                      <label className="field-label">{t(language, 'Your budget (per year)', 'آپ کا بجٹ')}</label>
                      <select className="field" value={budget} onChange={(e) => setBudget(e.target.value)}>
                        <option value="">{t(language, 'Select budget', 'بجٹ منتخب کریں')}</option>
                        {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="field-label">{t(language, 'Preferred city', 'پسندیدہ شہر')}</label>
                      <select className="field" value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option value="">{t(language, 'Select city', 'شہر منتخب کریں')}</option>
                        {cityOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid-layout three-col" style={{ marginTop: 16 }}>
                  {(matchedPathways.length ? matchedPathways : pathwayData).map((p) => (
                    <div className="surface card-pad" key={p.id}>
                      <p className="section-title">{p.title}</p>
                      <p className="muted" style={{ fontSize: 12, lineHeight: 1.5, marginTop: 8 }}>{p.description}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                        {p.programs.map((prog) => <span key={prog} className="badge" style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }}>{prog}</span>)}
                      </div>
                    </div>
                  ))}
                </div>

                {(budget || location) && (
                  <div className="surface card-pad" style={{ marginTop: 16 }}>
                    <p className="section-title">{t(language, 'Universities matching your budget & city', 'آپ کے بجٹ اور شہر کے مطابق جامعات')}</p>
                    <p className="muted" style={{ fontSize: 11.5, marginTop: 4 }}>{t(language, 'Illustrative planning data — tap a university to see indicative programs & fee, and search their official site for current details.', 'اندازاً معلومات — تصدیق ویب سائٹ سے کریں۔')}</p>
                    <div style={{ marginTop: 12 }}>
                      {matchedInstitutions.length === 0 && <p className="muted" style={{ fontSize: 12 }}>{t(language, 'No close match yet — try widening budget or city.', 'کوئی مماثلت نہیں ملی۔')}</p>}
                      {matchedInstitutions.map((u) => (
                        <div className="list-row" key={u.name} style={{ cursor: 'pointer' }} onClick={() => setUniModal(u)}>
                          <div className="row-icon" style={{ background: 'hsl(var(--muted))' }}><GraduationCap size={16} /></div>
                          <div className="row-main">
                            <strong>{u.name}</strong>
                            <span>{u.city} · {u.sector} · ~{u.fee.toLocaleString()} PKR/yr</span>
                          </div>
                          <ChevronRight size={16} color="hsl(var(--muted-foreground))" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {page === 'progress' && (
              <>
                <div className="page-heading">
                  <div>
                    <p className="eyebrow">{t(language, 'Progress', 'پیش رفت')}</p>
                    <h1 className="page-title">{t(language, 'How it\u2019s going', 'کیسا چل رہا ہے')}</h1>
                  </div>
                </div>
                <div className="grid-layout three-col">
                  <div className="surface card-pad">
                    <p className="muted" style={{ fontSize: 11 }}>{t(language, 'Attempts logged', 'ریکارڈ کوششیں')}</p>
                    <p className="stat-number">9</p>
                  </div>
                  <div className="surface card-pad">
                    <p className="muted" style={{ fontSize: 11 }}>{t(language, 'Day streak', 'دن کا سلسلہ')}</p>
                    <p className="stat-number">3</p>
                  </div>
                  <div className="surface card-pad">
                    <p className="muted" style={{ fontSize: 11 }}>{t(language, 'Courses active', 'فعال کورسز')}</p>
                    <p className="stat-number">{courseCatalog.length}</p>
                  </div>
                </div>
                <div className="surface card-pad" style={{ marginTop: 16 }}>
                  <p className="section-title">{t(language, 'Weekly activity', 'ہفتہ وار سرگرمی')}</p>
                  <div style={{ height: 200, marginTop: 12 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis dataKey="day" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} width={24} />
                        <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                        <Bar dataKey="done" radius={[6, 6, 0, 0]} fill="hsl(var(--teal))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )}

            {page === 'settings' && (
              <>
                <div className="page-heading">
                  <div>
                    <p className="eyebrow">{t(language, 'Settings', 'ترتیبات')}</p>
                    <h1 className="page-title">{t(language, 'Your profile', 'آپ کا پروفائل')}</h1>
                  </div>
                </div>
                <div className="surface card-pad" style={{ maxWidth: 420 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                    <Avatar size={56} />
                    <span className="muted" style={{ fontSize: 12 }}>{t(language, 'Tap the photo to upload an avatar', 'اپلوڈ کرنے کے لیے تصویر پر تھپتھپائیں')}</span>
                  </div>
                  <label className="field-label">{t(language, 'Name', 'نام')}</label>
                  <input className="field" value={name} onChange={(e) => setName(e.target.value)} />
                  <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                    <button className="btn-outline" onClick={() => setTheme((th) => th === 'dark' ? 'light' : 'dark')} style={{ flex: 1 }}>
                      {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />} {t(language, 'Toggle theme', 'تھیم بدلیں')}
                    </button>
                    <button className="btn-outline" onClick={() => setLanguage((l) => l === 'en' ? 'ur' : 'en')} style={{ flex: 1 }}>
                      <Languages size={14} /> {language === 'en' ? 'اردو' : 'English'}
                    </button>
                  </div>
                </div>
              </>
            )}

          </div>
        </main>

        <nav className="bottom-nav"><NavList vertical={false} /></nav>
      </div>

      {scheduleModalOpen && (
        <Modal title={t(language, 'Add to schedule', 'شیڈول میں شامل کریں')} onClose={() => setScheduleModalOpen(false)}>
          <label className="field-label">{t(language, 'Title', 'عنوان')}</label>
          <input className="field" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder={t(language, 'e.g. Revision — Binary trees', 'مثال کے طور پر')} />
          <label className="field-label" style={{ marginTop: 12 }}>{t(language, 'Time', 'وقت')}</label>
          <input className="field" value={newTime} onChange={(e) => setNewTime(e.target.value)} placeholder="e.g. 6:00 PM" />
          <button className="btn-primary" style={{ marginTop: 16, width: '100%' }} onClick={addSchedule}>{t(language, 'Add', 'شامل کریں')}</button>
        </Modal>
      )}

      {courseModalOpen && (
        <Modal title={t(language, 'Add a course', 'کورس شامل کریں')} onClose={() => setCourseModalOpen(false)}>
          <label className="field-label">{t(language, 'Course name', 'کورس کا نام')}</label>
          <input className="field" value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} placeholder={t(language, 'e.g. Linear Algebra', 'مثال')} />
          <label className="field-label" style={{ marginTop: 12 }}>{t(language, 'Subject / platform', 'مضمون / پلیٹ فارم')}</label>
          <input className="field" value={newCourseSubject} onChange={(e) => setNewCourseSubject(e.target.value)} placeholder={t(language, 'e.g. Mathematics', 'مثال')} />
          <button className="btn-primary" style={{ marginTop: 16, width: '100%' }} onClick={addCourse}>{t(language, 'Add course', 'کورس شامل کریں')}</button>
        </Modal>
      )}

      {uniModal && (
        <Modal title={uniModal.name} onClose={() => setUniModal(null)}>
          <p className="muted" style={{ fontSize: 12 }}>{uniModal.city} · {uniModal.sector}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            {uniModal.programs.map((p) => <span key={p} className="badge" style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }}>{p}</span>)}
          </div>
          <p style={{ marginTop: 12, fontSize: 13 }}>{t(language, 'Indicative fee', 'اندازاً فیس')}: <b>~{uniModal.fee.toLocaleString()} PKR/year</b></p>
          <p className="muted" style={{ fontSize: 11, marginTop: 8, lineHeight: 1.5 }}>
            {t(language, 'This is illustrative planning data, not live-fetched from the university. For exact, current degree lists and fees, check their official site directly.', 'یہ اندازاً معلومات ہیں، براہ کرم آفیشل ویب سائٹ چیک کریں۔')}
          </p>
          <a
            className="btn-outline"
            style={{ marginTop: 14, width: '100%', textDecoration: 'none' }}
            href={`https://www.google.com/search?q=${encodeURIComponent(uniModal.name + ' official website admissions fee structure')}`}
            target="_blank" rel="noreferrer"
          >
            <ExternalLink size={14} /> {t(language, 'Search official website', 'آفیشل ویب سائٹ تلاش کریں')}
          </a>
        </Modal>
      )}
    </div>
  );
}
