const URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const arrangeUser = (users: any[]) => {
  return users.map((user: { selected: boolean; edit: boolean; show: boolean; }) => {
    user.selected = false;
    user.edit = false;
    user.show = true;
    return user;
  })
}

const getUsers = async (setUsers: Function) => {
  try {
    const response = await fetch(URL)
    const data = await response.json()
    setUsers(arrangeUser(data));
  } catch (err) {
    getLocalUsers(setUsers)
  }
};

const getLocalUsers = async (setUsers: Function) => {
  try {
    const response = await fetch("./members.json")
    const data = await response.json()
    setUsers(arrangeUser(data));
  } catch (err) {
    console.error(err)
  }
};
export { getUsers };



