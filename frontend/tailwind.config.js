/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
        },
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        background: "var(--background)",
        surface: "var(--surface)",
        section: "var(--section)",
        text: {
          DEFAULT: "var(--text-primary)",
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          placeholder: "var(--placeholder)",
        },
        border: "var(--border)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        info: "var(--info)",

        // Semantic badge tokens
        badge: {
          'remote-bg': "var(--badge-remote-bg)",
          'remote-text': "var(--badge-remote-text)",
          'fulltime-bg': "var(--badge-fulltime-bg)",
          'fulltime-text': "var(--badge-fulltime-text)",
          'parttime-bg': "var(--badge-parttime-bg)",
          'parttime-text': "var(--badge-parttime-text)",
          'internship-bg': "var(--badge-internship-bg)",
          'internship-text': "var(--badge-internship-text)",
        }
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(249, 115, 22, 0.08), 0 1px 4px -1px rgba(0, 0, 0, 0.04)',
        'soft': '0 4px 20px -2px rgba(249, 115, 22, 0.1), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 12px 36px -4px rgba(249, 115, 22, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
      },
      transitionDuration: {
        '300': '300ms',
      }
    },
  },
  plugins: [],
}
