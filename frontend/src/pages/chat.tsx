import React, { useEffect } from "react";
import Feed from "../components/Feed";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../types/interfaces";
import { setUser, setRoom } from "../actions/user";
import { User } from "../types/user";
import { checkRoom } from "../api/api";
import { useLocation, useHistory } from "react-router-dom";

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pathid = useLocation().pathname.split("/")[2];
  const color = useSelector((state: RootState) => state.user.color);

  useEffect(() => {
    const userString: string | null = localStorage.getItem("user");

    if (userString) {
      const user: User = JSON.parse(userString);
      dispatch(setUser(user.username, "username"));
      dispatch(setUser(user.color, "color"));
    } else history.push("/");

    checkRoom(pathid).then((res) => {
      if (res && res.status !== 200) {
        history.push("/");
      } else {
        dispatch(setRoom(pathid));
      }
    });
  }, [dispatch, history, pathid]);

  return (
    <div
      className={`w-screen h-screen bg-${color}-100 flex justify-center overflow-x-hidden`}
    >
      <main className="bg-gray-400 flex flex-col items-center justify-end">
        <Feed />
        <Input />
      </main>
    </div>
  );
};

export default Chat;
