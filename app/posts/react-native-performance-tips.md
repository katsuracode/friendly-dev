# Performance Optimization Tips for React Native Apps

React Native enables cross-platform mobile development with a single codebase, but performance issues can arise if not properly managed. Here are practical techniques to keep your app smooth and responsive.

## Bundle Size Optimization

1. **Code splitting** - Use dynamic imports to load code only when needed
2. **Remove unused libraries** - Regularly audit your dependencies
3. **Optimize images** - Compress assets and use WebP format when possible
4. **Enable Hermes** - Facebook's JavaScript engine designed for React Native

## Rendering Performance

### FlatList Optimization
```jsx
<FlatList
  data={data}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews={true}
  keyExtractor={(item) => item.id}
  renderItem={renderItem}
/>