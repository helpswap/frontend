import { Box, Image } from "@chakra-ui/react";
const mapImage = "/images/map.png"


export default function Map({coords, w, width, ...props}) {

    return (
        <Box w="100%" pos="relative" {...props}>
            <Image src={mapImage} mx="auto" h="auto" />
        </Box>
    )
}