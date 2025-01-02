module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all files where Tailwind classes are used
  ],
  theme: {
    extend: {
      // colors: {
      //   gray: {
      //     900: "#1A202C", // Customize dark gray if needed
      //   },
      // },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"), // Add plugin for hiding the scrollbar
  ],
};
