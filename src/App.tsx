/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { 
  Folder, 
  Code, 
  Terminal as TerminalIcon, 
  History, 
  AtSign, 
  Settings, 
  Power, 
  Github, 
  FileText, 
  Linkedin,
  Monitor,
  Shield,
  LayoutGrid,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const BOOT_SEQUENCE = [
  "[ OK ] Initializing PRIYANSHI_OS Kernel v2.4.0...",
  "[ OK ] Mounting file system /dev/portfolio...",
  "[ OK ] Establishing secure handshake with neural_net.ssh...",
  "[ OK ] Loading primary UI drivers...",
];

const ASCII_LOGO = `
 ____  ____  _____     __    _   _  ____  _   _ ___    ___  ____  
|  _ \\|  _ \\|_ _\\ \\   / /_ _| \\ | |/ ___|| | | |_ _|  / _ \\/ ___| 
| |_) | |_) || | \\ \\ / / _\` |  \\| \\___ \\| |_| || |  | | | \\___ \\ 
|  __/|  _ < | |  \\ V / (_| | |\\  |___) |  _  || |  | |_| |___) |
|_|   |_| \\_\\___|  \\_/ \\__,_|_| \\_|____/|_| |_|___|  \\___/|____/ 
`;

export default function App() {
  const [booting, setBooting] = useState(true);
  const [terminalLines, setTerminalLines] = useState<JSX.Element[]>([]);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("root");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (booting) {
      let currentLine = 0;
      const interval = setInterval(() => {
        if (currentLine < BOOT_SEQUENCE.length) {
          setTerminalLines(prev => [...prev, <p key={`boot-${currentLine}`}>{BOOT_SEQUENCE[currentLine]}</p>]);
          currentLine++;
        } else {
          clearInterval(interval);
          timeout = setTimeout(() => {
            setTerminalLines(prev => [
              ...prev,
              <pre key="ascii" className="text-[8px] md:text-sm leading-none font-bold py-4 text-primary-terminal">{ASCII_LOGO}</pre>,
              <p key="welcome" className="mb-4">Welcome back, Admin. Type <span className="bg-primary-terminal text-terminal-bg px-1 px-4">help</span> to view available commands.</p>
            ]);
            setBooting(false);
          }, 500);
        }
      }, 300);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalLines]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    setTerminalLines(prev => [...prev, <p key={Date.now()}><span className="text-secondary-terminal italic">priyanshi@portfolio:~$</span> {input}</p>]);

    switch (cmd) {
      case 'help':
        setTerminalLines(prev => [...prev, (
          <div key={Date.now()} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 pl-4 opacity-80 mb-4">
            <p><span className="text-white">about</span> - User profile & background</p>
            <p><span className="text-white">skills</span> - Technical skill matrix</p>
            <p><span className="text-white">projects</span> - View portfolio artifacts</p>
            <p><span className="text-white">contact</span> - Request handshake</p>
            <p><span className="text-white">clear</span> - Flush terminal buffer</p>
            <p><span className="text-white">sudo hire-me</span> - Execute recruitment sequence</p>
          </div>
        )]);
        break;
      case 'clear':
        setTerminalLines([]);
        break;
      case 'skills':
        setTerminalLines(prev => [...prev, (
          <div key={Date.now()} className="flex flex-col gap-4 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pl-4 pt-4">
              {['TypeScript', 'React/Next.js', 'Node.js', 'PostgreSQL'].map(skill => (
                <div key={skill} className="border border-primary-terminal/20 p-3 bg-primary-terminal/5 flex flex-col items-center gap-2 group hover:border-primary-terminal transition-all">
                  <TerminalIcon size={24} />
                  <span className="text-xs font-mono uppercase">{skill}</span>
                </div>
              ))}
            </div>
            <div className="pl-4">
              <p className="text-xs mb-1">System Proficiency:</p>
              <div className="flex items-center gap-2 font-mono">
                <span>[</span><span className="text-primary-terminal">##########</span><span className="text-primary-terminal/20">-----</span><span>]</span>
                <span className="text-xs">Fullstack Dev (85%)</span>
              </div>
            </div>
          </div>
        )]);
        break;
      case 'projects':
      case 'ls ./projects':
        setTerminalLines(prev => [...prev, (
          <div key={Date.now()} className="flex flex-col gap-6 pl-4 pt-4 mb-4">
            <div className="border-l-2 border-primary-terminal pl-4 relative">
              <span className="absolute -left-[5px] top-0 w-2 h-2 bg-primary-terminal rounded-full"></span>
              <div className="flex justify-between items-start">
                <h4 className="text-white font-bold">[01] QUANTUM_CORE_V3</h4>
                <span className="text-[10px] bg-secondary-terminal/20 text-secondary-terminal px-2 border border-secondary-terminal/20">LIVE</span>
              </div>
              <p className="text-sm opacity-70 mt-1">Real-time distributed ledger monitoring. Built with Rust and WebSockets.</p>
            </div>
            <div className="border-l-2 border-primary-terminal/30 pl-4 relative group hover:border-primary-terminal transition-colors">
              <span className="absolute -left-[5px] top-0 w-2 h-2 bg-primary-terminal/30 group-hover:bg-primary-terminal rounded-full"></span>
              <div className="flex justify-between items-start">
                <h4 className="text-white/60 group-hover:text-white font-bold">[02] NEURAL_SYNC_OS</h4>
                <span className="text-[10px] bg-white/10 text-white/50 px-2 border border-white/10">ARCHIVED</span>
              </div>
              <p className="text-sm opacity-50 mt-1">Experimental spatial UI paradigms using Three.js.</p>
            </div>
          </div>
        )]);
        break;
      case 'about':
        setTerminalLines(prev => [...prev, (
          <div key={Date.now()} className="pl-4 opacity-80 mb-4">
            <p className="text-white mb-2 underline tracking-wider font-bold">IDENTITY PROFILE</p>
            <p>NAME: Priyanshi Gahlawat</p>
            <p>ROLE: Full-Stack Systems Architect</p>
            <p>LOCATION: New Delhi, India // 28.6139° N, 77.2090° E</p>
            <p className="mt-2 text-sm">Passionate about building highly-optimized, low-latency web systems and immersive digital experiences. Specializing in TypeScript, React, and performance engineering.</p>
          </div>
        )]);
        break;
      case 'sudo hire-me':
        setTerminalLines(prev => [...prev, (
          <div key={Date.now()} className="pl-4 mb-4">
            <p className="text-terminal-error font-bold mb-2 animate-pulse">[!] ROOT PRIVILEGES GRANTED</p>
            <div className="bg-primary-terminal/10 border border-primary-terminal/40 p-4 mt-2">
              <p className="mb-2">Recruitment sequence initiated. Initializing contact portal...</p>
              <p className="text-sm italic opacity-60">Handshake protocol: priyanshigahlawat9@gmail.com</p>
            </div>
          </div>
        )]);
        break;
      default:
        setTerminalLines(prev => [...prev, <p key={Date.now()} className="text-terminal-error">Command not found: {cmd}. Type 'help' for options.</p>]);
    }
    setInput("");
  };

  const navItems = [
    { id: 'root', icon: Folder, label: 'ROOT' },
    { id: 'projects', icon: Code, label: 'PROJECTS' },
    { id: 'skills', icon: TerminalIcon, label: 'SKILLS' },
    { id: 'logs', icon: History, label: 'LOGS' },
    { id: 'contact', icon: AtSign, label: 'CONTACT' },
  ];

  return (
    <div className="min-h-screen bg-terminal-bg text-on-surface font-mono selection:bg-primary-terminal selection:text-terminal-bg overflow-x-hidden">
      {/* HUD Layers */}
      <div className="fixed inset-0 z-0 grid-overlay opacity-30 pointer-events-none"></div>
      <div className="fixed inset-0 z-10 scanline-overlay opacity-20 pointer-events-none"></div>

      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-primary-terminal/20">
        <div className="max-w-[1400px] mx-auto px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-primary-terminal font-bold animate-pulse text-sm">priyanshi@portfolio:~$</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-sans uppercase text-[10px] tracking-widest">
            {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`transition-all duration-200 px-2 py-1 ${activeTab === item.id ? 'text-primary-terminal underline decoration-2 underline-offset-4' : 'text-primary-terminal/40 hover:bg-primary-terminal hover:text-terminal-bg'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4 text-primary-terminal/60">
            <LayoutGrid size={16} className="cursor-pointer hover:text-primary-terminal" />
            <Settings size={16} className="cursor-pointer hover:text-primary-terminal" />
            <Power size={16} className="cursor-pointer hover:text-primary-terminal" />
          </div>
        </div>
      </header>

      {/* Layout Grid */}
      <div className="flex pt-12">
        {/* Desktop Sidebar */}
        <aside className="fixed left-0 top-0 h-full hidden lg:flex flex-col pt-16 bg-slate-950/90 backdrop-blur-xl border-r border-primary-terminal/20 w-64 z-40">
          <div className="p-6">
            <h2 className="text-primary-terminal font-bold text-lg font-sans tracking-tight">PRIYANSHI_OS</h2>
            <p className="text-primary-terminal/40 text-[10px] uppercase tracking-[0.2em] font-sans">v2.4.0-stable</p>
          </div>
          <nav className="flex flex-col mt-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group px-6 py-3 flex items-center gap-3 text-sm uppercase transition-all duration-200 border-l-4 ${activeTab === item.id ? 'bg-primary-terminal/10 text-primary-terminal border-primary-terminal' : 'text-primary-terminal/40 border-transparent hover:bg-primary-terminal/5 hover:text-primary-terminal hover:translate-x-1'}`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="mt-auto p-6 flex items-center gap-3 border-t border-primary-terminal/10">
            <div className="w-8 h-8 rounded bg-primary-terminal/20 flex items-center justify-center border border-primary-terminal/40 shadow-[0_0_10px_rgba(0,255,65,0.1)]">
              <Shield size={14} className="text-primary-terminal" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-primary-terminal">SYS_ADMIN</span>
              <span className="text-[9px] text-primary-terminal/40">STATUS: ONLINE</span>
            </div>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 ml-0 lg:ml-64 p-6 md:p-12 flex flex-col items-center min-h-screen relative z-20">
          {/* Terminal Window */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[1000px] bg-slate-950/80 backdrop-blur-xl border border-primary-terminal/30 rounded-sm overflow-hidden flex flex-col shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),0_0_20px_rgba(0,255,65,0.05)]"
          >
            {/* Window Chrome */}
            <div className="bg-terminal-surface flex items-center justify-between px-4 py-2 border-b border-primary-terminal/20">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-terminal-error/60 shadow-[0_0_5px_rgba(255,65,65,0.3)]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60 shadow-[0_0_5px_rgba(234,179,8,0.3)]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-primary-terminal/60 shadow-[0_0_5px_rgba(0,255,65,0.3)]"></div>
              </div>
              <span className="text-[9px] text-primary-terminal/40 uppercase tracking-[0.3em] font-sans font-bold">Bash — priyanshi@portfolio — 120x40</span>
              <div className="w-8"></div>
            </div>

            {/* Terminal Area */}
            <div 
              ref={scrollRef}
              onClick={() => inputRef.current?.focus()}
              className="p-6 h-[500px] overflow-y-auto custom-scrollbar flex flex-col gap-1 text-primary-terminal text-sm font-mono cursor-text"
            >
              {terminalLines}
              {!booting && (
                <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2">
                  <span className="text-secondary-terminal">priyanshi@portfolio:~$</span>
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      autoFocus
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-primary-terminal caret-transparent"
                    />
                    <motion.span 
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "stepEnd" }}
                      className="absolute left-[calc(var(--input-width)*1ch)] pointer-events-none"
                      style={{ 
                        left: `${input.length}ch`,
                        width: '0.6em',
                        height: '1.2em',
                        backgroundColor: '#00ff41',
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        marginBottom: '2px'
                      }}
                    />
                  </div>
                </form>
              )}
            </div>

            {/* Terminal Footer */}
            <div className="bg-slate-900/50 px-4 py-1.5 border-t border-primary-terminal/10 flex justify-between items-center text-[9px] font-mono text-primary-terminal/30">
              <div className="flex gap-4">
                <span>UTF-8</span>
                <span>SYSTEM_TYPE: LINUX_X86_64</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Monitor size={10} className="text-primary-terminal/40" />
                <span className="uppercase font-bold tracking-widest">Synced: Cloud_Relay_01</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links / Navigation Cards */}
          <div className="mt-12 w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-3 gap-6">
            <LinkCard 
              icon={Github} 
              title="GITHUB" 
              desc="Open-source repositories and experimental labs." 
              href="https://github.com/priyanshigahlawat9" 
              slug="~/view_profile"
            />
            <LinkCard 
              icon={FileText} 
              title="RESUME" 
              desc="Detailed professional history and certifications." 
              href="#" 
              slug="~/download_file"
            />
            <LinkCard 
              icon={Linkedin} 
              title="LINKEDIN" 
              desc="Professional network and signal exchange." 
              href="https://linkedin.com/in/priyanshigahlawat9" 
              slug="~/open_network"
            />
          </div>

          {/* Footer Stats Decor */}
          <div className="fixed bottom-6 right-8 hidden xl:flex flex-col items-end gap-1 text-[10px] font-mono text-primary-terminal/20 pointer-events-none transition-opacity duration-1000">
            <div className="flex gap-4">
              <span>LOAD_AVG: 0.42 0.51 0.48</span>
              <span>UPTIME: 36:12:08</span>
            </div>
            <div className="flex gap-4">
              <span>LATENCY: 12ms</span>
              <span>GEO: 28.6139° N, 77.2090° E</span>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl flex justify-around py-4 border-t border-primary-terminal/10">
        {navItems.map(item => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === item.id ? 'text-primary-terminal' : 'text-primary-terminal/30'}`}
          >
            <item.icon size={20} />
            <span className="text-[8px] font-bold tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

function LinkCard({ icon: Icon, title, desc, href, slug }: { icon: any, title: string, desc: string, href: string, slug: string }) {
  return (
    <motion.a
      whileHover={{ y: -5 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-slate-950/40 backdrop-blur-md border border-primary-terminal/10 p-6 flex flex-col gap-2 group hover:border-primary-terminal/40 transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Cpu size={12} className="text-primary-terminal/20" />
      </div>
      <div className="flex items-center gap-2 text-primary-terminal">
        <Icon size={18} />
        <span className="font-bold leading-none tracking-wider">{title}</span>
      </div>
      <p className="text-xs text-on-surface/60 leading-relaxed min-h-[3em]">{desc}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-[10px] text-secondary-terminal opacity-80 group-hover:opacity-100 transition-opacity">{slug}</span>
        <motion.div 
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1 h-1 bg-primary-terminal rounded-full opacity-0 group-hover:opacity-100"
        />
      </div>
    </motion.a>
  );
}
