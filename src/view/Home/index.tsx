import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';

import SolHome from '@/view/SolHome';
import MulHome from '@/view/MulHome';
import Button from "@mui/material/Button";
import LanguageSelector from "@/components/LanguageSelector";


function Home() {
    const [ isSwitch, setIsSwitch ] = useState(false);
    const { t } = useTranslation();

    return (
        <div>
            <div>
                <Button
                    // variant="contained"
                    className="w-1/2"
                    onClick={() => {
                        setIsSwitch(!isSwitch);
                    }}
                >
                    {/*使用语言版本 key 值*/}
                    {t('modelSwitch')}
                </Button>
                <Button className="w-1/2">
                    <LanguageSelector onChange={() => console.log('Language changed')} />
                </Button>
            </div>
            <div>
                {!isSwitch ? <SolHome /> : <MulHome />}
            </div>
        </div>
    );
}

export default Home;
