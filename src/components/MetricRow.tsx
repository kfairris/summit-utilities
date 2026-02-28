type Status = 'good' | 'warning' | 'issue' | 'neutral';

interface Props {
  label: string;
  value: string | number;
  status?: Status;
  note?: string;
  bold?: boolean;
}

const statusConfig: Record<Status, { dot: string; bg: string; text: string }> = {
  good:    { dot: 'bg-green-500',  bg: 'bg-green-50',  text: 'text-green-700' },
  warning: { dot: 'bg-amber-500',  bg: 'bg-amber-50',  text: 'text-amber-700' },
  issue:   { dot: 'bg-red-500',    bg: 'bg-red-50',    text: 'text-red-700' },
  neutral: { dot: 'bg-gray-400',   bg: 'bg-gray-50',   text: 'text-gray-600' },
};

export default function MetricRow({ label, value, status = 'neutral', note, bold = false }: Props) {
  const cfg = statusConfig[status];
  return (
    <div className={`flex items-center justify-between px-3 py-2 rounded-lg ${cfg.bg} mb-1.5`}>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
        <span className={`text-sm ${bold ? 'font-semibold' : 'font-medium'} text-gray-700`}>{label}</span>
        {note && <span className="text-xs text-gray-400 hidden sm:inline">— {note}</span>}
      </div>
      <span className={`text-sm font-bold ${cfg.text} ml-4 flex-shrink-0`}>{value}</span>
    </div>
  );
}
