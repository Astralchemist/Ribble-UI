import { UIComponent } from './UIComponent';
import { property, type Todo, type TodoFilter } from '../types';
import './TodoItem';

const style = `
:host {
  display: block;
  --todo-list-bg: var(--color-background, #ffffff);
  --todo-list-padding: var(--spacing-4, 1rem);
  --todo-list-radius: var(--radius-lg, 0.5rem);
  --todo-list-shadow: var(--shadow-md, 0 4px 6px rgba(0,0,0,0.1));
  --todo-list-border: var(--color-border, #e0e0e0);
  --todo-input-bg: var(--color-surface, #fff);
  --todo-input-border: var(--color-border, #d1d5db);
  --todo-input-focus-border: var(--color-primary, #007bff);
  --todo-button-bg: var(--color-primary, #007bff);
  --todo-button-color: var(--color-on-primary, #fff);
  --todo-filter-active-bg: var(--color-primary-light, #e3f2fd);
  --todo-text-color: var(--color-text, #1a1a1a);
  --todo-text-muted: var(--color-text-muted, #6b7280);
}

.todo-container {
  background: var(--todo-list-bg);
  padding: var(--todo-list-padding);
  border-radius: var(--todo-list-radius);
  box-shadow: var(--todo-list-shadow);
  border: 1px solid var(--todo-list-border);
  max-width: 600px;
  margin: 0 auto;
}

.todo-header {
  margin-bottom: var(--spacing-4, 1rem);
}

.todo-title {
  font-size: var(--font-size-2xl, 1.5rem);
  font-weight: var(--font-weight-bold, 700);
  color: var(--todo-text-color);
  margin: 0 0 var(--spacing-4, 1rem) 0;
}

.todo-input-container {
  display: flex;
  gap: var(--spacing-2, 0.5rem);
  margin-bottom: var(--spacing-4, 1rem);
}

.todo-input {
  flex: 1;
  padding: var(--spacing-3, 0.75rem);
  border: 2px solid var(--todo-input-border);
  border-radius: var(--radius-md, 0.375rem);
  font-size: var(--font-size-base, 1rem);
  background: var(--todo-input-bg);
  color: var(--todo-text-color);
  transition: border-color 0.2s ease;
}

.todo-input:focus {
  outline: none;
  border-color: var(--todo-input-focus-border);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.todo-input::placeholder {
  color: var(--todo-text-muted);
}

.add-button {
  padding: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
  background: var(--todo-button-bg);
  color: var(--todo-button-color);
  border: none;
  border-radius: var(--radius-md, 0.375rem);
  font-size: var(--font-size-base, 1rem);
  font-weight: var(--font-weight-medium, 500);
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05));
}

.add-button:active {
  transform: translateY(0);
}

.add-button:focus {
  outline: 2px solid var(--todo-input-focus-border);
  outline-offset: 2px;
}

.add-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.todo-filters {
  display: flex;
  gap: var(--spacing-2, 0.5rem);
  margin-bottom: var(--spacing-4, 1rem);
  padding: var(--spacing-2, 0.5rem);
  background: var(--todo-input-bg);
  border-radius: var(--radius-md, 0.375rem);
  border: 1px solid var(--todo-input-border);
}

.filter-button {
  flex: 1;
  padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
  background: transparent;
  border: none;
  border-radius: var(--radius-sm, 0.25rem);
  cursor: pointer;
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--todo-text-muted);
  transition: all 0.2s ease;
}

.filter-button:hover {
  background: var(--todo-filter-active-bg);
}

.filter-button.active {
  background: var(--todo-filter-active-bg);
  color: var(--color-primary, #007bff);
  font-weight: var(--font-weight-medium, 500);
}

.filter-button:focus {
  outline: 2px solid var(--todo-input-focus-border);
  outline-offset: -2px;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  min-height: 100px;
}

.empty-state {
  text-align: center;
  padding: var(--spacing-8, 2rem);
  color: var(--todo-text-muted);
  font-size: var(--font-size-sm, 0.875rem);
}

.todo-stats {
  margin-top: var(--spacing-4, 1rem);
  padding-top: var(--spacing-4, 1rem);
  border-top: 1px solid var(--todo-input-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--todo-text-muted);
}

.clear-completed {
  background: transparent;
  border: none;
  color: var(--color-error, #dc3545);
  cursor: pointer;
  padding: var(--spacing-2, 0.5rem);
  border-radius: var(--radius-sm, 0.25rem);
  transition: all 0.2s ease;
}

.clear-completed:hover {
  background: var(--color-error-light, #fee);
}

.clear-completed:focus {
  outline: 2px solid var(--color-error, #dc3545);
  outline-offset: 2px;
}

.clear-completed:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
`;

export class TodoList extends UIComponent {
  static is = 'todo-list';

  @property({ type: String, reflect: true })
  title = 'My Todos';

  private _todos: Todo[] = [];
  private _filter: TodoFilter = 'all';
  private _inputValue = '';

  constructor() {
    super({
      shadow: { mode: 'open' },
      aria: { role: 'region', 'label': 'Todo list' }
    });
  }

  get todos(): Todo[] {
    return this._todos;
  }

  set todos(value: Todo[]) {
    this._todos = value;
    this._render();
  }

  get filter(): TodoFilter {
    return this._filter;
  }

  set filter(value: TodoFilter) {
    this._filter = value;
    this._render();
  }

