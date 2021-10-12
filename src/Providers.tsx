import React from 'react'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux'
import { ModalProvider } from '@pancakeswap-libs/uikit'
import store from './state'
import getLibrary from './utils/getLibrary'
import { ChakraProvider } from "@chakra-ui/react"
import theme from '../theme'
import dynamic from 'next/dynamic'
const Web3ProviderNetwork = dynamic(
  () => import('./Web3ProviderNetwork'),
  { ssr: false }
)


const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <ChakraProvider theme={theme}>
            {children}
          </ChakraProvider>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default Providers
