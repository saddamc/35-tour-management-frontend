# Amazing Loading Component 🎉

A beautiful, highly customizable, and reusable loading component for React applications.

## 🚀 Features

- **6 Different Animations**: Spinner, Dots, Pulse, Bounce, Ring, Bars
- **4 Size Variants**: sm, md, lg, xl
- **4 Color Themes**: Primary, Secondary, Accent, Muted
- **Customizable Text**: Add loading messages
- **Full-screen Overlays**: Perfect for page loading
- **Inline Usage**: Great for buttons and small areas
- **TypeScript Support**: Fully typed with excellent DX
- **Responsive Design**: Works on all screen sizes

## 📖 Usage

### Basic Usage

```tsx
import Loading from "@/components/ui/Loading";

// Simple spinner
<Loading />

// With text
<Loading text="Loading data..." />

// Custom size and variant
<Loading size="lg" variant="dots" />
```

### Full-screen Loading

```tsx
<Loading fullScreen text="Loading your dashboard..." />
```

### Pre-built Components

```tsx
import { FullScreenLoading, InlineLoading, CardLoading, ButtonLoading } from "@/components/ui/Loading";

// For page loading
<FullScreenLoading />

// For inline content
<InlineLoading />

// For card placeholders
<CardLoading />

// For button states
<ButtonLoading />
```

## 🎨 Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Size of the loading animation |
| `variant` | `"spinner" \| "dots" \| "pulse" \| "bounce" \| "ring" \| "bars"` | `"spinner"` | Animation style |
| `text` | `string` | `undefined` | Optional loading message |
| `className` | `string` | `undefined` | Additional CSS classes |
| `fullScreen` | `boolean` | `false` | Whether to take full screen |
| `overlay` | `boolean` | `false` | Whether to show backdrop blur |
| `color` | `"primary" \| "secondary" \| "accent" \| "muted"` | `"primary"` | Color theme |

## 🎯 Use Cases

### 1. Page Loading
```tsx
const { isLoading } = useQuery();

if (isLoading) {
  return <Loading fullScreen text="Loading your dashboard..." />;
}
```

### 2. Button Loading State
```tsx
const [loading, setLoading] = useState(false);

<Button disabled={loading} onClick={handleSubmit}>
  {loading ? <ButtonLoading /> : "Submit"}
</Button>
```

### 3. Card Content Loading
```tsx
<Card>
  <CardHeader>
    <CardTitle>Analytics</CardTitle>
  </CardHeader>
  <CardContent>
    {data ? <Chart data={data} /> : <CardLoading />}
  </CardContent>
</Card>
```

### 4. Table Loading
```tsx
<Table>
  <TableBody>
    {isLoading ? (
      <TableRow>
        <TableCell colSpan={3}>
          <Loading size="md" text="Loading data..." />
        </TableCell>
      </TableRow>
    ) : (
      // Your table rows
    )}
  </TableBody>
</Table>
```

## 🎨 Customization Examples

### Custom Colors
```tsx
// Match your app theme
<Loading color="primary" variant="spinner" />

// Secondary color
<Loading color="secondary" variant="dots" />

// Accent color
<Loading color="accent" variant="pulse" />
```

### Custom Styling
```tsx
<Loading
  className="bg-blue-50 p-8 rounded-lg"
  variant="ring"
  size="lg"
  text="🔄 Processing magical data..."
/>
```

### Overlay Loading
```tsx
<Loading
  fullScreen
  overlay
  variant="spinner"
  text="Please wait..."
/>
```

## 🎭 Animation Variants

1. **Spinner** - Classic rotating border (default)
2. **Dots** - Bouncing dots with delay
3. **Pulse** - Growing/shrinking circles
4. **Bounce** - Bouncing bars
5. **Ring** - Spinning ring
6. **Bars** - Audio-style bar animation

## ✨ Pro Tips

- Use `fullScreen` for page-level loading states
- Combine with `overlay` for modal-style loading
- Use `ButtonLoading` for consistent button states
- Match `color` with your app's design system
- Add emojis or special characters to `text` for personality

## 🧪 Demo

Check out `src/components/ui/LoadingDemo.tsx` for a comprehensive showcase of all variants and use cases!

---

Made with ❤️ for amazing user experiences