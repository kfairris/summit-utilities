import { useState, useEffect } from 'react';
import { CRAWL_DATE } from '../data/crawlData';

const NAV_ITEMS = [
  { id: 'performance', label: 'Performance' },
  { id: 'journey', label: 'User Journey' },
  { id: 'conversion', label: 'Conversion' },
  { id: 'tracking', label: 'Tracking' },
  { id: 'ninety-day', label: '90-Day Plan' },
];

export default function Header() {
  const [active, setActive] = useState('performance');

  useEffect(() => {
    const handleScroll = () => {
      const offsets = NAV_ITEMS.map(item => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: Infinity };
        return { id: item.id, top: Math.abs(el.getBoundingClientRect().top - 80) };
      });
      const closest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
      setActive(closest.id);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="sticky top-0 z-50 bg-summit-navy shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/summit-utilities/summitlogo-flame.png"
              alt="Summit Utilities flame logo"
              className="w-9 h-9 object-contain"
            />
            <div>
              <div className="text-white font-bold text-base leading-tight">Summit Utilities</div>
              <div className="text-blue-300 text-sm leading-tight">Digital Experience Audit</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  active === item.id
                    ? 'bg-summit-teal text-white'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Meta */}
          <div className="text-right">
            <div className="text-blue-300 text-sm">Crawl date: {CRAWL_DATE}</div>
            <div className="text-blue-400 text-sm">summitutilities.com</div>
          </div>
        </div>
      </div>
    </header>
  );
}
