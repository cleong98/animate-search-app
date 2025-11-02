import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AnimeSearchResponse } from "../api/types";

interface SearchState {
  query: string;
  currentPage: number;
  cachedQuery: string;
  cachedPage: number;
  cachedData: AnimeSearchResponse | null;
  // Filter state (single selection)
  selectedType: string;
  selectedStatus: string;
  selectedRating: string;
  selectedGenres: number[];
  isFilterOpen: boolean;
}

const initialState: SearchState = {
  query: "",
  currentPage: 1,
  cachedQuery: "",
  cachedPage: 0,
  cachedData: null,
  selectedType: "",
  selectedStatus: "",
  selectedRating: "",
  selectedGenres: [],
  isFilterOpen: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.currentPage = 1; // Reset to page 1 on new search
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setCachedData: (
      state,
      action: PayloadAction<{
        query: string;
        page: number;
        data: AnimeSearchResponse;
      }>
    ) => {
      state.cachedQuery = action.payload.query;
      state.cachedPage = action.payload.page;
      state.cachedData = action.payload.data;
    },
    resetSearch: (state) => {
      state.query = "";
      state.currentPage = 1;
      state.cachedQuery = "";
      state.cachedPage = 0;
      state.cachedData = null;
      state.selectedType = "";
      state.selectedStatus = "";
      state.selectedRating = "";
      state.selectedGenres = [];
      state.isFilterOpen = false;
    },
    // Filter actions (single selection)
    setTypeFilter: (state, action: PayloadAction<string>) => {
      state.selectedType = action.payload;
      state.currentPage = 1; // Reset to page 1 on filter change
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.selectedStatus = action.payload;
      state.currentPage = 1;
    },
    setRatingFilter: (state, action: PayloadAction<string>) => {
      state.selectedRating = action.payload;
      state.currentPage = 1;
    },
    toggleGenreFilter: (state, action: PayloadAction<number>) => {
      const genreId = action.payload;
      const index = state.selectedGenres.indexOf(genreId);
      if (index > -1) {
        state.selectedGenres.splice(index, 1);
      } else {
        state.selectedGenres.push(genreId);
      }
      state.currentPage = 1;
    },
    toggleFilterPanel: (state) => {
      state.isFilterOpen = !state.isFilterOpen;
    },
    clearAllFilters: (state) => {
      state.selectedType = "";
      state.selectedStatus = "";
      state.selectedRating = "";
      state.selectedGenres = [];
      state.currentPage = 1;
    },
  },
});

export const {
  setSearchQuery,
  setCurrentPage,
  setCachedData,
  resetSearch,
  setTypeFilter,
  setStatusFilter,
  setRatingFilter,
  toggleGenreFilter,
  toggleFilterPanel,
  clearAllFilters,
} = searchSlice.actions;

export default searchSlice.reducer;
