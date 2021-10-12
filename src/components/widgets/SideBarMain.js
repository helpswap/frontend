import { HStack, VStack, Box, Text } from "@chakra-ui/react"
import useTranslation from "next-translate/useTranslation"
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaEnvelope, FaGem, FaHeart, FaList, FaRegLaughWink, FaTachometerAlt } from "react-icons/fa"
import Link from "./Link"


const SideBarMain = ({children, collapsed, toggled, onToggle, image, ...props}) => {
    const { t } = useTranslation("home")

    return (
        <HStack justifyContent="flex-start" alignItems="flex-start" w="100%" className="sidebar-main">
            <Box as={ProSidebar} 
            h="100vh" 
            collapsed={collapsed} 
            toggled={toggled}
            onToggle={onToggle}
            image={image} 
            breakPoint="md"
            pos="fixed">
                <SidebarHeader>
                    <Box p="24px" textTransform="uppercase" fontWeight="bold" fontSize="14px" letterSpacing="1px" overflow="hidden" 
                    textOverflow="ellipsis" whiteSpace="nowrap"
                    >
                        <Text>GreenCoindle</Text>
                    </Box>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTachometerAlt />}
                            suffix={<span className="badge red">{"new"}</span>}
                        >
                            Dashboard <Link href="/publish" />
                        </MenuItem>
                        <MenuItem icon={<FaGem />}> {"Components"}</MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            suffix={<span className="badge yellow">3</span>}
                            title={t('withSuffix')}
                            icon={<FaRegLaughWink />}
                        >
                            <MenuItem>{t('submenu')} 1</MenuItem>
                            <MenuItem>{t('submenu')} 2</MenuItem>
                            <MenuItem>{t('submenu')} 3</MenuItem>
                        </SubMenu>
                        <SubMenu
                            prefix={<span className="badge gray">3</span>}
                            title={t('withPrefix')}
                            icon={<FaHeart />}
                        >
                            <MenuItem>{t('submenu')} 1</MenuItem>
                            <MenuItem>{t('submenu')} 2</MenuItem>
                            <MenuItem>{t('submenu')} 3</MenuItem>
                        </SubMenu>
                        <SubMenu title={t('multiLevel')} icon={<FaList />}>
                            <MenuItem>{t('submenu')} 1 </MenuItem>
                            <MenuItem>{t('submenu')} 2 </MenuItem>
                            <SubMenu title={`${t('submenu')} 3`}>
                                <MenuItem>{t('submenu')} 3.1 </MenuItem>
                                <MenuItem>{t('submenu')} 3.2 </MenuItem>
                                <SubMenu title={`${t('submenu')} 3.3`}>
                                    <MenuItem>{t('submenu')} 3.3.1 </MenuItem>
                                    <MenuItem>{t('submenu')} 3.3.2 </MenuItem>
                                    <MenuItem>{t('submenu')} 3.3.3 </MenuItem>
                                </SubMenu>
                            </SubMenu>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                    }}
                    >
                    <a
                        href="mailto:hello@greencoindle.com"
                        className="sidebar-btn"
                        rel="noopener noreferrer"
                    >
                        <FaEnvelope />
                        <span>hello@greencoindle.com</span>
                    </a>
                    </div>
                </SidebarFooter>
            </Box>
            
            <VStack marginInlineStart="0px !important" w="100%" justifyContent="flex-start" alignItems="flex-start" {...props}>
                {children}
            </VStack>
        </HStack>
    )
}

export default SideBarMain