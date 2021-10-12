import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";

import i18nConfig from '../../../i18n'

import ReactCountryFlag from "react-country-flag"
import { useRouter } from "next/router";
import Link from "./Link";

const { locales, localesMap } = i18nConfig

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem
  } from "@chakra-ui/react"


const LocaleSwitch = (props) => {
    const { t, lang } = useTranslation("common")
    const bg = useColorModeValue("navbarBg.light", "navbarBg.dark")
    const router = useRouter()
    return (
        <Menu {...props}>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} >
                <span aria-label={t(`locale-name-${lang}`)} title={t(`locale-name-${lang}`)}>
                    {t(`locale-name-${lang}`)}
                </span> &nbsp;
                <ReactCountryFlag countryCode={localesMap[lang]?.countryCode} svg />
            </MenuButton>
            <MenuList bg={bg || ""}>
                {
                    locales.map(lng => {
                        if(lng == lang) return
                        return (
                            <MenuItem as={Link} shallow={false} id={lng} href={router.asPath} locale={lng} key={lng} className="dropdown-item" style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
                                <Box aria-label={t(`locale-name-${lng}`)} title={t(`locale-name-${lng}`)}>
                                    {t(`locale-name-${lng}`)}
                                </Box> &nbsp;
                                <Box>
                                    <ReactCountryFlag countryCode={localesMap[lng]?.countryCode} svg />
                                </Box>
                            </MenuItem>
                            
                        )
                    })
                }
            </MenuList>
        </Menu>
    )
}

export default LocaleSwitch