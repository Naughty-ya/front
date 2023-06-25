/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        dunggeunmo: ['DungGeunMo'],
        pretendard: ['Pretendard Variable']
      },
      backgroundImage: {
        gra: 'linear-gradient(135deg, #FF55F8 0%, #5B89FF 100%)',
        'gra-20':
          'linear-gradient(135deg, rgba(201, 85, 255, 0.20) 0%, rgba(91, 137, 255, 0.20) 100%)'
      },
      dropShadow: {
        1: '0 0 40px #66229C'
      },
      colors: {
        gray: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#0F0F12'
        },
        primary: {
          50: '#F5F9FF',
          100: '#EBF3FF',
          200: '#CCE0FF',
          300: '#A9CFFF',
          400: '#66ABFF',
          500: '#2387FF',
          600: '#1F75E6',
          700: '#174FA6',
          800: '#113B7D',
          900: '#0B2754'
        },
        secondary: {
          50: '#FFF8F5',
          100: '#FFF1EB',
          200: '#FFDCCD',
          300: '#FFC7AD',
          400: '#FF9C6E',
          500: '#FF7130',
          600: '#E66A2B',
          700: '#99461D',
          800: '#733515'
        },
        success: {
          50: '#F5FFF5',
          100: '#EBFFEB',
          200: '#CFFFCF',
          300: '#B2FFB2',
          400: '#79FF79',
          500: '#40FF40',
          600: '#39E639',
          700: '#269926',
          800: '#1A731A',
          900: '#0D4D0D'
        },
        warning: {
          50: '#FFFDF5',
          100: '#FFFBEA',
          200: '#FFF5CC',
          300: '#FFEFAD',
          400: '#FFE66F',
          500: '#FFDD30',
          600: '#E6C92B',
          700: '#99791D',
          800: '#735C15',
          900: '#4D3E0E'
        },
        danger: {
          50: '#FFF5F5',
          100: '#FFEAEA',
          200: '#FFCCCC',
          300: '#FFADAD',
          400: '#FF6F6F',
          500: '#FF3030',
          600: '#E63939',
          700: '#992626',
          800: '#731A1A',
          900: '#4D0D0D'
        },
        brand: {
          pink: '#FF52FF',
          darkpink: '#DB61FA',
          blue: '#6387FF'
        }
      }
    }
  },
  plugins: []
}
