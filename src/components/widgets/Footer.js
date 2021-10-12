import { Text, VStack, HStack, Image, Box, Flex, useColorModeValue } from "@chakra-ui/react"
import useTranslation from "next-translate/useTranslation"
import { SOCIAL_LINKS, CONTACT } from "../../utils/c"
import Container from "./Container"
import Link from "./Link"

const logo = "/logo.png"

const Footer = () => {
    const { t } = useTranslation("footer")
    const bg = useColorModeValue("pageBg.light", "pageBg.dark")
    const color = useColorModeValue("pageColor.light", "pageColor.dark")

    return (
        <VStack bg={bg} color={color} zIndex="12" m="0px !important" w="100%" minH="200px" zIndex="20" pos="relative" justifyContent="center" alignItems="center">
            <Box as="hr" w="100%" />
            <Container>
                <Flex w="100%" flexDirection={{base: "column", md: "row"}} flexWrap="wrap" 
                justifyContent={{base: "flex-start", md: "space-between"}} alignItems={{base: "flex-center", md: "flex-start"}} 
                textAlign={{base: "center", md: "left"}}>
                    <HStack as={Link} href="/" w={{base: "100%", md: "25%"}} justifyContent={{base: "center", md: "flex-start"}} mb={{base: "20px", md: "0px"}}>
                        <Image src={logo} width="52px" height="52px" />
                        <Text fontSize="1.2rem" fontWeight="bold">{t("common:sitename")}</Text>
                    </HStack>
                    
                    <VStack justifyContent="flex-start" alignItems={{base: "center", md: "flex-start"}} w={{base: "100%", md: "25%"}} mb={{base: "20px", md: "0px"}}>
                        <Box mb="35px !important">
                            <Box as="small">{t("email")}</Box>
                            <Box fontSize="0.96rem" fontWeight="bold" textTransform="uppercase" lineHeight="1.2" mt="10px" 
                            as={Link} href={`mailto:${CONTACT.email}`} display="block">
                                {CONTACT.email}
                            </Box>
                        </Box>
                    </VStack>

                    <VStack justifyContent="flex-start" alignItems={{base: "center", md: "flex-start"}} w={{base: "100%", md: "25%"}}>
                        <Box as="small">{t("social")}</Box>
                        <VStack justifyContent="flex-start" alignItems="flex-start">
                        {
                            Object.entries(SOCIAL_LINKS).map(([key, value], index) => {
                                return value.settings.disabled? null :
                                <HStack key={`${index}`} mb="7px !important" w="100%" as={Link} href={value.link} 
                                fontSize="0.96rem" fontWeight="bold" textTransform="uppercase" lineHeight="1.2" mt="10px" 
                                justifyContent={{base: "flex-start"}} alignItems="flex-start">
                                    <Box>{value.getButton("20px")}</Box>
                                    <Box textTransform="capitalize" ml="5px !important">{key}</Box>
                                </HStack>
                            })
                        }
                        </VStack>
                    </VStack>
                </Flex>
            </Container>
        </VStack>
    )
}

export default Footer