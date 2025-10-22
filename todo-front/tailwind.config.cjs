/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'dark': '#1F2128',          
        'dark-pattern': '#1A1A22', 
        'soft': '#272A33',         
        'medium': '#353841',        
        'primary': '#FFFFFF',
        'secondary': '#8A8C93',
        'accent': '#EB5757',         
        'accent-hover': '#FF7878',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem', 
        lg: '0.75rem',     
        xl: '1rem',        
      },
      spacing: {
        'sidebar-width': '280px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), 
  ],
}