import { Text } from "@chakra-ui/layout";

export default function BaseText({children, ...props}) {
    
    return (
        <Text {...props}>
            {children}
        </Text>
    )
}