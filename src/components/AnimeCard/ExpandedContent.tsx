import { TypeBadge, GenreBadges } from "./CardBadges";
import { formatMetadata } from "../../utils/format";

interface ExpandedContentProps {
  type: string | null;
  title: string;
  synopsis: string | null;
  episodes: number | null;
  year: number | null;
  genres: Array<{ mal_id: number; name: string }>;
}

export function ExpandedContent({
  type,
  title,
  synopsis,
  episodes,
  year,
  genres,
}: ExpandedContentProps) {
  const metadata = formatMetadata(episodes, year);

  return (
    <div className="expanded-content-overlay">
      <div>
        {/* Type Badge */}
        {type && (
          <div className="mb-3">
            <TypeBadge type={type} variant="expanded" />
          </div>
        )}

        {/* Title */}
        <h3 className="text-white font-bold text-xl mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Metadata */}
        {metadata && (
          <p className="text-white/70 text-xs mb-2">{metadata}</p>
        )}

        {/* Divider */}
        <div className="w-12 h-0.5 bg-primary/80 mb-3"></div>

        {/* Synopsis */}
        {synopsis && (
          <p className="text-white/90 text-sm mb-4 line-clamp-6">{synopsis}</p>
        )}

        {/* Genre Badges */}
        <GenreBadges genres={genres} />
      </div>
    </div>
  );
}
