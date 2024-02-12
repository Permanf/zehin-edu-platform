import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"
import styles from "./header.module.css"
import { Avatar } from "@mantine/core"

export const Header = () => {
    return(
        <div className={`${styles.layoutBody} flex flex-col items-center h-full`}>
            <div className={`${styles.layout} flex flex-col h-full`}>
                <div className="flex justify-between items-center h-full">
                <Link to="/" className="flex h-full items-center">
                    <img src={logo} alt="logo" className="w-12" />
                    <span className="font-semibold leading-5 ml-3">Türkmenistanyň Bilim <br/> Ministrligi</span>
                </Link>
                <div className="flex h-full items-center">
                    <span className="font-semibold leading-5 mr-3">Lastname <br/> firstname</span>
                    <Avatar />
                </div>
                </div>
            </div>
        </div>
    )
}
