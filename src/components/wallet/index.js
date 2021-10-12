import { NoBscProviderError } from "@binance-chain/bsc-connector"
import { IconButton } from "@chakra-ui/button"
import { Button } from "@chakra-ui/button"
import { HStack, VStack } from "@chakra-ui/layout"
import { Text } from "@chakra-ui/layout"
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal"
import { useToast } from "@chakra-ui/toast"
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import { 
    NoEthereumProviderError, 
    UserRejectedRequestError as UserRejectedRequestErrorInjected 
} from "@web3-react/injected-connector"
import {
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
    WalletConnectConnector,
} from '@web3-react/walletconnect-connector'

import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react"
//import Swal from "sweetalert2"
//import { SEC_COLOR } from "../../utils/c"
import { getFromStorage, saveToStorage } from "../../utils/f"
import { connectorsByName } from "../../connectors/"
import Loading from "../widgets/Loading"

import types from './types'
import { useEagerConnect, useInactiveListener } from "../../hooks"
import { useColorModeValue } from '@chakra-ui/color-mode'
import { NetworkContextName } from '../../constants'

const LAST_WALLET_CONNECTION_TYPE = "LAST_WALLET_CONNECTION_TYPE"
export default function WalletModal({isOpen, onClose, onConnected}) {
    const { t } = useTranslation("common")
    const toast = useToast()
    const SEC_COLOR = useColorModeValue("colorAccent.light", "colorAccent.dark")
    const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React()
    const contextNetwork = useWeb3React(NetworkContextName)
    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = useState()

    const [connectionTried, setConnectionTried] = useState()
    useEffect(() => {
        const cType = getFromStorage(LAST_WALLET_CONNECTION_TYPE)
        if(cType && cType.length > 0 && activate) {
            try {
                console.log("ConnectionTry:A", "typeId:", cType, "type:", connectorsByName[cType])
                activate(connectorsByName[cType])

            } catch(e) {
                console.log("ConnectionTry:", e)
            }
            setConnectionTried(true)
        }
    }, [activate])

    useEffect(() => {
        if(!account && connectionTried) {
            saveToStorage(LAST_WALLET_CONNECTION_TYPE, "")
            setConnectionTried(false)
        }
    }, [account])

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined)

            onClose()
            if(onConnected) {
                console.log(library)
                onConnected(account)
            }
        }
    }, [activatingConnector, connector])

    useEffect(() => {
        
        if(error) {
            var errorTitle = t('wallet-connection-error')
            var errorMessage = ""
            if (error instanceof UnsupportedChainIdError) {
                //setActivatingConnector(undefined)
                errorMessage = t('chainid-error')
            
            } else if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
                //setActivatingConnector(undefined)
                errorMessage = t('wallet-provider-error')
            
            } else if (
                error instanceof UserRejectedRequestErrorInjected ||
                error instanceof UserRejectedRequestErrorWalletConnect
            ) {
                if (connector instanceof WalletConnectConnector) {
                    const walletConnector = connector
                    walletConnector.walletConnectProvider = null
                }
                //setActivatingConnector(undefined)
                errorMessage = t('wallet-auth-declined-error')
            } else {
                //setActivatingConnector(undefined)
                errorMessage = error.message
            }
            toast({
                title: errorTitle,
                description: errorMessage,
                status: "error",
                duration: 4000,
                isClosable: true
            })
        }
    }, [error])
      
    // handle logic to eagerly connect to the injected ethereum provider, 
    // if it exists and has granted access already
    const triedEager = useEagerConnect()

    // handle logic to connect in reaction to certain events on the injected ethereum provider, 
    // if it exists
    useInactiveListener(!triedEager || !!activatingConnector)

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent borderRadius="32px" w="auto" minW="320px" maxW="100%" bg={"#fff"} color={SEC_COLOR}>
                <ModalHeader
                borderBottom="1px solid rgb(156, 156, 156)">
                    <HStack justifyContent="space-between" alignItems="center">
                        <Text as="div">
                            {activatingConnector? t('connecting') : t('connect-to-wallet')}
                        </Text>
                        <ModalCloseButton />
                    </HStack>
                </ModalHeader>
                
                <ModalBody>
                    <VStack>
                        {
                            types.map((type, index) => {
                                const currentConnector = connectorsByName[type.id]
                                const activating = currentConnector === activatingConnector
                                const connected = currentConnector === connector
                                const disabled = !contextNetwork.active && !error && (!triedEager || !!activatingConnector || connected || !!error)

                                return (
                                    <Button bg={SEC_COLOR} colorScheme="#fff" w="100%" textTransform="capitalize" onClick={() => {
                                        setActivatingConnector(currentConnector)
                                        activate(connectorsByName[type.id])
                                        saveToStorage(LAST_WALLET_CONNECTION_TYPE, type.id)
                                    }}
                                    disabled={disabled}
                                    key={type.title}>
                                        <HStack w="100%" justifyContent="space-between" alignItems="center">
                                            <Text as="div">
                                                {t(type.title)}
                                            </Text>
                                            {type.icon}
                                        </HStack>
                                    </Button>
                                )
                            })
                        }
                    </VStack>
                </ModalBody>
            </ModalContent>
      </Modal>
    )
}