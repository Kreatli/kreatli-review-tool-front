# Project Scratchpad

## Background and Motivation

The user needs a standalone "Pricing Page" in addition to the existing pricing section on the landing page. Currently, the pricing section is embedded within the home page at `/#pricing`. A dedicated `/pricing` route will provide better SEO, direct access, and improved user experience for users specifically looking for pricing information.

## Key Challenges and Analysis

1. **Component Reusability**: The existing `PricingSection` component is well-structured and can be reused on the standalone page. This ensures consistency between the landing page pricing section and the standalone page.

2. **Navigation Updates**: The Header component currently links to `/#pricing` (anchor link). We should update these links to point to `/pricing` for the standalone page, while keeping the anchor link as a fallback or alternative.

3. **Page Structure**: Following the pattern of other pages in the codebase:

   - Use Next.js Pages Router structure (`src/pages/pricing.tsx`)
   - Include Header component (consistent navigation)
   - Include Footer component (consistent footer with links)
   - Proper SEO with Head component
   - Follow the same styling and layout patterns

4. **Layout Considerations**: The pricing page should have:

   - Full-width layout similar to the home page
   - Proper spacing and padding
   - Responsive design (already handled by PricingSection component)

5. **Footer Links**: The pricing page should also fetch and display footer links from Storyblok, similar to the home page.

## High-level Task Breakdown

### Task 1: Create the Standalone Pricing Page

**Description**: Create a new page at `src/pages/pricing.tsx` that displays the pricing information.

**Success Criteria**:

- Page is accessible at `/pricing` route
- Page includes Header component
- Page includes Footer component with footer links
- Page reuses the existing `PricingSection` component
- Page has proper SEO metadata (title: "Kreatli | Pricing")
- Page follows the same structure pattern as other pages (like `index.tsx`)
- Page fetches footer links from Storyblok using `getStaticProps` (same pattern as home page)
- Page builds successfully with `npm run build`

### Task 2: Update Header Navigation Links

**Description**: Update the Header component to link to the standalone `/pricing` page instead of (or in addition to) the anchor link `/#pricing`.

**Success Criteria**:

- Header navigation links (both desktop and mobile menu) point to `/pricing`
- Links work correctly and navigate to the new pricing page
- No broken navigation links
- Page builds successfully with `npm run build`

### Task 3: Testing and Verification

**Description**: Test the new pricing page and verify all functionality works correctly.

**Success Criteria**:

- Pricing page loads correctly at `/pricing`
- All pricing cards display correctly
- All buttons and links work (sign-up links, "Create your own Plan" button)
- Navigation from header works correctly
- Footer displays correctly with links
- Page is responsive on mobile and desktop
- No console errors
- Build completes successfully with `npm run build`

## Project Status Board

- [ ] Task 1: Create the Standalone Pricing Page
- [ ] Task 2: Update Header Navigation Links
- [ ] Task 3: Testing and Verification

## Current Status / Progress Tracking

**Current Phase**: Planning Complete - Awaiting User Approval

**Last Updated**: Initial planning phase

## Executor's Feedback or Assistance Requests

_No requests at this time. Awaiting user approval to proceed with implementation._

## Lessons

_No lessons documented yet. This section will be updated during implementation if any issues or learnings arise._

---

## Codebase Documentation

### Project Overview

**Project Name**: Kreatli Review Tool Frontend  
**Framework**: Next.js 14.2.28 (Pages Router)  
**Language**: TypeScript  
**Styling**: Tailwind CSS + SCSS + HeroUI (component library)  
**Node Version**: >= 22.*  
**Package Manager**: npm

### Key Dependencies and Technologies

#### Core Framework & Libraries
- **Next.js** (^14.2.28) - React framework with Pages Router
- **React** (^18.2.0) - UI library
- **TypeScript** (^5.2.2) - Type safety

#### UI Component Libraries
- **@heroui/react** (2.7.11) - Primary UI component library (similar to NextUI)
- **@tanstack/react-query** (^5.83.0) - Data fetching and state management
- **framer-motion** (^11.16.7) - Animation library
- **react-hook-form** (^7.46.2) - Form handling

#### Styling
- **Tailwind CSS** (^3.4.17) - Utility-first CSS framework
- **SASS** (^1.68.0) - CSS preprocessor
- **autoprefixer** (^10.4.16) - CSS vendor prefixing
- **postcss** (^8.4.31) - CSS processing

#### Content Management
- **@storyblok/react** (^5.4.14) - Headless CMS integration
- **storyblok-generate-ts** (^2.2.0) - TypeScript type generation for Storyblok

#### API & HTTP
- **axios** (^1.9.0) - HTTP client
- **swagger-typescript** (^6.8.0) - API client generation from Swagger

#### Canvas & Media
- **konva** (^9.3.19) - 2D canvas library
- **react-konva** (^18.2.10) - React bindings for Konva
- **canvas** (^3.0.0-rc3) - Server-side canvas rendering
- **react-image-crop** (^10.1.8) - Image cropping

