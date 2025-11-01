interface ContentSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentSection({
  title,
  children,
  className = "",
}: ContentSectionProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-primary rounded-full"></span>
        {title}
      </h2>
      {children}
    </div>
  );
}
