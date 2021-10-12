import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, IconButton, useColorMode } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";

const ThemeSwitch = (props) => {
    const { t } = useTranslation("common")
    const { colorMode, toggleColorMode } = useColorMode()
  
    return (
      <Box textAlign='right' {...props}>
        <IconButton
            aria-label={t(colorMode === 'light' ? 'switch-on-night-mode' : 'switch-off-night-mode')}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            colorScheme={colorMode === 'light' ? "" : ""}
            onClick={toggleColorMode}
            variant="outline"
        />
      </Box>
    )
}

export default ThemeSwitch