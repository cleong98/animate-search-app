interface InfoCardProps {
  label: string;
  value: string | number;
  icon?: string;
}

export function InfoCard({ label, value, icon }: InfoCardProps) {
  return (
    <div className="bg-base-200 rounded-lg p-4 hover:bg-base-300 transition-colors">
      <p className="text-sm text-base-content/60 mb-1">{label}</p>
      <p className="font-semibold text-lg flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {value}
      </p>
    </div>
  );
}

interface InfoGridProps {
  children: React.ReactNode;
}

export function InfoGrid({ children }: InfoGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {children}
    </div>
  );
}
