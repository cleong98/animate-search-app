import { useState, useCallback } from "react";
import { AxiosError } from "axios";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

interface UseApiReturn<T, P extends unknown[]> extends ApiState<T> {
  execute: (...params: P) => Promise<void>;
  reset: () => void;
}

export function useApi<T, P extends unknown[]>(
  apiFunction: (...params: P) => Promise<T>
): UseApiReturn<T, P> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...params: P) => {
      setState({ data: null, loading: true, error: null });

      try {
        const result = await apiFunction(...params);

        if (result && typeof result === "object" && "cancelled" in result) {
          setState({ data: null, loading: false, error: null });
          return;
        }

        setState({ data: result, loading: false, error: null });
      } catch (err) {
        const error = err as AxiosError;
        setState({ data: null, loading: false, error });
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
