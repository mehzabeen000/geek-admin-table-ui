import React, { useState, useEffect, useRef, createContext } from "react";
import { getUsers } from "./services/user";
import { page_limit } from "./utils/constant";
import { getRecordIndex } from "./utils/paging";
import { searchInUsers } from "./utils/search";
import "./App.css";
import App from "./App";
const AppContext = createContext({});

function AppContextProvider() {
  const [users, setUsers] = useState<Array<any>>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const [pageLimit, setPageLimit] = useState<number>(1);
  const selectAllRef = useRef<any>(null);

  useEffect(() => {
    getUsers(setUsers);
  }, []);

  const searchUsers = (e: any) => {
    setPageLimit(1);
    setUsers(searchInUsers(e.target.value, users));
  };

  const deleteUser = (id: any) => {
    let userList = users.filter((user) => user.id !== id);
    setUsers(userList);
    setUpdate((prevState) => !prevState);
  };

  const editUser = (id: any) => {
    let userList = users;
    const index = userList.findIndex((user) => user.id === id);
    userList[index].edit = true;
    setUsers(userList);
    setUpdate((prevState) => !prevState);
  };

  const saveUser = (id: any, nameRef: any, emailRef: any, roleRef: any) => {
    let userList = users;
    const index = userList.findIndex((user) => user.id === id);
    userList[index].name = nameRef.current.value;
    userList[index].email = emailRef.current.value;
    userList[index].role = roleRef.current.value;
    userList[index].edit = false;
    setUsers(userList);
    setUpdate((prevState) => !prevState);
  };

  const selectOne = (id: any) => {
    let userList = users;
    const index = userList.findIndex((user) => user.id === id);
    userList[index].selected = !userList[index].selected;
    setUsers(userList);
    setUpdate((prevState) => !prevState);
  };

  const selectAll = (e: { target: { checked: any; }; }) => {
    const listedUserIds = users
      .filter((user) => user.show)
      .slice(index, index + page_limit)
      .map((user) => user.id);

    let userList = users.map((user) => {
      if (listedUserIds.includes(user.id)) {
        user.selected = e.target.checked;
        return user;
      }
      return user;
    });

    setUsers(userList);
    setUpdate(!update);
  };

  const deleteSelected = () => {
    if (window.confirm("Selected users will be deleted")) {
      setUsers((prevState) => prevState.filter((user) => !user.selected));
      selectAllRef.current.checked = false;
    }
  };

  const index = getRecordIndex(pageLimit);

  return (
    <AppContext.Provider
      value={{
        editUser,
        saveUser,
        selectAll,
        selectOne,
        deleteUser,
        searchUsers,
        deleteSelected,
        users,
        setUpdate,
        pageLimit,
        setPageLimit
      }}
    >
      <App />
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };