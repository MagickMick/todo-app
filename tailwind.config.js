module.exports = {
    darkMode: 'class',
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}",  // Alle bestanden binnen de src-map
      "./public/index.html",         // Indien je een index.html hebt in de public-map
    ],
    theme: {
      extend: {
        colors: {
          primary: "#1E40AF",  // Magick Blue
          secondary: "#6D28D9", // Magick Purple
        },
      },
    },
    plugins: [],
  }

  