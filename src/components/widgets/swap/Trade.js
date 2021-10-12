import { CurrencyAmount, JSBI, Token, Trade as CakeTrade} from '@/helpswap/sdk'
import { Box, HStack, useColorModeValue, Text
} from "@chakra-ui/react"
import { FaChevronDown, FaExchangeAlt, FaRecycle } from "react-icons/fa"
import { useCallback, useContext, useEffect, useMemo, useState, useRef } from 'react'
import Trans from "next-translate/Trans"
import ButtonNoOutline from "../ButtonNoOutline"
import { nullOrEmptyAndList, toLocaleString } from "../../../utils/f"
//import Swal from "sweetalert2"


import { INITIAL_ALLOWED_SLIPPAGE } from '../../../constants'
import { useActiveWeb3React } from '../../../hooks'
import { useCurrency } from '../../../hooks/Tokens'
import { ApprovalState, useApproveCallbackFromTrade } from '../../../hooks/useApproveCallback'
import { useSwapCallback } from '../../../hooks/useSwapCallback'
import useWrapCallback, { WrapType } from '../../../hooks/useWrapCallback'
import { Field } from '../../../state/swap/actions'
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from '../../../state/swap/hooks'
import { useExpertModeManager, useUserDeadline, useUserSlippageTolerance, useSwapHelpersOnly } from '../../../state/user/hooks'
import { maxAmountSpend } from '../../../utils/maxAmountSpend'
import { computeTradePriceBreakdown, warningSeverity } from '../../../utils/prices'
import { SwapCallbackError } from '../../swap/styleds'
//import Loader from 'components/Loader'

import AssetInput from './AssetInput'

import { AutoRow } from '../../Row'
import { ButtonGroup } from '@chakra-ui/button'
import Loader from '../../Loader'
import ConfirmSwapModal from './modals/ConfirmSwapModal'//'../../swap/ConfirmSwapModal'
import confirmPriceImpactWithoutFee from '../../swap/confirmPriceImpactWithoutFee'


const ERROR_CODES = {
    inputError: 1,
    noLiquidity: 2,
    priceImpact: 3
}
const getErrorComponent = (t, error, inputError) => {
    switch(error) {
        case 1:
            return inputError
        case 2:
            return t("no-liq")
        case 3:
            return t("high-price-impact")
        default:
            ""
    }
}

