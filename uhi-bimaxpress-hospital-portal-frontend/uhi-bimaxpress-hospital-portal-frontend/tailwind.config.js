module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    transitionDuration: {
      0: '0ms',
      100: '100ms',
      300: '300ms',
      500: '500ms',
      2000: '2000ms',
      4000: '4000ms',
      9000: '9000ms',
    },
    extend: {
      screens: {
        1040: '1200px',
      },
      minHeight: {
        'calc-30': 'calc(100vh - 300px)',
        'calc-5': 'calc(80vh - 50px)',
        10: '3rem',
      },
      margin: {
        '120-neg': '-70rem',
      },
      translate: {
        'n-x-50': '-1/2',
        'n-y-50': '-1/2',
      },
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit,minmax(170px,1fr))',
        'auto-fit-upgrade': 'repeat(auto-fit,minmax(200px,1fr))',
      },
      colors: {
        primary: {
          lightest: '#808080',
          lighter: '#343434',
          light: '#2A2A2A',
          DEFAULT: '#2B2B2B',
          dark: '#101010',
        },
        secondary: {
          light: '#5A5A5A',
          DEFAULT: '#535353',
          dark: '#FFFFFF17',
        },
        fontColor: {
          light: '#E3E3E3',
          gray: '#C8C8C8',
          deepGray: '#C1C1C1',
          darkGray: '#707070',
          DEFAULT: '#FFFFFF',
        },
        brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
        baseColor: '#171717',
        primary: '#2C2C2C',
        secondary: '#3D3D3D',
        ternary: '#4C4C4C',
        quaternary: '#5F5F5F',
        orange: '#F58B05',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
