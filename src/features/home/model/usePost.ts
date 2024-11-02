import { useAtom } from 'jotai';
import { selectedPostAtom, isPostDetailDialogOpenAtom, isPostEditDialogOpenAtom } from '@entities/home/model/postAtoms';

export const usePost = () => {
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);
  const [isPostDetailDialogOpen, setIsPostDetailDialogOpen] = useAtom(isPostDetailDialogOpenAtom);
  const [isPostEditDialogOpen, setIsPostEditDialogOpen] = useAtom(isPostEditDialogOpenAtom);

  return {
    selectedPost,
    isPostDetailDialogOpen,
    isPostEditDialogOpen,
    setSelectedPost,
    setIsPostDetailDialogOpen,
    setIsPostEditDialogOpen,
  };
};
