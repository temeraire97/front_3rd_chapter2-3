import { FC } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, Edit2, Trash2 } from 'lucide-react';

import { Button } from '@shared/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@shared/ui/Table';

import { useFetchPosts } from '@features/home/api/useFetchPost';

import PostTableTitle from '@features/home/ui/PostTableTitle';
import PostTableAuthor from '@features/home/ui/PostTableAuthor';

const PostTable: FC = () => {
  const { posts, loading } = useFetchPosts();

  if (loading) return <div className="flex justify-center p-4">로딩 중...</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            {/* ID */}
            <TableCell>{post.id}</TableCell>
            {/* 제목 */}
            <TableCell>
              <PostTableTitle post={post} />
            </TableCell>
            {/* 작성자 */}
            <TableCell>
              <PostTableAuthor author={post.author} />
            </TableCell>
            {/* 반응 */}
            <TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            {/* 작업 */}
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openPostDetail(post)}
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedPost(post);
                    setShowEditDialog(true);
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deletePost(post.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

PostTable.displayName = 'PostTable';
export default PostTable;
