import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

/**
 *  Wraps the app with the QueryClientProvider
 */
export function AppWrapper(props: { children: React.ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </>
  );
}
