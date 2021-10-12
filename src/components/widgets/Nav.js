import { Box, Button, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react"
import useTranslation from "next-translate/useTranslation"
import ThemeSwitch from "./ThemeSwitch"

const logo = "/logo.png"
import LocaleSwitch from "./LocaleSwitch"
import Image from 'next/image'
import Link from "./Link"
import { FaBars, FaTimes } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const MenuItem = ({as, children, href, ...props}) => {
    const router = useRouter()
    const { asPath } = router
    console.log("asPath:", asPath)

    return (
        <Text as={as || "div"} ml="0.7rem" m={{base: "10px auto", md: "auto 10px"}} fontWeight="bold" textTransform="capitalize" 
        _hover={{textDecoration: "underline"}} active={asPath == href} href={href} dataASPath={asPath == href} 
        {...props}>
            {children}
        </Text>
    )
}


const LinkButton = ({children, href, ...props}) => {
    const router = useRouter()
    const { asPath } = router

    return (
        <Button as={Link} m={{base: "10px auto", md: "auto 10px"}} fontWeight="bold"
        _hover={{textDecoration: "underline"}}
        active={asPath == href} href={href} {...props}>{children}</Button>
    )
}
const Pipe = () => {
    const bg = useColorModeValue("pageColor.light", "pageColor.dark")
    return (
        <Box h="45px" w="0.4px" mx="25px !important" bg={bg} />
    )
}

const Style = () => {

    return (
        <style jsx global>{`
        @media screen and (min-width: 768px) {
            .fixed-top {
                position: fixed !important;
            }
        }
        
        .enable-mobile-stick.fixed-top {
            position: fixed !important;
        }
        
        `}
        </style>
    )
}

const $ = require('jquery')
const initSticky = () => {
    var sticky = $(".header")
    if(sticky && sticky[0]) {
      sticky = sticky[0].offsetHeight
      // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
      $(window).on("scroll", e => {
        if (window.pageYOffset > sticky) {
          $(".header")[0].classList.add("fixed-top");
        } else {
          $(".header")[0].classList.remove("fixed-top");
        }
      })
    }
}
const Nav = ({enableMobileStick, ...props}) => {
    const { t } = useTranslation("header")
    const navBg = useColorModeValue("navbarBg.light", "navbarBg.dark")

    const [menuOpened, setMenuOpened] = useState(false)

    useEffect(() => {
        initSticky()
    }, [])

    return (
        <Flex id="header" className={`header ${enableMobileStick? "enable-mobile-stick" : ""}`} flexDirection={{base: menuOpened? "column" : "row", md: "row"}} h={{base: !menuOpened? "70px" : "100vh", md: "70px"}} 
        w={{base: !menuOpened? "100%" : "85vw", md: "100%"}} 
        justifyContent={{base: !menuOpened? "space-bwtween" : "space-around", md: "space-between"}} alignItems="center" 
        p={{base: "15px", md: "35px"}} 
        bg={{base: navBg}}
        pos={{base: !menuOpened? "relative" : "absolute", md: "relative"}} top="0" right="0" zIndex="20" {...props}>
            <HStack>
                <HStack as={Link} href="/">
                    <Image src={logo} width="52px" height="52px" />
                    <Text fontSize="1.2rem" fontWeight="bold">{t("common:sitename")}</Text>
                </HStack>
                
                <LocaleSwitch />

                <ThemeSwitch />
            </HStack>
            {/* <Flex flexDirection={{base: "column", md: "row"}} alignItems="center" 
            display={{base: !menuOpened? "none" : "flex", md: "flex"}}>
                <MenuItem as={Link} href="/services" onClick={() => {setMenuOpened(false)}}>{t("services")}</MenuItem>
                <MenuItem as={Link} href="/projects" onClick={() => {setMenuOpened(false)}}>{t("works")}</MenuItem>
                <MenuItem as={Link} href="/products" onClick={() => {setMenuOpened(false)}}>{t("products")}</MenuItem>
                <MenuItem as={Link} href="/packages" onClick={() => {setMenuOpened(false)}}>{t("packages")}</MenuItem>
                <MenuItem as={Link} href="/about" onClick={() => {setMenuOpened(false)}}>{t("about-us")}</MenuItem>
                
                <MenuItem as={LinkButton} href="/contact" background={"primaryButtonBg !important"} color="primaryButtonColor">{t("contact")}</MenuItem>
            </Flex> */}
            <HStack pos={{base: !menuOpened? "relative" : "absolute"}} left="0" top="0" p="24px" 
            display={{base: "flex", md: "none"}} w="100%" justifyContent={!menuOpened? "flex-end" : "flex-start"}>
                {
                    !menuOpened? 
                    <FaBars onClick={() => {setMenuOpened(true)}} size="1.5rem" cursor="pointer" />
                    :
                    <FaTimes onClick={() => {setMenuOpened(false)}} size="1.5rem" cursor="pointer" />
                }
            </HStack>
            <Style />
        </Flex>
    )
}

export default Nav