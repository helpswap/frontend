import React from 'react'
import styled from 'styled-components'
import { Spinner } from '../Shared'
import { AutoColumn } from '../Column'
import { Wrapper, Section, ConfirmedIcon, ContentHeader } from './helpers'
import useTranslation from 'next-translate/useTranslation'
import { Text } from '@chakra-ui/layout'
import Loading from "../widgets/Loading"
import { useColorModeValue } from '@chakra-ui/color-mode'
import theme from "../../../theme"

type ConfirmationPendingContentProps = { onDismiss: () => void; pendingText: string }

const CustomLightSpinner = styled(Spinner)<{ size: string }>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`

const ConfirmationPendingContent = ({ onDismiss, pendingText }: ConfirmationPendingContentProps) => {

  const { t } = useTranslation("swap")
  const loaderColor = useColorModeValue(theme?.colors?.colorAccent?.light, theme?.colors?.colorAccent?.dark)

  return (
    <Wrapper>
      <Section>
        <ConfirmedIcon>
          <Loading type={Loading.TYPES.threeDots} width="64px" height="64px" color={loaderColor} />
        </ConfirmedIcon>
        <AutoColumn gap="12px" justify="center">
          <AutoColumn gap="12px" justify="center">
            <Text fontSize="14px">
              <strong>{pendingText}</strong>
            </Text>
          </AutoColumn>
          <Text fontSize="14px">{t("confirm-transaction")}</Text>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export default ConfirmationPendingContent
