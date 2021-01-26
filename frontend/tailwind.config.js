module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        200: "200px",
      },
      maxWidth: {
        28: "7rem",
      },
      maxHeight: {
        "1/2": "50%",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
  important: true,
};
