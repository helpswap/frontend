import { Box } from "@chakra-ui/layout";
import WalletModal from ".";


export default function WalletWrapper({as, isOpen, onClose, children, onConnected, ref, ...props}) {

    return (
        <Box as={as || "div"} {...props}>
            {children}
            <WalletModal isOpen={isOpen} onClose={onClose} onConnected={ onConnected} ref={ref} />
        </Box>
    )
}