import { useDisclosure } from "@chakra-ui/hooks"
import { Box, HStack } from "@chakra-ui/layout"
import useTranslation from "next-translate/useTranslation"
import SwapHelpersList from "../components/widgets/swap/SwapHelpersList"
import Container from "../components/widgets/Container"
import PageBody from "../components/widgets/PageBody"


const SwapHelpers = () => {
    const { t } = useTranslation('swap-helpers')
    const {isOpen, onOpen, onClose} = useDisclosure()

    const onConnected = a => {
        console.log(`Connected: ${a}`)
    }

    const onHelperSelected = () => {

    }

    return (
        <PageBody onOpen={onOpen} onConnected={onConnected} isOpen={isOpen} onClose={onClose} pt="40px !important" 
        title={t("title")}>
            <Container>
                <HStack w="100%" justifyContent="center">
                    <Box w="100%" maxW="600px">
                        <SwapHelpersList t={t} onHelperSelected={onHelperSelected} itemTemplate={SwapHelpersList.ITEM_TEMPLATES.profile} />
                    </Box>
                </HStack>
            </Container>
        </PageBody>
    )
}

export default SwapHelpers