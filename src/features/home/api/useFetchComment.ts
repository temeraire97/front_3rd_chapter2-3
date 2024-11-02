import { useQuery, useMutation } from '@tanstack/react-query';

import type { ApiResponse } from '@shared/model/types';
import type { Post, Comment } from '@entities/home/model/types';

import { useInvalidateQueries } from '@entities/home/lib';
import { fetchCommentsByPostId, updateCommentById } from '@entities/home/api/commentApi';

export const useFetchComments = (postId: Post['id']) => {
  const { data, isLoading } = useQuery<ApiResponse & { comments: Comment[] }, Error>({
    queryKey: ['comments', postId],
    queryFn: async () => await fetchCommentsByPostId(postId),
  });

  return { comments: data?.comments ?? [], isLoading };
};

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: updateCommentById,
    onSuccess: useInvalidateQueries(['comments']),
  });
};
