import Head from 'next/head';

import { ExperienceBar } from '../components/ExperienceBar';
import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <Head>
        <title>move.it | Início</title>
      </Head>

      <ExperienceBar />
    </main>
  );
}
