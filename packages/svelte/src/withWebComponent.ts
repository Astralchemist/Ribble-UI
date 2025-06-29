// Svelte wrapper for Web Components with binding and reactivity.

<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { writable, type Writable } from 'svelte/store';

  /**
   * Factory function to create a Svelte wrapper for a Web Component.
   * Usage: import MyComponent from './withWebComponent';
   * <MyComponent tag="my-element" bind:value={val} props={{...}} />
   */
  export function createWebComponentWrapper<T = any>(tag: string) {
    return class WebComponentWrapper {
      $$prop_def: T & { value?: any; props?: Record<string, any>; bindValue?: any; useStore?: Writable<any> };
      $$slot_def: { default: any };
      el: HTMLElement | null = null;
      value: any;
      props: Record<string, any> = {};
      bindValue: any;
      useStore: Writable<any> | undefined;
      dispatch = createEventDispatcher();
      unsubscribe: (() => void) | undefined;

      constructor(options: any) {
        Object.assign(this, options.props);
        this.value = this.bindValue;
      }

      onMount() {
        if (this.el && this.bindValue !== undefined) {
          this.el.value = this.bindValue;
        }
        if (this.useStore && this.el) {
          this.unsubscribe = this.useStore.subscribe((v) => {
            this.el!.value = v;
          });
        }
        this.forwardEvents();
      }

      onDestroy() {
        this.unsubscribe?.();
      }

      handleInput(e: Event) {
        if (this.bindValue !== undefined) {
          this.bindValue = (e.target as any).value;
          this.dispatch('update', this.bindValue);
        }
      }

      forwardEvents() {
        if (!this.el) return;
        for (const key in this.el) {
          if (key.startsWith('on')) {
            this.el.addEventListener(key.slice(2).toLowerCase(), (e: Event) => this.dispatch(key, e));
          }
        }
      }
    };
  }
</script>

<svelte:element
  this={tag}
  bind:this={el}
  on:input={handleInput}
  {...props}
  {...$$restProps}
>
  <slot />
</svelte:element>
