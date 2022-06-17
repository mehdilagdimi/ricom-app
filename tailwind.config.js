module.exports = {
  important : true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors : {
        navGray : '#F3F3F3',
        appPink : '#FF66C4',
        footerGray : '#373737'
      },
      fontFamily: {
        'bahnschrift': ['Bahnschrift', 'sans-serif'],
    },
  },
  plugins: [
  ],
}
}

