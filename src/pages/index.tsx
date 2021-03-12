import { FormEvent } from 'react';

import Head from 'next/head';
import Router from 'next/router';

import styles from '../styles/pages/Login.module.css';

export default function Login() {
  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    Router.push('/home');
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
                <input placeholder="Digite seu username" />
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
