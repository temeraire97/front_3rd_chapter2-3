import { FC } from 'react';

import { Button } from '@/shared/ui/Button';

import { useComment } from '@/features/home/model/useComment';
import { useUpdateComment } from '@/features/home/api/useFetchComment';

const PostCommentUpdateButton: FC = () => {
  const { selectedComment } = useComment();
  const { mutate: updateComment } = useUpdateComment();

  function handleCommentUpdate() {
    if (!selectedComment) return;

    updateComment(selectedComment);
  }

  return <Button onClick={handleCommentUpdate}>댓글 업데이트</Button>;
};

PostCommentUpdateButton.displayName = 'PostCommentUpdateButton';
export default PostCommentUpdateButton;
