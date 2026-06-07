import { useState } from 'react';
import { emailSequence } from './data/emails';
import EmailPreview from './components/EmailPreview';

function App() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState(false);

  const currentEmail = emailSequence.find(e => e.week === selectedWeek);

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(currentEmail.html);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      
      {/* Navigation Area (Stacked on Mobile, Sidebar on Desktop) */}
      <aside className="w-full md:w-80 bg-slate-900 text-slate-300 flex flex-col border-b md:border-b-0 md:border-r border-slate-800 shadow-xl z-10 shrink-0">
        
        {/* Brand Header */}
        <div className="p-4 md:p-6 border-b border-slate-800 flex justify-between items-center md:items-start md:flex-col">
          <div className="flex items-center space-x-3 mb-0 md:mb-2">
            <div className="w-8 h-8 rounded bg-hahu-yellow flex items-center justify-center font-bold text-slate-900">
              HA
            </div>
            <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">Agency Portal</h1>
          </div>
          <p className="text-xs text-slate-400 hidden md:block">B2B Email Sequence Manager</p>

          {/* Dark Mode Toggle (Mobile only here) */}
          <div className="flex items-center space-x-2 md:hidden">
            <span className="text-xs font-medium">Dark</span>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDarkMode ? 'bg-indigo-500' : 'bg-slate-600'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
        
        {/* Scrollable Sequence Nav */}
        <div className="flex-1 overflow-x-auto md:overflow-y-auto py-2 md:py-4 scrollbar-hide">
          <div className="px-4 mb-2 text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:block">
            Campaign Sequence
          </div>
          {/* Horizontal on mobile, vertical on desktop */}
          <nav className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-1 px-4 md:px-2 w-max md:w-auto">
            {emailSequence.map((email) => (
              <button
                key={email.week}
                onClick={() => setSelectedWeek(email.week)}
                className={`flex-shrink-0 w-32 md:w-full flex flex-col text-left px-3 md:px-4 py-2 md:py-3 rounded-lg transition-colors ${
                  selectedWeek === email.week
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-800 md:bg-transparent hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-[10px] md:text-xs font-medium opacity-80 mb-0.5 md:mb-1">Week {email.week}</span>
                <span className="text-xs md:text-sm font-semibold truncate w-full">{email.subject}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Dark Mode Toggle (Desktop only here) */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 hidden md:flex items-center justify-between">
          <span className="text-sm font-medium">Dark Mode Preview</span>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDarkMode ? 'bg-indigo-500' : 'bg-slate-600'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full bg-slate-100 relative overflow-hidden">
        
        {/* Top Header */}
        <header className="h-14 md:h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shadow-sm z-10 shrink-0">
          <div className="flex flex-col overflow-hidden mr-4">
            <span className="text-[10px] md:text-xs text-slate-500 font-medium">Subject Line</span>
            <h2 className="text-sm md:text-lg font-bold text-slate-800 truncate">{currentEmail?.subject}</h2>
          </div>
          
          <div className="flex space-x-3 shrink-0">
            <button 
              onClick={handleCopyHtml}
              className="flex items-center space-x-1 md:space-x-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 md:px-4 py-1.5 md:py-2 rounded-md font-medium text-xs md:text-sm transition-all shadow-sm"
            >
              <svg className="w-4 h-4 text-slate-500 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              <span>{copiedStatus ? 'Copied!' : 'Copy HTML'}</span>
            </button>
          </div>
        </header>

        {/* Email Canvas Workspace */}
        <div className="flex-1 p-2 md:p-8 overflow-hidden flex justify-center bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4=')]">
          
          <div className="w-full max-w-4xl h-full flex flex-col bg-white rounded-lg md:rounded-xl shadow-2xl border border-slate-200 overflow-hidden ring-1 ring-black/5">
            {/* Browser chrome simulation */}
            <div className="h-8 md:h-10 bg-slate-100 border-b border-slate-200 flex items-center px-2 md:px-4 space-x-2 shrink-0">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-400"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-400"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-400"></div>
              <div className="flex-1 ml-2 md:ml-4 flex justify-center">
                <div className="bg-white text-slate-400 text-[10px] md:text-xs px-2 md:px-3 py-1 rounded border border-slate-200 w-3/4 md:w-1/2 text-center truncate flex items-center justify-center space-x-1 md:space-x-2">
                  <svg className="w-2.5 h-2.5 md:w-3 md:h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                  <span className="truncate">Client Inbox Preview - {isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
                </div>
              </div>
            </div>
            
            {/* The Actual Isolated Preview */}
            <div className="flex-1 overflow-hidden relative bg-slate-50">
              <EmailPreview htmlContent={currentEmail?.html || ''} isDarkMode={isDarkMode} />
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}

export default App;
