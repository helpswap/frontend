

import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import Header from "./Header";
import LocaleSwitch from "./LocaleSwitch";
import ThemeSwitch from "./ThemeSwitch"
import { AIR_DROP_ACTIVE, CONTRACT_ADDRESSES, PRESALE_ACTIVE } from "../../utils/c";
import { cakeSwap } from "../../utils/f";
import { HStack } from "@chakra-ui/layout";

export default function HomeHeader({onOpen, ...props}) {
    const { t } = useTranslation("home")

    const router = useRouter()

    const isActive = paths => {
        return paths.includes(router.asPath)
    }

    const input = "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7"
    const output = "BNB"

    return (
        <Header home="/" onOpen={onOpen}>
            <Header.Text href="/#about" textTransform="capitalize" 
            >
                {t("header:about")}
            </Header.Text>
            <Header.Text href="/swap-helpers" textTransform="capitalize">
            {t("header:swap-helpers")}
            </Header.Text>
            <Header.Text href={`/swap?inputCurrency=${input}&outputCurrency=${output}`} textTransform="capitalize">
            {t("header:swap")}
            </Header.Text>
            <Header.Text href="/white-paper" textTransform="capitalize">
            {t("header:white-paper")}
            </Header.Text>
            <Header.Text href="/token" textTransform="capitalize">
               {t("header:native-token")}
            </Header.Text>
            <HStack justifyContent="center" alignItems="flex-start">
                <LocaleSwitch />
                <ThemeSwitch
                ml={{base: "15px !important"}} />
            </HStack>
        </Header>
    )
}