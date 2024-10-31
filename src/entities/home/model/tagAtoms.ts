import { atom } from 'jotai';

import type { Tag } from '@/entities/home/model/types';

export const tags = atom<Tag[]>([]);
