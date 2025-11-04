# Professional Portfolio Landing Page

A modern, responsive portfolio landing page built with clean HTML5, CSS3, and vanilla JavaScript. Features smooth animations, mobile-first design, and professional UI/UX patterns.

## Features

### Design & Layout
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Modern Aesthetics**: Clean, professional design with gradient accents
- **CSS Grid & Flexbox**: Advanced layout techniques for optimal positioning
- **CSS Variables**: Centralized theming system for easy customization

### Sections
1. **Hero Section**: Eye-catching introduction with animated background shapes
2. **About Section**: Bio, stats, and comprehensive skills showcase
3. **Projects Section**: Portfolio showcase with 4 project cards
4. **Contact Section**: Contact form with social media links

### Interactivity
- **Smooth Scrolling**: Seamless navigation between sections
- **Mobile Menu**: Hamburger menu with slide-in animation
- **Scroll Animations**: Elements fade in on scroll using Intersection Observer
- **Active Link Highlighting**: Navigation updates based on scroll position
- **Form Validation**: Client-side validation with user feedback
- **Keyboard Navigation**: Ctrl + Arrow keys for section navigation

### Performance
- **Vanilla JavaScript**: No framework dependencies
- **Lazy Loading**: Optimized image loading
- **Debounced/Throttled Events**: Optimized scroll handlers
- **CSS Animations**: Hardware-accelerated transitions

### Accessibility
- **Semantic HTML**: Proper heading hierarchy and ARIA labels
- **Keyboard Navigation**: Full keyboard support
- **Focus States**: Clear focus indicators
- **Screen Reader Support**: Descriptive labels and alt text

## File Structure

```
src/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Complete stylesheet with CSS variables
├── js/
│   └── script.js       # All JavaScript functionality
└── assets/             # Images and other assets (add your own)
```

## Getting Started

### Quick Start
1. Open `src/index.html` in your browser
2. That's it! No build process required.

### Development Server (Optional)
For live reload during development:

```bash
# Using Python
cd src
python -m http.server 8000

# Using Node.js (http-server)
npx http-server src -p 8000

# Using VS Code Live Server
# Install Live Server extension and click "Go Live"
```

Then visit `http://localhost:8000`

## Customization

### 1. Personal Information
Edit `src/index.html`:
- Update name, title, and bio in the hero section
- Modify about section content
- Add your actual projects
- Update contact information and social links

### 2. Colors & Theme
Edit CSS variables in `src/css/styles.css`:

```css
:root {
    --primary-color: #6366f1;        /* Main brand color */
    --primary-dark: #4f46e5;         /* Darker shade */
    --secondary-color: #10b981;      /* Accent color */
    /* ... customize other colors ... */
}
```

### 3. Typography
Change fonts in `src/index.html` head section:
- Currently using Inter (body) and Poppins (headings)
- Replace Google Fonts URLs for different fonts

### 4. Add Your Images
- Add profile photo to `src/assets/`
- Replace project thumbnail gradients with actual images
- Update image paths in HTML

### 5. Form Submission
Edit `ContactFormHandler` class in `src/js/script.js`:
- Replace `simulateSubmission()` with actual API call
- Integrate with backend service (FormSpree, EmailJS, etc.)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid, Flexbox, Variables
- **JavaScript (ES6+)**: Classes, async/await, Intersection Observer
- **Google Fonts**: Inter & Poppins
- **No frameworks**: Pure vanilla implementation

## JavaScript Features

### Components
- `NavbarController`: Navigation and menu interactions
- `ScrollAnimations`: Intersection Observer animations
- `ContactFormHandler`: Form validation and submission
- `ProjectCardInteractions`: Hover effects
- `ParallaxEffects`: Subtle parallax on hero shapes
- `KeyboardNavigation`: Arrow key navigation
- `AnalyticsTracker`: Event tracking (optional)

### Utilities
- Debounce/throttle for performance
- Form validation
- Smooth scroll implementation

## CSS Architecture

### Structure
1. CSS Variables (theming)
2. Reset & Base Styles
3. Typography
4. Layout (container, sections)
5. Components (navbar, hero, about, projects, contact)
6. Responsive Breakpoints
7. Utilities & Accessibility

### Breakpoints
- Desktop: 968px+
- Tablet: 768px - 967px
- Mobile: < 768px
- Small Mobile: < 480px

## Performance Optimizations

- CSS animations use `transform` and `opacity` (GPU-accelerated)
- Throttled scroll events
- Intersection Observer for lazy animations
- Minimal JavaScript footprint (~400 lines)
- No external dependencies

## Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Go to Settings > Pages
3. Select branch and `/src` folder
4. Access at `https://username.github.io/repo-name`

### Netlify
1. Drag and drop `src` folder to Netlify
2. Or connect GitHub repository
3. Publish directory: `src`

### Vercel
```bash
vercel src
```

## Customization Checklist

- [ ] Update name and title in hero section
- [ ] Write your bio in about section
- [ ] Add your skills and technologies
- [ ] Replace placeholder projects with real ones
- [ ] Add project screenshots/images
- [ ] Update contact email and phone
- [ ] Add your social media links
- [ ] Customize color scheme
- [ ] Add your resume/CV link
- [ ] Update meta tags for SEO
- [ ] Add favicon
- [ ] Test on multiple devices
- [ ] Configure form backend
- [ ] Add Google Analytics (optional)

## License

Free to use for personal and commercial projects. Attribution appreciated but not required.

## Credits

Built with modern web standards and best practices. Designed for developers who want a clean, professional portfolio without framework overhead.

---

**Need help?** Check the comments in the code files for detailed documentation.
