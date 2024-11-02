import { atom } from 'jotai';

import type { Comment } from '@/entities/home/model/types';

export const selectedCommentAtom = atom<Comment | null>(null);
export const isPostCommentEditDialogOpenAtom = atom<boolean>(false);
