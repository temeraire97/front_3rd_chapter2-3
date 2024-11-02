import { useQueryClient } from '@tanstack/react-query';

export const useInvalidateQueries = (queryKey: string[]) => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey });
};
