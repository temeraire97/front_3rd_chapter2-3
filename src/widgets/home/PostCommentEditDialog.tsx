import { FC } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@shared/ui/Dialog';

import { useComment } from '@features/home/model/useComment';
import PostCommentTextarea from '@features/home/ui/PostCommentTextarea';
import PostCommentUpdateButton from '@/features/home/ui/PostCommentUpdateButton';

const PostCommentEditDialog: FC = () => {
  const { isPostCommentEditDialogOpen, setIsPostCommentEditDialogOpen } = useComment();

  return (
    <Dialog
      open={isPostCommentEditDialogOpen}
      onOpenChange={setIsPostCommentEditDialogOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <PostCommentTextarea />
          {/* 댓글 업데이트 */}
          <PostCommentUpdateButton />
        </div>
      </DialogContent>
    </Dialog>
  );
};

PostCommentEditDialog.displayName = 'PostCommentEditDialog';
export default PostCommentEditDialog;
