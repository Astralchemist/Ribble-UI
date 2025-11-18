# Accessibility Guidelines

Ribble UI is built with accessibility as a core principle. All components follow WCAG 2.1 Level AA standards.

## Table of Contents

- [Overview](#overview)
- [Component-Specific Guidelines](#component-specific-guidelines)
- [Testing for Accessibility](#testing-for-accessibility)
- [Common Patterns](#common-patterns)
- [Resources](#resources)

## Overview

### Core Principles

1. **Perceivable**: All UI components provide text alternatives and are distinguishable
2. **Operable**: All functionality is available from keyboard
3. **Understandable**: UI behaves in predictable ways
4. **Robust**: Compatible with assistive technologies

### Keyboard Navigation

All interactive components support keyboard navigation:

- `Tab` - Move focus forward
- `Shift+Tab` - Move focus backward
- `Enter/Space` - Activate buttons and links
- `Escape` - Close modals, menus, and tooltips
- `Arrow keys` - Navigate within composite widgets

### Screen Reader Support

Components include proper ARIA attributes:

- `role` - Semantic role of element
- `aria-label` - Accessible name
- `aria-labelledby` - Reference to labeling element
- `aria-describedby` - Reference to description
- `aria-expanded` - State of expandable elements
- `aria-selected` - Selection state
- `aria-disabled` - Disabled state
- `aria-invalid` - Validation state
- `aria-live` - Live region updates

## Component-Specific Guidelines

### Button

```html
<!-- Good: Clear accessible name -->
<ribble-button>Submit Form</ribble-button>
<ribble-button aria-label="Close modal">
  <ribble-icon name="x"></ribble-icon>
</ribble-button>

<!-- Bad: No accessible name -->
<ribble-button>
  <ribble-icon name="x"></ribble-icon>
</ribble-button>
```

**Requirements:**
- Must have accessible name (text content or `aria-label`)
- Disabled buttons should have `aria-disabled="true"`
- Loading state should have `aria-busy="true"`

### Input

```html
<!-- Good: Properly labeled -->
<ribble-input
  id="email"
  label="Email Address"
  type="email"
  required
  aria-describedby="email-help">
</ribble-input>
<span id="email-help">We'll never share your email</span>

<!-- Bad: No label -->
<ribble-input type="email"></ribble-input>
```

**Requirements:**
- Must have associated label
- Required inputs should have `required` attribute and `aria-required="true"`
- Invalid inputs should have `aria-invalid="true"` and error message
- Use `aria-describedby` for help text

### Modal

```html
<ribble-modal
  open
  title="Confirm Action"
  aria-labelledby="modal-title"
  aria-describedby="modal-description">
  <h2 id="modal-title" slot="header">Confirm Action</h2>
  <p id="modal-description">Are you sure you want to delete this item?</p>
</ribble-modal>
```

**Requirements:**
- Must have `role="dialog"` and `aria-modal="true"`
- Should trap focus within modal
- Should return focus to trigger element on close
- Must have accessible title via `aria-labelledby`
- Should close on `Escape` key
- Background should be inert when modal is open

### Menu

```html
<ribble-menu>
  <ribble-button slot="trigger" aria-haspopup="true" aria-expanded="false">
    Options
  </ribble-button>
  <ribble-menu-item value="edit">Edit</ribble-menu-item>
  <ribble-menu-item value="delete">Delete</ribble-menu-item>
</ribble-menu>
```

**Requirements:**
- Trigger must have `aria-haspopup="true"`
- Trigger must have `aria-expanded` reflecting state
- Menu items must have `role="menuitem"`
- Support arrow key navigation
- Close on `Escape` or click outside

### Form

```html
<ribble-form>
  <fieldset>
    <legend>Personal Information</legend>
    <ribble-input name="name" label="Full Name" required></ribble-input>
    <ribble-input name="email" label="Email" type="email" required></ribble-input>
  </fieldset>
</ribble-form>
```

**Requirements:**
- Group related fields in `<fieldset>` with `<legend>`
- Provide clear error messages
- Show validation errors inline and in summary
- Allow form submission via Enter key

### Toast Notifications

```html
<ribble-toast
  type="success"
  role="alert"
  aria-live="polite">
  Item saved successfully
</ribble-toast>
```

**Requirements:**
- Must have `role="alert"` or `role="status"`
- Use `aria-live="polite"` for non-critical messages
- Use `aria-live="assertive"` for critical errors
- Provide dismiss button with accessible label

## Testing for Accessibility

### Automated Testing

```bash
# Run accessibility tests
pnpm test:a11y
```

Our test suite includes:
- axe-core for automated WCAG checks
- Pa11y for additional rule coverage
- Color contrast validation
- Keyboard navigation tests

### Manual Testing Checklist

- [ ] Keyboard navigation works without mouse
- [ ] Focus indicators are visible
- [ ] Screen reader announces all content correctly
- [ ] Color is not the only indicator of state
- [ ] Text has sufficient contrast (4.5:1 minimum)
- [ ] Interactive elements have adequate hit areas (44x44px minimum)
- [ ] Forms can be completed using only keyboard
- [ ] Error messages are clear and actionable

### Testing with Screen Readers

**NVDA (Windows - Free)**
```
Ctrl+Alt+N - Start NVDA
Insert+Down Arrow - Read current line
Insert+Space - Enter focus mode
```

**JAWS (Windows - Commercial)**
```
JAWSKey+T - Read title
JAWSKey+Down Arrow - Read current line
Insert+F5 - List form fields
```

**VoiceOver (macOS - Built-in)**
```
Cmd+F5 - Toggle VoiceOver
VO+A - Read all
VO+Right Arrow - Next item
Control - Stop reading
```

**NVDA / JAWS Cheat Sheets**: Available in `/docs/accessibility/screen-readers/`

## Common Patterns

### Skip Links

```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<main id="main-content">
  <!-- Content -->
</main>
```

### Focus Management

```typescript
// Trap focus within modal
const modal = document.querySelector('ribble-modal');
modal.addEventListener('open', () => {
  modal.trapFocus();
});

modal.addEventListener('close', () => {
  modal.restoreFocus();
});
```

### ARIA Live Regions

```html
<!-- Status messages -->
<div role="status" aria-live="polite" aria-atomic="true">
  <ribble-toast>Changes saved</ribble-toast>
</div>

<!-- Error messages -->
<div role="alert" aria-live="assertive" aria-atomic="true">
  <ribble-toast type="error">Connection lost</ribble-toast>
</div>
```

### Color Contrast

**Minimum Ratios (WCAG AA):**
- Normal text: 4.5:1
- Large text (18pt+): 3:1
- UI components: 3:1

**Testing:**
```bash
# Check color contrast
pnpm run contrast-check
```

### Responsive and Mobile

- Ensure touch targets are at least 44x44 CSS pixels
- Support zoom up to 200% without horizontal scrolling
- Test with screen orientation changes
- Verify focus indicators work on touch devices

## Accessibility Audit Tools

### Browser Extensions

- **axe DevTools** - Chrome, Firefox, Edge
- **WAVE** - Chrome, Firefox, Edge
- **Lighthouse** - Chrome DevTools
- **Accessibility Insights** - Chrome, Edge

### Command Line

```bash
# Run full accessibility audit
pnpm run a11y:audit

# Check specific component
pnpm run a11y:check -- --component=button
```

### Continuous Monitoring

Our CI/CD pipeline automatically:
- Runs axe-core on all Storybook stories
- Checks color contrast ratios
- Validates semantic HTML
- Tests keyboard navigation
- Reports violations as PR comments

## Common Issues and Solutions

### Issue: Focus not visible
**Solution:** Ensure focus styles are defined
```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Issue: Screen reader skips content
**Solution:** Use semantic HTML and proper ARIA
```html
<!-- Bad -->
<div onclick="submit()">Submit</div>

<!-- Good -->
<button type="submit">Submit</button>
```

### Issue: Form errors not announced
**Solution:** Use aria-live regions
```html
<div role="alert" aria-live="assertive">
  <span id="error-message">Email is required</span>
</div>
<ribble-input aria-invalid="true" aria-describedby="error-message"></ribble-input>
```

## Resources

### WCAG Guidelines
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [Understanding WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### Testing Tools
- [axe Accessibility Checker](https://www.deque.com/axe/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Pa11y](https://pa11y.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Learning Resources
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Inclusive Components](https://inclusive-components.design/)

### Support
For accessibility questions or to report issues:
- GitHub Issues: [Report Accessibility Issue](https://github.com/Astralchemist/Ribble-UI/issues/new?labels=accessibility)
- Email: accessibility@ribble-ui.dev

## Legal Compliance

Ribble UI components are designed to help you comply with:
- **ADA** (Americans with Disabilities Act)
- **Section 508** (US Federal Accessibility Standards)
- **AODA** (Accessibility for Ontarians with Disabilities Act)
- **EN 301 549** (European Standard for Digital Accessibility)

**Note:** While we strive for compliance, ultimate responsibility for accessibility lies with the implementation. Always test your specific use cases.
