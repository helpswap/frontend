import React from 'react'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem } from '@pancakeswap-libs/uikit'
import { Box, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'

import Link from '../widgets/Link'
import { FaLightbulb } from 'react-icons/fa'

/*
const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme?.colors?.tertiary};
  padding: 16px;
  ${({ theme }) => theme?.mediaQueries?.lg} {
    padding-left: 240px;
  }
`*/

const Wrapper = ({children, ...props}) => {
  return (
    <Box pos="fixed" bottom="0" left="0" w="100%" d="flex" justifyContent="center" alignItems="center" 
    flexWrap="wrap" p="16px" pl={{lg: "240px"}}
    {...props}>{children}</Box>
  )
}

const VersionBar = () => {
  return (
    <Wrapper>
      <Text bold mr="16px">
        Version:
      </Text>
      <ButtonMenu variant="primary" scale="sm" activeIndex={1}>
        <ButtonMenuItem as="a" href="https://exchange.pancakeswap.finance/">
          V2
        </ButtonMenuItem>
        <ButtonMenuItem as="a" href="https://v1exchange.pancakeswap.finance/#/">
          V1 (old)
        </ButtonMenuItem>
      </ButtonMenu>
      <Button
        variant="subtle"
        as={Link}
        href="https://v1exchange.pancakeswap.finance/#/migrate"
        endIcon={<FaLightbulb color="white" />}
        scale="sm"
        ml="16px"
      >
        Help
      </Button>
    </Wrapper>
  )
}

export default VersionBar
