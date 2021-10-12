import { Box, Flex } from "@chakra-ui/react";


const SplitLayout = ({children, reverse, mobileReverse, ...props}) => {


    return (
        <Flex w="100%" 
        flexDirection={{base: !mobileReverse? "column" : "column-reverse", md: !reverse? "row" : "row-reverse"}} 
        justifyContent={{base: "flex-start", md: "space-between"}}
        alignItems={{base: "flex-start", md: "flex-start"}}
        {...props}>
            {children}
        </Flex>
    )
}

SplitLayout.First = ({as, children, ...props}) => {

    return (
        <Box as={as || "div"} w={{base: "100%", md: "50%"}} mb={{base: "25px", md: "0px"}} {...props}>
            {children}
        </Box>
    )
}
SplitLayout.Second = ({as, children, ...props}) => {

    return (
        <Box as={as || "div"} w={{base: "100%", md: "50%"}} p={{base: "0px", md: "25px"}} {...props}>
            {children}
        </Box>
    )
}

export default SplitLayout