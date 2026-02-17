# Detail Page - Testing & Verification Guide

**Date**: 2024  
**Component**: Movie Detail Page  
**Route**: `/movie/[id]`  
**Status**: ✅ Ready for Testing

---

## Quick Start Testing

### 1. Start Development Server

```bash
npm run dev
```

Navigate to: `http://localhost:3000`

### 2. Test URLs

Open any of these movie detail pages:

| Movie | URL | Why Test |
|-------|-----|----------|
| Fight Club | `http://localhost:3000/movie/550` | Popular, well-known, good data |
| The Matrix | `http://localhost:3000/movie/603` | Sci-Fi, multiple cast members |
| Inception | `http://localhost:3000/movie/27205` | Complex plot, great metadata |
| Interstellar | `http://localhost:3000/movie/157336` | Long runtime, high budget |
| Avatar | `http://localhost:3000/movie/19995` | High revenue, similar movies |

---

## Functional Testing Checklist

### Page Load & Data Fetching

- [ ] **Page loads without console errors**
  - Open DevTools (F12)
  - Check Console tab for errors
  - Should only show TMDB API response logs (if any)

- [ ] **Loading state displays**
  - Network throttle to "Slow 3G" in DevTools
  - Verify skeleton UI appears while loading
  - Skeleton should mirror page structure

- [ ] **Data fetches successfully**
  - Wait for skeleton to disappear
  - All sections should populate with data
  - No "undefined" or "null" values visible

- [ ] **Error state handling**
  - Navigate to invalid ID: `/movie/999999999`
  - Should show error message: "Movie Not Found"
  - Should show "Go Back" button
  - Button should navigate back

---

### DetailHeader Component

- [ ] **Backdrop image displays**
  - Large full-width image
  - Should fill most of screen on desktop
  - Gradient overlay visible at bottom

- [ ] **Movie title is visible**
  - Large bold text (H1 heading)
  - Properly readable over gradient

- [ ] **Metadata row displays**
  - Format: `Year • Runtime • Genres • Rating`
  - Example: `2024 • 2h 19m • Action Drama • ⭐8.8`
  - All values present (if available in API)

- [ ] **Rating badge color-codes correctly**
  - 9.0+ → Green badge
  - 7.0-8.9 → Yellow badge
  - 5.0-6.9 → Orange badge
  - < 5.0 → Red badge

- [ ] **Genre pills display**
  - Max 3 genres shown inline
  - Styled as rounded pills
  - Truncate with border if more than 3

- [ ] **Tagline displays** (if exists)
  - Italicized text
  - Enclosed in quotes
  - Lighter color than title

- [ ] **Action buttons present and clickable**
  - ✅ "Play Now" button (red, primary)
  - ✅ "Add to List" button (secondary, border)
  - ✅ Share button (icon only)
  - ✅ Like button (icon only)
  - All buttons should be clickable without errors

---

### SynopsisSection Component

- [ ] **Overview text displays fully**
  - Complete synopsis/overview text
  - Proper line breaks and wrapping
  - No truncation

- [ ] **Genre badges display**
  - All genres from API shown
  - Styled badge appearance
  - Multiple rows if many genres

- [ ] **Production details grid displays**
  - Status: Shows release status
  - Language: Shows language name (not code)
  - Budget: Formatted as $XXM (if available)
  - Revenue: Formatted as $XXM (if available)
  - Companies: Lists production companies

- [ ] **Production details align properly**
  - Mobile: Single column
  - Tablet: 2 columns
  - Desktop: 2x2 grid + companies row

- [ ] **Visual separator present**
  - Horizontal line between overview and details

---

### CastSection Component

- [ ] **Cast carousel displays**
  - Visible collection of actor cards
  - Horizontal scrollable container

- [ ] **Actor cards show correct info**
  - Actor photo displayed
  - Actor name below photo
  - Character name with "as" prefix
  - Example: `as Tony Stark`

- [ ] **Cast limited to 15**
  - If movie has 50+ cast, only 15 shown
  - "View all X cast members" button appears

