import React, { useState, useCallback } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  method: HttpMethod;
  url: string;
  body?: any;
  headers?: HeadersInit;
}

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendRequest = useCallback(
    async (options: RequestOptions) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(options.url, {
          method: options.method,
          headers: options.headers || {},
          body: options.body ? JSON.stringify(options.body) : undefined,
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();
        return data;
      } catch (error) {
        setError(error instanceof Error ? error : new Error("Something went wrong!"));
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp; 
