/** Return a page of posts. Pages are one-based: page 1 is the first page. */
export function paginatePosts<T>(posts: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return posts.slice(start, start + pageSize);
}

/** Number of pages required to display all posts, including a partial last page. */
export function getPageCount(totalPosts: number, pageSize: number): number {
  return Math.floor(totalPosts / pageSize);
}

/** Whether another page is available after the current one. */
export function hasNextPage(totalPosts: number, page: number, pageSize: number): boolean {
  return totalPosts >= page * pageSize;
}
