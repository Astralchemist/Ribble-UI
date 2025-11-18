# React Integration Examples

Complete examples for using Ribble UI components in React applications.

## Installation

```bash
npm install @ribble-ui/react @ribble-ui/core
# or
pnpm add @ribble-ui/react @ribble-ui/core
```

## Basic Setup

```tsx
// App.tsx
import '@ribble-ui/core/dist/index.css';
import { Button, Input, Card } from '@ribble-ui/react';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
    </div>
  );
}

export default App;
```

## Form Handling

```tsx
import { useState } from 'react';
import { Form, Input, Button, Toast } from '@ribble-ui/react';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: CustomEvent) => {
    const data = e.detail.data;
    console.log('Form submitted:', data);

    // Show success toast
    Toast.show({
      message: 'Login successful!',
      type: 'success',
    });
  };

  const handleInvalid = (e: CustomEvent) => {
    console.log('Validation errors:', e.detail.errors);
  };

  return (
    <Form
      schema={{
        email: { required: true, email: true },
        password: { required: true, minLength: 8 },
      }}
      onSubmit={handleSubmit}
      onInvalid={handleInvalid}
    >
      <Input
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onInput={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <Input
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onInput={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <Button type="submit">Sign In</Button>
    </Form>
  );
}
```

## Modal Dialog

```tsx
import { useState } from 'react';
import { Modal, Button } from '@ribble-ui/react';

function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal
        open={isOpen}
        title="Confirm Action"
        closeOnBackdrop
        onClose={() => setIsOpen(false)}
      >
        <p>Are you sure you want to proceed?</p>

        <div slot="footer">
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            console.log('Confirmed');
            setIsOpen(false);
          }}>
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
}
```

## Dropdown Menu

```tsx
import { Menu, MenuItem, Button, Icon } from '@ribble-ui/react';

function DropdownExample() {
  const handleSelect = (e: CustomEvent) => {
    console.log('Selected:', e.detail.value);
  };

  return (
    <Menu placement="bottom-end" closeOnSelect onSelect={handleSelect}>
      <Button slot="trigger" variant="secondary">
        <Icon name="menu" size="sm" />
        Options
      </Button>

      <MenuItem value="edit">
        <Icon name="edit" size="sm" />
        Edit
      </MenuItem>
      <MenuItem value="duplicate">
        <Icon name="copy" size="sm" />
        Duplicate
      </MenuItem>
      <MenuItem value="delete">
        <Icon name="trash" size="sm" />
        Delete
      </MenuItem>
    </Menu>
  );
}
```

## Data Table

```tsx
import { useState } from 'react';
import { Table, Input, Button, Chip } from '@ribble-ui/react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

function UserTable() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Input
        placeholder="Search users..."
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.target.value)}
      />

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Chip
                  label={user.status}
                  color={user.status === 'active' ? 'success' : 'default'}
                  size="small"
                />
              </td>
              <td>
                <Button size="small" variant="secondary">Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
```

## Toast Notifications

```tsx
import { Button, showToast } from '@ribble-ui/react';

function ToastExamples() {
  return (
    <div>
      <Button onClick={() => showToast({
        message: 'This is an info message',
        type: 'info',
      })}>
        Show Info
      </Button>

      <Button onClick={() => showToast({
        message: 'Operation successful!',
        type: 'success',
        duration: 3000,
      })}>
        Show Success
      </Button>

      <Button onClick={() => showToast({
        message: 'Something went wrong',
        type: 'error',
        duration: 5000,
      })}>
        Show Error
      </Button>

      <Button onClick={() => showToast({
        message: 'File deleted',
        type: 'info',
        action: {
          label: 'Undo',
          handler: () => console.log('Undo clicked'),
        },
      })}>
        Show with Action
      </Button>
    </div>
  );
}
```

## Drawer/Sidebar

```tsx
import { useState } from 'react';
import { Drawer, Button, Navbar } from '@ribble-ui/react';

function DrawerExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar variant="sticky">
        <span slot="brand">My App</span>
        <nav slot="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
        </nav>
        <Button slot="actions" onClick={() => setIsOpen(true)}>
          Menu
        </Button>
      </Navbar>

      <Drawer
        open={isOpen}
        position="right"
        size="medium"
        overlay
        closeOnBackdrop
        onClose={() => setIsOpen(false)}
      >
        <h2 slot="header">Navigation</h2>

        <nav>
          <a href="/profile">Profile</a>
          <a href="/settings">Settings</a>
          <a href="/logout">Logout</a>
        </nav>
      </Drawer>
    </>
  );
}
```

## Custom Hooks

```tsx
// useToast.ts
import { useCallback } from 'react';
import { showToast, ToastOptions } from '@ribble-ui/react';

export function useToast() {
  const success = useCallback((message: string) => {
    showToast({ message, type: 'success' });
  }, []);

  const error = useCallback((message: string) => {
    showToast({ message, type: 'error' });
  }, []);

  const info = useCallback((message: string) => {
    showToast({ message, type: 'info' });
  }, []);

  const warning = useCallback((message: string) => {
    showToast({ message, type: 'warning' });
  }, []);

  return { success, error, info, warning };
}

// Usage
function MyComponent() {
  const toast = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      toast.success('Saved successfully!');
    } catch (error) {
      toast.error('Failed to save');
    }
  };

  return <Button onClick={handleSave}>Save</Button>;
}
```

## TypeScript Support

```tsx
import { Button, Input } from '@ribble-ui/react';
import type { ButtonProps, InputProps } from '@ribble-ui/react';

// Type-safe component wrapper
interface FormFieldProps extends InputProps {
  helperText?: string;
}

function FormField({ helperText, ...props }: FormFieldProps) {
  return (
    <div className="form-field">
      <Input {...props} />
      {helperText && <span className="helper-text">{helperText}</span>}
    </div>
  );
}
```

## Styling Components

```tsx
import styled from 'styled-components';
import { Button } from '@ribble-ui/react';

// Styled wrapper
const StyledButton = styled(Button)`
  &::part(button) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    font-weight: 600;
  }
`;

// Usage
function App() {
  return <StyledButton>Gradient Button</StyledButton>;
}
```

## Next.js Integration

```tsx
// pages/_app.tsx
import '@ribble-ui/core/dist/index.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// pages/index.tsx
import { Button, Card } from '@ribble-ui/react';

export default function Home() {
  return (
    <Card>
      <h1>Welcome to Ribble UI</h1>
      <Button>Get Started</Button>
    </Card>
  );
}
```

## Testing

```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@ribble-ui/react';

describe('Button', () => {
  it('should render', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should handle click', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should be disabled', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

## Server-Side Rendering (SSR)

```tsx
// For SSR compatibility, lazy load components
import dynamic from 'next/dynamic';

const Modal = dynamic(
  () => import('@ribble-ui/react').then(mod => mod.Modal),
  { ssr: false }
);

function MyPage() {
  return (
    <div>
      <Modal open={true}>
        <p>Modal content</p>
      </Modal>
    </div>
  );
}
```
