import { Box } from "@chakra-ui/react"


const Style = () => {

    return (
        <style jsx global>{`
        .floating-large-screen {
            animation-name: floating;
            animation-duration: 3s;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
            animation-play-state: running;
        }
        @media (max-width: 992px){
            .floating-large-screen.mobile-pause {animation-play-state:paused}
        }
        @keyframes floating {
            from{transform:translate(0, 0px)}
            65%{transform:translate(0, 20px)}
            to{transform:translate(0, 0px)}
        }
        `}
        </style>
    )
}
export default function Float({as, children, mobilePause, className, ...props}) {

    return (
        <>
            <Box as={as || "div"} {...props} className={`floating-large-screen ${mobilePause? "mobile-pause" : ""} ${className}`}>
                {children}
            </Box>
            <Style />
        </>
    )
}