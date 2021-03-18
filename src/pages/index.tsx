import { ChangeEvent, FormEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Head from 'next/head';
import Router from 'next/router';

import axios from 'axios';
import Cookies from 'js-cookie';

import { MoonIcon } from '../components/MoonIcon';
import styles from '../styles/pages/Login.module.css';

interface GitHubUser {
  avatar_url: string;
  name: string;
}

export default function Login() {
  const [username, setUsername] = useState('');

  async function singIn(githubUsernamer: string) {
    const response = await axios.get(
      `https://api.github.com/users/${githubUsernamer}`,
    );
    const githubUser = response.data as GitHubUser;

    if (githubUser) {
      Cookies.set('avatarUrl', String(githubUser.avatar_url));
      Cookies.set('username', String(githubUser.name));
    }
  }

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      await singIn(username);
      Router.push('/home');
    } catch (error) {
      toast.error('Usuário não foi encontrado');
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
            <MoonIcon />
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
                <button
                  type="submit"
                  className={username.length > 0 && styles.buttonGreen}
                >
                  <img src="icons/arrow-right.svg" alt="Arrow Right" />
                </button>
              </div>
            </form>
          </article>
        </section>
      </main>
      <ToastContainer />
    </div>
  );
}
