import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    let errorMessage = res.statusText;
    try {
      const text = await res.text();
      errorMessage = text || res.statusText;
    } catch (error) {
      // If we can't read the response text, use statusText
      console.warn('Failed to read error response:', error);
    }
    throw new Error(`${res.status}: ${errorMessage}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Construct the URL from queryKey
    const url = queryKey.join("/") as string;
    
    // Ensure the URL is properly formatted
    const apiUrl = url.startsWith('/') ? url : `/${url}`;
    
    console.log('🔍 [QueryClient] Fetching:', apiUrl);
    
    const res = await fetch(apiUrl, {
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log('📡 [QueryClient] Response status:', res.status, 'for URL:', apiUrl);

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    try {
      const data = await res.json();
      console.log('✅ [QueryClient] Successfully fetched data:', data?.length || 'N/A', 'items from', apiUrl);
      return data;
    } catch (error) {
      console.error('❌ [QueryClient] Failed to parse JSON response from', apiUrl, ':', error);
      throw new Error('Invalid JSON response from server');
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error) => {
        console.log('🔄 [QueryClient] Retry attempt', failureCount, 'for error:', error?.message);
        return failureCount < 2;
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: false,
    },
  },
});
