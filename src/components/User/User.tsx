import { useContext, useRef } from "react";
import { AppContext } from "../../AppContext";
import styles from "./User.module.css";

interface UserProps {
  user: any;
}

const User = ({ user }: UserProps) => {
  const { selectOne, saveUser, deleteUser, editUser }: any = useContext(AppContext);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);

  return (
    <tr key={user.id} className={user.selected ? styles.selected : ""}>
      <td>
        <label htmlFor={`check-${user.id}`}>
          <input
            id={`check-${user.id}`}
            type="checkbox"
            onChange={() => selectOne(user.id)}
            checked={user.selected}
          ></input>
        </label>
      </td>
      <td>
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="text"
          ref={nameRef}
          name="name"
          defaultValue={user.name}
        ></input>
      </td>
      <td>
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="email"
          ref={emailRef}
          name="email"
          defaultValue={user.email}
        />
      </td>
      <td>
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="text"
          ref={roleRef}
          name="role"
          defaultValue={user.role}
        />
      </td>
      <td className={styles.icons}>
        {user.edit ?
          <i
            onClick={() => saveUser(user.id, nameRef, emailRef, roleRef)}
          >Save</i>
          :
          <i onClick={() => editUser(user.id)}>Edit</i>
        }

        <i onClick={() => deleteUser(user.id)}>Delete</i>
      </td>
    </tr>
  );
};

export default User;