var c = false
const Trade = ({as, t, lang, swapBg, children, ...props}) => {
    
    const pageBg = useColorModeValue("pageBg.light", "pageBg.dark")

    const loadedUrlParams = useDefaultsFromURLSearch()
    const [disableSwap, setDisableSwap] = useState(false)
    const [loadedInputCurrency, loadedOutputCurrency] = [
        useCurrency(loadedUrlParams?.inputCurrencyId),
        useCurrency(loadedUrlParams?.outputCurrencyId),
    ]

    const [dismissTokenWarning, setDismissTokenWarning] = useState(false)
    const [transactionWarning, setTransactionWarning] = useState({
        selectedToken: null,
        purchaseType: null,
        message: null
    })
    const urlLoadedTokens = useMemo(
        () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c) => c instanceof Token) ?? [],
        [loadedInputCurrency, loadedOutputCurrency]
    )
    const handleConfirmTokenWarning = useCallback(() => {
        setDismissTokenWarning(true)
    }, [])

    const handleConfirmWarning = () => {
        setTransactionWarning({
            selectedToken: null,
            purchaseType: null,
            message: null
        })
    }

    const { account } = useActiveWeb3React()

    const [isExpertMode] = useExpertModeManager()


    // get custom setting values for user
    const [deadline] = useUserDeadline()
    const [allowedSlippage] = useUserSlippageTolerance()
    //const [swapHelpersOnly] = useSwapHelpersOnly()

    // swap state
    const { independentField, typedValue, recipient } = useSwapState()

    const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo(t)
    const { wrapType, execute: onWrap, inputError: wrapInputError } = useWrapCallback(
        currencies[Field.INPUT],
        currencies[Field.OUTPUT],
        typedValue
    )
    const showWrap = wrapType !== WrapType.NOT_APPLICABLE
    const trade = showWrap ? undefined : v2Trade

    //NextCheck

    const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount,
      }
    : {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
      }

    const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()
    const isValid = !swapInputError
    const dependentField = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

    const handleTypeInput = useCallback(
        (value) => {
        onUserInput(Field.INPUT, value)
        },
        [onUserInput]
    )
    const handleTypeOutput = useCallback(
        (value) => {
        onUserInput(Field.OUTPUT, value)
        },
        [onUserInput]
    )

    // modal and loading
    const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState({
        showConfirm: false,
        tradeToConfirm: undefined,
        attemptingTxn: false,
        swapErrorMessage: undefined,
        txHash: undefined,
    })

    const formattedAmounts = {
        [independentField]: typedValue,
        [dependentField]: showWrap
        ? parsedAmounts[independentField]?.toExact() ?? ''
        : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
    }

    const route = trade?.route
    const userHasSpecifiedInputOutput = Boolean(
        currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0))
    )
    const noRoute = !route

    

    // check whether the user has approved the router on the input token
    const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)

    // check if user has gone through approval process, used to show two step buttons, reset on token change
    const [approvalSubmitted, setApprovalSubmitted] = useState(false)

    // mark when a user has submitted an approval, reset onTokenSelection for input field
    useEffect(() => {
        if (approval === ApprovalState.PENDING) {
        setApprovalSubmitted(true)
        }
    }, [approval, approvalSubmitted])

    const maxAmountInput = maxAmountSpend(currencyBalances[Field.INPUT])
    const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))

    // the callback to execute the swap
    const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
        trade,
        allowedSlippage,
        deadline,
        recipient
    )

    const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

    const handleSwap = useCallback(() => {
        if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee)) {
          return
        }
        if (!swapCallback) {
          return
        }
        setSwapState((prevState) => ({ ...prevState, attemptingTxn: true, swapErrorMessage: undefined, txHash: undefined }))
        swapCallback()
          .then((hash) => {
            setSwapState((prevState) => ({
              ...prevState,
              attemptingTxn: false,
              swapErrorMessage: undefined,
              txHash: hash,
            }))
          })
          .catch((error) => {
            setSwapState((prevState) => ({
              ...prevState,
              attemptingTxn: false,
              swapErrorMessage: error.message,
              txHash: undefined,
            }))
        })
      }, [priceImpactWithoutFee, swapCallback, setSwapState]
    )

    // errors
    const [showInverted, setShowInverted] = useState(false)

    // warnings on slippage
    const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

    //console.log("amounts:R", formattedAmounts, currencies, trade, noRoute, priceImpactSeverity, !isExpertMode)

    // show approve flow when: no error on inputs, not approved or pending, or approved in current session
    // never show if price impact is above threshold in non expert mode
    const showApproveFlow =
        !swapInputError &&
        (approval === ApprovalState.NOT_APPROVED ||
        approval === ApprovalState.PENDING ||
        (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
        !(priceImpactSeverity > 3 && !isExpertMode)

    //console.log("approve:", approval, ApprovalState.NOT_APPROVED, ApprovalState.APPROVED, ApprovalState.PENDING)

    const handleConfirmDismiss = useCallback(() => {
        setSwapState((prevState) => ({ ...prevState, showConfirm: false }))

        // if there was a tx hash, we want to clear the input
        if (txHash) {
        onUserInput(Field.INPUT, '')
        }
    }, [onUserInput, txHash, setSwapState])

    const handleAcceptChanges = useCallback(() => {
        setSwapState((prevState) => ({ ...prevState, tradeToConfirm: trade }))
    }, [trade])

    // In pancakeswap, this will check to see if the user has selected Syrup or SafeMoon to either buy or sell.
    // If so, they will be alerted with a warning message.
    //Here we used this differently:
    //It will check if the token selected by the user has the Swap Helper Token name format but isn't a Swap Helper Token
    //If this is true, a warning is shown to the user that the token looks like a Swap Helper token, but it's not.
    //The Swap Helper Token format is "Help/username". Where username is the username of the token creator
    const checkForWarning = useCallback(
        (selected, purchaseType) => {/*
            if (purchaseType == 'Buying' && swapHelpersOnly && !selected.isSwapHelper) {
                setTransactionWarning({
                    selectedToken: selected,
                    purchaseType,
                    message: t('not-help-token-buy-warning')
                })

            } else if (purchaseType == 'Buying' && selected.name.toLowerCase().startsWith('help/') && !selected.isSwapHelper) {
                setTransactionWarning({
                    selectedToken: selected,
                    purchaseType,
                    message: t('fake-help-token-buy-warning')
                })

            } */
        },
        [setTransactionWarning]
    )

    const handleInputSelect = useCallback(
        (inputCurrency) => {
          //setHasPoppedModal(false)
          //setInterruptRedirectCountdown(false)
          setApprovalSubmitted(false) // reset 2 step UI for approvals
          onCurrencySelection(Field.INPUT, inputCurrency)
          checkForWarning(inputCurrency, 'Selling')
        },
        [onCurrencySelection, setApprovalSubmitted, checkForWarning]
    )
    
    const handleMaxInput = useCallback(() => {
        if (maxAmountInput) {
            onUserInput(Field.INPUT, maxAmountInput.toExact())
        }
        }, [maxAmountInput, onUserInput]
    )

    const handleOutputSelect = useCallback(
        (outputCurrency) => {
            //setHasPoppedModal(false)
            //setInterruptRedirectCountdown(false)
            onCurrencySelection(Field.OUTPUT, outputCurrency)
            checkForWarning(outputCurrency, 'Buying')
        },
        [onCurrencySelection, checkForWarning]
    )

    const [error, setError] = useState(0)
    const [assetApproved, setAssetApproved] = useState(false)

    useEffect(() => {
        updateError()
    }, [swapInputError, noRoute, userHasSpecifiedInputOutput, priceImpactSeverity, isExpertMode, approval])
    const updateError = () => {
        setError(0)
        if(swapInputError) {
            setError(ERROR_CODES.inputError)

        } else if(noRoute && userHasSpecifiedInputOutput) {
            setError(ERROR_CODES.noLiquidity)

        } else if(priceImpactSeverity > 3 && !isExpertMode) {
            setError(ERROR_CODES.priceImpact)

        }
    }
/*
    //Continue
    useEffect(() => {
        if(transactionWarning.message) {
            Swal.fire({
                text: transactionWarning.message,
                confirmButtonText: t('common:ok'),
            }).then(() => {
                handleConfirmWarning()
            })
        }
    }, [transactionWarning])
*/

    return (
        <Box w="100%" {...props}>
            <ConfirmSwapModal
                isOpen={showConfirm}
                trade={trade}
                originalTrade={tradeToConfirm}
                onAcceptChanges={handleAcceptChanges}
                attemptingTxn={attemptingTxn}
                txHash={txHash}
                recipient={recipient}
                allowedSlippage={allowedSlippage}
                onConfirm={handleSwap}
                swapErrorMessage={swapErrorMessage}
                onDismiss={handleConfirmDismiss}
            />
            <Box w="100%" d="grid" gridAutoRows="auto" gridRowGap="12px">
                
                <AssetInput t={t} swapBg={swapBg} pageBg={pageBg} 
                placeHolder={toLocaleString(0, lang, 1)} 
                
                isEstimation={independentField === Field.OUTPUT && !showWrap && trade}
                value={formattedAmounts[Field.INPUT]}
                showMaxButton={!atMaxAmountInput}
                onMax={handleMaxInput}
                onUserInput={handleTypeInput}

                currency={currencies[Field.INPUT]}
                onMax={handleMaxInput}
                onCurrencySelect={handleInputSelect}
                otherCurrency={currencies[Field.OUTPUT]}
                id="swap-currency-input" isFrom/>

                <Box d="grid" gridAutoRows="auto">
                    <HStack p="0px 1rem !important" w="100%" flexWrap="wrap" justifyContent="flex-start" alignItems="center">
                        <ButtonNoOutline zIndex="10 !important" p="3px !important" my="-1.5rem !important" borderRadius="9999px !important" 
                        w={{base: "62px"}} h={{base: "62px"}}
                        bg={pageBg} 
                        onClick={() => {
                          setApprovalSubmitted(false) // reset 2 step UI for approvals
                          onSwitchTokens()
                        }} >
                            <Box p=".75rem !important" borderRadius="9999px !important" bg={swapBg} 
                            >
                                <Box as={FaExchangeAlt} size="32px" transform="rotateZ(90deg)" />
                            </Box>
                        </ButtonNoOutline>
                    </HStack>
                </Box>
                
                <AssetInput t={t} swapBg={swapBg} pageBg={pageBg} 
                placeHolder={toLocaleString(0, lang, 1)} 
                
                showMaxButton={false}
                isEstimation={independentField === Field.INPUT && !showWrap && trade}
                value={formattedAmounts[Field.OUTPUT]}
                onUserInput={handleTypeOutput}
                currency={currencies[Field.OUTPUT]}
                onCurrencySelect={handleOutputSelect}
                otherCurrency={currencies[Field.INPUT]}
                id="swap-currency-output" />
                
                {Boolean(trade) && (
                    <HStack w="100%" justifyContent="space-between" alignItems="center" wrap="wrap">
                        <Text as="div" fontSize="14px">{t("price")}</Text>
                        <TradePrice
                            t={t}
                            price={trade?.executionPrice}
                            showInverted={showInverted}
                            setShowInverted={setShowInverted}
                        />
                    </HStack>
                )}
                {allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE && (
                    <HStack align="center" w="100%" mt="15px">
                        <Text as="div" fontSize="14px" textTransform="capitalize">{t('slippage-tolerance')}</Text>
                        <Text as="div" fontSize="14px">{allowedSlippage / 100}%</Text>
                    </HStack>
                )}
            </Box>
            <ButtonGroup w="100%">
              {error ? (
                <ButtonNoOutline w="100%" h="64px" mt="1rem !important" p="16px !important" textAlign="center" borderRadius="10px" 
                d="flex" justifyContent="center" alignItems="center" fontWeight="500" 
                disabled={true}>
                {
                    getErrorComponent(t, error, swapInputError)
                }
                </ButtonNoOutline>
              ) : showWrap ? (
                <Button disabled={Boolean(wrapInputError)} onClick={onWrap} width="100%">
                  {wrapInputError ??
                    (wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null)}
                </Button>
              ) : showApproveFlow ? (
                <>
                {
                    approvalSubmitted && approval === ApprovalState.APPROVED? null :
                    <ButtonNoOutline w="100%" h="64px" mt="1rem !important" p="16px !important" textAlign="center" borderRadius="10px" 
                        d="flex" justifyContent="center" alignItems="center" fontWeight="500"
                        onClick={approveCallback}
                        disabled={disableSwap || approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                    >
                        {approval === ApprovalState.PENDING ? (
                        <AutoRow gap="6px" justify="center">
                            {t("approving")} <Loader stroke="white" />
                        </AutoRow>
                        ) : (
                            <Trans i18nKey="swap:approve" components={[<Text as="span">{currencies && currencies[Field.INPUT]?.symbol}</Text>]} />
                        )}
                    </ButtonNoOutline>
                }
                {
                    approvalSubmitted && approval === ApprovalState.APPROVED? 
                    <ButtonNoOutline w="100%" h="64px" mt="1rem !important" p="16px !important" textAlign="center" borderRadius="10px" 
                    d="flex" justifyContent="center" alignItems="center" fontWeight="500"
                    onClick={() => {
                      if (isExpertMode) {
                        handleSwap()
                      } else {
                        setSwapState({
                          tradeToConfirm: trade,
                          attemptingTxn: false,
                          swapErrorMessage: undefined,
                          showConfirm: true,
                          txHash: undefined,
                        })
                      }
                    }}
                    id="swap-button"
                    disabled={
                      disableSwap ||
                      !isValid ||
                      approval !== ApprovalState.APPROVED ||
                      (priceImpactSeverity > 3 && !isExpertMode)
                    }
                  >
                    {priceImpactSeverity > 2 && isExpertMode? t("swap-anyway") : t("swap")}
                  </ButtonNoOutline> 
                  : null
                }
                </>
              ) : (
                <ButtonNoOutline w="100%" h="64px" mt="1rem !important" p="16px !important" textAlign="center" borderRadius="10px" 
                    d="flex" justifyContent="center" alignItems="center" fontWeight="500"
                    onClick={() => {
                        if (isExpertMode) {console.log("swap:1")
                            handleSwap()
                        } else {console.log("swap:2")
                            setSwapState({
                            tradeToConfirm: trade,
                            attemptingTxn: false,
                            swapErrorMessage: undefined,
                            showConfirm: true,
                            txHash: undefined,
                            })
                        }
                    }}
                    id="swap-button"
                    disabled={
                        disableSwap || !isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError
                    }
                  >
                    {priceImpactSeverity > 2 && isExpertMode? t("swap-anyway") : t("swap")}
                </ButtonNoOutline>
              )}
            </ButtonGroup>
        </Box>
    )
}

const TradePrice = ({ price, showInverted, setShowInverted }) => {
    const formattedPrice = showInverted ? price?.toSignificant(6) : price?.invert()?.toSignificant(6)
  
    const show = Boolean(price?.baseCurrency && price?.quoteCurrency)

    return (
        <HStack justifyContent="flex-start" alignItems="center">
            {show ? (
                <>
                    <Box mr="7px">
                        <Trans i18nKey="swap:x-per-y" components={[
                        <Text as="span">{formattedPrice ?? '-'}</Text>, 
                        <Text as="span">{showInverted? price?.quoteCurrency?.symbol : price?.baseCurrency?.symbol}</Text>, 
                        <Text as="span">{showInverted? price?.baseCurrency?.symbol : price?.quoteCurrency?.symbol}</Text>]} />
                    </Box>
                    <Box as={FaRecycle} size="12px" cursor="pointer" onClick={() => {
                        setShowInverted(!showInverted)
                    }} />
                </>
            ) : (
            '...'
            )}
        </HStack>
    )
}

export default Trade