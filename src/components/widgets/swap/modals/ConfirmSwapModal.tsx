import { currencyEquals, Trade } from '@/helpswap/sdk'
import { useCallback, useMemo } from 'react'
import SwapModalFooter from '../../../swap/SwapModalFooter'
import SwapModalHeader from '../../../swap/SwapModalHeader'
import TransactionConfirmationModal, {
  TransactionErrorContent
} from '../../../TransactionConfirmationModal'
import ConfirmationPendingContent from '../../../TransactionConfirmationModal/ConfirmationPendingContent'
import TransactionSubmittedContent from '../../../TransactionConfirmationModal/TransactionSubmittedContent'

import { Text, Box, HStack, Flex } from "@chakra-ui/layout"
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal"
import { useToast } from "@chakra-ui/toast"
import useTranslation from "next-translate/useTranslation"
import { useActiveWeb3React } from 'src/hooks'
import Trans from "next-translate/Trans"


/**
 * Returns true if the trade requires a confirmation of details before we can submit it
 * @param tradeA trade A
 * @param tradeB trade B
 */
function tradeMeaningfullyDiffers(tradeA: Trade, tradeB: Trade): boolean {
    return (
      tradeA.tradeType !== tradeB.tradeType ||
      !currencyEquals(tradeA.inputAmount.currency, tradeB.inputAmount.currency) ||
      !tradeA.inputAmount.equalTo(tradeB.inputAmount) ||
      !currencyEquals(tradeA.outputAmount.currency, tradeB.outputAmount.currency) ||
      !tradeA.outputAmount.equalTo(tradeB.outputAmount)
    )
}
const ConfirmSwapModal = ({
    trade,
    originalTrade,
    onAcceptChanges,
    allowedSlippage,
    onConfirm,
    onDismiss,
    recipient,
    swapErrorMessage,
    isOpen,
    attemptingTxn,
    txHash
}) => {
    const { t } = useTranslation("swap")

    const { chainId } = useActiveWeb3React()
  
    if (!chainId) return null

    const showAcceptChanges = useMemo(
        () => Boolean(trade && originalTrade && tradeMeaningfullyDiffers(trade, originalTrade)),
        [originalTrade, trade]
    )

    const ModalTop = useCallback(() => {
        return trade ? (
          <SwapModalHeader
            trade={trade}
            allowedSlippage={allowedSlippage}
            recipient={recipient}
            showAcceptChanges={showAcceptChanges}
            onAcceptChanges={onAcceptChanges}
          />
        ) : null
      }, [allowedSlippage, onAcceptChanges, recipient, showAcceptChanges, trade])
    
      const ModalBottom = useCallback(() => {
        return trade ? (
          <SwapModalFooter
            onConfirm={onConfirm}
            trade={trade}
            disabledConfirm={showAcceptChanges}
            swapErrorMessage={swapErrorMessage}
            allowedSlippage={allowedSlippage}
          />
        ) : null
      }, [allowedSlippage, onConfirm, showAcceptChanges, swapErrorMessage, trade])


    const ConfirmationModalContent = () => {

      return (
        <Box w="100%">
            <ModalTop />
            <Box mt="25px" />
            <ModalBottom />
        </Box>
      )
    }

    {/*<TransactionErrorContent onDismiss={onDismiss} message={swapErrorMessage} /> */}
    // text to show while loading
    /**
     * const pendingText = `Swapping ${trade?.inputAmount?.toSignificant(6)} ${
      trade?.inputAmount?.currency?.symbol
    } for ${trade?.outputAmount?.toSignificant(6)} ${trade?.outputAmount?.currency?.symbol}`
     */
    const pendingText = (
      <Trans i18nKey="swap:swaping-x-for-y" components={[
      <Text as="span">{trade?.inputAmount?.toSignificant(6)}</Text>, 
      <Text as="span">{trade?.inputAmount?.currency?.symbol}</Text>, 
      <Text as="span">{trade?.outputAmount?.toSignificant(6)}</Text>, 
      <Text as="span">{trade?.outputAmount?.currency?.symbol}</Text>]} />
    )

    const confirmationContent = useCallback(
      () =>
        swapErrorMessage ? (
          <TransactionErrorContent onDismiss={onDismiss} message={swapErrorMessage} />
        ) : (
          <ConfirmationModalContent />
        ),
      [onDismiss, ConfirmationModalContent, swapErrorMessage]
    )

    return (
        <Modal isOpen={isOpen} onClose={onDismiss}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <HStack justifyContent="space-between" alignItems="center">
                        <Text as="div" textTransform="capitalize">
                            {attemptingTxn? t("waiting-confirmation") : swapErrorMessage? t("error") : txHash? t("transaction-submitted") : t('confirm-swap')}
                        </Text>
                        <ModalCloseButton />
                    </HStack>
                </ModalHeader>
                <ModalBody>
                  {attemptingTxn ? (
                    <ConfirmationPendingContent onDismiss={onDismiss} pendingText={pendingText} />
                  ) : txHash ? (
                    <TransactionSubmittedContent chainId={chainId} hash={txHash} onDismiss={onDismiss} />
                  ) : (
                    confirmationContent()
                  )}
                </ModalBody>

            </ModalContent>

        </Modal>
    )
}

export default ConfirmSwapModal