- [ ] **Fallback avatars work**
  - For actors without profile photos
  - Shows generic person avatar icon

- [ ] **Carousel scrolls horizontally**
  - Desktop: 5-6 cards visible, can scroll
  - Tablet: 3-4 cards visible, can scroll
  - Mobile: 2-3 cards visible, can scroll

- [ ] **Card accessibility**
  - Tab key navigates through cards
  - Each card has aria-label

---

### DirectorSection Component

- [ ] **Director(s) display**
  - All directors found (filtered by job="Director")
  - Shown in card format

- [ ] **Director card info**
  - Photo displayed (or fallback avatar)
  - Director name
  - Department label (e.g., "Director, Film")

- [ ] **Multiple directors handled**
  - If 2+ directors: Shows all
  - Grid layout: 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop)

- [ ] **Card hover effect**
  - Background color changes on hover
  - Subtle animation/transition

---

### SimilarMoviesSection Component

- [ ] **Similar movies grid displays**
  - Grid of movie posters
  - Same style as home page MovieCards

- [ ] **Limited to 12 movies**
  - If API returns 20+ similar, only 12 shown
  - "View all X similar movies" button if more

- [ ] **Grid responsive**
  - Mobile: 2 columns
  - Tablet: 3-4 columns
  - Desktop: 6 columns (2 rows of 6)

- [ ] **Movie cards clickable**
  - Click any card → Navigate to that movie's detail page
  - URL changes to `/movie/[newMovieId]`
  - New page loads with new movie data

- [ ] **Card hover effect**
  - Scale up on hover
  - Shadow increases
  - Overview text appears (if implemented)

---

## Visual Testing Checklist

### Desktop (1920x1080)

- [ ] **Layout looks clean**
  - Proper spacing around elements
  - No overlapping elements
  - Good visual hierarchy

- [ ] **Images load and display**
  - Backdrop fills header area
  - Cast photos display correctly
  - Similar movie posters visible

- [ ] **All sections visible**
  - No horizontal scrolling (except cast carousel)
  - All content fits in viewport (maybe need scroll down)
  - Sections appear in correct order

- [ ] **Typography readable**
  - Title large enough (~48-64px)
  - Body text comfortable to read (~16px)
  - Metadata and details clearly visible

### Tablet (768x1024)

- [ ] **Layout adapts properly**
  - Sections stack appropriately
  - Grid columns adjust (2-3 similar movies per row)
  - Padding/margins scale down

- [ ] **Touch targets (buttons) are large**
  - Action buttons easy to tap (44x44px minimum)

- [ ] **Cast carousel**
  - Still scrollable
  - Proper sized cards for touch

### Mobile (375x667)

- [ ] **Header still visible**
  - Backdrop scales to device width
  - Text still readable
  - Action buttons accessible

- [ ] **Stack layout works**
  - Sections stack vertically
  - No horizontal content overflow
  - Touch scrolling smooth

- [ ] **Cast carousel optimized**
  - 2-3 cards per viewport
  - Horizontal scroll smooth
  - Cards properly sized for mobile

- [ ] **Similar movies grid**
  - 2 columns fits screen
  - Cards properly spaced
  - No overflow

---

## Accessibility Testing Checklist

### Keyboard Navigation

- [ ] **Tab through all interactive elements**
  - Start at top: Tab key moves through:
    1. Play Now button
    2. Add to List button
    3. Share button
    4. Like button
    5. Similar movie links
    6. View All buttons

- [ ] **Focus visible**
  - Blue ring appears around focused element
  - Ring clearly visible against background
  - Focus moves in logical order (top → bottom)

- [ ] **Enter/Space activate buttons**
  - Tab to button, press Enter → Action fires
  - Tab to button, press Space → Action fires (if applicable)

### Screen Reader (NVDA / JAWS / VoiceOver)

- [ ] **Headings announced**
  - "Heading 1: Movie Title"
  - "Heading 2: Cast"
  - "Heading 2: Director"
  - "Heading 2: Similar Movies"