#### Drag & Drop
- **@dnd-kit/core** (^6.3.1) - Drag and drop functionality
- **@dnd-kit/sortable** (^10.0.0) - Sortable lists
- **@dnd-kit/utilities** (^3.2.2) - DnD utilities

#### Authentication & OAuth
- **@react-oauth/google** (^0.12.1) - Google OAuth integration

#### Other Utilities
- **zustand** (^4.5.2) - Lightweight state management
- **nanoid** (^3.3.7) - Unique ID generation
- **react-dropzone** (^14.2.3) - File upload handling
- **socket.io-client** (^4.8.1) - Real-time communication
- **simplify-js** (^1.2.4) - Path simplification
- **qs** (^6.13.1) - Query string parsing

#### Analytics & Tracking
- **@next/third-parties** (^15.4.1) - Third-party integrations (Google Tag Manager)

### Project Structure

```
src/
├── assets/           # Static assets (icons, images)
├── components/       # React components organized by feature
│   ├── account/     # Account management components
│   ├── asset/       # Asset-related components (review tool, comments, etc.)
│   ├── auth/        # Authentication components (sign-in, sign-up, etc.)
│   ├── chat/        # Chat/conversation components
│   ├── home/        # Landing page components (Hero, Features, Pricing, etc.)
│   ├── layout/      # Layout components (Header, Footer, Layout, Notifications)
│   ├── project/     # Project management components
│   └── various/     # Shared/reusable components (Icon, EmptyState)
├── constants/       # Constants and validation rules
├── contexts/        # React Context providers (Asset, Chat, Project, etc.)
├── hooks/           # Custom React hooks
├── lib/             # Library configurations (queryClient, storyblok)
├── pages/           # Next.js pages (routes)
├── services/        # API service layer (auto-generated from Swagger)
├── styles/          # Global styles (globals.scss)
├── typings/         # TypeScript type definitions
└── utils/           # Utility functions
```

### Key Configuration Files

#### `next.config.js`
- Image domains: `res.cloudinary.com`, `kreatlimedia.s3.amazonaws.com`, `kreatliassets.s3.amazonaws.com`
- Environment variables: `API_URL`, `GTM_ID`, `GOOGLE_OAUTH_CLIENT_ID`, `STORYBLOK_STATUS`, `STORYBLOK_CONTENT_API_ACCESS_TOKEN`
- Redirects configured for `/signup/professional` → `/sign-up` and `/faq` → `/`
- SVG handling configured for `@svgr/webpack`
- Source maps enabled in production

#### `tsconfig.json`
- Base URL: `src`
- Strict mode enabled
- JSX preserve mode
- Paths configuration empty (baseUrl used instead)

#### `tailwind.config.js`
- Content paths: `src/**/*.{js,ts,jsx,tsx}` and HeroUI theme files
- Dark mode: class-based
- HeroUI plugin integrated
- Safelist includes various color utilities

### Page Structure Patterns

#### Public Landing Page (`src/pages/index.tsx`)
- Uses `getStaticProps` to fetch footer links from Storyblok
- Conditionally renders `<Home />` (not signed in) or `<Projects />` (signed in)
- Includes `<Header />` component
- SEO: Dynamic title based on sign-in status

#### Static Pages (e.g., `terms-and-conditions.tsx`, `privacy-policy.tsx`)
- Structure: `<Head>`, `<Header />`, content container with max-width
- No `getStaticProps` needed
- Use `useSession()` hook

#### Dynamic Storyblok Pages (`[slug].tsx`)
- Uses `getStaticProps` and `getStaticPaths`
- Fetches Storyblok content
- Revalidation: 60s (draft) or 3600s (published)
- Includes `<Header />` and `<Decorations />`
- Uses `useStoryblokState()` for live preview in draft mode

### Component Patterns

#### Header Component (`src/components/layout/Header/Header.tsx`)
- Uses HeroUI `Navbar` component
- Conditional rendering based on `isSignedIn` status
- Desktop menu: hidden on mobile (`hidden lg:flex`)
- Mobile menu: uses `NavbarMenu` with toggle
- Theme toggle: dark/light mode using localStorage
- Navigation links currently use anchor links (`/#pricing`, `/#product`, etc.)
- User widget and notifications shown when signed in

#### PricingSection Component (`src/components/home/PricingSection/PricingSection.tsx`)
- Self-contained component with no props
- Uses HeroUI `Card`, `CardBody`, `Chip`, `Button` components
- Three pricing tiers: Free, Pro ($15/user/month), Advanced ($20/user/month)
- Links to `/sign-up` for all plan buttons
- "Create your own Plan" button links to Google Calendar booking
- Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop

