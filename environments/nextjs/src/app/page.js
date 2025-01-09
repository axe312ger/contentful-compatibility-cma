import EntriesClient from "./entries-client";
import EntriesSSR from "./entries-ssr";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>Contentful.js - Next JS Test</h1>
        <h2>Client Side Fetching:</h2>
        <EntriesClient />
        <h2>Server Side Fetching:</h2>
        <EntriesSSR />
      </div>
    </main>
  );
}
