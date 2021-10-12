import { getAddress } from "@ethersproject/address"
import { isAddress } from "./"
import { LOCAL_STORAGE, SITE_DOMAIN_SLASH, SITE_PROTOCOL, REFERRAL_PATH_SLASH } from "./c"

/*const fs = require("fs-extra")

export const saveJSON = (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data, null, "   "))
}*/
export const isClient = () => {
    return typeof window !== 'undefined'
}

const cleanLang = l => {
    return (l.split("-")[0]).toLowerCase()
}

export const getLang = (langKey, fallback) => {
    if(!isClient()) return fallback

    var saved = getFromStorage(langKey)
    if(saved && saved.length > 0) return saved

    var nav = window.navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i,
        language,
        len,
        shortLanguage = null;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
        for (i = 0; i < nav.languages.length; i++) {
            language = nav.languages[i];
            len = language.length;
            if (!shortLanguage && len) {
                shortLanguage = language;
            }
            if (language && len>2) {
                return cleanLang(language);
            }
        }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
        language = nav[browserLanguagePropertyKeys[i]];
        //skip this loop iteration if property is null/undefined.  IE11 fix.
        if (language == null) { continue; } 
        len = language.length;
        if (!shortLanguage && len) {
            shortLanguage = language;
        }
        if (language && len > 2) {
            return cleanLang(language);
        }
    }
    
    return cleanLang(shortLanguage);
}

export const isProduction = () => {
    return true
}
export const isDev = () => {
    if(isClient()) return ! '%NODE_ENV%' || '%NODE_ENV%' === 'development'
    return !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
}

export const replaceNumMillSeparator = (num, separator) => {
    return parseInt(num).toLocaleString("en").replace(/,/g, " ")
}

export const saveRefId = refId => {
    saveToStorage(LOCAL_STORAGE.refId, refId)
}

export const saveRefUserId = userId => {
    saveToStorage(LOCAL_STORAGE.refUserId, userId)
}

export const getRefId = () => {
    return getFromStorage(LOCAL_STORAGE.refId)
}

export const getRefUserId = () => {
    return getFromStorage(LOCAL_STORAGE.refUserId)
}
const USER_ID_BALANCER = 10000000//10 million
//this method use used for creating referral link
//unique id by converting the position of the user
//in the array of users sorted in ascending order(first user = 0) 
//in order to make the unique id have the same length, a constant 
//value is added to each position before creating the unique id by base 10 to 36 convertion
export const userIdToRefId = userId => {
    try {
        return (parseInt(userId) + USER_ID_BALANCER).toString(36)

    } catch(e) {
        return null
    }
}
//converts base refferal link's unique id to registration position of the user
export const refIdToUserId = refId => {
    try {
        return parseInt(refId, 36) - USER_ID_BALANCER

    } catch(e) {
        return null
    }
}

export const refLinkFromRefId = refId => {
    return `${ SITE_PROTOCOL }${ SITE_DOMAIN_SLASH }${ REFERRAL_PATH_SLASH }${ refId.toLowerCase() }`
}
export const refLinkFromUserId = userId => {
    const refId = userIdToRefId(userId)
    if(refId) return refLinkFromRefId(refId)
    return null
}

export const saveToStorage = (key, value, session) => {
    if(!isClient()) return
    if(!session) {
        window.localStorage.setItem(key, value)

    } else {
        var expiry = ( (new Date()).getTime() / 1000 ) + session
        window.localStorage.setItem(key, JSON.stringify({data: value, expiry: expiry}))
    }
}

export const emptyToNull = value => {
    if(value == "") return null
    return value
}

export const orPair = (a, b) => {
    return a || b
}

export const andPair = (a, b) => {
    return a && b
}
export const nullOrEmptyOrList = (values) => {

    for(var i = 0; i < values.length; i++) {
        if(!values[i] || values[i].length == 0) {
            return true
        }
    }
    return false
}
export const nullOrEmptyAndList = (values) => {

    for(var i = 0; i < values.length; i++) {
        if(values[i] && values[i].length > 0) {
            return false
        }
    }

    return true
}

export const getFromStorage = (key, isSession) => {
    if(!isClient()) return null
    if(!isSession) {
        return window.localStorage.getItem(key)

    } else {
        var item = window.localStorage.getItem(key)
        if(!item || item.length == 0) {
            return null

        } else {
            item = JSON.parse(item)
            var expiry = parseInt(item.expiry)
            var now = (new Date()).getTime() / 1000
            if(!item.data) {
                return null

            } else if(expiry <= now) {
                window.localStorage.setItem(key, JSON.stringify({data: "", expiry: 0}))
                return null

            } else {
                return item.data
            }
        }
    }
}

export const textIsNumber = (text, excludedNumbers) => {
    text = String(text)
    try {
        var num = parseInt(text)
        //console.log("QUERY_:", text, num)

        return !isNaN(num) && (!excludedNumbers || !excludedNumbers.includes(num))
    } catch (error) {
        return false
    }
}

export const handleNetError = (e, onMessage, onRequestSpecific) => {
    
}

export const logIn = (router, address) => {
    if(address && address.length > 0) {
        saveToStorage(LOCAL_STORAGE.loginAddress, address.trim())
        if(router) router.push("/dashboard")

    } else {
        var userAddress = getFromStorage(LOCAL_STORAGE.loginAddress)
        console.log("UserAddr:", userAddress)
        if(userAddress && userAddress.length > 0) {
            if(router) router.push("/dashboard")
        }
    }
}
export const logOut = router => {
    saveToStorage(LOCAL_STORAGE.loginAddress, "")
    if(router) router.push("/login")
}

export const toLocaleString = (number, locale, decimals) => {
    if(isNaN(number)) number = 0;
    return number.toLocaleString(locale, {
        minimumFractionDigits: decimals || 0, 
        maximumFractionDigits: decimals || 0
    })
}

export const copyText = e => {
    if(e) {
        var target = e.target
        var text = target.getAttribute("data-copy")
        copyFromText(text, () => {
            target.setAttribute("data-copy-msg", target.getAttribute("data-copy-ok") || "Text Copied.")
        }, 
        err => {
            target.setAttribute("data-copy-msg", target.getAttribute("data-copy-failed") || "Text Copy failed.")
        })
    }
}

export const copyFromTextFallBack = (text, onCopy, onError) => {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
        if(onCopy) onCopy()
    } catch (e) {
        console.error('Fallback: Oops, unable to copy', e);
        if(onError) onError(e)
    }
    
    document.body.removeChild(textArea);
}

export const copyFromText = (text, onCopy, onError) => {
    if (!navigator.clipboard) {
        copyFromTextFallBack(text, onCopy, onError);
        return;
    }
    navigator.clipboard.writeText(text)
    .then( () => {
        console.log('Async: Copying to clipboard was successful!')
        if(onCopy) onCopy()
    })
    .catch(e => {
        console.error('Async: Could not copy text: ', e)
        if(onError) onError(e)
    })
}

export function shortenAddress(address, chars = 4) {
    const parsed = isAddress(address)
    if (!parsed) {
      throw Error(`Invalid 'address' parameter '${address}'.`)
    }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export const cakeSwap = addr => {
    return `https://pancakeswap.info/token/${addr}`
}