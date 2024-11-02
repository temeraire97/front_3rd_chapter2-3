import { useAtom } from 'jotai';

import { useFetchComments } from '@/features/home/api/useFetchComment';

import { usePost } from '@/features/home/model/usePost';
import { selectedCommentAtom, isPostCommentEditDialogOpenAtom } from '@/entities/home/model/commentAtoms';

export const useCommentList = () => {
  const { selectedPost } = usePost();
  const { comments, isLoading } = useFetchComments(selectedPost?.id ?? 0);

  return { comments, isLoading };
};

export const useComment = () => {
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom);
  const [isPostCommentEditDialogOpen, setIsPostCommentEditDialogOpen] = useAtom(isPostCommentEditDialogOpenAtom);

  return { selectedComment, setSelectedComment, isPostCommentEditDialogOpen, setIsPostCommentEditDialogOpen };
};
