import Head from 'next/head';

import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <Head>
        <title>move.it | Início</title>
      </Head>

      <ExperienceBar />

      <section>
        <div className={styles.cycleContainer}>
          <Profile />
        </div>
      </section>
    </main>
  );
}
