import '../styles/globals.css'
import { useEffect, useState } from 'react'
import ApplicationUpdater from '../state/application/updater'
import ListsUpdater from '../state/lists/updater'
import MulticallUpdater from '../state/multicall/updater'
import TransactionUpdater from '../state/transactions/updater'
import Providers from '../Providers'
import { useRouter } from 'next/router'

const $ = require("jquery")
if(process.env.NODE_ENV === 'production') {
  console.log = () => {}
}
function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { asPath } = router

  const [eventsAdded, setEventsAdded] = useState()
  useEffect(() => { 
    if(!eventsAdded) {
      window.addEventListener('error', () => {
        localStorage?.removeItem('redux_localstorage_simple_lists')
      })
      setEventsAdded(true)
    }
  }, [])

  //scroll page to top onLoad
    useEffect(() => {
      $('html, body').scrollTop(0)
  }, [asPath])

  return (
    <Providers>
      <>
        <ListsUpdater />
        <ApplicationUpdater />
        <TransactionUpdater />
        <MulticallUpdater />
      </>
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
