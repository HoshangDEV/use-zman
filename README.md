# use-zman

## Package Information

[![npm](https://img.shields.io/npm/v/use-zman)](https://www.npmjs.com/package/use-zman)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/use-zman)](https://bundlephobia.com/package/use-zman)

`use-zman` is a simple React hook that allows you to add multiple languages to your React application. It provides a context for managing translations and makes it easy to switch between different languages.

## Installation

You can install this package using npm or yarn:

```bash
npm i use-zman
```

## Usage

To use `use-zman` in your project, follow these steps:

1. Import the `ZmanProvider` and `useZman` hook into your component:

```tsx
import { ZmanProvider } from "use-zman";
```

2. Create a translations for ZmanProvider

```tsx
const translations = {
  en: {
    hello: "Hello World",
  },
  ku: {
    hello: "سڵاو جیهان",
  },
};
```

3. Wrap your application with the `ZmanProvider` component and pass the translations as a prop:

```tsx
const App = () => {
  return (
    <ZmanProvider translations={translations}>
      // 👈
      <div>
        <h1>Hello World</h1>
      </div>
    </ZmanProvider> // 👈
  );
};
```

You can also pass default language as a prop to ZmanProvider:

```tsx
const App = () => {
  return (
    <ZmanProvider
      translations={translations}
      defaultLanguage="ku" // 👈
    >
      <div>
        <h1>Hello World</h1>
      </div>
    </ZmanProvider>
  );
};
```

4. Import `useZman` hook to your component:

```tsx
import { useZman } from "use-zman";
```

5. Use the `useZman` hook to access the translations:

```tsx
const { texts, setZman } = useZman();
```

6. Use the `texts` object to access the translations:

```tsx
const { texts, setZman } = useZman();

<p>{texts.hello}</p>; // سڵاو جیهان
```

7. Use the `setZman` function to change the language:

```tsx
const { texts, setZman } = useZman();

<button onClick={() => setZman("en")}>English</button>
<button onClick={() => setZman("ku")}>Kurdish</button>
```
