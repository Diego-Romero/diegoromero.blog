# Pagination fixture contracts

Pages are one-based: page 1 starts at index 0. Page and pageSize are positive
integers supplied by the caller. Input validation is outside these helpers.
Only published, non-archived posts are visible. Preserve input order.
Page counts include a partial final page. An empty collection has zero pages.
Use these invariants when reviewing changes to this directory.
