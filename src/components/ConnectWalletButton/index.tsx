import React from 'react'
import { ButtonProps, useWalletModal} from '@pancakeswap-libs/uikit'
import { Button } from '@chakra-ui/button'

import useTranslation from "next-translate/useTranslation"
import useAuth from 'hooks/useAuth'

const UnlockButton: React.FC<ButtonProps> = (props) => {
  const { t } = useTranslation("swap")
  
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button onClick={onPresentConnectModal} {...props}>
      {t('Unlock Wallet')}
    </Button>
  )
}

export default UnlockButton
