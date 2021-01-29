module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        200: "200px",
      },
      minHeight: {
        200: "200px",
      },
      width: {
        650: "650px",
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
      opacity: ["disabled"],
    },
  },
  plugins: [],
  important: true,
};
