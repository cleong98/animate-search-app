import { describe, it, expect, vi } from 'vitest';
import { animeApi } from '../api/animeApi';
import apiClient from '../api/client';

// Mock the API client
vi.mock('../api/client');

describe('Filter Integration Tests', () => {
  it('searchAnime includes genres parameter when genres are provided', async () => {
    const mockResponse = {
      data: {
        data: [],
        pagination: {
          last_visible_page: 1,
          has_next_page: false,
          current_page: 1,
          items: {
            count: 0,
            total: 0,
            per_page: 25,
          },
        },
      },
    };

    vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse);

    await animeApi.searchAnime({
      q: 'naruto',
      page: 1,
      limit: 25,
      genres: [1, 2, 4],
    });

    expect(apiClient.get).toHaveBeenCalledWith('/anime', {
      params: {
        page: 1,
        limit: 25,
        q: 'naruto',
        genres: '1,2,4',
      },
      signal: undefined,
    });
  });

  it('searchAnime includes all filter parameters', async () => {
    const mockResponse = {
      data: {
        data: [],
        pagination: {
          last_visible_page: 1,
          has_next_page: false,
          current_page: 1,
          items: {
            count: 0,
            total: 0,
            per_page: 25,
          },
        },
      },
    };

    vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse);

    await animeApi.searchAnime({
      q: 'test',
      page: 2,
      limit: 25,
      type: 'tv',
      status: 'airing',
      rating: 'pg13',
      genres: [1, 4],
    });

    expect(apiClient.get).toHaveBeenCalledWith('/anime', {
      params: {
        page: 2,
        limit: 25,
        q: 'test',
        type: 'tv',
        status: 'airing',
        rating: 'pg13',
        genres: '1,4',
      },
      signal: undefined,
    });
  });

  it('searchAnime omits genres parameter when empty array', async () => {
    const mockResponse = {
      data: {
        data: [],
        pagination: {
          last_visible_page: 1,
          has_next_page: false,
          current_page: 1,
          items: {
            count: 0,
            total: 0,
            per_page: 25,
          },
        },
      },
    };

    vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse);

    await animeApi.searchAnime({
      q: 'test',
      page: 1,
      limit: 25,
      genres: [],
    });

    expect(apiClient.get).toHaveBeenCalledWith('/anime', {
      params: {
        page: 1,
        limit: 25,
        q: 'test',
      },
      signal: undefined,
    });
  });

  it('getGenres calls correct endpoint', async () => {
    const mockResponse = {
      data: {
        data: [
          { mal_id: 1, name: 'Action' },
          { mal_id: 2, name: 'Adventure' },
        ],
      },
    };

    vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse);

    const result = await animeApi.getGenres();

    expect(apiClient.get).toHaveBeenCalledWith('/genres/anime');
    expect(result.data).toHaveLength(2);
    expect(result.data[0]).toEqual({ mal_id: 1, name: 'Action' });
  });
});
