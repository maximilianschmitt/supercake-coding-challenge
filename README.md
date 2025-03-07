# Customers and Pets - React Application

## Table of Contents
- [Installation](#installation)
- [Performance Considerations](#performance-considerations)
- [Code Quality](#code-quality)
- [Animation](#animation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn package manager

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/tamer1an/supercake-coding-challenge
   cd supercake-coding-challenge
   ```
2. Install dependencies:
   ```sh
   npm install  
   # or
   yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev  
   # or
   yarn dev
   ```
4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

---

## Performance Considerations

This application optimizes performance by using:
- **`useDeferredValue`**: Reduces unnecessary re-renders by deferring input values.
- **AbortController**: Cancels previous API requests before making new ones.
- **Minimal re-renders**: The component state is efficiently updated to minimize UI redraws.
- **Lazy loading**: Components are loaded dynamically where applicable to enhance responsiveness.

---

## Code Quality

### Best Practices Applied:
- TypeScript for type safety.
- **Separation of concerns**: Components are modular and reusable.
- **Consistent state management**: `useState` and `useEffect` handle application state properly.
- **Error handling**: API calls are wrapped in `try-catch` blocks to prevent crashes.
- **Logging**: Console logs are used for debugging and tracking API requests.
- **ESLint & Prettier**: Ensures consistent code formatting and linting.

To run linting:
```sh
npm run lint
```

---

## Animation

### Library Used:
- **Framer Motion** for smooth and visually appealing animations.

### Implemented Features:
- Dropdown menu animation (`motion.div`)
- Transition effects when filtering pets
- Soft fade-in effects when rendering search results

Example Animation Code:
```tsx
<motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.2 }}
>
```

---

## Usage
- Search customers by **ID, name, email, or phone**.
- Filter customers based on pet ownership.
- Reset or apply selected filters dynamically.

---

## Features
- **Debounced search** to improve responsiveness.
- **Filter selection UI** with intuitive toggles.
- **Smooth UI animations** for enhanced experience.
- **API fetching with proper state handling**.

---

## Contributing
Feel free to open a pull request or report issues on GitHub.

---

## License
This project is licensed under the [MIT License](LICENSE).
