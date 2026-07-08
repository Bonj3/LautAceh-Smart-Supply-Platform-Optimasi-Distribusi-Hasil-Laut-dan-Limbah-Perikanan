You are a Senior Frontend Engineer and Responsive UI/UX Specialist.

Your task is NOT to redesign my website.

Instead, perform a complete responsive audit and refactor while preserving the current visual identity, branding, storytelling, animations, and layout.

The final result should look almost identical to the current desktop design, but it must adapt perfectly across different laptop, desktop, tablet, and mobile screen sizes.

--------------------------------------------------
PRIMARY GOAL
--------------------------------------------------

Make the entire website fully responsive without changing the overall design language.

Do not simplify the UI.

Do not remove animations.

Do not remove illustrations.

Do not redesign sections.

Instead, improve the layout architecture so every component adapts naturally.

--------------------------------------------------
RESPONSIVE TARGETS
--------------------------------------------------

The website must work correctly on:

320px
375px
390px
414px

640px
768px
820px

1024px

1280px

1366x768

1440x900

1536x864

1600x900

1920x1080

2560x1440

Ultra Wide displays

--------------------------------------------------
RESPONSIVE REQUIREMENTS
--------------------------------------------------

Audit every section.

Replace every fixed width with responsive sizing.

Replace every fixed height when possible.

Use max-width containers.

Avoid overflow.

Avoid clipped content.

Avoid overlapping elements.

Maintain consistent spacing.

Ensure every section scales proportionally.

--------------------------------------------------
LAYOUT RULES
--------------------------------------------------

Use responsive containers.

Prefer

max-w-screen-xl

max-w-7xl

max-w-[1440px]

instead of fixed widths.

Every section should use

mx-auto

responsive padding

responsive margin

--------------------------------------------------
TYPOGRAPHY
--------------------------------------------------

Replace fixed font sizes with responsive typography.

Prefer clamp() or responsive Tailwind classes.

Example:

text-3xl
md:text-5xl
xl:text-7xl

Headings should scale smoothly.

Body text should remain readable on every device.

--------------------------------------------------
SPACING
--------------------------------------------------

Replace fixed spacing with responsive spacing.

Example

py-16
md:py-24
xl:py-32

px-4
sm:px-6
lg:px-8
xl:px-12

Avoid huge empty spaces on smaller screens.

--------------------------------------------------
GRID
--------------------------------------------------

Replace fixed layouts with responsive grids.

Desktop:
4 columns

Tablet:
2 columns

Mobile:
1 column

Use CSS Grid whenever appropriate.

--------------------------------------------------
FLEXBOX
--------------------------------------------------

Replace horizontal layouts with

flex-col

on smaller screens.

Use

lg:flex-row

for desktop.

--------------------------------------------------
IMAGES
--------------------------------------------------

Images should never stretch.

Use

w-full

h-auto

object-cover

or

object-contain

where appropriate.

Decorative illustrations should reposition responsively.

--------------------------------------------------
ABSOLUTE ELEMENTS
--------------------------------------------------

Audit every absolute positioned element.

If an absolute element breaks responsiveness,

replace it with flex/grid positioning whenever possible.

If absolute positioning is necessary,

use responsive positioning values.

Never hardcode positions for only one screen size.

--------------------------------------------------
ANIMATIONS
--------------------------------------------------

Keep all animations.

Animations should remain responsive.

Scrolling animations should trigger correctly.

Floating illustrations should never overlap content.

--------------------------------------------------
SECTION REVIEW
--------------------------------------------------

For every section:

1.
Audit responsiveness.

2.
Fix layout.

3.
Preserve design.

4.
Improve scaling.

5.
Prevent overflow.

--------------------------------------------------
PERFORMANCE
--------------------------------------------------

Avoid unnecessary wrappers.

Reduce layout shifts.

Maintain smooth scrolling.

--------------------------------------------------
DO NOT
--------------------------------------------------

Do NOT redesign.

Do NOT simplify.

Do NOT remove sections.

Do NOT change colors.

Do NOT replace illustrations.

Do NOT remove storytelling.

Do NOT remove motion.

--------------------------------------------------
DELIVERABLE
--------------------------------------------------

Refactor every page so that the website appears professionally designed across all screen sizes while maintaining the existing visual identity and storytelling experience.

Before modifying the code:

1. Audit the entire project.
2. Identify every responsiveness issue.
3. Explain why it happens.
4. Create a refactoring plan.
5. Only after the plan is complete, begin implementing the responsive improvements section by section.
6. After each section is completed, verify that it works correctly across all target breakpoints before continuing.
7. Do not stop until every page has been audited and made responsive.

If decorative elements such as fish, waves, bubbles, boats, or floating illustrations are currently positioned using absolute values that only work on one screen size, refactor them into a responsive positioning system using relative containers, CSS Grid, Flexbox, transforms, and percentage-based positioning. Decorative elements should preserve their visual composition across different aspect ratios without overlapping important content.