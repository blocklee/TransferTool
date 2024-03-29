import discord from "@/assets/discord.svg";
import github from "@/assets/github.svg";
import telegram from "@/assets/telegram.svg";
import wechatQR from "@/assets/wechat.jpeg";

export default function Footer() {
    return (
        <div className="w-full h-40 shadow-[15px_15px_15px_15px_rgba(1,56,90,0.3)] relative bottom-0 pt-5">
            <div className="w-11/12 sm:w-7/12 h-full m-auto  flex">
                <div className=" text-[#01385A] flex text-[14PX] font-bold  w-full ">
                    <div className="text-center">
                        {/*<img src={wechatQR} alt="" className="w-[100px] h-[100px] rounded-[10px]" />*/}
                        <div>微信（欢迎咨询定制Dapp开发）</div>
                    </div>
                    {/* <div className="text-center">
                        <div
                            className="w-[100px] h-[100px] rounded-[10px] flex items-center hover:cursor-pointer"
                            onClick={() => {
                                window.open("https://t.me/daqingchong", "_blank");
                            }}
                        >
                            https://t.me/daqingchong
                        </div>
                        <div>电报</div>
                    </div> */}
                </div>
                <div></div>
                <div className="w-1/2 ">
                    <div className="text-[#01385A] font-bold">相关链接（欢迎加入 MeerFans 社区）</div>
                    <div className="flex mt-10">
                        <img
                            src={github}
                            alt="github"
                            className="hover:cursor-pointer"
                            onClick={() => {
                                window.open("https://github.com/meerfans", "_blank");
                            }}
                        />
                        <img
                            src={telegram}
                            alt="telegram"
                            className="hover:cursor-pointer ml-10"
                            onClick={() => {
                                window.open("https://t.me/qitmeernetwork", "_blank");
                            }}
                        />
                        <img
                            src={discord}
                            alt="discord"
                            className="hover:cursor-pointer ml-10"
                            onClick={() => {
                                window.open("https://discord.com/invite/xzGSmrzXTM", "_blank");
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}



