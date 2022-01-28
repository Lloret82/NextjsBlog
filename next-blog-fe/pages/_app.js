import { UserProvider } from '@auth0/nextjs-auth0'
import '../styles/globals.css'


export default function MyApp({ Component, pageProps }) {
  return (


    <UserProvider>
      <div>
        <Component {...pageProps} />
      </div>
    </UserProvider>

  )
}


