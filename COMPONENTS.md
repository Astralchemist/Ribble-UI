# Ribble UI Components

Complete component library documentation.

## 📝 Form Components

### Input
Text input field with label, validation, and helper text support.

```html
<ui-input
  label="Username"
  placeholder="Enter username"
  type="text"
  required
  helper="Choose a unique username"
  error="Username is required">
</ui-input>
```

**Props:**
- `type`: Input type (text, email, password, etc.)
- `value`: Input value
- `label`: Input label
- `placeholder`: Placeholder text
- `disabled`: Disable input
- `required`: Mark as required
- `error`: Error message
- `helper`: Helper text

### Checkbox
Checkbox input with label support.

```html
<ui-checkbox label="Accept terms" checked></ui-checkbox>
```

**Props:**
- `checked`: Checked state
- `label`: Checkbox label
- `disabled`: Disable checkbox
- `value`: Checkbox value

### Radio
Radio button input.

```html
<ui-radio name="plan" label="Pro Plan" value="pro" checked></ui-radio>
```

**Props:**
- `checked`: Checked state
- `label`: Radio label
- `name`: Radio group name
- `value`: Radio value
- `disabled`: Disable radio

### Select
Dropdown select field.

```html
<ui-select label="Country" id="country"></ui-select>
<script>
  document.getElementById('country').options = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' }
  ];
</script>
```

**Props:**
- `label`: Select label
- `value`: Selected value
- `options`: Array of options
- `disabled`: Disable select
- `required`: Mark as required

### Textarea
Multi-line text input.

```html
<ui-textarea
  label="Message"
  placeholder="Enter message..."
  rows="4"
  maxlength="200">
</ui-textarea>
```

**Props:**
- `label`: Textarea label
- `value`: Textarea value
- `placeholder`: Placeholder text
- `rows`: Number of rows
- `maxlength`: Maximum character length
- `disabled`: Disable textarea

### Switch
Toggle switch component.

```html
<ui-switch label="Dark Mode" checked></ui-switch>
```

**Props:**
- `checked`: Checked state
- `label`: Switch label
- `disabled`: Disable switch
- `value`: Switch value

---

## 📐 Layout Components

### Card
Container card with header, body, and footer.

```html
<ui-card title="Card Title" subtitle="Card subtitle" hoverable>
  <p>Card content goes here</p>
  <div slot="footer">
    <ui-badge variant="primary">New</ui-badge>
  </div>
</ui-card>
```

**Props:**
- `title`: Card title
- `subtitle`: Card subtitle
- `hoverable`: Add hover effect
- `clickable`: Make card clickable
- `no-padding`: Remove padding from body

### Container
Layout container with grid and flex support.

```html
<!-- Grid Layout -->
<ui-container grid cols="3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ui-container>

<!-- Flex Layout -->
<ui-container flex justify="between" align="center">
  <div>Left</div>
  <div>Right</div>
</ui-container>
```

**Props:**
- `fluid`: Full width container
- `grid`: Enable grid layout
- `flex`: Enable flex layout
- `cols`: Number of grid columns
- `justify`: Flex justify content
- `align`: Flex align items
- `direction`: Flex direction (row/column)

### Divider
Visual separator with optional text.

```html
<ui-divider></ui-divider>
<ui-divider text="OR"></ui-divider>
<ui-divider dashed text="Section"></ui-divider>
```

**Props:**
- `text`: Divider text
- `dashed`: Use dashed line
- `vertical`: Vertical divider

---

## 💬 Feedback Components

### Alert
Alert messages with different types.

```html
<ui-alert
  type="success"
  title="Success!"
  message="Changes saved successfully"
  dismissible>
</ui-alert>
```

**Props:**
- `type`: Alert type (info, success, warning, error)
- `title`: Alert title
- `message`: Alert message
- `dismissible`: Show dismiss button

### Modal
Modal dialog component.

```html
<ui-modal id="modal" title="Modal Title" size="medium">
  <p>Modal content</p>
  <div slot="footer">
    <button onclick="document.getElementById('modal').close()">Close</button>
  </div>
</ui-modal>
```

**Props:**
- `open`: Open state
- `title`: Modal title
- `size`: Modal size (small, medium, large, full)
- `close-on-overlay`: Close when clicking overlay

**Methods:**
- `show()`: Open modal
- `close()`: Close modal

### Progress
Progress bar component.

