# Quick Setup Guide

## Prerequisites
- Node.js >= 20
- npm or yarn
- Xcode (for iOS development)
- Android Studio (for Android development)

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **iOS Setup** (macOS only)
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

3. **Run the App**

   **For iOS:**
   ```bash
   npm run ios
   ```

   **For Android:**
   ```bash
   npm run android
   ```

## Testing the Drawer Animation

Once the app is running:
1. Tap the menu icon (☰) in the header
2. Or swipe from the left edge of the screen
3. The drawer will slide in with a smooth animation
4. The main content will scale down and move to the right

## Navigation Structure

```
Drawer (Custom animated)
  ├── Tab Navigator
  │    ├── Home (Stack)
  │    │    ├── Screen 1
  │    │    └── Screen 2
  │    ├── Cart
  │    └── Favourites
  └── Orders
```

## Key Files

- `App.tsx` - Entry point with navigation setup
- `src/navigation/DrawerNavigator.tsx` - Main drawer configuration
- `src/components/AnimatedDrawer.tsx` - Animation logic
- `src/components/CustomDrawerContent.tsx` - Drawer menu UI

## Troubleshooting

**Metro bundler cache issues:**
```bash
npm start -- --reset-cache
```

**iOS build issues:**
```bash
cd ios
rm -rf Pods Podfile.lock
bundle exec pod install
cd ..
```

**Android build issues:**
```bash
cd android
./gradlew clean
cd ..
```
