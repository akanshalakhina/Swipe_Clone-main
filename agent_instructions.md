# Next Agent Instructions: Swipe Clone (getswipe.in)

## Objective
Your task is to create a **pixel-by-pixel, inch-perfect clone** of [getswipe.in](https://getswipe.in/). 
The user's core requirement is that this must NOT be a loose approximation or a generic template. It must be an EXACT replica.

## Key Directives
1. **Exact Assets:** You MUST use the exact same images, favicons, logos, icons, and text copy as the original website. Do not use placeholders or generic substitutes. Extract and use the actual assets from the site.
2. **Pixel-Perfect UI:** The styling, spacing, typography, colors, and layout must match `getswipe.in` exactly on all viewport sizes. The user previously experienced layout issues (e.g., right side of the page being blank, navbar overlapping the hero section, items misaligned). Ensure these are completely resolved and the layout is flawless.
3. **Micro-interactions & Popups:** Implement the exact same functionalities, including the floating chatbot, timed popups (e.g., signup prompts appearing after a set time), and sign-in prompts when interacting with specific restricted elements.
4. **Functionality:** Replicate all tools, navbars, drop-downs, dashboard views, and workflows present on the original site.

## Architecture Context (from previous sessions)
- **Frontend:** React, Vite, Tailwind CSS v3 (Note: Tailwind v4 caused utility compilation issues previously, so the project was downgraded to v3), Zustand for state management, and Framer Motion for animations.
- **Backend / BaaS:** Firebase (Firestore for database, Firebase Auth for authentication including Google and Phone OTP).
- **Deployment:** Vercel. The project uses Vercel for the static frontend and serverless functions (located in the `api/` folder, e.g., for PDF generation).
- **No Local Backend:** Do not use MongoDB or a local Node/Express server. All backend data and auth flows must go exclusively through Firebase and Vercel serverless functions.

## User's Credentials for Testing
If you need to explore the authenticated dashboard to replicate its exact functionality, the user provided these credentials in a past session:
- **Email:** sukritchopra2003@gmail.com
- **Password:** barcelonamessi10

## Execution Focus
When making UI changes, continuously verify the layout to ensure no CSS breaks or regressions occur. The user is highly focused on visual accuracy. Validate all components across different screen sizes (especially 1920px desktop width and mobile) to ensure there are no horizontal overflows or blank spaces.
