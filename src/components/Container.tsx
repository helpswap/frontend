import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box } from '@chakra-ui/layout'
//import styled from 'styled-components'

/*
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  width: 100%;
  padding: 32px 16px;

  background-image: url('/images/group-pancake.svg');
  background-repeat: no-repeat;
  background-position: bottom 24px center;
  background-size: 90%;

  ${({ theme }) => theme?.mediaQueries?.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme?.mediaQueries?.lg} {
    background-image: url('/images/arch-${({ theme }) => (theme.isDark ? 'dark' : 'light')}.svg'),
      url('/images/left-pancake.svg'), url('/images/right-pancake.svg');
    background-repeat: no-repeat;
    background-position: center 420px, 10% 230px, 90% 230px;
    background-size: contain, 266px, 266px;
    min-height: 90vh;
  }
`*/

const Container = ({children, ...props}) => {
  const bgImage = "/images/group-pancake.svg"
  const bgImageLarge = useColorModeValue("/images/arch-light", "/images/arch-dark")
  return (
    <Box w="100%" d="flex" justifyContent="center" alignItems="center" 
    flexDirection="column" flex="1"
    flexWrap="wrap" p="32px 16px" bgImage={{base: `url(${bgImage})`, lg: `url(${bgImageLarge})`}} 
    bgRepeat="no-repeat" bgPos={{base: "bottom 24px center", lg: "center 420px, 10% 230px, 90% 230px"}} 
    bgSize={{base: "auto", lg: "contain, 266px, 266px"}} minH={{lg: "90vh"}} 
    pl={{lg: "240px"}}
    {...props}>{children}</Box>
  )
}

export default Container
