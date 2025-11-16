# UI & UX Guide

## 🎨 Design System

### Colors

**Primary Color:** Blue (`hsl(221.2 83.2% 53.3%)`)
- Used for: CTAs, links, active states
- Customizable in `frontend/tailwind.config.ts`

**Section Colors:**
- Deals: Red accent (`bg-red-50 text-red-600`)
- Coupons: Green accent (`bg-green-50 text-green-600`)
- Products: Blue accent (`bg-blue-50 text-blue-600`)
- Services: Purple accent (`bg-purple-50 text-purple-600`)

### Typography

- **Font:** Inter (Google Fonts)
- **Headings:** Bold, tracking-tight
- **Body:** Regular weight, comfortable line height

### Spacing

- Mobile padding: `px-4`
- Container max-width: `max-w-6xl`
- Section spacing: `py-12 md:py-16`

---

## 📱 Responsive Breakpoints

```css
Mobile:  < 640px  (sm)
Tablet:  640px - 1024px (md)
Desktop: > 1024px (lg)
```

### Mobile-First Approach

All components are built mobile-first, then enhanced for larger screens:

```jsx
className="
  text-sm md:text-base lg:text-lg
  px-4 md:px-6 lg:px-8
  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
"
```

---

## 🏠 Homepage Layout

### Desktop View (> 1024px)

```
┌─────────────────────────────────────────────┐
│  Logo    [Deals Coupons Products Services]  │
│                            📍Mumbai [Post] [Login] │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│                                             │
│     Find Deals, Coupons, Products          │
│          & Services                         │
│       All in One Place                      │
│                                             │
│   [Category ▼] [Search...] [Location] [Go] │
│                                             │
│   [All] [Deals] [Coupons] [Products]...    │
│                                             │
└─────────────────────────────────────────────┘
┌────────┬────────┬────────┬────────┐
│ Deals  │Coupons│Products│Services│
│  🏷️    │  🎫   │   📦   │   💼  │
│ [View] │[View] │ [View] │ [View] │
└────────┴────────┴────────┴────────┘
┌─────────────────────────────────────────────┐
│         Trending Deals                      │
│  ──────────────────────────────            │
│  [Card] [Card] [Card] [Card] [Card] →      │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│         Hot Coupons                         │
│  ──────────────────────────────            │
│  [Card] [Card] [Card] [Card] [Card] →      │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│         How It Works                        │
│  ┌──────┐  ┌──────┐  ┌──────┐             │
│  │ Post │  │Search│  │ Deal │             │
│  │  🔼  │  │  🔍  │  │  🤝  │             │
│  └──────┘  └──────┘  └──────┘             │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│ [Company] [Categories] [Support] [Newsletter]│
│ © 2024 Marketplace                          │
└─────────────────────────────────────────────┘
```

### Mobile View (< 640px)

```
┌──────────────────┐
│ Logo      [☰]    │
└──────────────────┘
┌──────────────────┐
│ Find Deals...    │
│  [All in One]    │
│                  │
│  [Category ▼]    │
│  [Search...]     │
│  [Location]      │
│  [Search Button] │
│                  │
│ [All] [Deals]... │
└──────────────────┘
┌──────────────────┐
│   Deals 🏷️       │
│   [View →]       │
└──────────────────┘
┌──────────────────┐
│  Coupons 🎫      │
│  [View →]        │
└──────────────────┘
┌──────────────────┐
│ Trending Deals   │
│ [Card] [Card] →  │
└──────────────────┘
```

---

## 🗂️ Section Pages

### Products Page Layout

```
Desktop:
┌─────────────────────────────────────┐
│ Filters Sidebar │  Products Grid    │
│ ────────────────│───────────────────│
│ □ Category      │ [Product] [Product]│
│   □ Electronics │ [Product] [Product]│
│   □ Fashion     │ [Product] [Product]│
│                 │                    │
│ □ Price Range   │ [Product] [Product]│
│   [$0 - $1000]  │ [Load More...]     │
│                 │                    │
│ □ Condition     │                    │
│   □ New         │                    │
│   □ Used        │                    │
└─────────────────────────────────────┘

Mobile:
┌──────────────────┐
│ [🔽 Filters]     │
└──────────────────┘
┌──────────────────┐
│ [Product]        │
└──────────────────┘
┌──────────────────┐
│ [Product]        │
└──────────────────┘
```

---

## 🎴 Card Components

### Deal Card

```
┌─────────────────┐
│ [Image]         │
│                 │
├─────────────────┤
│ 50% OFF 🏷️      │
│ Product Title   │
│ ₹5000 ₹10000    │
│ Expires: 2 days │
│ 📍 Mumbai       │
│ ⭐ 4.5 (12)     │
└─────────────────┘
```

### Coupon Card

```
┌─────────────────┐
│ [Brand Logo]    │
├─────────────────┤
│ 20% Cashback    │
│ On orders >₹1000│
│ ┌─────────────┐ │
│ │ SAVE20 [📋] │ │
│ └─────────────┘ │
│ Valid till:     │
│ Dec 31, 2024    │
└─────────────────┘
```

### Product Card

```
┌─────────────────┐
│ [Image]         │
│                 │
├─────────────────┤
│ iPhone 13 Pro   │
│ ₹75,000         │
│ Used • Warranty │
│ 📍 Bangalore    │
│ ⭐ 4.8 (5)      │
└─────────────────┘
```

### Service Card

