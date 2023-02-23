import { ChainId } from "./chainId";

const RPC = {
    [ChainId.QITMEER_TESTNET]: "https://meer.testnet.meerfans.club/",
    [ChainId.QITMEER]: "https://evm-dataseed.meerscan.com",
    // [ChainId.QITMEER]: "https://rpc.evm.meerscan.io",
    // [ChainId.ETHEREUM]: "https://eth-mainnet.g.alchemy.com/v2/VeGNNvyUMm_WjwEF8UZi8LTsNLTp_i5L",
    // [ChainId.ETHEREUM]: 'https://eth-mainnet.alchemyapi.io/v2/HNQXSfiUcPjfpDBQaWYXjqlhTr1cEY9c',
    // [ChainId.MAINNET]: 'https://eth-mainnet.alchemyapi.io/v2/q1gSNoSMEzJms47Qn93f9-9Xg5clkmEC',
    [ChainId.ROPSTEN]: "https://ropsten.infura.io/v3/c7bae63096c74b3dad54ad7ae275df0c",
    [ChainId.RINKEBY]: "https://eth-rinkeby.alchemyapi.io/v2/TWCO2XsIVDteeZA6WcmHPWmMowK6SDTD",
    [ChainId.GOERLI]: "https://eth-goerli.g.alchemy.com/v2/cihv7vmXh20-FLOy9gUP69NpU_p9jpRh",
    [ChainId.KOVAN]: "https://kovan.infura.io/v3/c7bae63096c74b3dad54ad7ae275df0c",
    //   [ChainId.FANTOM]: "https://rpcapi.fantom.network",
    //   [ChainId.FANTOM_TESTNET]: "https://rpc.testnet.fantom.network",
    //   [ChainId.MATIC]: "https://polygon-rpc.com/",
    //   [ChainId.MATIC_TESTNET]: "https://rpc-mumbai.matic.today",
    //   [ChainId.XDAI]: "https://rpc.xdaichain.com",
    [ChainId.BSC]: "https://bsc-dataseed.binance.org/",
    [ChainId.BSC_TESTNET]: "https://data-seed-prebsc-2-s3.binance.org:8545",
    //   [ChainId.MOONBEAM_TESTNET]: "https://rpc.testnet.moonbeam.network",
    //   [ChainId.AVALANCHE]: "https://api.avax.network/ext/bc/C/rpc",
    //   [ChainId.AVALANCHE_TESTNET]: "https://api.avax-test.network/ext/bc/C/rpc",
    //   [ChainId.HECO]: "https://http-mainnet.hecochain.com",
    //   [ChainId.HECO_TESTNET]: "https://http-testnet.hecochain.com",
    //   [ChainId.HARMONY]: "https://api.harmony.one",
    //   [ChainId.HARMONY_TESTNET]: "https://api.s0.b.hmny.io",
    //   [ChainId.OKEX]: "https://exchainrpc.okex.org",
    //   [ChainId.OKEX_TESTNET]: "https://exchaintestrpc.okex.org",
    //   [ChainId.ARBITRUM]: "https://arb1.arbitrum.io/rpc",
    //   [ChainId.PALM]: "https://palm-mainnet.infura.io/v3/da5fbfafcca14b109e2665290681e267",
    //   [ChainId.FUSE]: "https://rpc.fuse.io",
    //   [ChainId.CELO]: "https://forno.celo.org",
    //   [ChainId.MOONRIVER]: "https://rpc.moonriver.moonbeam.network",
    //   [ChainId.TELOS]: "https://mainnet.telos.net/evm",
    //   [ChainId.MOONBEAM]: "https://rpc.api.moonbeam.network",
};

export default RPC;
