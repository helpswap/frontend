import { Box, HStack, IconButton, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"
import { FaChartArea, FaChartBar, FaChartLine, FaCog, FaExchangeAlt, FaList, FaWallet, FaWhatsapp } from "react-icons/fa"
import ButtonNoOutline from "../ButtonNoOutline"
import Chart from "./Chart"
import HelperWallet from "./HelperWallet"
import SwapSettings from "./SwapSettings"
import Trade from "./Trade"

const TABS = {
    swap: 0,
    chart: 1,
    wallet: 2,
    settings: 3
}

const Tab = ({icon, active, ...props}) => {

    return (
        <>
            {
                !active?
                <ButtonNoOutline.Icon icon={icon} {...props} />
                :
                <ButtonNoOutline.Icon icon={icon} disabled
                bg="colorAccent.light"
                _hover={{
                    bg: `colorAccent.light !important`, opacity: "0.7"
                }} {...props} />
            }
        </>
    )
}

const SwapWidget = ({as, t, lang, children, ...props}) => {
    const swapBg = useColorModeValue("swapBg.light", "swapBg.dark")
    const [tabIndex, setTabIndex] = useState(0)

    return (
        <Box w="100%" maxW="600px" minH="400px" borderRadius=".625rem" boxShadow="0 2px 4px -1px rgb(0 0 0 / 25%)" 
        m={{base: "1rem !important"}} p={{base: "1rem !important"}} {...props}>
            <HStack w="100%" justifyContent="space-between" alignItems="center">
                <Tab icon={<FaExchangeAlt size="17px" />} active={tabIndex == TABS.swap} onClick={() => setTabIndex(TABS.swap)} />
                <Tab icon={<FaChartLine size="17px" />} active={tabIndex == TABS.chart} onClick={() => setTabIndex(TABS.chart)} />
                <Tab icon={<FaWallet size="17px" />} active={tabIndex == TABS.wallet} onClick={() => setTabIndex(TABS.wallet)} />
                <Tab icon={<FaCog size="17px" />} active={tabIndex == TABS.settings} onClick={() => setTabIndex(TABS.settings)} />
            </HStack>
            <Box pt={{base: "1rem !important"}}>
                {
                    tabIndex == TABS.swap?
                    <Trade t={t} lang={lang} swapBg={swapBg} />
                    :
                    tabIndex == TABS.chart?
                    <Chart t={t} lang={lang} swapBg={swapBg} />
                    :
                    tabIndex == TABS.wallet?
                    <HelperWallet t={t} lang={lang} swapBg={swapBg} />
                    :
                    <SwapSettings t={t} lang={lang} swapBg={swapBg} />
                }
            </Box>
        </Box>
    )
}

export default SwapWidget