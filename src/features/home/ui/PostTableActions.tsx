import { FC } from 'react';
import { Button } from '@shared/ui/Button';
import { MessageSquare, Edit2, Trash2 } from 'lucide-react';

import type { Post } from '@/entities/home/model/types';
import { useDeletePost } from '@/features/home/api/useFetchPost';
import { usePost } from '@/features/home/model/usePost';

// 게시물 상세 보기
const PostDetailDialogOpenButton: FC<{ post: Post }> = ({ post }) => {
  const { setSelectedPost, setIsPostDetailDialogOpen } = usePost();

  function handlePostDetailDialogOpen() {
    setSelectedPost(post);
    setIsPostDetailDialogOpen(true);
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handlePostDetailDialogOpen}
    >
      <MessageSquare className="w-4 h-4" />
    </Button>
  );
};

// 게시물 수정 다이얼로그 열기
const PostEditDialogOpenButton: FC<{ post: Post }> = ({ post }) => {
  const { setSelectedPost, setIsPostEditDialogOpen } = usePost();

  function handlePostEditDialogOpen() {
    setSelectedPost(post);
    setIsPostEditDialogOpen(true);
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handlePostEditDialogOpen}
    >
      <Edit2 className="w-4 h-4" />
    </Button>
  );
};

const PostDeleteButton: FC<{ post: Post }> = ({ post }) => {
  const { mutate: deletePost } = useDeletePost();

  function handlePostDelete() {
    deletePost(post.id);
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handlePostDelete}
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
};

const PostTableActions: FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="flex items-center gap-2">
      <PostDetailDialogOpenButton post={post} />
      <PostEditDialogOpenButton post={post} />
      <PostDeleteButton post={post} />
    </div>
  );
};

PostTableActions.displayName = 'PostTableActions';
export default PostTableActions;
