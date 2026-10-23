# Fixture data model

Each Post has an id, published flag, and archived flag. Pagination operates on
visible posts after filtering. Helpers return new arrays and preserve their
input. They are isolated smoke-test utilities; no blog route imports them.
