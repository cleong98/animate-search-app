import { formatAnimeScore, formatMembers } from "../../utils/format";
import type { Anime } from "../../api/types";

interface HeroSectionProps {
  anime: Anime;
}

export function HeroSection({ anime }: HeroSectionProps) {
  return (
    <div className="relative w-full -mx-4 -mt-4 mb-8 bg-base-100">
      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster Image */}
          <div className="flex-shrink-0">
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="w-48 md:w-56 lg:w-64 rounded-lg shadow-2xl"
            />
          </div>

          {/* Title and Info */}
          <div className="flex-grow flex flex-col justify-end">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-base-content leading-tight">
              {anime.title}
            </h1>

            {/* Genres */}
            {anime.genres && anime.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {anime.genres.slice(0, 3).map((genre) => (
                  <span
                    key={genre.mal_id}
                    className="text-sm text-base-content/70"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Alternative Titles */}
            {anime.title_english && anime.title_english !== anime.title && (
              <p className="text-base text-base-content/70 mb-2">
                {anime.title_english}
              </p>
            )}
            {anime.title_japanese && (
              <p className="text-base text-base-content/70 mb-6">
                {anime.title_japanese}
              </p>
            )}

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-6 text-sm mb-6">
              {anime.score && (
                <div className="flex items-center gap-2">
                  <span className="text-xl">⭐</span>
                  <span className="font-bold text-lg">{formatAnimeScore(anime.score)}</span>
                </div>
              )}
              <div className="h-4 w-px bg-base-content/20"></div>
              {anime.type && (
                <span className="text-base-content/70">{anime.type}</span>
              )}
              <div className="h-4 w-px bg-base-content/20"></div>
              {anime.aired?.string && (
                <span className="text-base-content/70">{anime.aired.string}</span>
              )}
              <div className="h-4 w-px bg-base-content/20"></div>
              {anime.duration && (
                <span className="text-base-content/70">{anime.duration}</span>
              )}
            </div>

            {/* Additional Stats */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-base-content/60">
              {anime.members && (
                <span>👥 {formatMembers(anime.members)} members</span>
              )}
              {anime.rank && (
                <span>Rank #{anime.rank}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
