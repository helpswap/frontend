import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Trade, TradeType } from '@/helpswap/sdk'
import { ArrowDown, AlertTriangle } from 'react-feather'
import { Field } from '../../state/swap/actions'
import { isAddress, shortenAddress } from '../../utils'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown, warningSeverity } from '../../utils/prices'
import { AutoColumn } from '../Column'
import CurrencyLogo from '../CurrencyLogo'
import { RowBetween, RowFixed } from '../Row'
import { SwapShowAcceptChanges } from './styleds'
import useTranslation from "next-translate/useTranslation"
import Trans from "next-translate/Trans"
import { Text } from "@chakra-ui/layout"
import { Button } from '@chakra-ui/button'

const PriceInfoText = styled(Text)`
  font-style: italic;
  line-height: 1.3;

  span {
    color: ${({ theme }) => theme?.colors?.primary};
    font-weight: 600;
  }
`

export default function SwapModalHeader({
  trade,
  allowedSlippage,
  recipient,
  showAcceptChanges,
  onAcceptChanges,
}: {
  trade: Trade
  allowedSlippage: number
  recipient: string | null
  showAcceptChanges: boolean
  onAcceptChanges: () => void
}) {
  const slippageAdjustedAmounts = useMemo(() => computeSlippageAdjustedAmounts(trade, allowedSlippage), [
    trade,
    allowedSlippage,
  ])
  const { priceImpactWithoutFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  const { t } = useTranslation("swap")

  return (
    <AutoColumn gap="md" style={{ marginTop: '20px' }}>
      <RowBetween align="flex-end">
        <RowFixed gap="0px">
          <CurrencyLogo currency={trade.inputAmount.currency} size="24px" style={{ marginRight: '12px' }} />
          <Text
            fontSize="24px"
            color={showAcceptChanges && trade.tradeType === TradeType.EXACT_OUTPUT ? 'primary' : 'text'}
          >
            {trade.inputAmount.toSignificant(6)}
          </Text>
        </RowFixed>
        <RowFixed gap="0px">
          <Text fontSize="24px" marginLeft="20px" fontWeight="500">
            {trade.inputAmount.currency.symbol}
          </Text>
        </RowFixed>
      </RowBetween>
      <RowFixed>
        <ArrowDown size="16" style={{ marginLeft: '4px', minWidth: '16px' }} />
      </RowFixed>
      <RowBetween align="flex-end">
        <RowFixed gap="0px">
          <CurrencyLogo currency={trade.outputAmount.currency} size="24px" style={{ marginRight: '12px' }} />
          <Text
            fontSize="24px"
            style={{ marginLeft: '10px', fontWeight: 500 }}
          >
            {trade.outputAmount.toSignificant(6)}
          </Text>
        </RowFixed>
        <RowFixed gap="0px">
          <Text fontSize="24px" style={{ marginLeft: '10px', fontWeight: 500 }}>
            {trade.outputAmount.currency.symbol}
          </Text>
        </RowFixed>
      </RowBetween>
      {showAcceptChanges ? (
        <SwapShowAcceptChanges justify="flex-start" gap="0px">
          <RowBetween>
            <RowFixed>
              <AlertTriangle size={20} style={{ marginRight: '8px', minWidth: 24 }} />
              <Text color="primary"> {t("price-updated")}</Text>
            </RowFixed>
            <Button onClick={onAcceptChanges}>{t("accept")}</Button>
          </RowBetween>
        </SwapShowAcceptChanges>
      ) : null}
      <AutoColumn justify="flex-start" gap="sm" style={{ padding: '16px 0 0' }}>
        {trade.tradeType === TradeType.EXACT_INPUT ? (
          <PriceInfoText>
            <Trans i18nKey="swap:output-est" components={[
              <Text as="span">{slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(6)}</Text>,
              <Text as="span">{trade.outputAmount.currency.symbol}</Text>
            ]} />
          </PriceInfoText>
        ) : (
          <PriceInfoText>
           <Trans i18nKey="swap:input-est" components={[
             <Text as="span">{slippageAdjustedAmounts[Field.INPUT]?.toSignificant(6)}</Text>,
             <Text as="span">{trade.inputAmount.currency.symbol}</Text>
           ]} />
         </PriceInfoText>
        )}
      </AutoColumn>
      {recipient !== null ? (
        <AutoColumn justify="flex-start" gap="sm" style={{ padding: '16px 0 0' }}>
          <Text>
            {t("sent-to")}{' '}
            <b title={recipient}>{isAddress(recipient) ? shortenAddress(recipient) : recipient}</b>
          </Text>
        </AutoColumn>
      ) : null}
    </AutoColumn>
  )
}
