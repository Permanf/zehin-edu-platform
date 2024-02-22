import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/logo.png"
import styles from "./header.module.css"
import { Avatar, Menu, Select } from "@mantine/core"
import { IconChevronDown, IconFileAnalytics } from "@tabler/icons-react"
import { IconLogout } from "@tabler/icons-react"
import { useDispatch, useSelector } from "react-redux"
import { RemoveCookie } from "../../utils/cookie"
import { changeLanguage, logout, userData } from "../../store/actions/auth"
import { useGetProfile } from "../../hooks/profile/useGetProfile"
import { useEffect } from "react"
import { getLang, getUser } from "../../store/selectors/auth"
import translations from "../../pages/login/translation"

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {data:profile, status} = useGetProfile();
  const user = useSelector(getUser)
  const lang = useSelector(getLang);
  useEffect(()=>{
    dispatch(userData(profile))
  },[status, lang]);
    return(
        <div className={`${styles.layoutBody} flex flex-col items-center h-full`}>
            <div className={`${styles.layout} flex flex-col h-full`}>
                <div className="flex justify-between items-center h-full">
                <Link to="/" className="flex h-full items-center">
                    <img src={logo} alt="logo" className="w-12" />
                    <span className="font-semibold leading-5 ml-3">Türkmenistanyň Bilim <br/> Ministrligi</span>
                </Link>
                <div className="flex space-x-5">
                <Menu width={150}>
                  <Menu.Target>
                    <div className="flex items-center cursor-pointer">
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
                      {translations[lang as keyof typeof translations].examHistory}
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        RemoveCookie("token-zehin");
                        dispatch(logout());
                      }}
                      className="hover:bg-neutral-200"
                      leftSection={<IconLogout />}
                    >
                      {translations[lang as keyof typeof translations].logout}
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                <Select
                  className="w-28 font-semibold"
                  variant="unstyled"
                  data={[
                    {value:"tkm", label: 'Türkmen'},
                    {value:"rus", label: 'Русский'}, 
                    {value:"eng", label: "English"}
                  ]}
                  rightSection={<IconChevronDown size={15} />}
                  value={lang}
                  onChange={(_value) => dispatch(changeLanguage(_value))}
                />
                </div>
                </div>
            </div>
        </div>
    )
}
