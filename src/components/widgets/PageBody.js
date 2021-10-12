import { Box, Flex, useColorModeValue, VStack } from '@chakra-ui/react'
import Footer from './Footer'
import HomeHeader from './HomeHeader'
import i18nConfig from '../../../i18n'
import useTranslation from 'next-translate/useTranslation'
import PageTitle from './PageTitle'
import { BTN_BG, BTN_COLOR } from '../../utils/c'
import { FaExchangeAlt, FaPlug } from 'react-icons/fa'
import WalletWrapper from '../wallet/WalletWrapper'
import { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'

const { localesMap } = i18nConfig

const PageBody = ({as, onOpen, isOpen, onClose, onConnected, children, noFloatingBTN, headerHasBanner, enableMobileStick, excludeHeader, excludeFooter, className, link, title, description, image, type, updatedTime, ...props}) => {
    const {lang} = useTranslation()
    const bg = useColorModeValue("pageBg.light", "pageBg.dark")
    const color = useColorModeValue("pageColor.light", "pageColor.dark")
    const colorAccent = useColorModeValue("colorAccent.light", "colorAccent.dark")

    const router = useRouter()
    
    const { library, account} = useWeb3React();
    

    const nav = excludeHeader? null : 
    <HomeHeader hasBanner={headerHasBanner} enableMobileStick={enableMobileStick} onOpen={onOpen} />
    
    return(
        <WalletWrapper as={VStack} className="app" isOpen={isOpen} onClose={onClose} onConnected={onConnected} 
        dir={localesMap[lang]?.isRTL? "rtl" : "ltr"} bg={bg} color={color} w="100%" h="100%" minH="100vh">
            <PageTitle link={link} title={title} url="/" description={description} image={image} type={type} updatedTime={updatedTime} />
            {nav}
            <Box as={as || VStack} w="100%" h="100%" flexGrow={1} pt={{base: "15px", md: "40px"}} m="0px !important" pos="relative" {...props}>
                {children}
            </Box>
            {
                noFloatingBTN? null:
                <VStack bg={colorAccent} w="60px" h="60px" pos="fixed" right="5" bottom="16px" borderRadius="50%"
                zIndex="250" justifyContent="center" alignItems="center" cursor="pointer">
                    <Box as={!account? FaPlug : FaExchangeAlt} color={"#fff"} fontSize="28px" onClick={() => !account? onOpen() : router.push("/swap")} />
                </VStack>
            }
            {!excludeFooter? <Footer /> : null}
        </WalletWrapper>
    )
}

export default PageBody