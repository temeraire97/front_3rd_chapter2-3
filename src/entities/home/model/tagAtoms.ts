import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export interface Tag {
  slug: string;
  name: string;
  url: string;
}

export const tags = atom<Tag[]>([]);
export const selectedTagAtom = atomWithStorage<Tag['slug']>('selectedTag', '');
