import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import styles from '../styles/Toolbar.module.css'
function auth() {
      const { user } = useUser()

      return (
            <div className={styles.auth}>
                  {!user && (<Link href='/api/auth/login'><a>Login</a></Link>)}
                  {user && (<Link href='/api/auth/logout'><a>Logout</a></Link>)}
            </div>)
}

export default auth