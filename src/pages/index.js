
import { useState, useEffect } from 'react'
import { Box, Text, Button, Flex, VStack, Img, useToast, HStack } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'
import Head from 'next/head'
import Image from 'next/image'
import Link from '../components/widgets/Link'
import Container from '../components/widgets/Container'
import PageBody from '../components/widgets/PageBody'
import styles from '../styles/Home.module.css'
import Paragraph from '../components/widgets/texts/Paragraph'
import BigText from '../components/widgets/texts/BigText'
import { AIR_DROP_ACTIVE, CONTRACT_ADDRESSES, PRESALE_ACTIVE, SOCIAL_LINKS } from '../utils/c'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import Float from '../components/animations/Float'
import SplitLayout from '../components/widgets/SplitLayout'

const banner = "/images/planet-3d-crop.png"

//https://github.com/Keydonix/uniswap-oracle/
export default function Home() {
  const { t } = useTranslation('home')
  const router = useRouter()
  const toast = useToast()

  const {isOpen, onOpen, onClose} = useDisclosure();

  const onConnected = a => {
    console.log(`Connected: ${a}`)
  }
  return (
    <PageBody onOpen={onOpen} onConnected={onConnected} isOpen={isOpen} onClose={onClose} pt="0px !important" 
    title={t("common:title")} description={t("common:sitedesc")}> 
      <Container id="about" bg="" mt="" textAlign="left !important">
          <SplitLayout mobileReverse>
            <SplitLayout.First pt={{base: "40px !important", md: "96px !important"}}>
              <Text as="div" fontSize="44px" fontWeight="700" lineHeight="1.1" mb="24px !important" color="rgb(118, 69, 217);">
                {t("common:title")}
              </Text>
              <Text as="div" fontSize="20px" fontWeight="600" lineHeight="1.1" mb="24px !important">
                {t("common:sitedesc")}
              </Text>
              <Flex flexDirection={{base: "column", md: "row"}} 
              justifyContent="flex-start"
              alignItems={{base: "flex-start", md: "center"}}>
                <Button as={Link} href={`/#swap-helpers`} 
                    textTransform="capitalize" 
                    mr={{base: "0px", md: "15px"}} 
                    mb={{base: "15px", md: "0px"}}>
                      {t("header:swap-helpers")}
                </Button>
                <Button as={Link} href={`/swap`} 
                textTransform="capitalize">
                  {t("common:trade-now")}
                </Button>
              </Flex>
              <HStack className="footer-media" justifyContent="flex-start !important" alignItems="center !important" mt="15px !important">
              {
                Object.entries(SOCIAL_LINKS).map(([key, value], index) => {
                    return value.settings.disabled? null :
                    <Box as="a"
                    href={value.link}
                    target="_blank"
                    className="footer-right__social"
                    m="0px 15px 0px 0px !important"
                  >
                    <Box>{value.getButton("25px")}</Box>
                  </Box>
                })
              }
              </HStack>
            </SplitLayout.First>
            <SplitLayout.Second pt={{base: "40px !important", md: "0px !important"}} 
            as={HStack} 
            justifyContent={{base: "flex-end", md: "center"}}
            alignItems={{base: "flex-start", md: "center"}}>
              <Float as={Img} w={{base: "192px", md: "406px"}} h={{base: "192px", md: "406px"}} src="/images/home-cartoon.png" 
              transformNo="perspective(1000px) rotateY(-13deg) rotateX(5deg) rotate(7deg) scaleY(.9) scaleX(.95) translateX(-3%) translateY(-3%)" />
            </SplitLayout.Second>
          </SplitLayout>
          
      </Container>

      <Container>

      </Container>
    </PageBody>
  )
}
