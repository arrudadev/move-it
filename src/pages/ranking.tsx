import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { SideBar } from '../components/SideBar';
import styles from '../styles/pages/Ranking.module.css';

interface User {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  avatarUrl: string;
  username: string;
}

interface RankingProps {
  users: User[];
}

export default function Ranking({ users }: RankingProps) {
  return (
    <main className={styles.rankingContainer}>
      <Head>
        <title>Move It - Ranking</title>
      </Head>

      <SideBar />

      <section>
        <h2>Leaderboard</h2>

        <table>
          <thead>
            <tr>
              <th>POSIÇÃO</th>
              <th className={styles.titleUser}>USUÁRIO</th>
              <th>DESAFIOS</th>
              <th>EXPERIÊNCIA ATUAl</th>
            </tr>
          </thead>
          <tr className="separator" />
          <tbody>
            {users.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>
                  <img src={item.avatarUrl} alt={item.username} />
                  <article>
                    <strong>{item.username}</strong>
                    <span className={styles.userLevelWrapper}>
                      <img src="icons/level.svg" alt="Level" />
                      <span>Level {item.level}</span>
                    </span>
                  </article>
                </th>
                <th>
                  <span className={styles.userChallengesInfo}>
                    {item.challengesCompleted}
                  </span>
                  {' Completados'}
                </th>
                <th>
                  <span className={styles.userChallengesInfo}>
                    {item.currentExperience}
                  </span>
                  {' xp'}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req: request,
}) => {
  const { level, challengesCompleted, avatarUrl, username } = request.cookies;

  function getCurrentExperience(currentLevel: number) {
    return Math.pow((currentLevel + 1) * 4, 2);
  }

  const users = [
    {
      avatarUrl,
      username,
      level,
      challengesCompleted,
      currentExperience: getCurrentExperience(Number(level)),
    },
    {
      avatarUrl: 'https://github.com/diego3g.png',
      username: 'Diego Fernandes',
      level: 10,
      challengesCompleted: 53,
      currentExperience: getCurrentExperience(10),
    },
    {
      avatarUrl: 'https://github.com/filipedeschamps.png',
      username: 'Filipe Deschamps',
      level: 9,
      challengesCompleted: 48,
      currentExperience: getCurrentExperience(9),
    },
    {
      avatarUrl: 'https://github.com/guilhermerodz.png',
      username: 'Guilherme Rodz',
      level: 5,
      challengesCompleted: 10,
      currentExperience: getCurrentExperience(5),
    },
  ];

  const sortCompare = (user, otherUser) => {
    let comparison = 0;
    if (user.level > otherUser.level) {
      comparison = 1;
    }
    if (user.level < otherUser.level) {
      comparison = -1;
    }

    return comparison;
  };

  return {
    props: {
      users: users.sort(sortCompare).reverse(),
    },
  };
};
