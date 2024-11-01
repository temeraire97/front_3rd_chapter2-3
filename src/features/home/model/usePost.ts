import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient, type QueryClient } from '@tanstack/react-query';

import { enrichPostsWithUsers } from '@entities/home/lib/userUtils';
import useUser from '@features/home/model/useUser';
import { usePostFilter } from './usePostFilter';

import { fetchPostApi } from '@entities/home/lib/postUtils';
import { createPost, updatePostById, deletePostById } from '@entities/home/api/postApi';
import { PostsResponse } from '@/entities/home/model/types';

export const usePost = () => {
  const { users } = useUser();
  const { filters } = usePostFilter();

  // URL 필터를 API 파라미터로 변환
  const queryParams = useMemo(
    () => ({
      search: filters.search,
      tag: filters.tag === 'all' ? undefined : filters.tag,
      skip: (filters.page - 1) * filters.pageSize,
      limit: filters.pageSize,
      sortBy: filters.sortBy || undefined,
      sortOrder: filters.sortOrder,
    }),
    [filters],
  );

  const { data: postsResponse, isPending: loading } = useQuery<PostsResponse>({
    queryKey: ['posts', queryParams],
    queryFn: () => fetchPostApi(queryParams),
  });

  const posts = useMemo(
    () => (postsResponse?.posts ? enrichPostsWithUsers(postsResponse.posts, users) : []),
    [postsResponse?.posts, users],
  );
  const total = useMemo(() => postsResponse?.total ?? 0, [postsResponse?.total]);

  return {
    posts,
    loading,
    pageCount: Math.ceil(total / filters.pageSize),
  };
};

const invalidatePosts = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ['posts'] });
};

export const useAddPostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => invalidatePosts(queryClient),
  });
};

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePostById,
    onSuccess: () => invalidatePosts(queryClient),
  });
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePostById,
    onSuccess: () => invalidatePosts(queryClient),
  });
};