- [ ] **Images have alt text**
  - Backdrop: Not announced (decorative)
  - Cast photos: "Actor Name"
  - Director photos: "Director Name"
  - Movie posters: "Movie Title"

- [ ] **Form fields announced**
  - Buttons announced with label
  - "Play Now Button"
  - "Add to List Button"

- [ ] **Links announced**
  - "View all X cast members, link"
  - "View all X similar movies, link"

### Color Contrast

- [ ] **Text on background**
  - Use WebAIM contrast checker: https://webaim.org/resources/contrastchecker/
  - Compare text color vs background color
  - Should be ≥ 4.5:1 (WCAG AA for normal text)

- [ ] **Rating badge text**
  - Green text on green background: Check contrast
  - Should pass WCAG AA level

- [ ] **Button text**
  - Red "Play Now" text on background: Check contrast

---

## Performance Testing

### Page Load Time

Using Lighthouse in DevTools:

```bash
F12 → Lighthouse → Generate report
```

Check metrics:
- [ ] **First Contentful Paint < 1.5s**
- [ ] **Largest Contentful Paint < 2.5s**
- [ ] **Cumulative Layout Shift < 0.1**

### Image Optimization

- [ ] **Backdrop loads quickly**
  - Check image size (should be ~200-300KB for 1280px)
  - Quality looks good (not too compressed)

- [ ] **Cast photos load**
  - Size ~30-50KB each
  - Width 185px optimized

- [ ] **Lazy loading works**
  - Similar movie images load as you scroll
  - Network tab shows lazy loading

### API Calls

In DevTools Network tab:

- [ ] **Single API call made** (not 3 separate calls)
  - Request: `/movie/{id}?append_to_response=credits,similar`
  - Status: 200 OK
  - Response size < 100KB

- [ ] **No duplicate requests**
  - Each movie ID fetched only once
  - Clicking similar movie → different ID fetched

---

## Data Validation Testing

### Movie with Complete Data

**URL**: `http://localhost:3000/movie/550` (Fight Club)

- [ ] **All fields populated**
  - Title, year, runtime, budget, revenue present
  - Genres list complete
  - Cast members show photos
  - Director displays
  - Similar movies found

### Movie with Partial Data

**URL**: `http://localhost:3000/movie/000001` (Old movie)

- [ ] **Graceful handling of missing data**
  - No "undefined" text visible
  - Missing photos show fallback avatar
  - Missing budget shows "N/A" or nothing
  - Missing similar movies section doesn't appear

### Invalid Movie ID

- [ ] **Error handling works**
  - Navigate to `/movie/99999999`
  - Error message displays
  - Go Back button works

---

## Cross-Browser Testing

Test on each browser:

| Browser | Version | Desktop | Tablet | Mobile | Notes |
|---------|---------|---------|--------|--------|-------|
| Chrome | Latest | Y/N | Y/N | Y/N | |
| Firefox | Latest | Y/N | Y/N | Y/N | |
| Safari | Latest | Y/N | Y/N | Y/N | |
| Edge | Latest | Y/N | Y/N | Y/N | |

Checklist for each browser:
- [ ] Page loads without errors
- [ ] All features work
- [ ] Styling looks correct
- [ ] No console warnings

---

## Integration Testing

### Navigation Flow

- [ ] **From home page**
  - Click any movie card on home page
  - Navigate to detail page
  - All data loads correctly

- [ ] **Similar movie navigation**
  - On detail page, click similar movie card
  - Navigate to new detail page
  - New movie data loads
  - URL updates: `/movie/550` → `/movie/[newId]`

- [ ] **Back button navigation**
  - From detail page, click "Go Back" (on error)
  - Should navigate back to previous page (home or previous detail)

---

## Test Case Examples

### Test Case 1: Normal Movie Load

```
Title: Load Fight Club Detail Page
Preconditions: Dev server running
Steps:
1. Navigate to localhost:3000/movie/550
2. Wait for page to load
3. Verify all sections display
4. Check image loads
5. Verify cast carousel scrolls
Expected Result: All data displays correctly, no errors
```

