
import { Box, Flex, HStack, VStack, Img, Text, 
    NumberInput,
    NumberInputField,
} from "@chakra-ui/react"
import ButtonNoOutline from "../ButtonNoOutline"
import { FaChevronDown } from "react-icons/fa"
import Trans from "next-translate/Trans"
import { useCallback, useState } from "react"
import { useActiveWeb3React } from "../../../hooks/"
import { useCurrencyBalance } from "../../../state/wallet/hooks"
import CurrencySearchModal from '../../SearchModal/CurrencySearchModal'
import CurrencyLogo from '../../CurrencyLogo/'

export const AssetInput = ({
    t,
    id,
    value, 
    onUserInput, 
    swapBg, 
    pageBg, 
    estimate, 
    placeHolder, 
    isFrom, 
    isEstimation, 
    onMax, 
    showMaxButton, 
    currency, 
    onCurrencySelect, 
    otherCurrency,
    
    disableCurrencySelect = false,
    hideBalance = false,
    pair = null, // used for double token logo
    hideInput = false,
    showCommonBases}) => {console.log("ASSET:C", currency, "other:", otherCurrency)

    const [modalOpen, setModalOpen] = useState(false)
    const { account } = useActiveWeb3React()
    const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
    const handleDismissSearch = useCallback(() => {
        setModalOpen(false)
    }, [setModalOpen])

    return (
        <Box borderRadius=".625rem" p="1rem !important" bg={swapBg}>
            <Flex direction={{base: "column", md: "row"}} 
            justifyContent={{base: "flex-start", md: "space-between"}} 
            alignItems={{base: "flex-start", md: "center"}}>
                <Box w={{base: "100%", md: "40%"}}>
                    <ButtonNoOutline fontSize={{base: "20px"}} fontWeight="500" h="100%" p="7px" bg="transparent !important" 
                    onClick={() => {
                        if (!disableCurrencySelect) {
                          setModalOpen(true)
                        }
                    }}>
                        <HStack justifyContent="flex-start" alignItems="center">
                            {
                                !currency? null : <CurrencyLogo currency={currency} size="54px" style={{borderRadius: "50%"}} />
                            }
                            <VStack mx={{base: ".875rem!important"}} justifyContent="center" alignItems="flex-start">
                                <Text fontWeight="500" fontSize={{base: ".75rem"}} lineHeight={{base: "1rem"}} 
                                textTransform="capitalize">
                                    {t(isFrom? "swap-from" : "swap-to")}{
                                    isEstimation? <Text as="span" textTransform="lowercase">({t("est")})</Text> : null
                                    }:
                                </Text>
                                <HStack justifyContent="flex-start" alignItems="center">
                                    <Text fontWeight="700" fontSize={{base: currency? "1rem" : "0.6rem"}} lineHeight={{base: "2rem"}} textTransform="uppercase">
                                        {(currency && currency.symbol && currency.symbol.length > 20
                                        ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                                            currency.symbol.length - 5,
                                            currency.symbol.length
                                        )}`
                                        : currency?.symbol) || t('select-currency')}
                                    </Text>
                                    {!disableCurrencySelect && <FaChevronDown width="12px" height="7px" />}
                                </HStack>
                            </VStack>
                        </HStack>
                    </ButtonNoOutline>
                </Box>
                <HStack w={{base: "100%", md: "60%"}} p="0.75rem" alignItems="center" borderRadius=".625rem" bg={pageBg}> 
                    {
                        account && currency && showMaxButton && isFrom && (
                        <ButtonNoOutline whiteSpace="nowrap" onClick={onMax}
                            mr=".75rem !important"
                            px="-0.5.5rem !important" 
                            py=".25rem !important" 
                            fontSize=".75rem !important" 
                            lineHeight="1rem !important" 
                            fontSize=".75rem !important" 
                            fontWeight="500" borderWidth="1px" borderRadius="9999px">
                            {t("max")}
                        </ButtonNoOutline>)
                    }
                    <NumberInput w="0px" flex="1 1 auto"
                        value={!value? "" : parseFloat(value)} 
                        onChange={val => {
                            onUserInput(val)
                        }}
                    >
                        <NumberInputField fontWeight="500"
                        placeholder={placeHolder || ""}
                        outline="none !important" border="none !important" fontSize="24px" whiteSpace="nowrap" 
                        overflow="hidden" textOverflow="ellipsis" p="0px" appearance="textfield" 
                        className="no-outline" />
                    </NumberInput>
                    <VStack ml=".75rem !imprtant" fontSize=".75rem" lineHeight="1rem !important" justifyContent="center" alignItems="flex-start">
                        {
                            !hideBalance && !!currency && selectedCurrencyBalance?
                            <Box cursor="pointer" onClick={onMax}>
                                <Trans i18nKey="swap:balance" components={[<Text as="span">{selectedCurrencyBalance?.toSignificant(6)}</Text>]} />
                            </Box>
                            : ' -'
                        }
                        {
                            !estimate? null : 
                            <Box>
                                <Trans i18nKey="swap:approx" components={[
                                <Text as="span">{estimate}</Text>, 
                                <Text as="span" textTransform="uppercase">BUSD</Text>]} />
                            </Box>
                        }
                    </VStack>
                </HStack>
            </Flex>
            
            {!disableCurrencySelect && onCurrencySelect && (
                <CurrencySearchModal
                isOpen={modalOpen}
                onDismiss={handleDismissSearch}
                onCurrencySelect={onCurrencySelect}
                selectedCurrency={currency}
                otherSelectedCurrency={otherCurrency}
                showCommonBases={showCommonBases}
                />
            )}
        </Box>
    )
}

export default AssetInput