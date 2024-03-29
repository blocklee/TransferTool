import backIcon from "@/assets/back.svg";
import nodataIcon from "@/assets/nodata.svg";
import { NATIVE } from "@/config/constants/native";
import { Token } from "@/config/constants/types";
import { useActiveWeb3React } from "@/hooks/useActiveWeb3React";
import { useERC20, useTransfer } from "@/hooks/useContract";
import { useAllowance, useBalance, useTransferFee, useTransferGasFee } from "@/hooks/useMulTransfer";
import { getMultiTransferAddress } from "@/utils/contractAddressHelper";
import { accAdd, accMul, formatAmount, formatBalance, parseAmount } from "@/utils/format";
import { isEth } from "@/utils/isEth";
import { MaxUint256 } from "@ethersproject/constants";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Context } from "./index";

import { useTranslation } from "react-i18next";
import CircularProgress from '@material-ui/core/CircularProgress';

interface ConfirmProps {
    addressList: Array<string>;
    amountList: Array<string>;
    tableData: Array<{ address: string; amount: number; id: number }>;
    delAddressAmountList: (id: number) => void;
    //sendValue: string;// 没个地址发送数量那里的取值，这里应该不需要了，有 amountList
    token: Token;
    tokenList: Array<any>;
}
export default function ConfirmPage(props: ConfirmProps) {
    const { addressList, amountList, delAddressAmountList, token, tokenList } = props;
    let { confirm, setConfirm } = useContext(Context);
    const ERC20Instarnce = useERC20(token.address);
    const { chainId, library, account } = useActiveWeb3React();
    const { nativeBalance, tokenBalance, getBalance } = useBalance(token, account);

    const { fee } = useTransferFee();
    const { isApproved, getAllowance } = useAllowance(
        token,
        account,
        getMultiTransferAddress(chainId),
        amountList.reduce((total, currentValue) => {
            return accAdd(total, parseAmount(currentValue, token.decimals));
        }, "0")
    );
    const { allFee, errorMessage } = useTransferGasFee({
        token,
        isApproved,
        amountList: amountList,
        toAddressList: addressList,
        // allAmount: accMul(parseAmount(sendValue, token.decimals), addressList.length),
        allAmount: amountList.reduce((total, currentValue) => {
                return accAdd(total, parseAmount(currentValue, token.decimals));
            }, "0"),
        fee,
    });

    const TransferInstance = useTransfer();
    const [tableData, setTableData] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation();

    const initArray = () => {
        let arr = addressList;
        let marr = amountList;
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            newArr.push({
                id: i + 1,
                address: arr[i],
                amount: marr[i],
            });
        }
        setTableData(newArr);
    };

    // 处理交易，这里有对转账数额的处理，此处是按每地址相同数量计算的
    const handleTransfer = async () => {
        try {
            setLoading(true);

            // const tokenAmount = parseAmount(sendValue, token.decimals);
            // const tokenAmountList = amountList.map((a) => parseAmount(a, token.decimals));
            const tokenAmountList = amountList.map((item) => parseAmount(item, token.decimals).toString());
            // const allAmount = accMul(parseAmount(sendValue, token.decimals), addressList.length);
            const allAmount = amountList.reduce((total, currentValue) => {
                    return accAdd(total, parseAmount(currentValue, token.decimals));
                }, "0");
            let tx;

            if (isEth(token, chainId)) {
                tx = await TransferInstance.transferMultiETH(addressList, tokenAmountList, {
                    value: accAdd(allAmount, fee),
                });
            } else {
                tx = await TransferInstance.transferMultiToken(token.address, addressList, tokenAmountList, {
                    value: fee,
                });
            }
            await tx.wait();
            setLoading(false);
            toast.success("Transfer Success", {
                position: toast.POSITION.TOP_LEFT,
                theme: "colored",
            });
            getBalance();
        } catch (error) {
            toast.error(error.reason || error.data?.message || error.message, {
                position: toast.POSITION.TOP_LEFT,
                theme: "colored",
            });
            setLoading(false);
        }
    };
    const handleApproval = async () => {
        setLoading(true);

        try {
            const tx = await ERC20Instarnce.approve(getMultiTransferAddress(chainId), MaxUint256);
            await tx.wait();
            setLoading(false);
            toast.success("Approve Success", {
                position: toast.POSITION.TOP_LEFT,
                theme: "colored",
            });
            getAllowance();
            getBalance();
        } catch (error) {
            toast.error(error.reason || error.data?.message || error.message, {
                position: toast.POSITION.TOP_LEFT,
                theme: "colored",
            });
            setLoading(false);
        }
    };
    useEffect(() => {
        initArray();
    }, [addressList]);

    return (
        <div className="px-10 py-10">
            <div className="text-[#031a6e] text-[18px]">{t('confirmTx')}</div>
            {/* <div className="text-[#031a6e] text-[14px] mt-10">交易速度</div> */}

            <div className="text-[#031a6e] text-[14px] mt-10">{t('addressList')}</div>
            <div className="max-h-[300px]  overflow-auto mt-2">
                <Table
                    sx={{
                        minWidth: 600,
                    }}
                    stickyHeader
                >
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align="center"
                                sx={{
                                    borderTop: "1px solid #E0E0E0",
                                    borderLeft: "1px solid #E0E0E0",
                                    width: "30px",
                                }}
                            >
                                {t('tabTitle1')}&nbsp;
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    borderRight: "1px solid #E0E0E0",
                                    borderTop: "1px solid #E0E0E0",
                                    borderLeft: "1px solid #E0E0E0",
                                }}
                            >
                                {t('tabTitle2')}&nbsp;
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    borderRight: "1px solid #E0E0E0",
                                    borderTop: "1px solid #E0E0E0",
                                }}
                            >
                                {t('tabTitle3')}&nbsp;
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    borderTop: "1px solid #E0E0E0",
                                    borderRight: "1px solid #E0E0E0",
                                }}
                            >
                                {t('tabTitle4')}&nbsp;
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map(
                            (
                                row: {
                                    id: number;
                                    address: string;
                                    amount: number;
                                },
                                index: number,
                            ) => (
                                <TableRow key={index}>
                                    <TableCell
                                        align="center"
                                        component="th"
                                        scope="row"
                                        sx={{
                                            borderLeft: "1px solid #E0E0E0",
                                        }}
                                    >
                                        {row.id}
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                        sx={{
                                            borderRight: "1px solid #E0E0E0",
                                            borderLeft: "1px solid #E0E0E0",
                                        }}
                                    >
                                        {row.address}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            borderRight: "1px solid #E0E0E0",
                                        }}
                                    >
                                        {row.amount}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            borderRight: "1px solid #E0E0E0",
                                            width: "100px",
                                        }}
                                    >
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    delAddressAmountList(index);
                                                }}
                                                sx={{
                                                    background: "red",
                                                    "&:hover": {
                                                        background: "red",
                                                    },
                                                }}
                                            >
                                                {t('delButton')}
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ),
                        )}
                    </TableBody>
                </Table>
                {addressList.length === 0 && (
                    <div className="w-full  h-[200px] flex justify-center items-center">
                        <img src={nodataIcon} alt="no data" className=" h-[100px]" />
                    </div>
                )}
            </div>
            <div className="text-[#031a6e]  text-[14px] mt-10">{t('summary')}</div>
            <div className="m-h-96">
                <div className="bg-[#F6F6F6] w-full h-full m-auto mt-5 border-[rgba(9,25,106,0.05)] border-solid border-[1px]">
                    <div className="flex justify-around border-[1px] border-solid border-transparent border-b-gray-300">
                        <div className="w-1/2 h-32 border-[1px] border-solid border-transparent border-r-gray-300">
                            <div className="flex items-center justify-center  mt-10 text-[#09196A] text-[16px] sm:text-[24px]">
                                {addressList.length}
                            </div>
                            <div className="flex items-center justify-center text-gray-400 text-[10px] sm:text-[14px]">
                                {t('summary1')}
                            </div>
                        </div>

                        <div className="w-1/2 h-32 ">
                            <div className="flex items-center justify-center  mt-10 text-[#09196A] text-[16px] sm:text-[24px]">
                                {
                                    amountList.reduce((total, currentValue) => {
                                        return accAdd(total, parseFloat(currentValue));
                                    }, "0")
                                }
                            </div>
                            <div className="flex items-center justify-center text-gray-400 text-[10px] sm:text-[14px]">
                                {t('summary2')}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-around border-[1px] border-solid border-transparent border-b-gray-300">
                        <div className="w-1/2 h-32 border-[1px] border-solid border-transparent border-r-gray-300">
                            <div className="flex items-center justify-center mt-10 text-[#09196A] text-[16px] sm:text-[24px]">
                                1
                            </div>
                            <div className="flex items-center justify-center text-gray-400 text-[10px] sm:text-[14px]">
                                {t('summary3')}
                            </div>
                        </div>

                        <div className="w-1/2 h-32 ">
                            <div className="flex items-center justify-center mt-10  text-[#09196A] text-[16px] sm:text-[24px]">
                                {formatBalance(tokenBalance, token.decimals, 3)} {token.symbol}
                            </div>
                            <div className="flex items-center justify-center text-gray-400 text-[10px] sm:text-[14px]">
                                {t('summary4')}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-around">
                        <div className="w-1/2 h-32 border-[1px] border-solid border-transparent border-r-gray-300">
                            <div className="flex items-center justify-center mt-10 text-[#09196A] text-[16px] sm:text-[24px]">
                                {formatAmount(allFee)}
                            </div>
                            <div className="flex items-center justify-center text-gray-400 text-[10px] sm:text-[14px]">
                                {t('summary5')}
                                <span className="text-red-600 font-bold">
                                    （{t('summary51')} {formatAmount(fee)} {NATIVE[chainId].symbol}）
                                </span>
                            </div>
                        </div>

                        <div className="w-1/2 h-32 ">
                            <div className="flex items-center justify-center mt-10  text-[#09196A] text-[16px] sm:text-[24px]">
                                {formatBalance(nativeBalance, 18, 3)} {tokenList[0].symbol}
                            </div>
                            <div className="flex items-center justify-center text-gray-400 text-[10px] sm:text-[14px]">
                                {t('summary6')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {errorMessage && (
                <div className="m-h-20 break-all  border-red-500 border-[1px] border-solid text-[red] rounded-md mt-5 p-5 text-[12px]">
                    {errorMessage}
                </div>
            )}

            <div className="mt-10 flex">
                <Button
                    variant="contained"
                    className="w-32 h-12 "
                    onClick={() => {
                        setConfirm(false);
                    }}
                >
                    <img src={backIcon} alt="批量转账" className="w-full h-4/5" />
                </Button>
                <div className="ml-10">
                    {isApproved ? (
                        <LoadingButton
                            variant="contained"
                            loading={loading}
                            // loadingPosition="start"
                            startIcon={loading && <CircularProgress size={20} />}
                            className="w-32 h-12"
                            onClick={() => {
                                handleTransfer();
                            }}
                        >
                            {t('sendTx')}
                        </LoadingButton>
                    ) : (
                        <LoadingButton
                            variant="contained"
                            className="w-32 h-12"
                            loading={loading}
                            // loadingPosition="start"
                            startIcon={loading && <CircularProgress size={20} />}
                            onClick={() => {
                                handleApproval();
                            }}
                        >
                            {t('approve')}
                        </LoadingButton>
                    )}
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
}
