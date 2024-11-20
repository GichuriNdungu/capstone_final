module.exports = {
  content: [
    './*.html',               // Include all HTML files in the root directory
    './static/js/**/*.js',    // Include all JavaScript files in the static/js folder
  ],
  safelist: [
    'bg-white',
    'shadow-lg',
    'p-6',
    'rounded-lg',
    'hover:shadow-xl',
    'hover:scale-105',
    'transition',
  ], // Explicitly include classes for cards
  theme: {
    extend: {},
  },
  plugins: [],
};
