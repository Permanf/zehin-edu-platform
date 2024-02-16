import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/logo.png"
import styles from "./header.module.css"
import { Avatar, Menu } from "@mantine/core"
import { IconChevronDown, IconFileAnalytics } from "@tabler/icons-react"
import { IconLogout } from "@tabler/icons-react"
import { useDispatch, useSelector } from "react-redux"
import { RemoveCookie } from "../../utils/cookie"
import { logout, userData } from "../../store/actions/auth"
import { useGetProfile } from "../../hooks/profile/useGetProfile"
import { useEffect } from "react"
import { getUser } from "../../store/selectors/auth"

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {data:profile, status} = useGetProfile();
  const user = useSelector(getUser)
  useEffect(()=>{
    // console.log(profile);
    dispatch(userData(profile))
  },[status]);
    return(
        <div className={`${styles.layoutBody} flex flex-col items-center h-full`}>
            <div className={`${styles.layout} flex flex-col h-full`}>
                <div className="flex justify-between items-center h-full">
                <Link to="/" className="flex h-full items-center">
                    <img src={logo} alt="logo" className="w-12" />
                    <span className="font-semibold leading-5 ml-3">Türkmenistanyň Bilim <br/> Ministrligi</span>
                </Link>
                {/* <div className="flex h-full items-center">
                    <span className="font-semibold leading-5 mr-3">Lastname <br/> firstname</span>
                    <Avatar />
                </div> */}
                <Menu width={150}>
                  <Menu.Target>
                    <div className="flex items-center">
                      <span className="font-semibold leading-5 mr-3">{user?.name}</span>
                      <Avatar radius="lg" src={user?.photo}></Avatar>
                      <IconChevronDown size={13} className="ml-1" />
                    </div>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      className="hover:bg-neutral-200"
                      leftSection={<IconFileAnalytics />}
                      onClick={() => {
                        navigate("/user-tests")
                      }}
                    >
                      Tests
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        RemoveCookie("token-zehin");
                        dispatch(logout());
                      }}
                      className="hover:bg-neutral-200"
                      leftSection={<IconLogout />}
                    >
                      Выйты
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                </div>
            </div>
        </div>
    )
}
