import { atom } from 'jotai';
import type { NewPost, Post } from '@entities/home/model/types';

export const NEW_POST: NewPost = {
  title: '',
  body: '',
  userId: 1,
};
// export const posts = atom<Post[]>([]);
export const totalPosts = atom<number>(0);
export const selectedPost = atom<Post | null>(null);
export const newPost = atom<NewPost>(NEW_POST);
