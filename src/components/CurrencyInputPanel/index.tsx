import React, { useState, useCallback } from 'react'
import { Currency, Pair } from '@/helpswap/sdk'
import { ChevronDownIcon, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { darken } from 'polished'
import useTranslation from "next-translate/useTranslation"
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import CurrencyLogo from '../CurrencyLogo'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween } from '../Row'
import { Input as NumericalInput } from '../NumericalInput'
import { useActiveWeb3React } from '../../hooks'
import { Box } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'

/*
const InputRow = ({ selected, children, ...rest }) => {
  return (
    <Box display="flex" flexRow="row nowrap" alignItems="center" p={selected? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem'} {...rest}>{children}</Box>
  )
}

const CurrencySelect = ({ selected, children, ...rest }) => {
  return (
    <Box display="flex" alignItems="center" h="34px" fontSize="16px" color="#fff" borderRadius="12px" outline="none" cursor="pointer" 
    userSelect="none" border="none" p="0 0.5rem" {...rest}>{children}</Box>
  )
}

const LabelRow = ({ selected, children, ...rest }) => {
  return (
    <Box display="flex" flexRow="row nowrap" alignItems="center" color="#555" p="0.75rem 1rem 0 1rem" 
    fontSize=".75rem" {...rest}>{children}</Box>
  )
}

const Aligner = ({ selected, children, ...rest }) => {
  return (
    <Box as="span" display="flex" justifyContent="center" alignItems="space-between" {...rest}>{children}</Box>
  )
}

const InputPanel = ({ hideInput, children, ...rest }) => {
  return (
    <Box display="flex" flexRow="column nowrap" pos="relative" borderRadius={hideInput? "8px" : "20px"} zIndex="1" 
     {...rest}>{children}</Box>
  )
}

const Container = ({ hideInput, children, ...rest }) => {
  return (
    <Box borderRadius="16px" boxShadow="#333 inset" {...rest}>{children}</Box>
  )
}*/
const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`
const CurrencySelect = styled.button<{ selected: boolean }>`
  align-items: center;
  height: 34px;
  font-size: 16px;
  font-weight: 500;
  background-color: transparent;
  color: ${({ selected, theme }) => (selected ? theme?.colors?.text : '#FFFFFF')};
  border-radius: 12px;
  outline: none;
  cursor: pointer;
  user-select: none;----
  border: none;
  padding: 0 0.5rem;
  :focus,
  :hover {
    background-color: ${({ theme }) => theme?.colors?.input};
  }
`
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme?.colors?.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => theme?.colors?.textSubtle};
  }
`
const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme?.colors?.background};
  z-index: 1;
`
const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 16px;
  background-color: ${({ theme }) => theme?.colors?.input};
  box-shadow: ${({ theme }) => theme?.shadows?.inset};
`

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
}
export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
}: CurrencyInputPanelProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const { t } = useTranslation("swap")
  
  const translatedLabel = label || t('Input')
  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])
  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              <Text fontSize="14px">{translatedLabel}</Text>
              {account && (
                <Text onClick={onMax} fontSize="14px" style={{ display: 'inline', cursor: 'pointer' }}>
                  {!hideBalance && !!currency && selectedCurrencyBalance
                    ? `Balance: ${selectedCurrencyBalance?.toSignificant(6)}`
                    : ' -'}
                </Text>
              )}
            </RowBetween>
          </LabelRow>
        )}
        <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={disableCurrencySelect}>
          {!hideInput && (
            <>
              <NumericalInput
                className="token-amount-input"
                value={value}
                onUserInput={(val) => {
                  onUserInput(val)
                }}
              />
              {account && currency && showMaxButton && label !== 'To' && (
                <Button onClick={onMax} scale="sm" variant="text">
                  MAX
                </Button>
              )}
            </>
          )}
          <CurrencySelect
            selected={!!currency}
            className="open-currency-select-button"
            onClick={() => {
              if (!disableCurrencySelect) {
                setModalOpen(true)
              }
            }}
          >
            <Aligner>
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
              ) : currency ? (
                <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
              ) : null}
              {pair ? (
                <Text id="pair">
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </Text>
              ) : (
                <Text id="pair">
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                        currency.symbol.length - 5,
                        currency.symbol.length
                      )}`
                    : currency?.symbol) || t('Select a currency')}
                </Text>
              )}
              {!disableCurrencySelect && <ChevronDownIcon />}
            </Aligner>
          </CurrencySelect>
        </InputRow>
      </Container>
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
    </InputPanel>
  )
}
