import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { enrichPostsWithUsers } from '@entities/home/lib/userUtils';
import useUser from '@features/home/model/useUser';

import { fetchPosts, type PostParams } from '@entities/home/lib/postUtils';
import {
  addPost as addPostApi,
  updatePost as updatePostApi,
  deletePost as deletePostApi,
} from '@entities/home/api/postApi';

const usePost = (params?: PostParams) => {
  const queryClient = useQueryClient();
  const { users } = useUser();

  const { data: postsResponse, isPending: loading } = useQuery({
    queryKey: ['posts', params],
    queryFn: () => fetchPosts(params),
    enabled: true,
  });

  const { mutateAsync: addPost } = useMutation({
    mutationFn: addPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const { mutateAsync: updatePost } = useMutation({
    mutationFn: updatePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const { mutateAsync: deletePost } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const posts = useMemo(() => {
    return postsResponse?.posts ? enrichPostsWithUsers(postsResponse.posts, users) : [];
  }, [postsResponse?.posts, users]);
  const total = useMemo(() => postsResponse?.total ?? 0, [postsResponse?.total]);

  return {
    posts,
    total,
    loading,
    addPost,
    updatePost,
    deletePost,
  };
};

export default usePost;
