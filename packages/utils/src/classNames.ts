// Merge class names and conditionally include classes
export function cn(...args: any[]): string {
  return args
    .flat(Infinity)
    .filter(Boolean)
    .map((cls: any) => {
      if (typeof cls === 'object') {
        return Object.entries(cls)
          .filter(([_, v]) => !!v)
          .map(([k]) => k)
          .join(' ');
      }
      return cls;
    })
    .filter(Boolean)
    .join(' ');
}
