import { ChainId } from '@/helpswap/sdk'
import { ArrowUpCircle } from 'react-feather'
import { AutoColumn } from '../Column'
import { getBscScanLink } from '../../utils'
import { Wrapper, Section, ConfirmedIcon, ContentHeader } from './helpers'
import { Button } from '@chakra-ui/button'
import useTranslation from 'next-translate/useTranslation'
import Link from '../widgets/Link'
import { useColorModeValue } from '@chakra-ui/color-mode'
import theme from "../../../theme"

type TransactionSubmittedContentProps = {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
}

const TransactionSubmittedContent = ({ onDismiss, chainId, hash }: TransactionSubmittedContentProps) => {
  const { t } = useTranslation("swap")
  const loaderColor = useColorModeValue(theme?.colors?.colorAccent?.light, theme?.colors?.colorAccent?.dark)

  return (
    <Wrapper>
      <Section>
        <ConfirmedIcon>
          <ArrowUpCircle strokeWidth={0.5} size={64} color={loaderColor} />
        </ConfirmedIcon>
        <AutoColumn gap="8px" justify="center">
          {chainId && hash && (
            <Link isExternal href={getBscScanLink(chainId, hash, 'transaction')}>{t("view-on-bscan")}</Link>
          )}
          <Button onClick={onDismiss} mt="20px">
            {t("close")}
          </Button>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export default TransactionSubmittedContent
