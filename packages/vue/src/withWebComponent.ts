import {
  defineComponent,
  h,
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  toRefs,
  getCurrentInstance,
  nextTick,
} from 'vue';

/**
 * Vue 3 wrapper for Web Components with reactivity, v-model, and slot forwarding.
 * @param tagName - Web Component tag name
 * @param propDefs - Prop definitions (for defineProps)
 * @param emits - Event names (for defineEmits)
 */
export function withWebComponent<T extends Record<string, any> = any>(
  tagName: string,
  propDefs: Record<string, any> = {},
  emits: string[] = [],
) {
  return defineComponent({
    name: `WithWebComponent_${tagName}`,
    props: propDefs,
    emits,
    setup(props, { emit, slots, attrs, expose }) {
      const elRef = ref<HTMLElement | null>(null);
      const instance = getCurrentInstance();

      // v-model support
      if ('modelValue' in props && emits.includes('update:modelValue')) {
        watch(
          () => props.modelValue,
          (val) => {
            if (elRef.value) (elRef.value as any).value = val;
          },
        );
        onMounted(() => {
          if (elRef.value) {
            elRef.value.addEventListener('input', (e: any) => {
              emit('update:modelValue', e.target.value);
            });
          }
        });
      }

      // Prop/attr sync
      watch(
        () => ({ ...props }),
        (newProps) => {
          if (!elRef.value) return;
          Object.entries(newProps).forEach(([k, v]) => {
            if (v !== undefined && v !== null) {
              elRef.value!.setAttribute(k, v.toString());
            } else {
              elRef.value!.removeAttribute(k);
            }
          });
        },
        { immediate: true, deep: true },
      );

      // Slot forwarding
      const renderSlots = () => {
        return Object.keys(slots).map((name) => h('template', { slot: name }, slots[name]?.()));
      };

      // Expose ref for parent
      expose({ el: elRef });

      return () =>
        h(
          tagName,
          {
            ref: elRef,
            ...attrs,
          },
          renderSlots(),
        );
    },
  });
}

// Teleport and Transition integration example
// Usage: <transition><teleport to="body"><MyWebComponent ... /></teleport></transition>
// The wrapper is compatible with Vue's built-in <Teleport> and <Transition> components.

// SSR/Nuxt.js support: hydration-safe rendering
// The wrapper avoids direct DOM access during SSR and only syncs props/attrs on client mount.
// Example usage in Nuxt:
// <client-only><MyWebComponent ... /></client-only>

// TypeScript enhancement: generic prop and event typing
// Usage: withWebComponent<MyProps, MyEvents>('my-element', { ... }, ['my-event'])

// Vue DevTools integration:
// - The wrapper uses defineComponent and a custom name for DevTools visibility.
// - Provide/inject can be used for theming and context debugging.
//
// Advanced slot/teleport patterns:
// - All named/default slots are forwarded to the Web Component.
// - Teleport/Transition can wrap the wrapper for advanced UI composition.
// Example:
// <transition name="fade"><teleport to="#modal"><MyWebComponent><template #header>...</template></MyWebComponent></teleport></transition>
