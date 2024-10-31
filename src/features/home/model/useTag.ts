import { useAtom } from 'jotai';
import type { Tag } from '@/entities/home/model/tagAtoms';
import { selectedTagAtom } from '@/entities/home/model/tagAtoms';

const useTag = () => {
  const [selectedTag, setSelectedTag] = useAtom<Tag['slug']>(selectedTagAtom);

  return { selectedTag, setSelectedTag };
};

export default useTag;
