import { 
    useColorModeValue, VStack, Flex, Text, FormControl, HStack, 
    FormLabel, Checkbox, Input, Textarea, Button, FormErrorMessage
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPaperclip } from "react-icons/fa";
import Swal from "sweetalert2";
import { BTN_BG, BTN_COLOR, URL_BASE, CONTACT_FORM_ID, G_RECAPTCHA_KEY, CONTACT } from "../../utils/c";
import TextView from "./TextView";
//import ReCAPTCHA from "react-google-recaptcha"

const queryString = require("query-string")


const H2 = ({children, ...props}) => {

    return <Text as="span" fontSize="35px" fontWeight="700" lineHeight="1.22" mb="8px" textAlign="center" 
    textTransform="none" {...props}>{children}</Text>
}


const H3 = ({children, ...props}) => {

    return <Text as="span" fontSize="16px" fontWeight="400" lineHeight="24px" mb="32px" textAlign="center" 
    textTransform="none" {...props}>{children}</Text>
}

export const BTN = ({children, bg, color, ...props}) => {
    return (
      <Button bg={bg} color={color}
      _hover={{
          bg: bg,
          color: "#fff !important",
          textDecoration: "none  !important",
          opacity: "0.7"
      }} 
      marginStart="0px !important" marginInlineStart="0px !important"
      mr={{base: "0px", md: "15px"}}
      mb={{base: "5px", md: "0px"}}
      {...props}>
        {children}
      </Button>
    )
}

export default function ContactForm({title, desc, services, noBg, ...props}) {
    const {t} = useTranslation("contact-form")
    const bg = useColorModeValue("#fff", "#000")
    const color = useColorModeValue("#333", "#f4f4f4")
    const shadow = "0 0 4px rgb(29 37 45 / 5%), 0 8px 32px rgb(29 37 45 / 10%)"
    const colorAccent = useColorModeValue("colorAccent.light", "colorAccent.dark")
    const colorAccentInverse = useColorModeValue("colorAccentInverse.light", "colorAccentInverse.dark")

    const router = useRouter()

    const { msg } = router.query

    useEffect(() => {
        if(msg && msg == "ok") {
            Swal.fire({
                text: t("submit-msg"),
                icon: "success",
                confirmButtonText: t("common:ok")
            })

        } else if(msg && msg == "error") {
            Swal.fire({
                text: t("submit-msg-error"),
                icon: "error",
                confirmButtonText: t("common:ok")
            })
        }
    }, [msg])

    // const [recaptchaResponse, setRecaptchaResponse] = useState("")

    // const onCaptchaChange = value => {
    //     setRecaptchaResponse(value)
    //     console.log("RecaptchaValue:", value)
    // }

    const parsedUrl = queryString.parseUrl(router.asPath)
    var url = parsedUrl.url
    
    const formRedirectUrl = queryString.stringifyUrl({url: url, query: {
        ...parsedUrl.query,
        msg: "ok"
    }})
    const formRedirectUrlError = queryString.stringifyUrl({url: url, query: {
        ...parsedUrl.query,
        msg: "error"
    }})

    console.log("FORM_ID", process.env.NEXT_PUBLIC_CONTACT_FORM_ID)


    return (
        <VStack w="100%" minW={{base: "100%", md: "560px"}} maxWidth={{base: "100%", md: "560px"}} minH={{base: "400px", md: "608px"}} boxShadow={!noBg? shadow : "none"} bg={!noBg? bg : "transparent"} color={!noBg? color : "initial"} 
        p="48px 24px" borderRadius="8px"
        {...props}>
            <H2 as={TextView}>{title || t("title")}</H2>
            <H3 as={TextView}>{desc || t("desc")}</H3>
            {/* https://submit-form.com/your-form-id https://submit-form.com/${CONTACT_FORM_ID}*/}
            <form encType="multipart/form-data" action={`https://formsubmit.co/${process.env.NEXT_PUBLIC_CONTACT_FORM_ID}`} method="POST">
                <FormControl id="likes" isRequired 
                    mb="15px !important">
                    <FormLabel>{t("interest-label")}</FormLabel>
                    <HStack flexWrap="wrap" justifyContent="space-between" alignItems="center">
                        {
                            (services || []).map((v, index) => {
                                return (
                                    <Checkbox name={`Requested ${v.title}`} display="block" key={`contact-form-service-${index}`} w={{base: "100%", md: "50%"}} 
                                    m={{base: "5px 0px !important", md: "0px !important"}} p={{base: "0px !important", md: "4px !important"}}>
                                        {v.title}
                                    </Checkbox>
                                )
                            })
                        }
                    </HStack>
                </FormControl>
                
                <Flex flexDirection={{base: "column", md: "row"}} 
                justifyContent={{base: "flex-start", md: "space-between"}} alignItems="flex-start">
                    <FormControl id="name" isRequired 
                    mr={{base: "0px", md: "15px !important"}} mb={{base: "15px !important", md: "0px"}}>
                        <Input name="name" placeholder={t("name-title")} />
                    </FormControl>
                    <FormControl id="email" isRequired >
                        <Input name="email" placeholder={t("email-title")} />
                    </FormControl>
                </Flex>
                <FormControl id="desc" isRequired 
                mt="15px !important">
                    <Textarea name="desc" placeholder={t("message-title")} isRequired />
                </FormControl>

                
                <Input type="hidden" name="_next" value={`${URL_BASE}${formRedirectUrl}`} />
                <input type="hidden" name="_subject" value={`${t("common:sitename")} Contact Form Submitted`} />
                <input type="hidden" name="_template" value="box" />
                <input type="hidden" name="_autoresponse" value={t("submit-msg-autoresponse")} />
                <Input type="hiddenx" d="none" name="_horneypot" />
                <input type="hidden" name="_replyto" />

                {/* <ReCAPTCHA
                    sitekey={G_RECAPTCHA_KEY}
                    onChange={onCaptchaChange}
                /> */}

                <Flex mt="15px !important" flexDirection={{base: "column", md: "row"}} 
                justifyContent={{base: "flex-start", md: "space-between"}} alignItems="flex-start">
                    <VStack justifyContent="flex-start" alignItems="flex-start">
                        <Text as="label" for="upload" display="flex" justifyContent="left" alignItems="center" color={colorAccent} textTransform="uppercase" 
                        whiteSpace="nowarap" overflow="hidden" textOverflow="ellipsis"
                        borderRadius="4px" fontWeight="600" lineHeight="1.5" pos="relative"
                        cursor="pointer" _hover={{
                            color: colorAccentInverse,
                            textDecoration: "none  !important"
                        }}>
                            <Text as="span" mr="4px">{t("attach-file")}</Text> <FaPaperclip />
                            <Input d="none" type="file" name="upload" id="upload" multiple accept=".doc,.docx,.odt,.pdf,.txt,.rtf,.jpg,.jpeg,.png" />
                        </Text>
                        <TextView fontSize="12px" color="#7d8995">{t("file-rules")}</TextView>
                    </VStack>
                    

                    <BTN
                    bg={colorAccent} color={"#fff"}
                    textTransform="uppercase"
                    isLoading={false}
                    type="submit" _hover={{
                        bg: colorAccentInverse,
                        color: "#fff !important",
                        textDecoration: "none  !important"
                    }}>
                        {t("submit-text")}
                    </BTN>
                </Flex>
            </form>
        </VStack>
    )
}
/**
 * https://formik.org/docs/overview
 * https://chakra-ui.com/docs/form/form-control
 * https://www.youtube.com/watch?v=oiNtnehlaTo
 */