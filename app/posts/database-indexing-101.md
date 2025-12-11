# Database Indexing: How It Works and When to Use It

Indexes help databases find data faster, like a book's index helping you find information quickly.

## What is an Index?
An index is a separate data structure that stores a subset of table data for quick lookups.

## Common Index Types
B-Tree indexes are the most common and good for range queries. Hash indexes are fast for exact matches. Composite indexes cover multiple columns.

## When to Use Indexes
Primary keys are automatically indexed. Add indexes to foreign key columns and columns frequently used in WHERE clauses or ORDER BY statements.

## Things to Remember
Indexes take additional storage space and can slow down write operations (INSERT, UPDATE, DELETE). Don't index every column - only index what you actually query.

Start with indexing important columns and monitor query performance to decide if more indexes are needed.