import { Token } from "@/config/constants/types";
import { useTransfer } from "@/hooks/useContract";
import { accAdd, accGte, accMul, accLt, parseAmount } from "@/utils/format";
import { isEth } from "@/utils/isEth";
import { useEffect, useState } from "react";
import { useActiveWeb3React } from "./useActiveWeb3React";
import { useERC20 } from "./useContract";

// 增加 amount: string，根据 amount 来计算授权额度是否足够
export const useAllowance = (token: Token, account: string, to: string, amount: string) => {
    const { chainId } = useActiveWeb3React();

    const [isApproved, setIsApproved] = useState<boolean>(false);
    const bep20Contract = useERC20(token.address);

    const getAllowance = async () => {
        if (!account) {
            return;
        }
        if (isEth(token, chainId)) {
            setIsApproved(true);
            return;
        }
        const response = await bep20Contract.allowance(account, to);
        // setIsApproved(accGt(response.toString(), "0"));
        const allowance = response.toString();
        setIsApproved(accGte(allowance, amount));
        // if (accLt(allowance, amount)) {
        //     await approveAmount(amount);
        // }
    };
    useEffect(() => {
        getAllowance();
    }, [account]);

    return { isApproved, getAllowance };
};

export const useTransferFee = () => {
    const [fee, setFee] = useState<string>("");
    const TransferInstance = useTransfer();

    const getTransferFee = async () => {
        const response = await TransferInstance.fee();

        setFee(response.toString());
    };

    useEffect(() => {
        getTransferFee();
    }, []);

    return { fee };
};

interface TransferGasFee {
    token: Token;
    isApproved: boolean;
    amountList?: string[];
    toAddressList: string[];
    allAmount: string;
    fee: string;
    tokenAmountList?: string[];
}

export const useTransferGasFee = ({ token, isApproved, amountList, toAddressList, allAmount, fee }: TransferGasFee) => {
    const TransferInstance = useTransfer();

    const { account, chainId, library } = useActiveWeb3React();
    const [allFee, setAllFee] = useState<string>("0");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const getTransferFee = async () => {
        if (!account) {
            return;
        }
        if (!isApproved) {
            return;
        }
        if (fee === "") {
            return;
        }
        try {
            const gasPrice = await library.getGasPrice();
            // 这里应该是将每一个 amount toWei
            const tokenAmountList = amountList.map((a) => parseAmount(a, token.decimals));

            // const allTokenAmount = amountList?.reduce((total, currentValue) => {
            //     return accAdd(total, parseAmount(currentValue, token.decimals));
            // }, "0");

            if (isEth(token, chainId)) {
                console.log(toAddressList);
                console.log("tokenAmountList:")
                console.log(tokenAmountList);

                const estimateGas = await TransferInstance.estimateGas.transferMultiETH(toAddressList, tokenAmountList, {
                    value: accAdd(allAmount, fee),
                });

                const allFee = accAdd(accMul(gasPrice.toString(), estimateGas.toString()), fee);

                setAllFee(allFee);
            } else {
                const gasRes = await TransferInstance.estimateGas.transferMultiToken(
                    token.address,
                    toAddressList,
                    tokenAmountList,
                    {
                        value: fee,
                    },
                );
                const allFee = accAdd(accMul(gasPrice.toString(), gasRes.toString()), fee);
                setAllFee(allFee);
            }
            setErrorMessage("");
        } catch (callError: any) {
            setAllFee(fee);
            setErrorMessage(
                callError.error?.message || callError.reason || callError.data?.message || callError.message,
            );
        }
    };

    useEffect(() => {
        getTransferFee();
    }, [account, isApproved, fee, toAddressList, amountList]);

    return { allFee, errorMessage };
};


export const useBalance = (token: Token, account: string) => {
    const { library, chainId } = useActiveWeb3React();
    const [nativeBalance, setBalance] = useState<string>("0");
    const [tokenBalance, setTokenBalance] = useState<string>("0");
    const ERC20Contract = useERC20(token.address);

    const getBalance = async () => {
        if (!account) {
            return;
        }
        const balance = await library.getBalance(account);
        setBalance(balance.toString());

        if (isEth(token, chainId)) {
            const tokenBalance = balance;
            setTokenBalance(tokenBalance.toString());
        } else {
            const tokenBalance = await ERC20Contract.balanceOf(account);
            setTokenBalance(tokenBalance.toString());
        }
    };
    useEffect(() => {
        getBalance();
    }, [account]);

    return { nativeBalance, tokenBalance, getBalance };
};
