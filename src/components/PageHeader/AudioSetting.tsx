import React from 'react'
import { Box, Flex, PancakeToggle, useMatchBreakpoints } from '@pancakeswap-libs/uikit'
import { Text } from "@chakra-ui/layout"
import { Button } from '@chakra-ui/button'

import { useAudioModeManager } from 'state/user/hooks'

type AudioSettingModalProps = {
  translateString: (key: string) => string
}

const AudioSetting = ({ translateString }: AudioSettingModalProps) => {
  const { isSm, isXs } = useMatchBreakpoints()
  const [audioPlay, toggleSetAudioMode] = useAudioModeManager()

  return (
    <Box mb="16px">
      <Flex alignItems="center" mb="8px">
        <Text bold>{t('Audio')}</Text>
      </Flex>
      <Box>
        <PancakeToggle scale={isSm || isXs ? 'sm' : 'md'} checked={audioPlay} onChange={toggleSetAudioMode} />
      </Box>
    </Box>
  )
}

export default AudioSetting
