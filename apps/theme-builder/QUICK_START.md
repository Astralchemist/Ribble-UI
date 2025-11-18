# Quick Start Guide - Ribble UI Theme Builder

Get started with the Theme Builder in 3 simple steps!

## Installation & Setup

```bash
# Navigate to the theme-builder directory
cd apps/theme-builder

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will open automatically at `http://localhost:3001`

## 5-Minute Tutorial

### Step 1: Explore the Interface

The Theme Builder has 4 main tabs:
- **Edit Tokens**: Customize colors, typography, spacing, and more
- **Live Preview**: See your changes in real-time on actual components
- **Presets**: Load pre-designed themes as starting points
- **Export**: Download your theme in multiple formats

### Step 2: Create Your First Custom Theme

1. Click on the **Presets** tab
2. Choose a theme that's close to your desired design (e.g., "Ocean")
3. Click "Load Theme" on your selected preset
4. Go to the **Edit Tokens** tab
5. Modify the primary color:
   - Find the "Primary" color swatch
   - Click on it to open the color picker
   - Choose your brand color
6. Switch to the **Live Preview** tab to see your changes immediately!

### Step 3: Export Your Theme

1. Go to the **Export** tab
2. Select your preferred format:
   - **CSS Variables**: For standard web projects
   - **TypeScript**: For TypeScript/React projects
   - **Figma Tokens**: To sync with Figma designs
3. Click "Download File" or "Copy to Clipboard"

## Common Use Cases

### Creating a Brand Theme

```
1. Start with the "Default" preset
2. Update colors to match your brand palette:
   - Primary: Your main brand color
   - Secondary: Complementary color
   - Success/Warning/Error: Keep or customize
3. Adjust typography to match your brand fonts
4. Export as CSS Variables
```

### Dark Mode Theme

```
1. Load the "Dark Mode" preset
2. Tweak colors to your preference
3. Test in Live Preview
4. Export as JSON to save multiple theme variants
```

### Design System for Figma

```
1. Create your theme using the token editor
2. Export as "Figma Tokens"
3. Import the JSON file into Figma using a tokens plugin
4. Keep your design and code in sync!
```

## Key Features to Try

### Color Picker
- Click any color swatch to open an interactive color picker
- Or type hex values directly
- Changes apply instantly

### Live Preview
- See real buttons, forms, cards, and modals
- Interactive elements (try opening the modal!)
- Spacing and typography visualizations

### Auto-Save
- Your theme is automatically saved to browser storage
- Close the tab and come back later - your work is saved!
- Use "Reset Theme" button to restore defaults

### Import/Export
- Export your theme once, use it everywhere
- Share JSON themes with your team
- Import themes created by others

## Tips & Tricks

1. **Start with a preset**: Don't start from scratch - choose a preset close to your vision
2. **Use the Live Preview**: Keep it open while editing to see changes immediately
3. **Export multiple formats**: Different formats for different tools (CSS for web, Figma for design)
4. **Save your JSON**: Keep a JSON backup of your themes for version control
5. **Consistent spacing**: Use the spacing scale for consistent layouts across your app

## File Locations

After exporting, you'll get files like:
- `ribble-ui-theme.css` - CSS Variables
- `ribble-ui-theme.json` - JSON format
- `ribble-ui-theme.ts` - TypeScript module
- `ribble-ui-theme.scss` - SCSS variables
- `ribble-ui-tokens.figma.json` - Figma tokens

## Need Help?

- Check the main README.md for detailed documentation
- All changes are local - feel free to experiment!
- Use "Reset Theme" if you want to start over

## Next Steps

Once you've created your theme:

1. **For Web Projects**: Import the CSS file and use the CSS variables
   ```css
   .my-button {
     background: var(--color-primary);
     padding: var(--spacing-md);
     border-radius: var(--radius-md);
   }
   ```

2. **For TypeScript Projects**: Import the TS module
   ```typescript
   import theme from './ribble-ui-theme';
   const primaryColor = theme.colors.primary;
   ```

3. **For Figma**: Import the Figma tokens into your design files

Happy theming! 🎨
