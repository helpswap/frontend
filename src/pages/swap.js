import { useState, useEffect } from 'react'
import { useDisclosure} from "@chakra-ui/hooks"
import { HStack, Box, Text, useColorModeValue } from "@chakra-ui/react"
import useTranslation from "next-translate/useTranslation"
import Container from "../components/widgets/Container"
import PageBody from "../components/widgets/PageBody"
import SwapWidget from '../components/widgets/swap'


const Swap = () => {
    const { t, lang } = useTranslation('swap')
    const {isOpen, onOpen, onClose} = useDisclosure()

    const onConnected = a => {
        console.log(`Connected: ${a}`)
    }

    return (
        <PageBody onOpen={onOpen} onConnected={onConnected} isOpen={isOpen} onClose={onClose} pt="0px !important" 
        title={t("title")}>
            <Container textAlign="left !important">
                <HStack w="100%" justifyContent="center">
                    <SwapWidget t={t} lang={lang} />
                </HStack>
            </Container>
        </PageBody>
    )
}

export default Swap