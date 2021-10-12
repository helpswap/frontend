import { Trade, TradeType } from '@/helpswap/sdk'
import React, { useMemo, useState } from 'react'
import { Repeat } from 'react-feather'

import useTranslation from "next-translate/useTranslation"
import Trans from "next-translate/Trans"
import { Field } from '../../state/swap/actions'
import {
  computeSlippageAdjustedAmounts,
  computeTradePriceBreakdown,
  formatExecutionPrice,
  warningSeverity,
} from '../../utils/prices'
import { AutoColumn } from '../Column'
import QuestionHelper from '../QuestionHelper'
import { AutoRow, RowBetween, RowFixed } from '../Row'
import FormattedPriceImpact from './FormattedPriceImpact'
import { StyledBalanceMaxMini, SwapCallbackError } from './styleds'
import { Text } from "@chakra-ui/layout"
import { Button } from '@chakra-ui/button'

export default function SwapModalFooter({
  trade,
  onConfirm,
  allowedSlippage,
  swapErrorMessage,
  disabledConfirm,
}: {
  trade: Trade
  allowedSlippage: number
  onConfirm: () => void
  swapErrorMessage: string | undefined
  disabledConfirm: boolean
}) {
  const [showInverted, setShowInverted] = useState<boolean>(false)
  const slippageAdjustedAmounts = useMemo(() => computeSlippageAdjustedAmounts(trade, allowedSlippage), [
    allowedSlippage,
    trade,
  ])
  const { priceImpactWithoutFee, realizedLPFee, traderFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const severity = warningSeverity(priceImpactWithoutFee)
  const { t } = useTranslation("swap")
  

  return (
    <>
      <AutoColumn gap="0px">
        <RowBetween align="center">
          <Text fontSize="14px">{t("price")}</Text>
          <Text
            fontSize="14px"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              textAlign: 'right',
              paddingLeft: '8px',
              fontWeight: 500,
            }}
          >
            {formatExecutionPrice(trade, showInverted)}
            <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
              <Repeat size={14} />
            </StyledBalanceMaxMini>
          </Text>
        </RowBetween>

        <RowBetween>
          <RowFixed>
            <Text fontSize="14px">
              {trade.tradeType === TradeType.EXACT_INPUT
                ? t('min-received')
                : t('max-sold')}
            </Text>
            <QuestionHelper
              text={t('min-received-more')}
            />
          </RowFixed>
          <RowFixed>
            <Text fontSize="14px">
              {trade.tradeType === TradeType.EXACT_INPUT
                ? slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4) ?? '-'
                : slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4) ?? '-'}
            </Text>
            <Text fontSize="14px" marginLeft="4px">
              {trade.tradeType === TradeType.EXACT_INPUT
                ? trade.outputAmount.currency.symbol
                : trade.inputAmount.currency.symbol}
            </Text>
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <Text fontSize="14px">{t('Price Impact')}</Text>
            <QuestionHelper
              text={t('price-impact-more')}
            />
          </RowFixed>
          <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <Text fontSize="14px">{t('liq-provider-fee')}</Text>
            <QuestionHelper
              text={t('liq-provider-fee-more')}
            />
          </RowFixed>
          <Text fontSize="14px">
            {realizedLPFee ? `${realizedLPFee?.toSignificant(6)} ${trade.inputAmount.currency.symbol}` : '-'}
          </Text>
        </RowBetween>
        {
          !traderFee? null : 
          <RowBetween>
          <RowFixed>
            <Text fontSize="14px">{t('trader-fee')}</Text>
            <QuestionHelper
              text={<Trans i18nKey="swap:trader-fee-more" components={[
              <Text as="span">{traderFee.totalPercentage}</Text>,
              <Text as="span">{traderFee.traderPercentage}</Text>,
              <Text as="span">{traderFee.holdersPercentage}</Text>
            ]} />}
            />
          </RowFixed>
          <Text fontSize="14px">
            {traderFee.totalAmount} ${trade.inputAmount.currency.symbol}
          </Text>
        </RowBetween>
        }
      </AutoColumn>

      <AutoRow>
        <Button
          textTransform="capitalize"
          onClick={onConfirm}
          disabled={disabledConfirm}/*
          variant={severity > 2 ? 'danger' : 'primary'}*/
          mt="10px"
          id="confirm-swap-or-send"
          width="100%"
        >
          {severity > 2 ? t("swap-anyway") : t("confirm-swap")}
        </Button>

        {swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
      </AutoRow>
    </>
  )
}
