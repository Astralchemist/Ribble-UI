// Attribute proxy utilities with type coercion
export function getAttr<T = any>(
  el: Element,
  name: string,
  type: 'string' | 'number' | 'boolean' = 'string',
): T | undefined {
  const val = el.getAttribute(name);
  if (val == null) return undefined;
  if (type === 'boolean') return (val === '' || val === 'true') as any;
  if (type === 'number') return Number(val) as any;
  return val as any;
}
export function setAttr(el: Element, name: string, value: any) {
  if (value === false || value == null) el.removeAttribute(name);
  else if (value === true) el.setAttribute(name, '');
  else el.setAttribute(name, String(value));
}
