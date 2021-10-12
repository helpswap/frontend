import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Input } from '@pancakeswap-libs/uikit'
import { Text, Flex, Box } from "@chakra-ui/layout"

import { useUserDeadline } from 'state/user/hooks'
import QuestionHelper from '../QuestionHelper'

const Field = styled.div`
  align-items: center;
  display: inline-flex;

  & > ${Input} {
    max-width: 100px;
  }
`

type TransactionDeadlineSettingModalProps = {
  translateString: (key: string) => string
}

const TransactionDeadlineSetting = ({ translateString }: TransactionDeadlineSettingModalProps) => {
  const [deadline, setDeadline] = useUserDeadline()
  const [value, setValue] = useState(deadline / 60) // deadline in minutes
  const [error, setError] = useState<string | null>(null)

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setValue(parseInt(inputValue, 10))
  }

  // Updates local storage if value is valid
  useEffect(() => {
    try {
      const rawValue = value * 60
      if (!Number.isNaN(rawValue) && rawValue > 0) {
        setDeadline(rawValue)
        setError(null)
      } else {
        setError(t('Enter a valid deadline'))
      }
    } catch {
      setError(t('Enter a valid deadline'))
    }
  }, [value, setError, setDeadline, translateString])

  return (
    <Box mb="16px">
      <Flex alignItems="center" mb="8px">
        <Text bold>{t('Transaction deadline')}</Text>
        <QuestionHelper
          text={t('Your transaction will revert if it is pending for more than this long.')}
        />
      </Flex>
      <Field>
        <Input type="number" step="1" min="1" value={value} onChange={handleChange} />
        <Text fontSize="14px" ml="8px">
          Minutes
        </Text>
      </Field>
      {error && (
        <Text mt="8px" color="failure">
          {error}
        </Text>
      )}
    </Box>
  )
}

export default TransactionDeadlineSetting