  protected _render() {
    const filteredTodos = this._getFilteredTodos();
    const activeTodosCount = this._todos.filter(t => !t.completed).length;
    const completedTodosCount = this._todos.filter(t => t.completed).length;

    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="todo-container" part="container">
        <div class="todo-header">
          <h2 class="todo-title" part="title">${this.title}</h2>

          <div class="todo-input-container">
            <input
              type="text"
              class="todo-input"
              placeholder="What needs to be done?"
              aria-label="New todo input"
              part="input"
            />
            <button
              class="add-button"
              aria-label="Add todo"
              part="add-button"
            >Add</button>
          </div>

          <div class="todo-filters" role="tablist" aria-label="Todo filters">
            <button
              class="filter-button ${this._filter === 'all' ? 'active' : ''}"
              data-filter="all"
              role="tab"
              aria-selected="${this._filter === 'all'}"
              part="filter-button"
            >All (${this._todos.length})</button>
            <button
              class="filter-button ${this._filter === 'active' ? 'active' : ''}"
              data-filter="active"
              role="tab"
              aria-selected="${this._filter === 'active'}"
              part="filter-button"
            >Active (${activeTodosCount})</button>
            <button
              class="filter-button ${this._filter === 'completed' ? 'active' : ''}"
              data-filter="completed"
              role="tab"
              aria-selected="${this._filter === 'completed'}"
              part="filter-button"
            >Completed (${completedTodosCount})</button>
          </div>
        </div>

        <div class="todo-list" role="list" aria-label="Todo items">
          ${filteredTodos.length === 0 ? this._renderEmptyState() : ''}
        </div>

        ${this._todos.length > 0 ? `
          <div class="todo-stats">
            <span>${activeTodosCount} item${activeTodosCount !== 1 ? 's' : ''} left</span>
            <button
              class="clear-completed"
              ${completedTodosCount === 0 ? 'disabled' : ''}
              aria-label="Clear completed todos"
              part="clear-button"
            >Clear completed</button>
          </div>
        ` : ''}
      </div>
    `;

    this._renderTodoItems(filteredTodos);
    this._attachEvents();
  }

  protected _renderEmptyState(): string {
    const messages = {
      all: 'No todos yet. Add one to get started!',
      active: 'No active todos. Great job!',
      completed: 'No completed todos yet.'
    };
    return `<div class="empty-state" part="empty-state">${messages[this._filter]}</div>`;
  }

  protected _renderTodoItems(todos: Todo[]) {
    const listContainer = this._shadow.querySelector('.todo-list');
    if (!listContainer) return;

    // Clear existing todos
    const existingItems = listContainer.querySelectorAll('todo-item');
    existingItems.forEach(item => item.remove());

    // Add new todos
    todos.forEach(todo => {
      const item = document.createElement('todo-item') as any;
      item.todoId = todo.id;
      item.text = todo.text;
      item.completed = todo.completed;

      // Listen to events from todo items
      item.addEventListener('toggle', (e: CustomEvent) => {
        this._handleToggle(e.detail.id);
      });

      item.addEventListener('delete', (e: CustomEvent) => {
        this._handleDelete(e.detail.id);
      });

      listContainer.appendChild(item);
    });
  }

  protected _attachEvents() {
    const input = this._shadow.querySelector('.todo-input') as HTMLInputElement;
    const addButton = this._shadow.querySelector('.add-button') as HTMLButtonElement;
    const filterButtons = this._shadow.querySelectorAll('.filter-button');
    const clearButton = this._shadow.querySelector('.clear-completed') as HTMLButtonElement;

    if (input) {
      input.value = this._inputValue;
      input.oninput = () => {
        this._inputValue = input.value;
      };
      input.onkeydown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this._addTodo();
        }
      };
    }

    if (addButton) {
      addButton.onclick = () => {
        this._addTodo();
      };
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = (btn as HTMLElement).dataset.filter as TodoFilter;
        this._filter = filter;
        this._render();
        this.emit('filter-change', { filter });
      });
    });

    if (clearButton) {
      clearButton.onclick = () => {
        this._clearCompleted();
      };
    }
  }

  protected _addTodo() {
    const input = this._shadow.querySelector('.todo-input') as HTMLInputElement;
    const text = input?.value.trim();

    if (!text) return;

    const newTodo: Todo = {
      id: `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      completed: false,
      createdAt: Date.now()
    };

    this._todos = [...this._todos, newTodo];
    this._inputValue = '';
    this._render();
    this.emit('add', { todo: newTodo });
    this.emit('change', { todos: this._todos });
  }

  protected _handleToggle(id: string) {
    this._todos = this._todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this._render();
    this.emit('toggle', { id });
    this.emit('change', { todos: this._todos });
  }

  protected _handleDelete(id: string) {
    this._todos = this._todos.filter(todo => todo.id !== id);
    this._render();
    this.emit('delete', { id });
    this.emit('change', { todos: this._todos });
  }

  protected _clearCompleted() {
    this._todos = this._todos.filter(todo => !todo.completed);
    this._render();
    this.emit('clear-completed', {});
    this.emit('change', { todos: this._todos });
  }

  protected _getFilteredTodos(): Todo[] {
    switch (this._filter) {
      case 'active':
        return this._todos.filter(t => !t.completed);
      case 'completed':
        return this._todos.filter(t => t.completed);
      default:
        return this._todos;
    }
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'title') {
      this.title = newValue || 'My Todos';
    }
  }
}

customElements.define(TodoList.is, TodoList);
