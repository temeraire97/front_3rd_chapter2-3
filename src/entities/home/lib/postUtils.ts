import type { PostsResponse } from '@entities/home/model/types';
import { API_CALLS, type ApiCallType } from './constants';
import { getPosts, getPostsByTag, getPostsBySearch } from '@entities/home/api/postApi';

export type PostParams = {
  limit?: number;
  skip?: number;
  tag?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
};

export const getDefaultParams = (params?: PostParams) => ({
  limit: params?.limit || 10,
  skip: params?.skip || 0,
  sortBy: params?.sortBy || 'createdAt',
  sortOrder: params?.sortOrder || 'desc',
});

export const createApiMap = (params?: PostParams) => {
  const defaultParams = getDefaultParams(params);

  return {
    [API_CALLS.search]: () => {
      if (!params?.search) throw new Error('Search parameter is required');
      return getPostsBySearch({ ...defaultParams, search: params.search });
    },
    [API_CALLS.tag]: () => {
      if (!params?.tag) throw new Error('Tag parameter is required');
      return getPostsByTag({ ...defaultParams, tag: params.tag });
    },
    [API_CALLS.default]: () => getPosts(defaultParams),
  } as Record<ApiCallType, () => Promise<PostsResponse>>;
};

export const getApiCallType = (params?: PostParams): ApiCallType => {
  if (params?.search) return API_CALLS.search;
  if (params?.tag && params?.tag !== 'all') return API_CALLS.tag;
  return API_CALLS.default;
};

export const fetchPosts = async (params?: PostParams): Promise<PostsResponse> => {
  const apiMap = createApiMap(params);
  const apiCallType = getApiCallType(params);
  return apiMap[apiCallType]();
};
