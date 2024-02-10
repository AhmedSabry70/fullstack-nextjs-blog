import { Inter , Montserrat,Crimson_Text, Josefin_Sans} from 'next/font/google'
import localFont from 'next/font/local'
 
// define your variable fonts
const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({
    variable: '--font-montserrat',
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
const josefin_Sans = Josefin_Sans({
  variable: '--font-josefin-sans',
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
const crimson_Text = Crimson_Text({
    variable: '--font-crimson-text',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export { inter,montserrat,
    josefin_Sans,
    crimson_Text }