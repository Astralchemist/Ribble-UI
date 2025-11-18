# Chromatic Visual Regression Testing

This directory contains configuration and documentation for visual regression testing with Chromatic.

## Setup

1. Create a Chromatic account at https://www.chromatic.com/
2. Link your GitHub repository
3. Get your project token
4. Add the token as `CHROMATIC_PROJECT_TOKEN` to your repository secrets

## Running Tests Locally

```bash
# Install chromatic
pnpm add -D chromatic

# Run chromatic
pnpm exec chromatic --project-token=<your-token>
```

## How It Works

1. On every push to `main` or `develop`, Chromatic builds your Storybook
2. Takes snapshots of all stories
3. Compares snapshots to baseline
4. Reports visual changes for review
5. Auto-accepts changes on `main` branch

## Features

- ✅ Automatic visual regression testing
- ✅ Cross-browser testing
- ✅ Component snapshot testing
- ✅ UI Review workflow
- ✅ Accessibility testing integration
- ✅ PR integration with status checks

## Accessibility Testing

The test runner also includes automated accessibility testing using axe-core.
All stories are tested for WCAG 2.1 Level AA compliance.

## Configuration

Visual regression thresholds and settings can be configured in:
- `.storybook/main.ts` - Storybook configuration
- `.github/workflows/chromatic.yml` - CI workflow
- `.storybook/test-runner.ts` - Test runner config

## Best Practices

1. **Consistent States**: Ensure components render in consistent states
2. **Fixed Data**: Use static/mocked data for predictable rendering
3. **Disable Animations**: Consider disabling animations for consistent snapshots
4. **Review Changes**: Always review visual changes before accepting
5. **Viewport Testing**: Test multiple viewport sizes for responsive components

## Resources

- [Chromatic Documentation](https://www.chromatic.com/docs/)
- [Storybook Testing](https://storybook.js.org/docs/react/writing-tests/introduction)
- [Axe Accessibility Testing](https://www.deque.com/axe/)
