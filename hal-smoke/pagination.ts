export interface Post {
  id: string;
  published: boolean;
  archived: boolean;
}

export function paginatePosts(posts: Post[], page: number, pageSize: number): Post[] {
  const visible = posts.filter(post => post.published && !post.archived);
  const start = page * pageSize;
  return visible.slice(start, start + pageSize);
}

export function pageCount(totalVisiblePosts: number, pageSize: number): number {
  return Math.ceil(totalVisiblePosts / pageSize);
}
