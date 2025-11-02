import type { Anime } from "../../api/types";
import { useBreakpoint } from "../../hooks/useWindowSize";
import { CardSkeleton } from "./CardSkeleton";
import { CardImage } from "./CardImage";
import { TypeBadge, MembersBadge, ScoreBadge } from "./CardBadges";
import { ExpandedContent } from "./ExpandedContent";
import { formatMetadata } from "../../utils/format";

export interface AnimeCardProps {
  anime?: Anime;
  onClick?: (id: number) => void;
  isLoading?: boolean;
}

function AnimeCard({ anime, onClick, isLoading = false }: AnimeCardProps) {
  const { isMobile } = useBreakpoint();

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (!anime) {
    return null;
  }

  const handleClick = () => {
    onClick?.(anime.mal_id);
  };

  const metadata = formatMetadata(anime.episodes, anime.year);

  return (
    <div className={`card-wrapper ${isMobile ? "mobile" : ""}`}>
      <div className="card-image-container" onClick={handleClick}>
        <CardImage
          imageUrl={anime.images.jpg.image_url}
          webpUrl={anime.images.webp.image_url}
          title={anime.title}
        />

        {/* Overlay and type badge - hidden on hover via CSS */}
        <div className="card-overlay-layer">
          <div className="absolute inset-0 card-overlay"></div>

          {anime.type && (
            <div className="absolute top-3 left-3">
              <TypeBadge type={anime.type} />
            </div>
          )}
        </div>

        <div className="absolute bottom-3 left-3 z-10">
          <MembersBadge members={anime.members} />
        </div>

        <div className="absolute bottom-3 right-3 z-10">
          <ScoreBadge score={anime.score} />
        </div>

        {/* Expanded content - shown on hover via CSS */}
        <div className="card-expanded-content">
          <ExpandedContent
            type={anime.type}
            title={anime.title}
            synopsis={anime.synopsis}
            episodes={anime.episodes}
            year={anime.year}
            genres={anime.genres}
          />
        </div>
      </div>

      {/* Info Below Card - Hidden when hovering on desktop via CSS */}
      <div className="card-info-below">
        <h3>{anime.title}</h3>
        <p>{metadata}</p>
      </div>
    </div>
  );
}

export default AnimeCard;
