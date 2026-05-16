# Security Spec

## Data Invariants
1. A ContactMessage can be created by anyone (anonymous or signed in).
2. A ContactMessage must have name, email, message, and createdAt (server timestamp).
3. A ContactMessage cannot be modified or deleted.
4. Only Admin (or no one, realistically, since this is a portfolio frontend) can list/read them. For safety, reads are DENIED to everyone except if there's an admin bypass.

## The Dirty Dozen Payloads
1. Empty object
2. Missing name
3. Missing email
4. Missing message
5. Missing createdAt
6. `createdAt` is a future client timestamp
7. Strings exceed max bounds (e.g., message > 2000 chars)
8. Types are wrong (e.g., number for name)
9. Extraneous shadow field (e.g., `isVerified: true`)
10. Update attempt
11. Delete attempt
12. Read attempt

## Test Runner
(Will be implemented in `firestore.rules.test.ts`)