```
┌─────────────────┐
│ [Image/Icon]    │
├─────────────────┤
│ Web Development │
│ Full Stack      │
│ ₹50k - ₹200k    │
│ Remote 🌐       │
│ 5 years exp.    │
│ ⭐ 4.9 (23)     │
└─────────────────┘
```

---

## 🔍 Search Bar States

### Default
```
┌───────────────────────────────────────────┐
│ [All ▼] [🔍 Search...] [📍 Location] [Go] │
└───────────────────────────────────────────┘
```

### Mobile Stacked
```
┌──────────────┐
│ [All ▼]      │
├──────────────┤
│ [🔍 Search...]│
├──────────────┤
│ [📍 Location]│
├──────────────┤
│ [Search]     │
└──────────────┘
```

---

## 📄 Listing Detail Page

```
Desktop:
┌─────────────────────────────────────┐
│ [Image Gallery]   │ Listing Info    │
│ [Main Image]      │ ────────────    │
│ [Thumb][Thumb]    │ Product Title   │
│                   │ ₹75,000         │
│                   │                 │
│                   │ [💙 Save]       │
│                   │ [📤 Share]      │
│                   │                 │
│                   │ Seller: John    │
│                   │ ⭐ 4.5 (23)     │
│                   │ [Contact]       │
├───────────────────┴─────────────────┤
│ Description                         │
│ Lorem ipsum dolor sit amet...       │
│                                     │
│ Details                             │
│ • Category: Electronics             │
│ • Condition: Used                   │
│ • Warranty: 6 months                │
├─────────────────────────────────────┤
│ Seller Reviews (23)                 │
│ ⭐⭐⭐⭐⭐ Great seller! - User1      │
│ ⭐⭐⭐⭐☆ Fast delivery - User2      │
└─────────────────────────────────────┘
```

---

## 🎯 Interactive Elements

### Buttons

**Primary:**
```
┌──────────────┐
│ Post Listing │  Blue, bold
└──────────────┘
```

**Secondary:**
```
┌──────────────┐
│   Login      │  White with border
└──────────────┘
```

**Icon Button:**
```
┌───┐
│ ❤ │  Favorite
└───┘
```

### Filter Chips

```
[All] [Deals] [Coupons] [Products]
```

Active state has blue background.

---

## 🎨 Animation & Transitions

### Hover Effects

- **Cards:** `hover:shadow-lg transition`
- **Buttons:** `hover:bg-primary/90 transition`
- **Links:** `hover:text-primary transition`

### Loading States

```
┌─────────────────┐
│ ⏳ Loading...   │  Skeleton screens
└─────────────────┘
```

### Empty States

```
┌─────────────────┐
│      📦         │
│ No listings yet │
│ [Post One →]    │
└─────────────────┘
```

---

## 📲 Mobile-Specific Features

### Mobile Menu

Hamburger (☰) expands to:
```
┌──────────────┐
│ Deals        │
│ Coupons      │
│ Products     │
│ Services     │
├──────────────┤
│ 📍 Change    │
│   Location   │
└──────────────┘
```

### Bottom Navigation (Optional)

```
┌──────────────────────────────────┐
│ [🏠] [🔍] [➕] [❤️] [👤]       │
│ Home Search Post Saves Profile   │
└──────────────────────────────────┘
```

---

## ♿ Accessibility

- ✅ Semantic HTML
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus states visible
- ✅ Color contrast WCAG AA compliant
- ✅ Alt text for images

---

## 🎬 User Flows

### Post a Listing Flow

```
1. Click "Post Listing"
   ↓
2. Select Type (Deal/Coupon/Product/Service)
   ↓
3. Fill Form (title, price, location, images...)
   ↓
4. Preview
   ↓
5. Submit
   ↓
6. Listing Live!
```

### Search & Browse Flow

```
1. Enter search query
   ↓
2. Select filters
   ↓
3. View results grid
   ↓
4. Click listing
   ↓
5. View details
   ↓
6. Contact seller
```

---

## 🛠️ Customization Tips

### Change Primary Color

Edit `frontend/tailwind.config.ts`:
```typescript
primary: 'hsl(YOUR HUE SATURATION LIGHTNESS)',
```

### Adjust Spacing

Edit spacing values in Tailwind classes:
```jsx
className="p-4 md:p-6 lg:p-8"  // Adjust these numbers
```

### Custom Fonts

1. Import in `frontend/app/layout.tsx`
2. Apply in Tailwind config

---

## 📐 Component Library

All components follow this pattern:

```typescript
interface ComponentProps {
  // Required props
  title: string
  
  // Optional props
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  
  // Event handlers
  onClick?: () => void
}
```

---

## 🎯 Best Practices Used

1. **Mobile-First:** Base styles for mobile, scale up
2. **Semantic HTML:** Proper heading hierarchy
3. **Component Isolation:** Each component is self-contained
4. **Consistent Spacing:** Uses Tailwind spacing scale
5. **Color Hierarchy:** Primary, secondary, accent colors
6. **Responsive Images:** Next.js Image component
7. **Loading States:** Always show loading feedback
8. **Error Handling:** User-friendly error messages

---

## 🌈 Dark Mode (Future)

Already scaffolded in `globals.css`:

```css
.dark {
  --background: 222.2 84% 4.9%;
  /* ... more dark theme colors */
}
```

To enable:
1. Add theme toggle button
2. Use `next-themes` package
3. Toggle `dark` class on `<html>`

---

This UI guide shows the visual structure. To see the actual components, check the files in `frontend/components/`!
