// Vue Router integration helpers for Web Components.
import { useRouter, useRoute } from 'vue-router';

/**
 * Helper composable to integrate router-link navigation with Web Components.
 */
export function useWebComponentRouter() {
  const router = useRouter();
  const route = useRoute();
  const navigate = (to: string) => router.push(to);
  return { router, route, navigate };
}
