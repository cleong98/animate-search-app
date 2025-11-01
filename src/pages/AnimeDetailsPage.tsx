import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApi } from '../hooks/useApi';
import { animeApi } from '../api/animeApi';
import { formatAnimeScore } from '../utils/format';

function AnimeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, execute } = useApi(animeApi.getAnimeById);

  useEffect(() => {
    if (id) {
      execute(Number(id));
    }
  }, [id, execute]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <button onClick={() => navigate(-1)} className="btn btn-sm mb-4">
          ← Back
        </button>
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const anime = data.data;

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => navigate(-1)} className="btn btn-sm mb-4">
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image Section */}
        <div className="lg:col-span-1">
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="w-full rounded-lg shadow-xl"
          />
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-2">{anime.title}</h1>
          {anime.title_english && (
            <h2 className="text-2xl text-secondary-gray mb-2">{anime.title_english}</h2>
          )}
          {anime.title_japanese && (
            <h3 className="text-xl text-base-content/60 mb-4">{anime.title_japanese}</h3>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {anime.genres.map((genre) => (
              <span key={genre.mal_id} className="badge badge-primary">
                {genre.name}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-base-content/60">Type</p>
              <p className="font-semibold">{anime.type || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-base-content/60">Episodes</p>
              <p className="font-semibold">{anime.episodes || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-base-content/60">Status</p>
              <p className="font-semibold">{anime.status || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-base-content/60">Score</p>
              <p className="font-semibold">⭐ {formatAnimeScore(anime.score)}</p>
            </div>
            <div>
              <p className="text-sm text-base-content/60">Duration</p>
              <p className="font-semibold">{anime.duration || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-base-content/60">Aired</p>
              <p className="font-semibold">{anime.aired.string}</p>
            </div>
          </div>

          {anime.synopsis && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Synopsis</h3>
              <p className="text-base-content/80">{anime.synopsis}</p>
            </div>
          )}

          {anime.studios.length > 0 && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Studios</h4>
              <div className="flex flex-wrap gap-2">
                {anime.studios.map((studio) => (
                  <span key={studio.mal_id} className="badge badge-outline">
                    {studio.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {anime.background && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Background</h4>
              <p className="text-base-content/80">{anime.background}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnimeDetailsPage;
