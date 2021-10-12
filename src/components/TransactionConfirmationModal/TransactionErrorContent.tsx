import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { AlertTriangle } from 'react-feather'
import { AutoColumn } from '../Column'
import { Wrapper, Section, BottomSection, ContentHeader } from './helpers'
import { Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import useTranslation from 'next-translate/useTranslation'
import { useColorModeValue } from '@chakra-ui/color-mode'
import theme from "../../../theme"

type TransactionErrorContentProps = { message: string; onDismiss: () => void }

const TransactionErrorContent = ({ message, onDismiss }: TransactionErrorContentProps) => {
  const { t } = useTranslation("swap")
  const loaderColor = useColorModeValue(theme?.colors?.colorAccent?.light, theme?.colors?.colorAccent?.dark)

  return (
    <Wrapper>
      <Section>
        <AutoColumn style={{ marginTop: 20, padding: '2rem 0' }} gap="24px" justify="center">
          <AlertTriangle style={{ strokeWidth: 1.5 }} size={64} color={loaderColor} />
          <Text fontSize="16px" color="failure" style={{ textAlign: 'center', width: '85%' }}>
            {message}
          </Text>
        </AutoColumn>
      </Section>
      <BottomSection gap="12px">
        <Button onClick={onDismiss}>{t("dismiss")}</Button>
      </BottomSection>
    </Wrapper>
  )
}

export default TransactionErrorContent
