import { createWeb3ReactRoot } from '@web3-react/core'
import { NetworkContextName } from './constants'


const Provider = createWeb3ReactRoot(NetworkContextName)

const Web3ProviderNetwork = ({ children, getLibrary }) => {
  return (
    <Provider getLibrary={getLibrary}>
      {children}
    </Provider>
  )
}

export default Web3ProviderNetwork;