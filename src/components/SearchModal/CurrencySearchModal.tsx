import { Currency } from '@/helpswap/sdk'
import React, { useCallback, useEffect, useState } from 'react'
import useLast from '../../hooks/useLast'
import { useSelectedListUrl } from '../../state/lists/hooks'
//import Modal from '../Modal'
import { CurrencySearch } from './CurrencySearch'
import { ListSelect } from './ListSelect'
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal"
import { Box } from "@chakra-ui/layout"

interface CurrencySearchModalProps {
  isOpen: boolean
  onDismiss: () => void
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherSelectedCurrency?: Currency | null
  // eslint-disable-next-line react/no-unused-prop-types
  showCommonBases?: boolean
}

export default function CurrencySearchModal({
  isOpen,
  onDismiss,
  onCurrencySelect,
  selectedCurrency,
  otherSelectedCurrency,
}: CurrencySearchModalProps) {
  const [listView, setListView] = useState<boolean>(false)
  const lastOpen = useLast(isOpen)

  useEffect(() => {
    if (isOpen && !lastOpen) {
      setListView(false)
    }
  }, [isOpen, lastOpen])

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onCurrencySelect(currency)
      onDismiss()
    },
    [onDismiss, onCurrencySelect]
  )

  const handleClickChangeList = useCallback(() => {
    setListView(true)
  }, [])
  const handleClickBack = useCallback(() => {
    setListView(false)
  }, [])

  const selectedListUrl = useSelectedListUrl()
  const noListSelected = !selectedListUrl

  return (
    <Modal isOpen={isOpen} onClose={onDismiss}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
        {listView ? (
          <ListSelect onDismiss={onDismiss} onBack={handleClickBack} />
        ) : noListSelected ? (
          <CurrencySearch
            isOpen={isOpen}
            onDismiss={onDismiss}
            onCurrencySelect={handleCurrencySelect}
            onChangeList={handleClickChangeList}
            selectedCurrency={selectedCurrency}
            otherSelectedCurrency={otherSelectedCurrency}
            showCommonBases={false}
          />
        ) : (
          <CurrencySearch
            isOpen={isOpen}
            onDismiss={onDismiss}
            onCurrencySelect={handleCurrencySelect}
            onChangeList={handleClickChangeList}
            selectedCurrency={selectedCurrency}
            otherSelectedCurrency={otherSelectedCurrency}
            showCommonBases={false}
          />
        )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )/*
  return (
    <Modal isOpen={isOpen} onClose={onDismiss}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
        {listView ? (
          <ListSelect onDismiss={onDismiss} onBack={handleClickBack} />
        ) : noListSelected ? (
          <CurrencySearch
            isOpen={isOpen}
            onDismiss={onDismiss}
            onCurrencySelect={handleCurrencySelect}
            onChangeList={handleClickChangeList}
            selectedCurrency={selectedCurrency}
            otherSelectedCurrency={otherSelectedCurrency}
            showCommonBases={false}
          />
        ) : (
          <CurrencySearch
            isOpen={isOpen}
            onDismiss={onDismiss}
            onCurrencySelect={handleCurrencySelect}
            onChangeList={handleClickChangeList}
            selectedCurrency={selectedCurrency}
            otherSelectedCurrency={otherSelectedCurrency}
            showCommonBases={false}
          />
        )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )*/
}
