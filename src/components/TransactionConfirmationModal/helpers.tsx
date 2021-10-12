import React, { ReactNode } from 'react'
import styled from 'styled-components'
//import { Heading } from '@pancakeswap-libs/uikit'
import { AutoColumn, ColumnCenter } from '../Column'
import { IconButton } from '@chakra-ui/button'
import { FaTimes } from 'react-icons/fa'
import { Heading } from '@chakra-ui/layout'


export const Wrapper = styled.div`
  width: 100%;
  overflow-y: auto;
`
export const Section = styled(AutoColumn)`
  padding: 24px;
`

export const ConfirmedIcon = styled(ColumnCenter)`
  padding: 40px 0;
`

export const BottomSection = styled(Section)`
  background-color: ${({ theme }) => theme?.colors?.invertedContrast};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`

/**
 * TODO: Remove this when modal system from the UI Kit is implemented
 */
const StyledContentHeader = styled.div`
  align-items: center;
  display: flex;

  & > ${Heading} {
    flex: 1;
  }
`

type ContentHeaderProps = {
  children: ReactNode
  onDismiss: () => void
}

export const ContentHeader = ({ children, onDismiss }: ContentHeaderProps) => (
  <StyledContentHeader>
    <Heading>{children}</Heading>
    <IconButton onClick={onDismiss} variant="text">
      <FaTimes color="primary" />
    </IconButton>
  </StyledContentHeader>
)
