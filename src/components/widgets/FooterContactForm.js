import { Box, HStack, Image } from "@chakra-ui/react";
import ContactForm from "./ContactForm";

import dynamic from "next/dynamic";
const StarfieldAnimation = dynamic(
    () => import('react-starfield-animation'),
    { ssr: false }
)

export default function FooterContactForm({services}) {

    return (
        <HStack bg="#000" p={{base: "25px 15px", md: "45px 15px"}} w="100%" mt="0px !important" pos="relative">
            <Box as={StarfieldAnimation} numParticles={300} depth={300} alphaFactor={1} 
            pos="absolute" width="100%" height="100%" />
            <ContactForm services={services} w={{base: "100%", md: "50%"}} />
            <Box d={{base: "none", md: "block"}} w={{base: "0px", md: "50%"}}>
                <Image src="/images/rocket.png" w="100%" h="auto" />
            </Box>
        </HStack>
    )
}