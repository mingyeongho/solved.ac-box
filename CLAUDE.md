# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

solved.ac-box is a pinned-gist automation tool that fetches user stats from solved.ac (a competitive programming platform) and updates a GitHub Gist with tier, rating, and solved problem count.

## Development Commands

```bash
# Install dependencies
pnpm install

# Run in development mode (executes TypeScript directly)
pnpm dev

# Build TypeScript to JavaScript
pnpm build
```

Note: The build script in package.json is incomplete (ends with "tsc && "). This may need correction if a full build process is required.

## Architecture

### Code Structure

The codebase follows a simple three-file architecture:

- **src/index.ts**: Main entry point that orchestrates the entire workflow:
  1. Loads environment variables from `.env`
  2. Fetches user data from solved.ac API
  3. Formats the data into display lines
  4. Updates the GitHub Gist with new content and filename

- **src/queries.ts**: API integration layer containing `solvedacQuery()` function that fetches user data from solved.ac's REST API (`https://solved.ac/api/v3/user/show`)

- **src/common.ts**: Shared constants and types, specifically the `TIERS` mapping object that converts tier numbers (0-31) to human-readable tier names (Bronze V through Master)

### Data Flow

1. Environment variables (USERNAME, GH_TOKEN, GIST_ID) are loaded via dotenv
2. User stats are fetched from solved.ac API using the username
3. Response contains: handle, class, rating, bio, tier, solvedCount
4. Data is formatted into three lines: Description (bio), Rating, Solved count
5. GitHub Gist is retrieved and updated with new filename (tier + rating) and content

### Key Implementation Details

- Uses Octokit REST API client for GitHub Gist operations
- Gist filename is dynamically set to display tier and rating (e.g., "Gold III, 1750")
- Updates the first file in the gist (uses `Object.keys(gist.data.files)[0]`)
- The TIERS constant has a typo: key `50` should likely be `5` for "Bronze I"

### Environment Variables Required

The application expects these variables in `.env`:
- `USERNAME`: solved.ac username to fetch stats for
- `GH_TOKEN`: GitHub personal access token with gist write permissions
- `GIST_ID`: ID of the gist to update

### TypeScript Configuration

- Targets ES2020 with ESNext modules
- Strict mode enabled with noUnusedLocals and noImplicitAny
- Compiles to `dist/` directory
- Uses Node module resolution
