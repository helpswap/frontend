import { Button, IconButton } from "@chakra-ui/button";


export default function ButtonNoOutline({children, ...props}) {

    return (
        <Button _focus={{outline: "none !important"}} {...props}>{children}</Button>
    )
}

ButtonNoOutline.Icon = ({icon, ...props}) => {

    return (
        <IconButton icon={icon} _focus={{outline: "none !important"}} {...props} />
    )
}