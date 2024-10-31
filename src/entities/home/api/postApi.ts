import type { NewPost, Post, PostsResponse } from '@/entities/home/model/types';

type Params = {
  tag?: string;
  search?: string;
  limit: number;
  skip: number;
  sortBy?: string;
  sortOrder?: string;
};

const buildQueryString = (params: Omit<Params, 'tag' | 'search'>) => {
  const baseQuery = `?limit=${params.limit}&skip=${params.skip}`;
  const sortQuery = params.sortBy ? `&sortBy=${params.sortBy}` : '';
  const orderQuery = params.sortOrder ? `&order=${params.sortOrder}` : '';

  return `${baseQuery}${sortQuery}${orderQuery}`;
};

export const getPosts = async (params: Omit<Params, 'tag' | 'search'>): Promise<PostsResponse> => {
  const response = await fetch(`/api/posts${buildQueryString(params)}`);
  const data = await response.json();
  return data;
};

export const getPostsByTag = async (params: Omit<Params, 'search'>): Promise<PostsResponse> => {
  const response = await fetch(`/api/posts/tag/${params.tag}${buildQueryString(params)}`);
  const data = await response.json();
  return data;
};

export const getPostsBySearch = async (params: Omit<Params, 'tag'>): Promise<PostsResponse> => {
  const response = await fetch(`/api/posts/search?q=${params.search}${buildQueryString(params).replace('?', '&')}`);
  const data = await response.json();
  return data;
};

export const addPost = async (post: NewPost): Promise<NewPost & { id: number }> => {
  const response = await fetch('/api/posts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  return response.json();
};

export const updatePost = async (post: Post): Promise<Omit<Post, 'author' | 'views'>> => {
  const response = await fetch(`/api/posts/${post.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  return response.json();
};

export const deletePost = async (id: number): Promise<void> => {
  await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });
};
