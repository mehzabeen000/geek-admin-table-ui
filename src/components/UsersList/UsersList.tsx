import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import { page_limit } from "../../utils/constant";
import User from "../User/User";
import styles from "./UsersList.module.css";

interface UsersListProps {
  users: any;
}

const UsersList = ({ users }: UsersListProps) => {
  const { pageLimit: page, setPage, selectAllRef, selectAll }: any = useContext(AppContext);

  useEffect(() => {
    if (users.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage, users.length]);
  let fillRows = [];
  for (
    let i = users.filter((user: { show: any; }) => user.show).length;
    i < page_limit;
    i++
  ) {
    fillRows.push(<tr key={i}></tr>);
  }

  if (users.length === 0 && page === 1) {
    return <div>NO USERS</div>;
  }
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              ref={selectAllRef}
              onChange={(e) => {
                selectAll(e);
              }}
              name="selectAll"
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: any) => {
          return user.show ? (
            <User
              key={user.id}
              user={user}
            ></User>
          ) : (
            ""
          );
        })}
        {fillRows}
      </tbody>
    </table>
  );
};

export default UsersList;
