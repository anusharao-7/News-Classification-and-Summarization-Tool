import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        cyan: {
          DEFAULT: "hsl(186 100% 50%)",
          50: "hsl(186 100% 95%)",
          100: "hsl(186 100% 85%)",
          200: "hsl(186 100% 75%)",
          300: "hsl(186 100% 65%)",
          400: "hsl(186 100% 55%)",
          500: "hsl(186 100% 50%)",
          600: "hsl(186 100% 40%)",
          700: "hsl(186 100% 30%)",
          800: "hsl(186 100% 20%)",
          900: "hsl(186 100% 10%)",
        },
        purple: {
          DEFAULT: "hsl(270 60% 55%)",
          50: "hsl(270 60% 95%)",
          100: "hsl(270 60% 85%)",
          200: "hsl(270 60% 75%)",
          300: "hsl(270 60% 65%)",
          400: "hsl(270 60% 58%)",
          500: "hsl(270 60% 55%)",
          600: "hsl(270 60% 45%)",
          700: "hsl(270 60% 35%)",
          800: "hsl(270 60% 25%)",
          900: "hsl(270 60% 15%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "spin-slow": "spin-slow 3s linear infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(hsl(222 30% 15%) 1px, transparent 1px), linear-gradient(90deg, hsl(222 30% 15%) 1px, transparent 1px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
