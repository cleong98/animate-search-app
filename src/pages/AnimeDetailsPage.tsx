import { useEffect } from "react";
import { useParams } from "react-router";
import { useApi } from "../hooks/useApi";
import { animeApi } from "../api/animeApi";
import AppBar from "../components/AppBar";
import { HeroSection } from "../components/AnimeDetails/HeroSection";
import { ContentSection } from "../components/AnimeDetails/ContentSection";
import { DetailsSkeleton } from "../components/AnimeDetails/DetailsSkeleton";

interface InfoItemProps {
  label: string;
  value: string | number | null;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div>
      <h3 className="text-sm text-base-content/60 mb-2">{label}</h3>
      <p className="text-base-content font-medium">{value || "N/A"}</p>
    </div>
  );
}

function AnimeDetailsPage() {
  const { id } = useParams();
  const { data, loading, error, execute } = useApi(animeApi.getAnimeById);

  useEffect(() => {
    if (id) {
      execute(Number(id));
    }
  }, [id, execute]);

  if (loading) {
    return (
      <>
        <AppBar showBackButton />
        <DetailsSkeleton />
      </>
    );
  }

  if (error) {
    return (
      <>
        <AppBar showBackButton />
        <div className="container mx-auto p-4">
          <div className="alert alert-error">
            <span>{String(error)}</span>
          </div>
        </div>
      </>
    );
  }

  if (!data) {
    return null;
  }

  const anime = data.data;

  return (
    <div className="min-h-screen">
      <AppBar showBackButton />

      <HeroSection anime={anime} />

      <div className="container mx-auto px-4 pb-12 space-y-8">
        {anime.synopsis && (
          <ContentSection title="Synopsis">
            <p className="text-base-content/80 leading-relaxed">
              {anime.synopsis}
            </p>
          </ContentSection>
        )}

        <ContentSection title="Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem label="Type" value={anime.type} />
            <InfoItem label="Episodes" value={anime.episodes} />
            <InfoItem label="Status" value={anime.status} />
            <InfoItem label="Rating" value={anime.rating} />
            <InfoItem label="Source" value={anime.source} />
            {anime.season && anime.year && (
              <InfoItem
                label="Season"
                value={`${anime.season} ${anime.year}`}
              />
            )}
          </div>
        </ContentSection>

        {anime.studios && anime.studios.length > 0 && (
          <ContentSection title="Studios">
            <div className="flex flex-wrap gap-3">
              {anime.studios.map((studio) => (
                <span
                  key={studio.mal_id}
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  {studio.name}
                </span>
              ))}
            </div>
          </ContentSection>
        )}

        {anime.background && (
          <ContentSection title="Background">
            <p className="text-base-content/80 leading-relaxed">
              {anime.background}
            </p>
          </ContentSection>
        )}
      </div>
    </div>
  );
}

export default AnimeDetailsPage;
