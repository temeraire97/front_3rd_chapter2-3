import type { Post, User } from '../model/types';

export const enrichPostsWithUsers = (posts: Post[], users: User[]) => {
  console.log('posts', posts);
  console.log('users', users);
  return posts.map((post) => ({
    ...post,
    author: users.find((user) => user.id === post.userId),
  }));
};
