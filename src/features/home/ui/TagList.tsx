import { FC } from 'react';

import { Post } from '@entities/home/model/types';
import { usePostFilter } from '@/features/home/model/usePostFilter';
const TableTag: FC<{ tag: string }> = ({ tag }) => {
  const {
    filters: { tag: selectedTag },
    setTag: setSelectedTag,
  } = usePostFilter();

  const isSelectedClass =
    selectedTag === tag ? 'text-white bg-blue-500 hover:bg-blue-600' : 'text-blue-800 bg-blue-100 hover:bg-blue-200';

  return (
    <span
      key={tag}
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${isSelectedClass}`}
      onClick={() => {
        setSelectedTag(tag);
      }}
    >
      {tag}
    </span>
  );
};

const TagList: FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {post.tags.map((tag) => (
        <TableTag
          key={tag}
          tag={tag}
        />
      ))}
    </div>
  );
};

export default TagList;