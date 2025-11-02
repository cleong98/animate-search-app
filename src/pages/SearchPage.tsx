import { useNavigate } from "react-router";
import { useEffect, useRef } from "react";
import { useApi } from "../hooks/useApi";
import { useDebounceSearch } from "../hooks/useDebounceSearch";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setSearchQuery,
  setCurrentPage,
  setCachedData,
} from "../store/searchSlice";
import { animeApi } from "../api/animeApi";
import AppBar from "../components/AppBar";
import SearchBar from "../components/SearchBar";
import AnimeGrid from "../components/AnimeGrid";
import Pagination from "../components/Pagination";
import ErrorAlert from "../components/ErrorAlert";
import EmptyState from "../components/EmptyState";
import { FilterPanel } from "../components/FilterPanel";

function SearchPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get state from Redux
  const searchQuery = useAppSelector((state) => state.search.query);
  const currentPage = useAppSelector((state) => state.search.currentPage);
  const cachedQuery = useAppSelector((state) => state.search.cachedQuery);
  const cachedPage = useAppSelector((state) => state.search.cachedPage);
  const cachedData = useAppSelector((state) => state.search.cachedData);
  const selectedType = useAppSelector((state) => state.search.selectedType);
  const selectedStatus = useAppSelector((state) => state.search.selectedStatus);
  const selectedRating = useAppSelector((state) => state.search.selectedRating);
  const selectedGenres = useAppSelector((state) => state.search.selectedGenres);

  const { data, loading, error, execute } = useApi(animeApi.searchAnime);

  const dataQueryRef = useRef<string>("");
  const dataPageRef = useRef<number>(0);
  const dataTypeRef = useRef<string>("");
  const dataStatusRef = useRef<string>("");
  const dataRatingRef = useRef<string>("");
  const dataGenresRef = useRef<number[]>([]);

  useDebounceSearch({
    searchQuery,
    currentPage,
    cachedQuery,
    cachedPage,
    hasCachedData: cachedData !== null,
    execute,
    delay: 250,
    selectedType,
    selectedStatus,
    selectedRating,
    selectedGenres,
  });

  useEffect(() => {
    if (data) {
      dataQueryRef.current = searchQuery.trim();
      dataPageRef.current = currentPage;
      dataTypeRef.current = selectedType;
      dataStatusRef.current = selectedStatus;
      dataRatingRef.current = selectedRating;
      dataGenresRef.current = selectedGenres;

      dispatch(
        setCachedData({
          query: searchQuery.trim(),
          page: currentPage,
          data,
        })
      );
    }
  }, [data, searchQuery, currentPage, selectedType, selectedStatus, selectedRating, selectedGenres, dispatch]);

  const arraysEqual = (a: number[], b: number[]) =>
    a.length === b.length && a.every((val, idx) => val === b[idx]);

  const isDataFresh =
    data &&
    dataQueryRef.current === searchQuery.trim() &&
    dataPageRef.current === currentPage &&
    dataTypeRef.current === selectedType &&
    dataStatusRef.current === selectedStatus &&
    dataRatingRef.current === selectedRating &&
    arraysEqual(dataGenresRef.current, selectedGenres);

  const isCacheValid =
    cachedData &&
    cachedQuery === searchQuery.trim() &&
    cachedPage === currentPage;

  const displayData = isDataFresh ? data : isCacheValid ? cachedData : null;

  const handleSearchChange = (value: string) => {
    dispatch(setSearchQuery(value));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleAnimeClick = (id: number) => {
    navigate(`/${id}`);
  };

  const handleApplyFilters = () => {
    execute({
      q: searchQuery.trim(),
      page: currentPage,
      limit: 25,
      type: selectedType,
      status: selectedStatus,
      rating: selectedRating,
      genres: selectedGenres,
    });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Fixed Header */}
      <AppBar title="Anime App" />

      {/* Fixed Search and Filter Area */}
      <div className="shrink-0 border-b border-base-300 bg-base-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-7xl">
          <div className="relative">
            <SearchBar value={searchQuery} onChange={handleSearchChange} />
            <FilterPanel onApplyFilters={handleApplyFilters} />
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
          {error && (
            <ErrorAlert
              message={error.message || "An error occurred. Please try again."}
              showRetry
              onRetry={() =>
                execute({
                  q: searchQuery.trim(),
                  page: currentPage,
                  limit: 25,
                  type: selectedType,
                  status: selectedStatus,
                  rating: selectedRating,
                  genres: selectedGenres,
                })
              }
            />
          )}

          {!error && (
            <>
              {displayData && displayData.data.length === 0 && !loading ? (
                <EmptyState searchQuery={searchQuery.trim()} />
              ) : (
                <>
                  <AnimeGrid
                    animes={displayData?.data}
                    onAnimeClick={handleAnimeClick}
                    isLoading={loading || !displayData}
                  />

                  {displayData && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={displayData.pagination.last_visible_page}
                      onPageChange={handlePageChange}
                      hasNextPage={displayData.pagination.has_next_page}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
