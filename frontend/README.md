# Hossana Mesob Frontend

## Deployment Instructions

### For Vercel Deployment

The project is configured for automatic deployment on Vercel.

**Required:**
- All source files in `frontend/src/`
- Asset images in `public/assets/` folder
- `package.json` and `package-lock.json`

### Local Development

```bash
cd frontend
npm install
npm run dev
```

Visit: http://localhost:5173

### Build for Production

```bash
cd frontend
npm run build
```

Output: `dist/` folder (ready for deployment)

### Asset Files Needed

Place the following images in `public/assets/`:
- `logo.jpg` - Organization logo
- `office.jpg` - Office photo
- `hero-1.jpg` through `hero-8.jpg` - Hero carousel images
- `partner-*.jpg` - Partner institution logos

Without these assets, images will show as broken, but the site will still function.
