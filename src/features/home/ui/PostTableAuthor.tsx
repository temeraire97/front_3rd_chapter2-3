import { FC } from 'react';

import { Post } from '@entities/home/model/types';
import { useFetchUser } from '@/features/home/api/useFetchUser';

import { useUser } from '@/features/home/model/useUser';

const PostTableAuthor: FC<{ author: Post['author'] }> = ({ author }) => {
  const { fetchUser } = useFetchUser(author?.id ?? 0);
  const { setIsUserDialogOpen } = useUser();

  function handleOpenUserDialog() {
    fetchUser();
    setIsUserDialogOpen(true);
  }

  return (
    <div
      className="flex items-center space-x-2 cursor-pointer"
      onClick={handleOpenUserDialog}
    >
      <img
        src={author?.image}
        alt={author?.username}
        className="w-8 h-8 rounded-full"
      />
      <span>{author?.username}</span>
    </div>
  );
};

export default PostTableAuthor;
