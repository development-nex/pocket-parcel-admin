/* eslint-disable react/prop-types */
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Avatar, Button, Dropdown, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { useNavigate } from "@tanstack/react-router";
const items = [
  // {
  //   key: "1",
  //   label: "Profile",
  // },
  {
    key: "/access-control/users",
    label: "Manage Users",
  },
  {
    key: "logout",
    label: "Logout",
  },
];

const Navbar = ({ auth }) => {
  const navigate = useNavigate();
  const user = auth.user;
  const onClick = ({ key }) => {
    if (key === "logout") {
      message.success("Logout Successfully");
      auth.logout();
      return;
    }
    if (key === "/access-control/users") {
      navigate({ to: key });
      return;
    }
    message.success(`Click on item ${key}`);
  };

  return (
    <nav className="bg-white text-indigo-600 p-4 shadow-md border-b border-[#cdd0d4]">
      <div className=" mx-auto flex justify-between items-center ">
        <div className=" flex gap-2 divide-x-2 divide-gray-500 items-center ml-auto">
          <div className="pr-2">
            <Button icon={<IoIosNotifications size={25} />} type="text" />
          </div>
          <div className="">
            <Dropdown menu={{ items, onClick }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space className="">
                  <Avatar icon={<FaUser />} />{" "}
                  <p className="truncate capitalize max-w-[100px]">
                    {user?.username || "Name"}
                  </p>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
