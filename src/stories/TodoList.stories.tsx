import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { fn } from 'storybook/test';
import { TodoList } from '../../packages/react/src/TodoList';
import type { Todo, TodoFilter } from '../../packages/core/src/types';

/**
 * TodoList is a fully-featured todo list component with add, delete, toggle, and filter functionality.
 *
 * Features:
 * - Add new todos with keyboard support (Enter key)
 * - Mark todos as complete/incomplete
 * - Delete todos
 * - Filter todos (All, Active, Completed)
 * - Clear all completed todos
 * - Responsive design with theme support
 * - Keyboard accessible
 */
const meta = {
  title: 'Components/TodoList',
  component: TodoList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A complete todo list component built as a Web Component with React wrapper. Supports adding, editing, filtering, and managing todos with full keyboard accessibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title displayed at the top of the todo list',
    },
    todos: {
      control: 'object',
      description: 'Array of todo items',
    },
    filter: {
      control: 'select',
      options: ['all', 'active', 'completed'],
      description: 'Current filter state',
    },
    onAdd: {
      description: 'Callback fired when a new todo is added',
    },
    onDelete: {
      description: 'Callback fired when a todo is deleted',
    },
    onToggle: {
      description: 'Callback fired when a todo is toggled',
    },
    onChange: {
      description: 'Callback fired when the todo list changes',
    },
    onFilterChange: {
      description: 'Callback fired when the filter changes',
    },
    onClearCompleted: {
      description: 'Callback fired when completed todos are cleared',
    },
  },
  args: {
    onAdd: fn(),
    onDelete: fn(),
    onToggle: fn(),
    onChange: fn(),
    onFilterChange: fn(),
    onClearCompleted: fn(),
  },
} satisfies Meta<typeof TodoList>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default empty todo list
 */
export const Default: Story = {
  args: {
    title: 'My Todos',
    todos: [],
    filter: 'all',
  },
};

/**
 * Todo list with some initial items
 */
export const WithTodos: Story = {
  args: {
    title: 'Shopping List',
    todos: [
      {
        id: '1',
        text: 'Buy groceries',
        completed: false,
        createdAt: Date.now() - 3600000,
      },
      {
        id: '2',
        text: 'Walk the dog',
        completed: true,
        createdAt: Date.now() - 7200000,
      },
      {
        id: '3',
        text: 'Read a book',
        completed: false,
        createdAt: Date.now() - 10800000,
      },
      {
        id: '4',
        text: 'Write code',
        completed: true,
        createdAt: Date.now() - 14400000,
      },
      {
        id: '5',
        text: 'Exercise',
        completed: false,
        createdAt: Date.now() - 18000000,
      },
    ],
    filter: 'all',
  },
};

/**
 * Showing only active todos
 */
export const ActiveFilter: Story = {
  args: {
    title: 'Active Tasks',
    todos: [
      {
        id: '1',
        text: 'Complete project proposal',
        completed: false,
        createdAt: Date.now(),
      },
      {
        id: '2',
        text: 'Review pull requests',
        completed: true,
        createdAt: Date.now(),
      },
      {
        id: '3',
        text: 'Update documentation',
        completed: false,
        createdAt: Date.now(),
      },
    ],
    filter: 'active',
  },
};

/**
 * Showing only completed todos
 */
export const CompletedFilter: Story = {
  args: {
    title: 'Completed Tasks',
    todos: [
      {
        id: '1',
        text: 'Setup development environment',
        completed: true,
        createdAt: Date.now(),
      },
      {
        id: '2',
        text: 'Write unit tests',
        completed: true,
        createdAt: Date.now(),
      },
      {
        id: '3',
        text: 'Deploy to staging',
        completed: false,
        createdAt: Date.now(),
      },
    ],
    filter: 'completed',
  },
};

/**
 * Interactive example with state management
 */
export const Interactive: Story = {
  render: (args) => {
    const InteractiveTodoList = () => {
      const [todos, setTodos] = useState<Todo[]>([
        {
          id: '1',
          text: 'Try adding a new todo',
          completed: false,
          createdAt: Date.now(),
        },
        {
          id: '2',
          text: 'Try toggling completion',
          completed: false,
          createdAt: Date.now(),
        },
        {
          id: '3',
          text: 'Try the filters',
          completed: true,
          createdAt: Date.now(),
        },
      ]);
      const [filter, setFilter] = useState<TodoFilter>('all');

      return (
        <div style={{ minWidth: '600px' }}>
          <TodoList
            {...args}
            title="Interactive Todo List"
            todos={todos}
            filter={filter}
            onChange={(e) => {
              setTodos(e.detail.todos);
              console.log('Todos changed:', e.detail.todos);
            }}
            onFilterChange={(e) => {
              setFilter(e.detail.filter);
              console.log('Filter changed:', e.detail.filter);
            }}
            onAdd={(e) => console.log('Todo added:', e.detail.todo)}
            onDelete={(e) => console.log('Todo deleted:', e.detail.id)}
            onToggle={(e) => console.log('Todo toggled:', e.detail.id)}
            onClearCompleted={() => console.log('Completed todos cleared')}
          />
        </div>
      );
    };

    return <InteractiveTodoList />;
  },
};

/**
 * Long list to test scrolling and performance
 */
export const LongList: Story = {
  args: {
    title: 'Many Todos',
    todos: Array.from({ length: 20 }, (_, i) => ({
      id: `todo-${i}`,
      text: `Todo item number ${i + 1}`,
      completed: i % 3 === 0,
      createdAt: Date.now() - i * 1000000,
    })),
    filter: 'all',
  },
};

/**
 * Custom styling example
 */
export const CustomStyled: Story = {
  args: {
    title: 'Styled Todo List',
    todos: [
      {
        id: '1',
        text: 'Custom styled todo',
        completed: false,
        createdAt: Date.now(),
      },
    ],
    style: {
      '--todo-list-bg': '#f0f9ff',
      '--color-primary': '#0ea5e9',
      '--color-border': '#bae6fd',
    } as React.CSSProperties,
  },
};
