import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import { useIsClient } from "../hooks/isClientHook";
import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item } = Menu;

const TopNav = () => {
  const isClient = useIsClient();
  const [current, setCurrent] = useState("");
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  return (
    <>
      {isClient && (
        <Menu mode="horizontal" selectedKeys={[current]}>
          <Item
            key="/"
            onClick={(e) => setCurrent(e.key)}
            icon={<AppstoreOutlined />}
          >
            <Link href="/">
              <a>App</a>
            </Link>
          </Item>

          {user === null && (
            <>
              <Item
                key="/login"
                onClick={(e) => setCurrent(e.key)}
                icon={<LoginOutlined />}
              >
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </Item>

              <Item
                key="/register"
                onClick={(e) => setCurrent(e.key)}
                icon={<UserAddOutlined />}
              >
                <Link href="/register">
                  <a>Register</a>
                </Link>
              </Item>
            </>
          )}

          {user !== null && (
            <Menu.SubMenu
              icon={<CoffeeOutlined />}
              title={user && user.name}
              className="ms-auto"
              key="logout"
            >
              <Menu.ItemGroup>
                <Item key="/user">
                  <Link href="/user">
                    <a>Dashboard</a>
                  </Link>
                </Item>
                <Item onClick={logout} className="ms-auto" key="/logout">
                  Logout
                </Item>
              </Menu.ItemGroup>
            </Menu.SubMenu>
          )}
        </Menu>
      )}
    </>
  );
};

export default TopNav;
