import { Text, VStack, Box } from "@chakra-ui/react";
import { H1 } from "../pages/services";
import TextView from "./TextView";
import SkewedContainer from 'sc-react';


export default function SlantHeader({bg, color, bgInverse, title, desc, ...props}) {

    return (
        <Box w="100%">
            <SkewedContainer
            bottom="right" 
            bgColor="#222329"
            >
                <Box color="#f4f4f4">
                    <H1 px={{base: "25px"}}>{title}</H1>
                    <TextView as="p" px={{base: "25px"}} py="0.5rem !important" fontWeight="400">{desc}</TextView>
                </Box>
            </SkewedContainer>
        </Box>
    )


    return (
        <VStack w="100%" background={bg} color={color} p="80px 0 80px" 
        justifyContent="center" alignItems="flex-start" pos="relative" 
        minH={{base: "348px", md: "448px"}}
        pb={{base: "80px", md: "10px !important"}} {...props}
        _after={{
            content: "''",
            pos: "absolute",
            width: "100%",
            height: {base: "176px", sm: "256px"},
            background: bgInverse,
            transform: "skewY(-7deg) translateY(100%)",
            transformOrigin: "0 0 0"
        }}>
            <H1 px={{base: "25px"}}>{title}</H1>
            <TextView as="p" px={{base: "25px"}} py="0.5rem !important" fontWeight="400">{desc}</TextView>
        </VStack>
    )
}