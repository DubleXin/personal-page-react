import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

type UseCachedApiResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refresh: () => void; // for fronted force refresh
};

type CacheEntry<T> = {
  timestamp: number;
  data: T;
};

export function useCacheApi<T>(
  endpoint: string,
  cacheKey: string
): UseCachedApiResult<T> {
  const loadedCacheKey = `${
    import.meta.env.VITE_CACHE_API_KEY ?? "app"
  }_${cacheKey}`;

  const [data, setData] = useState<T | null>(() => {
    const cachedData = localStorage.getItem(loadedCacheKey);

    if (!cachedData) return null;

    const parsedData: CacheEntry<T> = JSON.parse(cachedData);
    return parsedData.data;
  });
  const [isLoading, setIsLoading] = useState<boolean>(!data);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get<T>(endpoint);

      const freshData = res.data;
      const cachedData = localStorage.getItem(loadedCacheKey);

      const parsedCache: CacheEntry<T> | null = cachedData
        ? JSON.parse(cachedData)
        : null;

      const isSame: boolean =
        JSON.stringify(parsedCache?.data) === JSON.stringify(freshData);

      if (isSame) return;

      localStorage.setItem(
        loadedCacheKey,
        JSON.stringify({
          timestamp: Date.now(),
          data: freshData,
        })
      );
      setData(freshData);
    } catch (e) {
      const error = e as AxiosError;
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, loadedCacheKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading: isLoading, error, refresh: fetchData };
}
