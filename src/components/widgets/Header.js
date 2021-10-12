import { Flex, Text, useColorModeValue } from "@chakra-ui/react"
import { HStack } from "@chakra-ui/layout"
import useTranslation from "next-translate/useTranslation";
import { PRIMARY_COLOR, SEC_COLOR } from "../../utils/c"
import Link from "./Link"

import { useState } from "react"
import { Button, IconButton } from "@chakra-ui/react"
import { FaBars, FaTimes } from "react-icons/fa";
import theme from "../../../theme";
import { useWeb3React } from "@web3-react/core";
import { shortenAddress } from "../../utils/f";

const logo = "/logo.png"

const Header = ({home, children, onOpen, ...props}) => {
    const { t } = useTranslation("header")

    const { account, deactivate} = useWeb3React();

    const [showMenu, setShowMenu] = useState()

    const bg = useColorModeValue("navbarBg.light", "navbarBg.dark")
    const shadow = `0 2px 4px -1px ${useColorModeValue(theme?.colors?.navbarShadow.light, theme?.colors?.navbarShadow.dark)}`

    return (
        <Flex as="header" className="header-wrap" 
        flexDirection={{base: "column", md: "row"}}
        justifyContent={{base: "flex-start", md: "space-between"}}
        alignItems="center"
        zIndex="200"
        bg={bg}
        boxShadow={shadow}
        maxW="100% !important"
        m="0px !important"
        px={{base: "7px !important", lg: "25px !important"}}
        w="100%">
            <HStack w={{base: "100%", md: "auto"}}
            h={{base: "55px", md: "70px"}}
            justifyContent="space-between"
            {...props}>
                <Text as={Link} href={home || "/projects/matrix/"}
                    w={{base: "50px", md: "65px"}} h={{base: "50px", md: "65px"}} 
                    bg={`url(${logo}) no-repeat center`}
                    bgSize="100%">
                    <Text as="h2" className="logo" d="none !important">{t('common:sitename')}</Text>
                </Text>

                <HStack justifySelf="flex-end" h={{base: "55px", md: "70px"}}>
                    <Button marginStart="0px !important" marginInlineStart="0px !important"
                        display="flex" justifyContent="center" alignItems="center" onClick={() => account? deactivate() : onOpen()} 
                        color="#fff" bg={SEC_COLOR}
                        _hover={{
                            bg: `${SEC_COLOR} !important`, opacity: "0.7"
                        }}
                        ml={{base: "15px !important", md: "50px !important"}}
                        mr={{base: "15px !important"}}>
                            {account? shortenAddress(account) : t("header:connect")}
                    </Button>
                    <Button marginStart="0px !important" marginInlineStart="0px !important"
                    display="flex" justifyContent="center" alignItems="center" d={{base: "block", md: "none"}} onClick={() => setShowMenu(!showMenu)} 
                    color="#fff" bg={SEC_COLOR}
                    _hover={{
                        bg: `${SEC_COLOR} !important`, opacity: "0.7"
                    }}>
                        {!showMenu? <FaBars size="15px" />: <FaTimes size="15px" />}
                    </Button>
                </HStack>
            </HStack>
            
            {
                !children? null :
                <Flex d={{base: showMenu? "flex" : "none", md: "flex"}}
                w="100%" h={{base: "auto", md: "70px"}} 
                flexDirection={{base: "column", md: "row"}}
                justifyContent={{base: "flex-start", md: "flex-end"}} 
                alignItems={{base: "flex-start", md: "center"}}
                py={{base: "15px", md: "0px"}}>
                    {children}
                </Flex>
            }
        </Flex>
    )
}

Header.Text = ({as, href, active, className, children, ...props}) => {
    
    return (
        <Text as={as || href? Link : "div"} href={href} 
            p=".75rem !important"
            fontSize={{base: "15px", md: "15px"}}
            className={`btn-white ${className || ""}`} textTransform="capitalize"
            noBorder
            {...props}>
            {children}
        </Text>
    )
}

export default Header