```html
<ui-progress
  value="75"
  label="Upload Progress"
  show-value
  striped
  animated>
</ui-progress>
```

**Props:**
- `value`: Progress value (0-100)
- `max`: Maximum value
- `label`: Progress label
- `show-value`: Show percentage
- `striped`: Striped style
- `animated`: Animate stripes
- `variant`: Color variant (default, success, warning, error)

### Spinner
Loading spinner component.

```html
<ui-spinner type="circular" label="Loading..."></ui-spinner>
<ui-spinner type="dots" size="large"></ui-spinner>
<ui-spinner type="pulse"></ui-spinner>
```

**Props:**
- `type`: Spinner type (circular, dots, pulse)
- `size`: Spinner size (small, medium, large)
- `label`: Loading label

---

## 🧭 Navigation Components

### Tabs
Tabbed navigation component.

```html
<ui-tabs id="tabs"></ui-tabs>
<script>
  document.getElementById('tabs').tabs = [
    { label: 'Tab 1', content: 'Content 1' },
    { label: 'Tab 2', content: 'Content 2' }
  ];
</script>
```

**Props:**
- `active-tab`: Active tab index
- `tabs`: Array of tab objects

### Breadcrumbs
Breadcrumb navigation.

```html
<ui-breadcrumbs id="breadcrumbs"></ui-breadcrumbs>
<script>
  document.getElementById('breadcrumbs').items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Item' }
  ];
</script>
```

**Props:**
- `items`: Array of breadcrumb items
- `separator`: Separator character (default: /)

### Pagination
Pagination component.

```html
<ui-pagination
  current-page="5"
  total-pages="10"
  show-info>
</ui-pagination>
```

**Props:**
- `current-page`: Current page number
- `total-pages`: Total number of pages
- `show-info`: Show page info
- `sibling-count`: Number of sibling pages

---

## 📊 Data Display Components

### Badge
Small badge component.

```html
<ui-badge variant="primary" text="New"></ui-badge>
<ui-badge variant="success" outline text="Active"></ui-badge>
<ui-badge variant="error" dot></ui-badge>
```

**Props:**
- `variant`: Badge variant (primary, secondary, success, warning, error, info)
- `text`: Badge text
- `outline`: Outline style
- `dot`: Show as dot only

### Avatar
User avatar component.

```html
<ui-avatar initials="JD" size="medium" status="online"></ui-avatar>
<ui-avatar src="image.jpg" alt="User" square></ui-avatar>
```

**Props:**
- `src`: Image source
- `alt`: Image alt text
- `initials`: User initials
- `size`: Avatar size (small, medium, large)
- `square`: Square shape
- `status`: Status indicator (online, offline, busy, away)

### Table
Data table with sorting.

```html
<ui-table id="table" bordered striped hoverable></ui-table>
<script>
  const table = document.getElementById('table');
  table.columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true }
  ];
  table.data = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' }
  ];
</script>
```

**Props:**
- `columns`: Array of column definitions
- `data`: Array of data rows
- `bordered`: Add borders
- `striped`: Striped rows
- `hoverable`: Hover effect
- `compact`: Compact padding
- `sort-by`: Column to sort by
- `sort-order`: Sort order (asc/desc)

### Accordion
Collapsible accordion component.

```html
<ui-accordion id="accordion" multiple></ui-accordion>
<script>
  document.getElementById('accordion').items = [
    { title: 'Section 1', content: 'Content 1' },
    { title: 'Section 2', content: 'Content 2' }
  ];
</script>
```

**Props:**
- `items`: Array of accordion items
- `multiple`: Allow multiple open sections

---

## 🎨 Design Tokens

All components use CSS custom properties for theming:

```css
:root {
  --color-primary: #007bff;
  --color-success: #4caf50;
  --color-warning: #ff9800;
  --color-error: #f44336;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --font-size-base: 1rem;
}
```

---

## 🚀 Usage

### Vanilla JavaScript
```html
<script type="module">
  import '@ribble-ui/core';
</script>

<ui-button label="Click me"></ui-button>
```

### React
```jsx
import { Input, Button, Card } from '@ribble-ui/react';

function App() {
  return (
    <Card title="Login">
      <Input label="Email" type="email" />
      <Button>Submit</Button>
    </Card>
  );
}
```

### Vue
```vue
<template>
  <ui-input label="Name" v-model="name" />
</template>

<script>
import '@ribble-ui/vue';
</script>
```

---

## 📄 License

MIT License © 2024 Ribble UI
