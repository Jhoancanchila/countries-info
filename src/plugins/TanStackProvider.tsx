import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider  } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});


const TanStackProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      { children }
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default TanStackProvider