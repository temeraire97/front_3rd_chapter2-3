import { FC } from 'react';

import { Textarea } from '@shared/ui/Textarea';

import { useComment } from '@/features/home/model/useComment';

const PostCommentTextarea: FC = () => {
  const { selectedComment, setSelectedComment } = useComment();

  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!selectedComment) return;

    setSelectedComment({ ...selectedComment, body: e.target.value });
  }

  return (
    <Textarea
      placeholder="댓글 내용"
      value={selectedComment?.body || ''}
      onChange={handleTextareaChange}
    />
  );
};

export default PostCommentTextarea;
