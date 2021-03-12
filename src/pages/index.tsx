import { ChangeEvent, FormEvent, useContext, useState } from 'react';

import Head from 'next/head';
import Router from 'next/router';

import { UserContext } from '../contexts/UserContext';
import styles from '../styles/pages/Login.module.css';

export default function Login() {
  const { userExists, singIn } = useContext(UserContext);

  const [username, setUsername] = useState('');

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();

    if (await userExists(username)) {
      await singIn(username);
      Router.push('/home');
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  return (
    <div className={styles.loginContainer}>
      <Head>
        <title>Move It</title>
      </Head>
      <main>
        <header>
          <button type="button">
            <img src="icons/moon.svg" alt="Moon" />
          </button>
        </header>
        <section>
          <img src="white-logo-full.svg" alt="Logo" />

          <article>
            <h1>Bem-vindo</h1>

            <div className={styles.loginMessageContainer}>
              <img src="icons/github.svg" alt="Github" />
              <span>Faça login com seu Github para começar</span>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className={styles.inputContainer}>
                <input
                  placeholder="Digite seu username"
                  value={username}
                  onChange={handleInputChange}
                />
                <button type="submit">
                  <img src="icons/arrow-right.svg" alt="Arrow Right" />
                </button>
              </div>
            </form>
          </article>
        </section>
      </main>
    </div>
  );
}
