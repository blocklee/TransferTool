import { Token } from "@/config/constants/types";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import {useTranslation} from "react-i18next";

interface propsInter {
    tokenList: Array<any>;
    onInChange: (value: any) => void;
    onEventChange: (value: any) => void;
    open: boolean;
    token: Token;
}

export default function SelectToken(props: propsInter) {
    const { tokenList, onInChange, onEventChange, open, token } = props;
    const [options, setOptions] = useState<any>([]);
    const loading = open && options.length === 0;

    const { t } = useTranslation();

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <div>
            <div className="text-[#031a6e] text-[16px]">
                {t('selectToken')}
            </div>
            <Autocomplete
                id="asynchronous-demo"
                disableClearable
                options={tokenList}
                value={token}
                sx={{
                    marginTop: "10px",
                }}
                getOptionLabel={(option) => option.symbol + " " + option.address}
                isOptionEqualToValue={(option, newValue) => {
                    return option.address === newValue.address;
                }}
                onInputChange={(event, newInputValue) => {
                    onInChange(newInputValue);
                }}
                onChange={(event, newValue) => {
                    onEventChange(newValue);
                }}
                renderOption={(props, option) => (
                    <li key={option.address} {...props}>
                        {option.symbol} {option.address}
                    </li>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                </React.Fragment>
                            ),
                        }}
                        // label={t("label1")}
                    />
                )}
            />
        </div>
    );
}
