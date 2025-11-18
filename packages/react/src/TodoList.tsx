import React, { useRef, useEffect } from 'react';
import { useWebComponentEvent } from './useWebComponentEvent';

// Import types from core package
import type { Todo, TodoFilter } from '@ribble-ui/core';

// Import the Web Component
import '@ribble-ui/core';

export interface TodoListProps {
  title?: string;
  todos?: Todo[];
  filter?: TodoFilter;
  onAdd?: (event: CustomEvent<{ todo: Todo }>) => void;
  onDelete?: (event: CustomEvent<{ id: string }>) => void;
  onToggle?: (event: CustomEvent<{ id: string }>) => void;
  onChange?: (event: CustomEvent<{ todos: Todo[] }>) => void;
  onFilterChange?: (event: CustomEvent<{ filter: TodoFilter }>) => void;
  onClearCompleted?: (event: CustomEvent) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * React wrapper for the TodoList Web Component
 *
 * @example
 * ```tsx
 * import { TodoList } from '@ui-kit/react';
 *
 * function App() {
 *   const [todos, setTodos] = useState([]);
 *
 *   return (
 *     <TodoList
 *       title="My Tasks"
 *       todos={todos}
 *       onChange={(e) => setTodos(e.detail.todos)}
 *     />
 *   );
 * }
 * ```
 */
export const TodoList = React.forwardRef<HTMLElement, TodoListProps>(
  (
    {
      title = 'My Todos',
      todos = [],
      filter = 'all',
      onAdd,
      onDelete,
      onToggle,
      onChange,
      onFilterChange,
      onClearCompleted,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<any>(null);
    const elementRef = (ref as React.RefObject<any>) || internalRef;

    // Sync props to Web Component
    useEffect(() => {
      const el = elementRef.current;
      if (!el) return;
      el.title = title;
      el.todos = todos;
      el.filter = filter;
    }, [elementRef, title, todos, filter]);

    // Set up event listeners
    useWebComponentEvent(elementRef, 'add', (e) => {
      if (onAdd) onAdd(e as CustomEvent);
    });

    useWebComponentEvent(elementRef, 'delete', (e) => {
      if (onDelete) onDelete(e as CustomEvent);
    });

    useWebComponentEvent(elementRef, 'toggle', (e) => {
      if (onToggle) onToggle(e as CustomEvent);
    });

    useWebComponentEvent(elementRef, 'change', (e) => {
      if (onChange) onChange(e as CustomEvent);
    });

    useWebComponentEvent(elementRef, 'filter-change', (e) => {
      if (onFilterChange) onFilterChange(e as CustomEvent);
    });

    useWebComponentEvent(elementRef, 'clear-completed', (e) => {
      if (onClearCompleted) onClearCompleted(e as CustomEvent);
    });

    return React.createElement('todo-list', {
      ref: elementRef,
      className,
      style,
      ...props,
    });
  }
);

TodoList.displayName = 'TodoList';
