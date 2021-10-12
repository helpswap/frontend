import { Box, useColorModeValue } from "@chakra-ui/react";

export default function Card({as, children, ...props}) {
    const bg = useColorModeValue("#fff", "#000")
    const color = useColorModeValue("pageColor.light", "pageColro.dark")

    return (
        <Box as={as || "div"} w={{base: "250px", md: "300px"}} minH="400px" borderRadius="12px" 
        bg={bg} color={color} boxShadow="0 0.25rem 0.75rem rgb(0 0 0 / 8%)" p="15px" {...props}>
            {children}
        </Box>
    )
}