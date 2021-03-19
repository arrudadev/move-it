import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { SideBar } from '../components/SideBar';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';
import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  avatarUrl: string;
  username: string;
}

export default function Home({
  level,
  currentExperience,
  challengesCompleted,
  avatarUrl,
  username,
}: HomeProps) {
  return (
    <div className={styles.homeBackground}>
      <ChallengesProvider
        level={level}
        currentExperience={currentExperience}
        challengesCompleted={challengesCompleted}
      >
        <main className={styles.container}>
          <Head>
            <title>Move It</title>
          </Head>

          <SideBar />

          <ExperienceBar />

          <CountdownProvider>
            <section>
              <div>
                <Profile avatarUrl={avatarUrl} username={username} />
                <CompletedChallenges />
                <Countdown />
              </div>

              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </main>
      </ChallengesProvider>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req: request,
}) => {
  const {
    level,
    currentExperience,
    challengesCompleted,
    avatarUrl,
    username,
  } = request.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      avatarUrl: String(avatarUrl),
      username: String(username),
    },
  };
};
