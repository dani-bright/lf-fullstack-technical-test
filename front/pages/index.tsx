import Head from "next/head";
import styles from "../styles/Home.module.css";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import { Product} from "components/Product";
import { useEffect } from "react";
import axios from "axios"
import { useCart } from "context/CartContext";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

export default function Home() {
  const { setCartUuid } = useCart();
 
  useEffect(()=>{
    async function createCart() {
      const created = await axios.post(`http://localhost:4000/cart`)
      const cart = await axios.get(`http://localhost:4000/cart/${created.data.id}`)
      setCartUuid(created.data.id)
      
    }    
    createCart();
    
  },[])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to La Fourche Frontend Technical Test v2 !
        </h1>
        <InstantSearch indexName="bestbuy" searchClient={searchClient}>
        <SearchBox />
        <Hits hitComponent={Product} />
        </InstantSearch>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
