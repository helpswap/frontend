import { Box, Text, HStack, Img } from "@chakra-ui/react"

const TraderPeekView = ({icon, symbol, name, balance, selected, onSelected}) => {
    return (
        <HStack justifyContent="flex-start" alignItems="flex-start" w="100%" mb=".7rem !important" 
        opacity={selected? "0.5" : "1"} 
        cursor={!selected? "pointer" : "default"} onClick={onSelected}>
            <Img src={icon} w="24px" h="24px" borderRadius="50%" />
            <HStack justifyContent="space-between" alignItems="center" w="100%">
                <Box>
                    <Text textTransform="uppercase" fontWeight="500">{symbol}</Text>
                    <Text fontSize="12px" fontWeight="300">{name}</Text>
                </Box>
                <Text as="div">{balance}</Text>
            </HStack>
        </HStack>
    )
}

export default AssetView