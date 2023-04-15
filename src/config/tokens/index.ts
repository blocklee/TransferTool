import bsc from "./bsc.json";
import bsctestnet from "./bsctestnet.json";
import kovan from "./kovan.json";
// import rinkeby from "./rinkeby.json";
import ropsten from "./ropsten.json";
import qitmeertestnet from "./qitmeertestnet.json";
import qitmeer from "./qitmeer.json";

import { Token } from "@/config/constants/types";
import { ChainId } from "../constants/chainId";

type TokenList = { [chainId: number]: Token[] };

const TOKENLIST: TokenList = {
    // [ChainId.RINKEBY]: rinkeby,
    [ChainId.QITMEER]: qitmeer,
    [ChainId.QITMEER_TESTNET]: qitmeertestnet,
    [ChainId.BSC]: bsc,
    [ChainId.BSC_TESTNET]: bsctestnet,
    [ChainId.KOVAN]: kovan,
    [ChainId.ROPSTEN]: ropsten,
};

export default TOKENLIST;
