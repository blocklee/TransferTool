import Footer from "@/components/Footer/index";
import Web3ReactManager from "@/components/Web3ReactManager/index";
import { NetworkContextName } from "@/config";
import { Web3Provider } from "@ethersproject/providers";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { HashRouter as Router, Route } from "react-router-dom";

import Header from "@/components/Header/index";
import Home from "@/view/Home";
import MulHome from "@/view/MulHome";
import {useState} from "react";
import Button from "@mui/material/Button";

export function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider);
    library.pollingInterval = 15000;
    return library;
}
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

function App() {
    const [ isSwitch, setIsSwitch ] = useState(false);

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
                <Router>
                    <Header></Header>
                    <div>
                        <Button
                            // variant="contained"
                            className="w-1/2 "
                            onClick={() => {
                                setIsSwitch(!isSwitch);
                            }}
                        >
                            转账模式切换
                        </Button>
                    </div>
                    <Web3ReactManager>
                        { !isSwitch ? (
                            <Route path="/" exact component={Home} />
                        ):(
                            <Route path="/" exact component={MulHome} />
                        )}
                    </Web3ReactManager>
                    {/*<Footer></Footer>*/}
                </Router>
            </Web3ProviderNetwork>
        </Web3ReactProvider>
    );
}

export default App;
