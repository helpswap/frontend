import { ChainId, JSBI, Percent, Token, WETH } from '@/helpswap/sdk'
import { isMainNet } from '../utils/getTokenList'

export const ROUTER = {
  addressMain: '0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F',
  addressTest: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3'
}

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}


export const CAKE = new Token(
   ChainId.MAINNET,
  '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
  18,
  'CAKE',
  'PancakeSwap Token'
)
export const DAI = new Token(ChainId.MAINNET, '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', 18, 'DAI', 'Dai Stablecoin')
export const BUSD = new Token(ChainId.MAINNET, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18, 'BUSD', 'Binance USD')
export const USDT = new Token(ChainId.MAINNET, '0x55d398326f99059fF775485246999027B3197955', 18, 'USDT', 'Tether USD')
export const ETH = new Token(
  ChainId.MAINNET,
  '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  18,
  'ETH',
  'Binance-Peg Ethereum Token'
)
export const BTCB = new Token(ChainId.MAINNET, '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', 18, 'BTCB', 'Binance BTC')
export const UST = new Token(
  ChainId.MAINNET,
  '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
  18,
  'UST',
  'Wrapped UST Token'
)

export const CAKE_T = new Token(
  ChainId.TESTNET,
  '0xF9f93cF501BFaDB6494589Cb4b4C15dE49E85D0e',
  18,
  'CAKE',
  'PancakeSwap Token'
)
export const DAI_T = new Token(ChainId.TESTNET, '0x8a9424745056Eb399FD19a0EC26A14316684e274', 18, 'DAI', 'Dai Stablecoin')
export const BUSD_T = new Token(ChainId.TESTNET, '0x78867bbeef44f2326bf8ddd1941a4439382ef2a7', 18, 'BUSD', 'Binance USD')
export const USDT_T = new Token(ChainId.TESTNET, '0x7ef95a0fee0dd31b22626fa2e10ee6a223f8a684', 18, 'USDT', 'Tether USD')
export const ETH_T = new Token(
  ChainId.TESTNET,
  '0x8babbb98678facc7342735486c851abd7a0d17ca',
  18,
  'ETH',
  'Binance-Peg Ethereum Token'
)

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.TESTNET]: [WETH[ChainId.TESTNET]],
}

//console.log("amounts:R5", WETH, WETH_ONLY)
// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], BUSD, USDT, DAI, UST, ETH, BTCB],
  [ChainId.TESTNET]: [...WETH_ONLY[ChainId.TESTNET], BUSD_T, USDT_T, DAI_T, ETH_T]
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
  [ChainId.TESTNET]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, USDT],
  [ChainId.TESTNET]: [...WETH_ONLY[ChainId.TESTNET], DAI_T, BUSD_T, USDT_T],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, BTCB, USDT],
  [ChainId.TESTNET]: [...WETH_ONLY[ChainId.TESTNET], DAI_T, BUSD_T, USDT_T]
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [CAKE, WETH[ChainId.MAINNET]],
    [BUSD, USDT],
    [DAI, USDT],
  ],
  [ChainId.TESTNET]: [
    [CAKE_T, WETH[ChainId.TESTNET]],
    [BUSD_T, USDT_T],
    [DAI_T, USDT_T],
  ],
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
