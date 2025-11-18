# Quick Start Guide - Ribble UI Landing Page

Get the landing page running in less than 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

## Installation

1. **Navigate to the landing page directory:**
   ```bash
   cd /home/user/Ribble-UI/apps/landing-page
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   Or with pnpm (recommended for monorepos):
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## That's it! 🎉

Your landing page should now be running with:
- ✅ Animated gradient hero section
- ✅ Interactive component demos
- ✅ Dark mode toggle
- ✅ Smooth scroll navigation
- ✅ All 9 sections fully functional

## Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

## Preview Production Build

```bash
npm run preview
```

## Common Issues

### Port 3000 already in use?
Edit `vite.config.ts` and change the port:
```typescript
server: {
  port: 3001, // Change to any available port
  open: true,
}
```

### Dark mode not persisting?
Check browser console for localStorage errors. Make sure cookies/storage is enabled.

### Dependencies failing to install?
Clear cache and try again:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

- Customize colors in `tailwind.config.js`
- Update content in `src/sections/*`
- Add your own logo in `src/components/Navigation.tsx`
- Configure GitHub API for real star count
- Add analytics tracking
- Deploy to Vercel/Netlify

## Need Help?

- Check the [README.md](./README.md) for detailed documentation
- See [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for architecture details
- Open an issue on GitHub for bugs or questions

---

Happy coding! 🚀
