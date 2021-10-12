import { VStack } from "@chakra-ui/react";


export default function Jumbotron({as, children, ...props}) {

    return (
        <VStack as={as || "div"} p={{base: "2rem 1rem", md: "4rem 2rem"}} mb="2rem" bg="#e9ecef" borderRadius=".3rem" {...props}>{children}</VStack>
    )
}