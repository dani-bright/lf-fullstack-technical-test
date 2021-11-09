import { CartProvider } from 'context/CartContext'
import '../styles/globals.css'
import { Menu} from "../components/Menu";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Menu/>
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp
