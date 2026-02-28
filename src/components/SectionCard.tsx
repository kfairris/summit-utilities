import type { ReactNode } from 'react';

interface Props {
  id: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function SectionCard({ id, title, subtitle, icon, children, className = '' }: Props) {
  return (
    <section id={id} className={`scroll-mt-16 ${className}`}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Section header */}
        <div className="bg-summit-navy px-6 py-4 flex items-center gap-3">
          {icon && (
            <div className="flex items-center justify-center w-8 h-8 bg-summit-teal/20 rounded-lg text-summit-teal">
              {icon}
            </div>
          )}
          <div>
            <h2 className="text-white font-bold text-lg leading-tight">{title}</h2>
            {subtitle && <p className="text-blue-300 text-sm mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </section>
  );
}
