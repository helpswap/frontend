import { Box } from "@chakra-ui/react"


export default function ViewAs({as, children, ...props}) {

    var Final

    if(!as) {
        Final = <Box {...props}>{children}</Box>

    } else if(!Array.isArray(as) || as.length == 0) {
        Final = <Box as={as} {...props}>{children}</Box>

    } else {
        Final = (propz) => {
            return <Box as={as[0]} {...propz}>{children}</Box>
        }

        for (let index = 1; index < as.length - 1; index++) {
            Final = (propz) => {
                return <Final as={as[index]} {...propz}>{children}</Final>
            }
            
        }

        Final = <Final as={as[as.length - 2]} {...props}>{children}</Final>

    }
    

    return Final
}