import { Placement } from '@popperjs/core'
import { transparentize } from 'polished'
import React, { useCallback, useState } from 'react'
import { usePopper } from 'react-popper'
import styled from 'styled-components'
import Portal from '@reach/portal'
import useInterval from '../../hooks/useInterval'

import { Box } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/color-mode'
import theme from "../../../theme";

const PopoverContainer = styled.div<{ show: boolean }>`
  z-index: 9999;

  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: visibility 150ms linear, opacity 150ms linear;

  background: ${({ theme }) => theme?.colors?.invertedContrast};
  border: 1px solid ${({ theme }) => theme?.colors?.tertiary};
  box-shadow: 0 4px 8px 0 ${transparentize(0.9, '#2F80ED')};
  color: ${({ theme }) => theme?.colors?.textSubtle};
  border-radius: 8px;
`

const ReferenceElement = styled.div`
  display: inline-block;
`

const Arrow = styled.div`
  width: 8px;
  height: 8px;
  z-index: 9998;

  ::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: 9998;

    content: '';
    border: 1px solid ${({ theme }) => theme?.colors?.tertiary};
    transform: rotate(45deg);
    background: ${({ theme }) => theme?.colors?.invertedContrast};
  }

  &.arrow-top {
    bottom: -5px;
    ::before {
      border-top: none;
      border-left: none;
    }
  }

  &.arrow-bottom {
    top: -5px;
    ::before {
      border-bottom: none;
      border-right: none;
    }
  }

  &.arrow-left {
    right: -5px;

    ::before {
      border-bottom: none;
      border-left: none;
    }
  }

  &.arrow-right {
    left: -5px;
    ::before {
      border-right: none;
      border-top: none;
    }
  }
`

export interface PopoverProps {
  content: React.ReactNode
  show: boolean
  children: React.ReactNode
  placement?: Placement
}

export default function Popover({ content, show, children, placement = 'auto' }: PopoverProps) {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)
  const { styles, update, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy: 'fixed',
    modifiers: [
      { name: 'offset', options: { offset: [8, 8] } },
      { name: 'arrow', options: { element: arrowElement } },
    ],
  })
  const updateCallback = useCallback(() => {
    if (update) {
      update()
    }
  }, [update])
  useInterval(updateCallback, show ? 100 : null)

  const bg = useColorModeValue("navbarBg.light", "navbarBg.dark")
  const shadow = `0 2px 4px -1px ${useColorModeValue(theme?.colors?.navbarShadow.light, theme?.colors?.navbarShadow.dark)}`

  return (
    <>
      <ReferenceElement ref={setReferenceElement as any}>{children}</ReferenceElement>
      <Portal>
        <Box as={PopoverContainer} show={show} ref={setPopperElement as any} style={styles.popper} bg={bg} boxShadow={shadow} border="none !important" {...attributes.popper}>
          {content}
          <Arrow
            className={`arrow-${attributes.popper?.['data-popper-placement'] ?? ''}`}
            ref={setArrowElement as any}
            style={styles.arrow}
            {...attributes.arrow}
          />
        </Box>
      </Portal>
    </>
  )
}
