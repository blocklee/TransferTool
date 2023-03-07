import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector({ onChange }) {
    const { i18n } = useTranslation();

    function handleChange(event) {
        i18n.changeLanguage(event.target.value);
        onChange(event);
    }

    return (
        <select value={i18n.language} onChange={handleChange}>
            <option value="en">English</option>
            <option value="zh">中文</option>
        </select>
    );
}

// function LanguageSelector() {
//     const { i18n } = useTranslation();
//
//     function handleLanguageChange(lang) {
//         i18n.changeLanguage(lang);
//     }
//
//     return (
//         <div>
//             <button onClick={() => handleLanguageChange('en')}>English</button>
//             <button onClick={() => handleLanguageChange('zh')}>中文</button>
//         </div>
//     );
// }

export default LanguageSelector;