#### Footer Component (`src/components/home/Footer/FooterSection.tsx`)
- Accepts optional `links` prop (from Storyblok)
- Social media links (LinkedIn, X/Twitter, TikTok, Facebook)
- Static links: Terms, Privacy Policy, Cookie Policy
- "Get Started" and "Book a Demo" buttons

#### Home Component (`src/components/home/Home/Home.tsx`)
- Composes multiple sections: Hero, Features, CostCalculator, KreatliFor, HowItWorks, Pricing, FAQ, Footer
- Accepts `footerLinks` prop
- Includes `SignUpModal` component

### API/Service Structure

#### Services (`src/services/`)
- `services.ts` - Auto-generated from Swagger/OpenAPI (1161+ lines)
- `config.ts` - Axios configuration with interceptors
- `hooks.ts` - React Query hooks generated from services
- `types.ts` - TypeScript types generated from Swagger
- Base URL from `process.env.API_URL`
- Authorization: Bearer token from `localStorage.getItem('token')`
- Error handling: Custom `RequestError` class

#### Storyblok Integration (`src/lib/storyblok.ts`)
- Access token from `process.env.STORYBLOK_CONTENT_API_ACCESS_TOKEN`
- Uses `@storyblok/react` package
- Fetches footer links via `get('cdn/links')`
- Version controlled by `process.env.STORYBLOK_STATUS` ('draft' | 'published')

### Authentication & Session

#### `useSession` Hook (`src/hooks/useSession.ts`)
- Checks for token in localStorage
- Uses `useGetUser` query (React Query)
- Manages loading state via `useAppLoader`
- Returns: `isSignedIn`, `isLoading`, `signOut`, `user`
- Automatically removes token on error

#### OAuth
- Google OAuth via `@react-oauth/google`
- Provider configured in `_app.tsx`

### State Management

#### React Query (`@tanstack/react-query`)
- Primary data fetching solution
- Query client configured in `src/lib/queryClient.ts`
- Used extensively for API calls

#### Zustand
- Lightweight state management
- Used for app loader state (`useAppLoader`)

#### Context API
- Multiple contexts: Asset, Chat, File, Project, ReviewTool
- Located in `src/contexts/`

### Styling Conventions

#### Tailwind CSS
- Utility-first approach
- Custom theme via HeroUI
- Dark mode: class-based (`dark:` prefix)
- Responsive breakpoints: `sm:`, `md:`, `lg:`

#### SCSS
- Global styles in `src/styles/globals.scss`
- Component-specific SCSS in component directories

#### HeroUI Components
- Primary component library
- Customizable via props
- Theme integration with Tailwind

### Key File Locations

#### Components
- **Header**: `src/components/layout/Header/Header.tsx`
- **Footer**: `src/components/home/Footer/FooterSection.tsx`
- **PricingSection**: `src/components/home/PricingSection/PricingSection.tsx`
- **Home**: `src/components/home/Home/Home.tsx`
- **Layout**: `src/components/layout/Layout/Layout.tsx`

#### Pages
- **Home**: `src/pages/index.tsx`
- **Pricing** (to be created): `src/pages/pricing.tsx`
- **Terms**: `src/pages/terms-and-conditions.tsx`
- **Privacy**: `src/pages/privacy-policy.tsx`

#### Utilities
- **Storyblok**: `src/lib/storyblok.ts`
- **Query Client**: `src/lib/queryClient.ts`
- **Token utils**: `src/utils/token.ts`
- **Session hook**: `src/hooks/useSession.ts`

### Environment Variables

Required environment variables:
- `API_URL` - Backend API base URL
- `GTM_ID` - Google Tag Manager ID (optional)
- `GOOGLE_OAUTH_CLIENT_ID` - Google OAuth client ID
- `STORYBLOK_STATUS` - 'draft' or 'published'
- `STORYBLOK_CONTENT_API_ACCESS_TOKEN` - Storyblok API token

### Build & Development

#### Scripts (`package.json`)
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - ESLint
- `npm run tsc` - TypeScript type checking
- `npm run swagger` - Generate API client from Swagger
- `npm run types` - Generate Storyblok TypeScript types

#### Build Configuration
- React Strict Mode: **disabled** (reactStrictMode: false)
- SWC Minify: **disabled** (swcMinify: false)
- Source maps: **enabled** in production
- Image optimization enabled for configured domains

### Important Notes

1. **React Strict Mode**: Disabled in production (`reactStrictMode: false` in `next.config.js`)
2. **SWC Minification**: Disabled (`swcMinify: false`)
3. **TypeScript**: Strict mode enabled
4. **Image Domains**: Configured in `next.config.js` for Cloudinary and S3
5. **SVG Handling**: Uses `@svgr/webpack` for SVG imports as React components
6. **Storyblok**: Footer links are fetched server-side via `getStaticProps`
7. **Authentication**: Token-based, stored in localStorage
8. **Error Handling**: Custom `RequestError` class in services layer
9. **Dark Mode**: Implemented via localStorage and class-based Tailwind
10. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
