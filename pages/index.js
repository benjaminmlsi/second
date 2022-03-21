import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
    return (
        <div>
            <Head>
                <title> Todolist | Home </title>
            </Head>
            <div>
                <h1 className={styles.title}>Homepage</h1>
                <p className={styles.title}>
                    {' '}
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda consequuntur dignissimos doloribus eaque earum
                    eligendi exercitationem fugit iste modi nam nemo nostrum odit perferendis provident rerum, temporibus ut voluptas.
                    Necessitatibus.{' '}
                </p>
                <Link href="todos">
                    <a className={styles.btn}> See your Todos </a>
                </Link>
            </div>
        </div>
    );
}
