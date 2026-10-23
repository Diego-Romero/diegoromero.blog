import assert from 'node:assert/strict';
import { test } from 'node:test';
import { pagePosts, visiblePosts } from './post-window.ts';

const post = (id, published = true, archived = false) => ({ id, published, archived });

test('hides unpublished posts and preserves visible order', () => {
  assert.deepEqual(visiblePosts([post('a'), post('hidden', false), post('b')]).map(p => p.id), ['a', 'b']);
});

test('first page is one-based and leaves caller input intact', () => {
  const posts = [post('a'), post('b'), post('c')];
  assert.deepEqual(pagePosts(posts, 1, 2).map(p => p.id), ['a', 'b']);
  assert.equal(posts.length, 3);
});
