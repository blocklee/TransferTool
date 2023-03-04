import { Erc20 } from "@/config/abi/types";
import { NATIVE } from "@/config/constants/native";
import { Token } from "@/config/constants/types";
import defaultTokenList from "@/config/tokens/index";
import { useActiveWeb3React } from "@/hooks/useActiveWeb3React";
import { useERC20 } from "@/hooks/useContract";
import { isAddress } from "@/utils/isAddress";
import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import { createContext, useEffect, useMemo, useState } from "react";
import SelectToken from "./SelectToken";
import AddressList from "./AddressAmountList";
import ConfirmPage from "./Confirm";

export const Context = createContext<any>({ confirm, setConfirm: () => {} });

export default function Home() {
    const { account, chainId, error, activate } = useActiveWeb3React();

    const [open, setOpen] = useState(false);
    const [tokenList, setTokenList] = useState<Token[]>([]);
    const [token, setToken] = useState<Token>({ address: "", name: "", symbol: "", decimals: 18, chainId });

    const [searchValue, setSearchValue] = useState("");
    const address = useMemo(() => {
        return isAddress(searchValue) ? searchValue : "";
    }, [searchValue]);

    const ERC20Instarnce = useERC20(address);
    const [addressAmountValue, setAddressAmountValue] = useState("");

    const [addressAmountList, setAddressAmountList] = useState([]);
    const [addressList, setAddressList] = useState<string[]>([]);

    const [amountList, setAmountList] = useState<string[]>([]);
    // const [sendValue, setSendValue] = useState("1");
    const [confirm, setConfirm] = useState(false);
    const [tableData, setTableData] = useState<
        {
            address: string;
            amount: number;
            id: number;
        }[]
        >([]);

    useEffect(() => {
        const getErc20Info = async () => {
            if (ERC20Instarnce as Erc20) {
                try {
                    const index = tokenList.findIndex((item) => item.address === isAddress(searchValue));
                    if (index !== -1) {
                        return;
                    }
                    setOpen(true);
                    const symbol = await ERC20Instarnce?.symbol();
                    const name = await ERC20Instarnce?.name();
                    const decimals = await ERC20Instarnce?.decimals();
                    const token = { symbol, name, decimals: decimals.toString(), address, chainId };
                    setTokenList([...tokenList, token]);
                } catch (e) {
                    //
                }
                setOpen(false);
            }
        };
        getErc20Info();
    }, [ERC20Instarnce]);
    useEffect(() => {
        if (chainId && defaultTokenList[chainId]) {
            let _tokenList = [...defaultTokenList[chainId]];
            _tokenList.sort((t1, t2) => {
                return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
            });
            _tokenList = [NATIVE[chainId], ..._tokenList];
            setTokenList(_tokenList);
            setToken(NATIVE[chainId]);
        } else {
            setTokenList([]);
            setToken({ address: "", name: "", symbol: "", decimals: 18, chainId: chainId });
        }
        setConfirm(false);
    }, [chainId]);
    const onInChange = (value: any) => {
        setSearchValue(value);
    };
    const onEventChange = (value: any) => {
        setToken(value);
    };
    const onSetAddressAmountChange = (value: any) => {
        setAddressAmountValue(value);
    };
    const onSetAddressAmountListChange = (value: any) => {
        setAddressAmountList(value);
    };
    const onSetAddressListChange = (value: any) => {
        setAddressList(value);
    };

    //
    const onSetAmountListChange = (value: any) => {
        setAmountList(value);
    };

    const delAddressAmountList = (index: number) => {
        let newArr1 = [...addressList];
        let newArr2 = [...amountList];
        newArr1.splice(index, 1);
        newArr2.splice(index, 1);
        const combinedArray = newArr1.map((value, index) => {
            return `${value},${newArr2[index]}`;
        });

        setAddressList(newArr1)
        setAmountList(newArr2)
        setAddressAmountValue(combinedArray.join("\n"));
    };


    const errAddressList = useMemo(() => {
        const err: { address: string; index: number }[] = [];
        addressList.forEach((item, index) => {
            // isAddress(item) !== item 如果输入的不是一个正确格式的以太坊地址，该句会报错，
            // 例如输入了一个全是小写的地址 因为该 isAddress 方法判断地址如果是以太坊地址，会返回一个以太坊标准的地址
            // 输入若为非标准格式，isAddress(item) !== item 判断结果会是false，因此该处直接改成 !isAddress(item)，意思是结果是 !false
            if (!isAddress(item) && item !== "") {
                err.push({ address: item, index });
            }
        });
        return err.length ? (
            <div className="border rounded-md border-red-500 text-red-500 mt-4 border-1 border-solid px-5 py-5 leading-7">
                {err.map((item) => {
                    return (
                        <div key={item.index} className="">
                            <div>
                                第{item.index + 1}行 {item.address} 不是一个有效的钱包地址
                            </div>
                        </div>
                    );
                })}
            </div>
        ) : null;
    }, [addressList]);

    return (
        <div className="w-11/12 pb-5 min-h-[500px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] m-auto mt-20 rounded-2xl mb-20 lg:w-7/12">
            {!confirm ? (
                <div>
                    <div className="text-[#031a6e] text-[18px] font-bold text-center pt-5">批量发送代币(数量不同)</div>

                    <div className="mt-10 pl-10 pr-10">
                        <SelectToken
                            tokenList={tokenList}
                            onInChange={onInChange}
                            onEventChange={onEventChange}
                            open={open}
                            token={token}
                        ></SelectToken>
                    </div>
                    <div className="mt-10 pl-10 pr-10 pb-5">
                        <AddressList
                            onSetAddressAmountChange={onSetAddressAmountChange}
                            addressAmountValue={addressAmountValue}
                            onSetAddressAmountListChange={onSetAddressAmountListChange}
                            addressAmountList={addressAmountList}
                            onSetAddressListChange={onSetAddressListChange}
                            addressList={addressList}
                            onSetAmountListChange={onSetAmountListChange}
                            amountList={amountList}
                        ></AddressList>
                    </div>
                    <div className="pl-10 pr-10 my-5">{errAddressList}</div>

                    <div className="pl-10 pr-10 text-right flex items-center">
                        <div className="w-4/5  flex items-center">
                            <div className="text-[14px]">请按照【地址,数量】的格式输入，可以直接从csv复制</div>
                            {/*<div className="ml-2">*/}
                            {/*    <TextField*/}
                            {/*        id="outlined-basic"*/}
                            {/*        variant="outlined"*/}
                            {/*        className="w-24"*/}
                            {/*        size="small"*/}
                            {/*        value={sendValue}*/}
                            {/*        onChange={(e) => {*/}
                            {/*            console.log(e.target.value);*/}

                            {/*            setSendValue(e.target.value);*/}
                            {/*        }}*/}
                            {/*    />*/}
                            {/*</div>*/}
                        </div>
                        <div
                            className="w-1/5 text-gray-500 text-[14px]  hover:cursor-pointer"
                            onClick={() => {
                                onSetAddressAmountChange(
                                    "0xAd9913194870d96905781C610c94b87d95594027,0.02\n0x4A28ACe75B3c759c160Aa521b7D5924ed499c933,0.03\n",
                                );
                                onSetAddressListChange([
                                    "0xAd9913194870d96905781C610c94b87d95594027",
                                    "0x4A28ACe75B3c759c160Aa521b7D5924ed499c933",
                                ]);
                                onSetAmountListChange(["0.02","0.03",])
                            }}
                        >
                            查看例子
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <Context.Provider value={{ confirm, setConfirm }}>
                        <ConfirmPage
                            addressList={addressList}
                            amountList={amountList}
                            tableData={tableData}
                            // sendValue={sendValue}
                            tokenList={tokenList}
                            delAddressAmountList={delAddressAmountList}
                            token={token}
                        ></ConfirmPage>
                    </Context.Provider>
                </div>
            )}

            <div className="px-10 py-10 ">
                {/*{confirm && (*/}
                {/*    <Button*/}
                {/*        className="w-32 h-12"*/}
                {/*        onClick={() => {*/}
                {/*            setConfirm(false);*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        返回*/}
                {/*    </Button>*/}
                {/*)} */}
                {!confirm && (
                    <Button
                        variant="contained"
                        className="w-32 h-12"
                        onClick={() => {
                            setConfirm(true);
                        }}
                    >
                        下一步
                    </Button>
                )}
            </div>
        </div>
    );
}
