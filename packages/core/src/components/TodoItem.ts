import { UIComponent } from './UIComponent';
import { property } from '../types';

const style = `
:host {
  display: block;
  --todo-item-padding: var(--spacing-3, 0.75rem);
  --todo-item-bg: var(--color-surface, #fff);
  --todo-item-border: var(--color-border, #e0e0e0);
  --todo-item-radius: var(--radius-md, 0.375rem);
  --todo-item-hover-bg: var(--color-surface-hover, #f5f5f5);
  --todo-item-completed-opacity: 0.6;
  --todo-item-text-color: var(--color-text, #1a1a1a);
  --todo-item-completed-text-decoration: line-through;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-3, 0.75rem);
  padding: var(--todo-item-padding);
  background: var(--todo-item-bg);
  border: 1px solid var(--todo-item-border);
  border-radius: var(--todo-item-radius);
  transition: all 0.2s ease;
  margin-bottom: var(--spacing-2, 0.5rem);
}

.todo-item:hover {
  background: var(--todo-item-hover-bg);
  box-shadow: var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05));
}

.todo-item.completed {
  opacity: var(--todo-item-completed-opacity);
}

.todo-item.completed .todo-text {
  text-decoration: var(--todo-item-completed-text-decoration);
}

.checkbox {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  accent-color: var(--color-primary, #007bff);
}

.todo-text {
  flex: 1;
  color: var(--todo-item-text-color);
  font-size: var(--font-size-base, 1rem);
  line-height: 1.5;
  word-break: break-word;
}

.delete-button {
  background: transparent;
  border: none;
  color: var(--color-error, #dc3545);
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm, 0.25rem);
  font-size: 1.25rem;
  opacity: 0;
  transition: all 0.2s ease;
}

.todo-item:hover .delete-button {
  opacity: 1;
}

.delete-button:hover {
  background: var(--color-error-light, #fee);
}

.delete-button:focus {
  outline: 2px solid var(--color-error, #dc3545);
  outline-offset: 2px;
  opacity: 1;
}
`;

export class TodoItem extends UIComponent {
  static is = 'todo-item';

  @property({ type: String, reflect: true })
  todoId = '';

  @property({ type: String, reflect: true })
  text = '';

  @property({ type: Boolean, reflect: true })
  completed = false;

  constructor() {
    super({
      shadow: { mode: 'open' },
      aria: { role: 'listitem' },
      tabIndex: -1
    });
  }

  protected _render() {
    this._shadow.innerHTML = `
      <style>${style}</style>
      <div class="todo-item ${this.completed ? 'completed' : ''}" part="todo-item">
        <input
          type="checkbox"
          class="checkbox"
          ${this.completed ? 'checked' : ''}
          aria-label="Toggle todo completion"
          part="checkbox"
        />
        <span class="todo-text" part="text">${this.text}</span>
        <button
          class="delete-button"
          aria-label="Delete todo"
          part="delete-button"
        >×</button>
      </div>
    `;
    this._attachEvents();
  }

  protected _attachEvents() {
    const checkbox = this._shadow.querySelector('.checkbox') as HTMLInputElement;
    const deleteBtn = this._shadow.querySelector('.delete-button') as HTMLButtonElement;

    if (checkbox) {
      checkbox.onclick = () => {
        this.emit('toggle', { id: this.todoId, completed: !this.completed });
      };
    }

    if (deleteBtn) {
      deleteBtn.onclick = () => {
        this.emit('delete', { id: this.todoId });
      };
      deleteBtn.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.emit('delete', { id: this.todoId });
        }
      };
    }
  }

  protected _onAttributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === 'completed') {
      this.completed = newValue !== null && newValue !== 'false';
    }
    if (name === 'text') {
      this.text = newValue || '';
    }
    if (name === 'todoid') {
      this.todoId = newValue || '';
    }
  }
}

customElements.define(TodoItem.is, TodoItem);
