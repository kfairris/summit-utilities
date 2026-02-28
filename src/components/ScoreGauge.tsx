interface Props {
  score: number | null;
  label: string;
  size?: number;
  loading?: boolean;
}

function getColor(score: number): string {
  if (score >= 90) return '#16a34a'; // green
  if (score >= 50) return '#f59e0b'; // amber
  return '#dc2626'; // red
}

function getLabel(score: number): string {
  if (score >= 90) return 'Good';
  if (score >= 50) return 'Needs Work';
  return 'Poor';
}

export default function ScoreGauge({ score, label, size = 96, loading = false }: Props) {
  const r = (size / 2) - 8;
  const circumference = 2 * Math.PI * r;
  const pct = score !== null ? Math.max(0, Math.min(100, score)) / 100 : 0;
  const dash = pct * circumference;
  const color = score !== null ? getColor(score) : '#9ca3af';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          {/* Progress */}
          {!loading && (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeDasharray={`${dash} ${circumference}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.6s ease' }}
            />
          )}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {loading ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-summit-blue rounded-full animate-spin" />
          ) : score !== null ? (
            <>
              <span className="text-2xl font-bold" style={{ color }}>{score}</span>
              <span className="text-xs text-gray-500">{getLabel(score)}</span>
            </>
          ) : (
            <span className="text-xs text-gray-400 text-center leading-tight">N/A</span>
          )}
        </div>
      </div>
      <div className="text-xs text-center text-gray-600 font-medium leading-tight max-w-[100px]">{label}</div>
    </div>
  );
}
