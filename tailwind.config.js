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
          black: '#020202',
          white: '#F6FAFF',
        },
        secondary: {
          blue: '#3255AD',
          gray: '#CCB89D',
        },
      },
      fontFamily: {
        primary: ['Jost', 'sans-serif'],
        secondary: ['Josefin Sans', 'sans-serif'],
      },
      fontSize: {
        'special': '210px',
        'h1': '90px',
        'h2': '45px',
        'h3': '42px',
        'h4': '39px',
        'h5': '21px',
        'p': '18px',
        'strong': '21px',
        'small': '16px',
        'buttons': '27px',
      },
      spacing: {
        'elements-big': '15px',
        'elements-medium': '26px',
        'elements-small': '12px',
        'section-xbig': '150px',
        'section-big': '45px',
        'section-medium': '42px',
        'section-small': '39px',
        'absolute-small': '60px',
        'absolute-xbig': '125px',
      },
      boxShadow: {
        'hover': '0 0 24px rgba(255, 255, 255, 1)',
        'normal-white': '0 0 24px rgba(246, 250, 255, 0.6)',
        'small-white': '0 0 12px rgba(246, 250, 255, 0.6)',
      },
    },
  },
  plugins: [],
};
