# Security Policy

This repository contains reusable skill instructions and templates for AI coding agents. It should stay safe to clone, review, and publish.

## Supported Review Flow

Before publishing changes:

1. Run `npm run validate`.
2. Confirm no real secrets were added to examples, templates, or markdown.
3. Prefer secure-cookie guidance over browser token persistence unless a file explicitly documents an accepted tradeoff.
4. Keep privileged BaaS operations behind security rules or server-side functions.

## Reporting

If you find a security issue in the skills, templates, or validation flow, open a private report with the repository maintainer before publishing a public issue.
