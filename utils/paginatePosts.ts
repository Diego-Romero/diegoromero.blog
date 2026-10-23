/** Return a page of posts. Pages are one-based: page 1 is the first page. */
export function paginatePosts<T>(posts: T[], page: number, pageSize: number): T[] {
  const start = page * pageSize;
  return posts.slice(start, start + pageSize);
}

/** Whether another page is available after the current one. */
export function hasNextPage(totalPosts: number, page: number, pageSize: number): boolean {
  return totalPosts >= page * pageSize;
}
