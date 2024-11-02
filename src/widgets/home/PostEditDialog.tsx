import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@shared/ui/Dialog';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { Textarea } from '@shared/ui/Textarea';

import { useUpdatePost } from '@/features/home/api/useFetchPost';
import { usePost } from '@/features/home/model/usePost';

const PostEditDialog = () => {
  const { selectedPost, isPostEditDialogOpen, setIsPostEditDialogOpen } = usePost();
  const { mutate: updatePost } = useUpdatePost();

  return (
    <Dialog
      open={isPostEditDialogOpen}
      onOpenChange={setIsPostEditDialogOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ''}
            onChange={(e) => selectedPost && setSelectedPost({ ...selectedPost, title: e.target.value })}
          />

          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ''}
            onChange={(e) => selectedPost && setSelectedPost({ ...selectedPost, body: e.target.value })}
          />

          <Button onClick={() => selectedPost && updatePost(selectedPost)}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

PostEditDialog.displayName = 'PostEditDialog';
export default PostEditDialog;
