import { useState } from 'react';
import type { Comment, Comments, NewCommnet } from '@/entities/home/model/types';

const useComment = () => {
  const [comments, setComments] = useState<Comments>({});
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [newComment, setNewComment] = useState<NewCommnet>({ body: '', postId: null, userId: 1 });

  const fetchComments = async (postId: number) => {
    if (comments[postId]) return;

    const response = await fetch(`/api/comments/post/${postId}`);
    const data = await response.json();
    setComments((prev) => ({ ...prev, [postId]: data.comments }));
  };

  const addComment = async (comment: NewCommnet) => {
    const response = await fetch('/api/comments/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    });
    const data = await response.json();
    setComments((prev) => ({
      ...prev,
      [data.postId]: [...(prev[data.postId] || []), data],
    }));
    return data;
  };

  const updateComment = async (comment: Comment) => {
    const response = await fetch(`/api/comments/${comment.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: comment.body }),
    });
    const data = await response.json();
    setComments((prev) => ({
      ...prev,
      [data.postId]: prev[data.postId].map((c) => (c.id === data.id ? data : c)),
    }));
    return data;
  };

  const deleteComment = async (id: number, postId: number) => {
    await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].filter((comment) => comment.id !== id),
    }));
  };

  const likeComment = async (id: number, postId: number) => {
    const comment = comments[postId]?.find((c) => c.id === id);
    if (!comment) return;

    const response = await fetch(`/api/comments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likes: comment.likes + 1 }),
    });
    const data = await response.json();
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].map((c) => (c.id === data.id ? data : c)),
    }));
  };

  return {
    comments,
    selectedComment,
    newComment,
    setSelectedComment,
    setNewComment,
    fetchComments,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
  };
};

export default useComment;
