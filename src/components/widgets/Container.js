import { Box, VStack } from "@chakra-ui/react";

export default function Container({as, children, neigbours, ...props}) {

    return (
        <VStack as={as || ""} mx="auto !important" w="100%" justifyContent="flex-start" alignItems="flex-start" p="15px" mt="0px !important" 
        maxW={{base: "100%", sm: `${540 / (!neigbours? 1 : neigbours + 1)}px`, md: `${720 / (!neigbours? 1 : neigbours + 1)}px`, lg: `${960 / (!neigbours? 1 : neigbours + 1)}px`, xl: `${1140 / (!neigbours? 1 : neigbours + 1)}px`}} {...props}>
            {children}
        </VStack>
    )
}