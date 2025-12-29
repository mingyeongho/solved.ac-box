# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

solved.ac-box is a pinned-gist automation tool that fetches user stats from solved.ac (a competitive programming platform) and updates a GitHub Gist with tier, rating, rank, and solved problem count displayed as a formatted progress box.

## Development Commands

```bash
# Install dependencies
pnpm install

# Run in development mode (executes TypeScript directly)
pnpm dev

# Run tests
pnpm test

# Run tests in watch mode
vitest --watch
```

## Architecture

### Code Structure

The codebase is organized into focused modules:

- **src/index.ts**: Main orchestration layer
  1. Loads environment variables from `.env`
  2. Fetches user data from solved.ac API via `solvedacQuery()`
  3. Formats four lines of display content using utility functions
  4. Updates GitHub Gist with new content

- **src/queries.ts**: API integration layer that fetches user data from `https://solved.ac/api/v3/user/show` with Korean language option

- **src/common.ts**: Shared constants and types
  - `FULL_WIDTH = 52`: Maximum character width for gist display
  - `TIERS`: Object mapping tier numbers (0-31) to tier metadata with `label` and `startRating` properties

- **src/utils.ts**: Text formatting and tier calculation utilities
  - `generateBarChart()`: Creates Unicode progress bars (cloned from waka-box)
  - `getCurrTierInfo()` / `getNextTierInfo()`: Tier navigation with type-safe guards
  - `getPercent()`: Calculates progress percentage with special handling for Master tier (can exceed 3000 rating)
  - `between()`: Justifies text to both edges within a width

- **src/utils.test.ts**: Vitest test suite for utility functions

### Data Flow

1. Environment variables (USERNAME, GH_TOKEN, GIST_ID) loaded via dotenv
2. User stats fetched: `{ handle, bio, tier, rating, rank, solvedCount, class }`
3. Four lines formatted:
   - Line 1: Current tier/rating and points until next tier (using `between()` with `FULL_WIDTH - 2`)
   - Line 2: Progress bar showing percentage to next tier (using `generateBarChart()` with full width)
   - Line 3: User bio (plain text)
   - Line 4: Solved count and rank with emoji icons and manual padding
4. Gist updated with static filename `"[ Solved.ac Status ]"` and formatted content

### Key Implementation Details

**Tier System:**
- TIERS maps 0-31 to tier labels (Unrated, Bronze V-I, Silver V-I, Gold V-I, Platinum V-I, Diamond V-I, Ruby V-I, Master)
- Each tier has `label` and `startRating` properties
- Next tier calculation uses type guard `isTTier()` to avoid type assertions
- Master tier (31) has no next tier and can exceed 3000 rating

**Text Layout Constraints:**
- `FULL_WIDTH = 52`: Empirically determined safe width for GitHub Gist display
- `between(left, right, width)`: Uses `width - 1 - right.length` for padding to account for spacing
  - Formula: `left.padEnd(width - 1 - right.length, " ") + right`
  - The `-1` adjustment is critical for proper alignment with emojis
- Line 4 uses manual padding with `padEnd()` and `padStart()` instead of utility functions

**Width Adjustments:**
- Line 1 uses `FULL_WIDTH - 2` when calling `between()` to prevent overflow
- Line 2 uses full `FULL_WIDTH` for the progress bar
- Line 4 uses hardcoded padding values (5, 14) with emoji prefixes

**API Integration:**
- solved.ac API v3 with `x-solvedac-language=ko` for Korean labels
- No authentication required for public user data
- Returns ISolvedUser interface with all stats

**GitHub Gist:**
- Uses Octokit REST client
- Updates first file in gist: `Object.keys(gist.data.files)[0]`
- Filename is static: `"[ Solved.ac Status ]"`
- Content is 4 newline-separated lines

### Environment Variables Required

- `USERNAME`: solved.ac username
- `GH_TOKEN`: GitHub personal access token with `gist` scope
- `GIST_ID`: Gist ID from URL (alphanumeric string after gist.github.com/)

For local development, create `.env` file. For GitHub Actions, set as repository secrets.

### GitHub Actions Automation

`.github/workflows/schedule.yml`:
- Daily execution at UTC 15:00 (Korean midnight)
- Manual trigger via workflow_dispatch
- Uses pnpm 10.22.0 and Node.js 20
- Requires USERNAME, GH_TOKEN, GIST_ID as repository secrets

Forked repositories must:
1. Enable GitHub Actions (disabled by default on forks)
2. Add the three secrets in Settings > Secrets and variables > Actions
3. Manually trigger first run to initialize the gist

### Testing

- Uses Vitest for testing
- Test file: `src/utils.test.ts`
- Tests cover utility functions with edge cases (0%, 100%, tier boundaries, etc.)
- Run with `pnpm test` or `vitest --watch`

### Important Notes on Text Formatting

When modifying text layout functions:
- The `between()` function uses `width - 1 - right.length` for padding calculation
- This `-1` adjustment is necessary for proper alignment when emojis are present
- Different lines use different width values (line 1: `FULL_WIDTH - 2`, line 2: `FULL_WIDTH`)
- Do not change FULL_WIDTH without testing the actual gist rendering on GitHub
- Emoji characters render differently in GitHub's monospace display, requiring empirical width tuning
