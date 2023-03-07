import TextField from "@mui/material/TextField";
import {useTranslation} from "react-i18next";

interface propsInter {
    addressAmountValue: string;
    onSetAddressAmountChange: (value: string) => void;
    onSetAddressAmountListChange: (value: any[]) => void;
    addressAmountList: Array<string>;
    onSetAddressListChange: (value: any[]) => void;
    onSetAmountListChange: (value: any[]) => void;
    addressList: Array<string>;
    amountList: Array<string>;
}

export default function AddressList(props: propsInter) {
    const {
        onSetAddressAmountChange,
        addressAmountValue,
        onSetAddressAmountListChange,
        addressAmountList,
        onSetAddressListChange,
        addressList,
        onSetAmountListChange,
        amountList,
    } = props;

    const { t } = useTranslation();

    return (
        <div>
            <div className="text-[#031a6e] text-[16px]">{t('receiveAddrM')}</div>
            {/*此处应该是设置每行序号变化的*/}
            <div className="mt-5 flex pb-5 bg-[#F9F9F9] pl-5  pt-5">
                <div className="text-[15px] leading-[25px] mr-3 text-[#001A6B]">
                    {addressList.length
                        ? addressList.map((item, index) => {
                            return <div key={index}>{index + 1}</div>;
                        })
                        : 1}
                </div>
                <div className="overflowX-auto w-full">
                    <TextField
                        id="standard-multiline-static"
                        variant="standard"
                        multiline
                        value={addressAmountValue}
                        minRows={8}
                        onChange={(e) => {
                            onSetAddressAmountChange(e.target.value);
                            if (e.target.value === "") {
                                onSetAddressListChange([]);
                                onSetAmountListChange([]);
                                // onSetAddressAmountListChange([]);
                                return;
                            }
                            const addressAmountE = e.target.value.split("\n");

                            const newAddressList: string[] = [];
                            const newAmountList: string[] = [];
                            const newAddressAmountList: string[] = [];
                            for (let i = 0; i < addressAmountE.length; i++) {
                                const addressAmount = addressAmountE[i].split(",");

                                if (addressAmount.length === 2) {
                                    newAddressList.push(addressAmount[0]);
                                    newAmountList.push(addressAmount[1]);
                                    newAddressAmountList.push(addressAmountE[i]);
                                }
                            }
                            onSetAddressAmountListChange(newAddressAmountList);
                            onSetAddressListChange(newAddressList);
                            onSetAmountListChange(newAmountList);
                            // console.log("addressAmountInput:\n"+addressAmountE)
                            // console.log("addressAmountValue:\n"+addressAmountValue)
                            // console.log("addressAmountList:\n"+addressAmountList.length+"\n"+addressAmountList)
                            console.log(amountList)
                            console.log(addressList)
                        }}
                        InputProps={{
                            disableUnderline: true,
                        }}
                        sx={{
                            "& .MuiInputBase-root": {
                                padding: 0,
                                lineHeight: "25px",
                                fontSize: "15px",
                                color: "#001A6B",
                            },
                        }}
                        className="w-full bg-[#F9F9F9] text-clip"
                    />
                </div>
            </div>
        </div>
    );
}



// import React from "react";
// import TextField from "@mui/material/TextField";
//
// interface propsInter {
//     addressAmountValue: string;
//     onSetAddressAmountChange: (value: string) => void;
//     // onSetAmountListChange: (value: string) => void;
//     onSetAddressAmountListChange: (value: any[][]) => void;
//     // onSetAddressListChange: (value: any[]) => void;
//     addressAmountList: Array<string>;
//     addressList: Array<string>;
//     amountList: Array<string>;
// }
//
// export default function AddressList(props: propsInter) {
//     const { onSetAddressAmountChange, addressAmountValue, onSetAddressAmountListChange, addressAmountList, addressList, amountList } = props;
//
//     const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//         const value = event.target.value;
//         onSetAddressAmountChange(value);
//         console.log(value)
//
//         if (value.trim() === "") {
//             onSetAddressAmountListChange([]);
//             return;
//         }
//
//         const lines = value.split("\n");
//         const columns = lines.map((line) => line.split("\,"));
//
//         const arrays: string[][] = Array.from({ length: columns[0].length }, () => []);
//
//         columns.forEach((column) => {
//             column.forEach((cell, index) => {
//                 arrays[index].push(cell.trim());
//             });
//         });
//
//         onSetAddressAmountListChange(arrays);
//         const addressList = arrays[0];
//         const amountList = arrays[1];
//         console.log(amountList)
//         console.log("addressList:"+addressList)
//     };
//
//     return (
//         <div>
//             <div className="text-[#031a6e] text-[16px]">收币地址&转账数额</div>
//             <div className="mt-5 flex pb-5 bg-[#F9F9F9] pl-5  pt-5">
//                 <div className="text-[15px] leading-[25px] mr-3 text-[#001A6B]">
//                     {addressAmountList.length
//                         ? addressAmountList.map((item, index) => {
//                             return <div key={index}>{index + 1}</div>;
//                         })
//                         : 1}
//                 </div>
//                 <div className="overflowX-auto w-full">
//                     <TextField
//                         id="standard-multiline-static"
//                         variant="standard"
//                         multiline
//                         value={addressAmountValue}
//                         minRows={8}
//                         onChange={handleChange}
//                         InputProps={{
//                             disableUnderline: true,
//                         }}
//                         sx={{
//                             "& .MuiInputBase-root": {
//                                 padding: 0,
//                                 lineHeight: "25px",
//                                 fontSize: "15px",
//                                 color: "#001A6B",
//                             },
//                         }}
//                         className="w-full bg-[#F9F9F9] text-clip"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }
