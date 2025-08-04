"use client";

import { useEffect, useState } from "react";

interface ThemeToggleProps {
  variant?: "default" | "compact"
}

export function ThemeToggle({ variant = "default" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Only run after component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    // Get theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variant === "compact" ? "h-6 w-6" : "border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"}`}>
        <span className="sr-only">Toggle theme</span>
        <div className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variant === "compact" ? "h-6 w-6" : "border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"}`}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      {theme === "light" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="m12 2 3 10L12 22l-3-10z" />
          <path d="m17 12 5-3-5-3" />
          <path d="m7 12-5-3 5-3" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}
