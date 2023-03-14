import React, { useContext } from "react";
import Pagination from "./components/Pagination/Pagination";
import UsersList from "./components/UsersList/UsersList";
import { page_limit } from "./utils/constant";
import { getRecordIndex } from "./utils/paging";
import "./App.css";
import { AppContext } from "./AppContext";

function App() {
  const { pageLimit, users, searchUsers }: any = useContext(AppContext);
  const index = getRecordIndex(pageLimit);
  return (
    <div className="App">
      <input
        className="search"
        type="text"
        placeholder="Search by name, email or role"
        onChange={searchUsers}
      ></input>
      <UsersList
        users={users
          .filter((user: any) => user.show)
          .slice(index, index + page_limit)}
      ></UsersList>
      <Pagination
        usersLength={users.filter((user: any) => user.show).length}
      ></Pagination>
    </div>
  );
}

export default App;
