import { useEffect, useRef } from "react";
import type { AnimeSearchParams } from "../api/types";

interface UseDebounceSearchParams {
  searchQuery: string;
  currentPage: number;
  cachedQuery: string;
  cachedPage: number;
  hasCachedData: boolean;
  execute: (params: AnimeSearchParams) => Promise<void>;
  delay?: number;
  selectedType?: string;
  selectedStatus?: string;
  selectedRating?: string;
  selectedGenres?: number[];
}

export function useDebounceSearch({
  searchQuery,
  currentPage,
  cachedQuery,
  cachedPage,
  hasCachedData,
  execute,
  delay = 250,
  selectedType,
  selectedStatus,
  selectedRating,
  selectedGenres,
}: UseDebounceSearchParams) {
  const abortControllerRef = useRef<AbortController | null>(null);

  const cachedQueryRef = useRef(cachedQuery);
  const cachedPageRef = useRef(cachedPage);
  const hasCachedDataRef = useRef(hasCachedData);

  cachedQueryRef.current = cachedQuery;
  cachedPageRef.current = cachedPage;
  hasCachedDataRef.current = hasCachedData;

  useEffect(() => {
    const isCacheValid =
      hasCachedDataRef.current &&
      searchQuery.trim() === cachedQueryRef.current &&
      currentPage === cachedPageRef.current;

    if (isCacheValid) {
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const timeoutId = setTimeout(() => {
      execute({
        q: searchQuery.trim(),
        page: currentPage,
        limit: 25,
        signal: abortController.signal,
        type: selectedType,
        status: selectedStatus,
        rating: selectedRating,
        genres: selectedGenres,
      });
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [searchQuery, currentPage, execute, delay, selectedType, selectedStatus, selectedRating, selectedGenres]);
}
