import { MdPeople } from "react-icons/md";
import { formatAnimeScore, formatMembers } from "../../utils/format";

interface TypeBadgeProps {
  type: string;
  variant?: "normal" | "expanded";
}

export function TypeBadge({ type, variant = "normal" }: TypeBadgeProps) {
  const baseClasses =
    "inline-block px-2 py-1 rounded text-white text-xs font-semibold";
  const variantClasses =
    variant === "expanded"
      ? "bg-primary/90"
      : "bg-base-content/70 backdrop-blur-sm";

  return <div className={`${baseClasses} ${variantClasses}`}>{type}</div>;
}

interface MembersBadgeProps {
  members: number | null;
}

export function MembersBadge({ members }: MembersBadgeProps) {
  return (
    <div className="flex items-center gap-1 bg-base-content/70 backdrop-blur-sm px-2.5 py-1.5 rounded-md">
      <MdPeople className="w-5 h-5 text-white" />
      <span className="text-white text-sm font-normal">
        {formatMembers(members)}
      </span>
    </div>
  );
}

interface ScoreBadgeProps {
  score: number | null;
}

export function ScoreBadge({ score }: ScoreBadgeProps) {
  if (!score) return null;

  return <div className="anime-badge">{formatAnimeScore(score)}</div>;
}

interface GenreBadgesProps {
  genres: Array<{ mal_id: number; name: string }>;
  maxDisplay?: number;
}

export function GenreBadges({ genres, maxDisplay = 4 }: GenreBadgesProps) {
  if (!genres || genres.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {genres.slice(0, maxDisplay).map((genre) => (
        <span
          key={genre.mal_id}
          className="badge badge-outline badge-sm text-white border-white/50"
        >
          {genre.name}
        </span>
      ))}
    </div>
  );
}
