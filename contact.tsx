@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 6%;

    --card: 0 0% 100%;
    --card-foreground: 0 0% 6%;

    --primary: 354 92% 48%;
    --primary-foreground: 0 0% 100%;

    --secondary: 0 0% 96%;
    --secondary-foreground: 0 0% 9%;

    --muted: 0 0% 96%;
    --muted-foreground: 0 0% 40%;

    --accent: 0 0% 96%;
    --accent-foreground: 0 0% 9%;

    --border: 0 0% 90%;
    --input: 0 0% 90%;
    --ring: 354 92% 48%;

    --radius: 0.75rem;
  }

  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 5rem;
  }

  body {
    @apply bg-background text-foreground antialiased;
    font-feature-settings: "rlig" 1, "calt" 1, "ss01" 1;
  }

  ::selection {
    background: #EB0A1E;
    color: #ffffff;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .grid-bg {
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  .red-glow {
    box-shadow: 0 0 0 1px rgba(235, 10, 30, 0.2), 0 12px 48px rgba(235, 10, 30, 0.15);
  }
}