### Test Case 2: Invalid Movie ID

```
Title: Handle Invalid Movie ID
Preconditions: Dev server running
Steps:
1. Navigate to localhost:3000/movie/999999999
2. Wait for error
3. Click "Go Back"
Expected Result: Error message displays, back button navigates
```

### Test Case 3: Mobile Responsiveness

```
Title: Mobile Layout Verification
Preconditions: Dev server running, DevTools open
Steps:
1. Toggle device toolbar (Ctrl+Shift+M)
2. Set to iPhone 12 (390x844)
3. Navigate to movie detail page
4. Scroll through all sections
5. Verify spacing and alignment
Expected Result: No horizontal scroll, all content visible and readable
```

### Test Case 4: Cast Carousel Scroll

```
Title: Cast Carousel Scrolling
Preconditions: Movie with 15+ cast members loaded
Steps:
1. Locate cast section
2. Verify 5-6 cast cards visible
3. Scroll horizontally left/right
4. Observe new cards appear
Expected Result: Smooth horizontal scroll, all cards clickable (future)
```

---

## Known Limitations

### Current Implementation (v0.3.0)

❌ **Not Implemented Yet**:
- [ ] Trailer player (Play button doesn't work yet)
- [ ] Watchlist functionality (Add to List doesn't save)
- [ ] Share functionality (Share button not connected)
- [ ] Like/Favorite toggling (Heart button not connected)
- [ ] Expandable cast modal (View all redirects elsewhere)
- [ ] Comment/Review section
- [ ] Watch provider information
- [ ] Related crew members
- [ ] Production timeline

✅ **Implemented**:
- [x] Movie detail page layout
- [x] Data fetching from TMDB
- [x] Responsive design
- [x] Navigation between movies
- [x] Error handling
- [x] Skeleton loading states
- [x] Accessibility features

### Known Issues

**Issue 1**: Cast photos may not load for some movies
- **Cause**: TMDB doesn't have profile_path for all cast members
- **Solution**: Fallback avatar displays

**Issue 2**: Similar movies may be empty for very old movies
- **Cause**: TMDB algorithm requires sufficient ratings/similar data
- **Solution**: Section doesn't display if no similar movies found

**Issue 3**: Runtime may show 0 for some entries
- **Cause**: TMDB data incomplete
- **Solution**: "N/A" displays instead

---

## Reporting Issues

If you find bugs during testing, document:

```
**Bug**: [Title]
**Severity**: [Critical/High/Medium/Low]
**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Result**: [What should happen]
**Actual Result**: [What actually happened]

**Screenshots**: [If applicable]
**Browser**: [Chrome 120, Firefox 121, etc]
**Device**: [Desktop, Tablet, Mobile]
```

---

## Test Execution Log

Copy this table for tracking test runs:

```
| Test Case | Result | Browser | Device | Date | Notes |
|-----------|--------|---------|--------|------|-------|
| Page Load | ✓/✗ | Chrome | Desktop | | |
| Data Fetch | ✓/✗ | Chrome | Desktop | | |
| Error Handling | ✓/✗ | Chrome | Desktop | | |
| Mobile Layout | ✓/✗ | Safari | iPhone 12 | | |
| Cast Scroll | ✓/✗ | Firefox | Laptop | | |
| Navigation | ✓/✗ | Edge | Desktop | | |
| Accessibility | ✓/✗ | Chrome + NVDA | Desktop | | |
```

---

## Sign-Off

- [ ] **QA Lead**: Functional testing complete, sign off date: ______
- [ ] **Design Lead**: Visual design reviewed, sign off date: ______
- [ ] **Accessibility Lead**: A11y testing complete, sign off date: ______
- [ ] **Performance Lead**: Performance targets met, sign off date: ______

---

**Ready for Production**: [ ] Yes [ ] No

**Blockers** (if any):
- 
- 
- 

**Next Steps**:
1. Address any blockers
2. Create v0.3.0 git tag
3. Deploy to staging
4. Conduct UAT with stakeholders
5. Deploy to production
