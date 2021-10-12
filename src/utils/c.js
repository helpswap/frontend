import { isProduction } from "./f";

// import tokenAbi from '../web3/abis/Token.json'
// import tokenBNBAbi from '../web3/abis/TokenBNB.json'
// import presellerAbi from '../web3/abis/Preseller.json'
// import auctionGameAbi from '../web3/abis/games/MotherDogeArtefact.json'

import { utils } from "ethers";
import { FaBehance, FaFacebook, FaGithub, FaMedium, FaReddit, FaTelegram, FaTwitter } from "react-icons/fa";

const fbIcon = "/images/fbicon.png"
const twIcon = "/images/twitter.svg"
const tgIcon = "/images/tg.svg"
const rIcon = "/images/reddit.png"
const mIcon = "/images/medium.png"
const instaIcon = "/images/insta.png"

export const PRIMARY_COLOR = "#429bb8"
export const SEC_COLOR = "#f06500"
export const URL_BASE = "https://helpswap.finance"
export const CONTACT_EMAIL = "hello@helpswap.finance"

export const APP_NAME = "EarnChain"
export const AIR_DROP_ACTIVE = false;
export const PRESALE_ACTIVE = true;
export const FUNDING_ACTIVE = false;
export const PROJECTS_ACTIVE = false;
export const TEAM_ACTIVE = false;
export const TITLE_SEPARATOR = " - "

export const CONTACT = {
    email: "hello@helpswap.finance",
    mobile: "+39 323 826 7650",
    address: "Via Nazionale 46, Staben(BZO) \nItaly"
}
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"

export const ECT_DECIMAL_ZEROS = "000000000"
export const CURRENCY_DECIMAL_ZEROS = "000000000000000000"
export const REG_COST_STRING = "10" + CURRENCY_DECIMAL_ZEROS
export const SITE_PROTOCOL = "https://"
export const SITE_DOMAIN_SLASH = "tronpipe.io/"
export const REFERRAL_PATH_SLASH = "n/"


export const BLOCK_CHAIN_ADDRESS_SCAN_PREFIX = {
    main: "https://bscscan.com/address/",
    test: "https://testnet.bscscan.com/address/"
}
export const CONTRACT_ADDRESSES = {
    //router address of helpswapcontract 
    //this contract extends the pancakeswap router and includes new functions for swapping swap helper tokens
    routerAddress: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
    token: "",//tokenAbi.address,
    tokenBNB: "",//tokenBNBAbi.address,
    preseller: "",//presellerAbi.address,
    games: {
        auction: ""//auctionGameAbi.address 
    } 
}

export const PRESALE = {
    // tokenPerBNB: presellerAbi.tokenPerBNB,
    // minBNB: presellerAbi.minBNB,
    // maxBNB: presellerAbi.maxBNB
}

export const READ_ONLY_WALLET = {
    key: "READ_ONLY",
    privateKey: "",
    address: ""
}

export const LOCAL_STORAGE = {
    web3ConnectorKey: "web3ConnectorKey",
    refId: "refId",
    refUserId: "refUserId",
    loginAddress: "loginAddress",
    locale: "locale"
}

export const SOCIAL_LINKS = {
    twitter: {
        link: `https://www.twitter.com/helpswapfinance`,
        icon: twIcon,
        settings: {
            disabled: false
        },
        getButton: size => {
            return <FaTwitter size={size} h={size} />
        }
    },
    telegram: {
        link: `https://t.me/helpswap`,
        icon: tgIcon,
        settings: {
            disabled: false
        },
        getButton: size => {
            return <FaTelegram size={size} h={size} />
        }
    },
    reddit: {
        link: `https://reddit.com/r/helpswap`,
        icon: rIcon,
        settings: {
            disabled: false
        },
        getButton: size => {
            return <FaReddit size={size} h={size} />
        }
    },
    facebook: {
        link: `https://facebook.com/helpswap`,
        icon: fbIcon,
        settings: {
            disabled: false
        },
        getButton: size => {
            return <FaFacebook size={size} h={size} />
        }
    },
    medium: {
        link: `https://medium.com/@helpswap`,
        icon: mIcon,
        settings: {
            disabled: false
        },
        getButton: size => {
            return <FaMedium size={size} h={size} />
        }
    },
    github: {
        link: `https://github.com/helpswap`,
        icon: mIcon,
        settings: {
            disabled: false
        },
        getButton: size => {
            return <FaGithub size={size} h={size} />
        }
    }
}