# Instagram Reels Overlay Implementation Requirements

Based on the provided reference image, here's what needs to be implemented to recreate the Instagram Reels overlay with Kreatli branding.

## Overview

The overlay should show a complete Instagram Reels interface mockup with a purple border frame (Kreatli branding) and all UI elements positioned accurately.

## Required Elements

### 1. **Purple Border Frame (Kreatli Branding)**

- **Color**: Solid purple border around the entire screen
- **Purpose**: Indicates this is a Kreatli-branded overlay
- **Implementation**: Border around the entire preview container

### 2. **Status Bar (Top)**

- **Position**: Very top of the screen
- **Left side**: Time display "9:41" (white text)
- **Right side**: Mobile status icons:
  - Wi-Fi signal indicator
  - Battery icon
- **Background**: Transparent or matches device theme
- **Height**: ~44px scaled

### 3. **Navigation Bar**

- **Position**: Below status bar
- **Left**: Back arrow icon (left-pointing chevron)
- **Center**: "Reels" text (white, semibold)
- **Right**: Camera icon (square with circle inside)
- **Background**: Light pink/purple gradient (matches Instagram Reels style)
- **Height**: ~56px scaled

### 4. **Red Vertical Warning Bars (Left & Right)**

- **Color**: Solid red (#E91E63 or similar)
- **Position**: Far left and far right edges
- **Width**: ~57.5px scaled (represents areas that get cropped)
- **Text**: Rotated vertical text saying "THIS AREA WILL GET CROPPED ON MOST PHONES"
- **Text Color**: White
- **Text Rotation**: 90 degrees (vertical)
- **Purpose**: Visual indicator of unsafe zones

### 5. **Right Side Interaction Bar**

- **Position**: Right side of video content (inside safe zone)
- **Icons** (stacked vertically, white):
  - **Likes**: Heart icon with number "4,778" below
  - **Comments**: Speech bubble icon with number "64" below
  - **Shares**: Paper airplane (send) icon with number "132" below
  - **More Options**: Three-dot menu icon at bottom
- **Spacing**: Even vertical spacing between elements
- **Alignment**: Centered icons with numbers below

### 6. **Bottom Overlay (Content Information)**

- **Position**: Bottom of screen
- **Background**: Dark gradient (black with transparency, fading to transparent)
- **Padding**: Left and right padding to account for red warning bars

#### Profile Section (Top of bottom overlay):

- **Profile Icon**: Purple hexagon with white symbol inside (Kreatli logo)
- **Username**: "safezonecheck" (white text, semibold)
- **Layout**: Horizontal, icon on left, username on right

#### Caption Section:

- **Text**: "Lorem ipsum dolor sit amet, cons @hashtag ..."
- **Style**: White text, regular weight
- **Hashtag**: Bold/emphasized (@hashtag)

#### Likes Summary:

- **Text**: "Liked by allenbenjamin and 4,777 others"
- **Style**: White text
- **Username**: "allenbenjamin" should be bold/emphasized

#### Audio Information:

- **Icon**: Music note icon (white)
- **Text**: "Safezone - Original Audio" (white text)
- **Layout**: Horizontal, icon on left, text on right
- **Additional Icon**: Another purple hexagon icon on the far right of this line

### 7. **Safe Zone Indicators (Optional - if showSafeZones is true)**

- **Color**: Green border/background
- **Position**: Central area of video
- **Purpose**: Shows the safe viewing area

## Design Specifications

### Colors:

- **Purple Border**: Kreatli brand purple (exact hex code needed)
- **Red Warning Bars**: #E91E63 or similar Instagram red
- **Text**: White (#FFFFFF)
- **Background Gradients**: Black with transparency (rgba(0, 0, 0, 0.7) to transparent)
- **Navigation Bar**: Light pink/purple gradient

### Typography:

- **Status Bar Time**: Small, regular weight
- **"Reels" Text**: Medium, semibold
- **Username**: Small-medium, semibold
- **Caption**: Small, regular weight
- **Numbers (likes/comments/shares)**: Small, regular weight
- **Warning Text**: Small-medium, regular weight

### Spacing & Sizing:

- All measurements should scale based on canvas dimensions (1080x1920 base)
- Use `scaleX` and `scaleY` multipliers for responsive sizing
- Maintain aspect ratios for icons and UI elements

## Assets Needed

1. **Purple Hexagon Icon**:

   - SVG or PNG of purple hexagon with white symbol/logo inside
   - Used for profile icon and save icon
   - Size: ~32px scaled
   - **Location**: `src/assets/images/kreatli-hexagon-icon.png` (or `.svg`)

2. **Icons** (can use existing Icon component):

   - Heart icon (for likes) - ✅ Already exists in `src/assets/icons/heart.svg`
   - Chat/speech bubble icon (for comments) - ✅ Already exists in `src/assets/icons/chat.svg`
   - Send/paper airplane icon (for shares) - ✅ Already exists in `src/assets/icons/send.svg`
   - Music note icon (for audio) - ✅ Already exists in `src/assets/icons/music.svg`
   - Three dots icon (for more options) - ✅ Already exists in `src/assets/icons/dots.svg`
   - Back arrow icon - ✅ Already exists in `src/assets/icons/arrow-left.svg`
   - Camera icon - ⚠️ May need to create or use existing icon

3. **Kreatli Logo**:
   - White version for use inside purple hexagon
   - Should be recognizable at small sizes
   - **Location**: `src/assets/images/kreatli-logo-white.png` (or use existing `logo-white.png` from `public/`)

## File Locations

### Recommended Structure:

```
src/assets/
  images/
    kreatli-hexagon-icon.png    ← Purple hexagon with white logo inside
    kreatli-logo-white.png       ← White Kreatli logo (if needed separately)

  icons/
    camera.svg                   ← Camera icon (if needed to create)
```

### Alternative (if using public folder):

```
public/
  safe-zone-checker/
    kreatli-hexagon-icon.png
    kreatli-logo-white.png
```

**Note**: Using `src/assets/` is preferred because:

- Next.js optimizes images imported from `src/`
- Consistent with existing project structure
- Better for TypeScript imports
- Images are bundled and optimized during build

## Implementation Notes

1. **Scaling**: All elements must scale proportionally based on the preview container size
2. **Layering**: Ensure proper z-index ordering (status bar > nav bar > content > overlays)
3. **Responsive**: Elements should maintain their relative positions across different preview sizes
4. **Performance**: Use CSS transforms and opacity for smooth rendering
5. **Accessibility**: Consider adding aria-labels for screen readers (though overlay is non-interactive)

## Canvas Export Considerations

For the export function (`safeZoneExport.ts`), the overlay needs to be drawn using Canvas 2D API:

- Draw red side bars
- Draw text (rotated for warning bars)
- Draw icons (may need to use image assets or simple shapes)
- Apply gradients for backgrounds
- Maintain same proportions as React overlay

## Questions to Clarify

1. **Exact purple color code** for Kreatli branding border
2. **Purple hexagon icon asset** - do you have this, or should I create it?
3. **Username to display** - should it be "safezonecheck" or "Kreatli"?
4. **Audio name** - should it be "Safezone - Original Audio" or "Kreatli - Original Audio"?
5. **Border thickness** - how thick should the purple border frame be?
6. **Font family** - should we use system fonts or a specific font?
