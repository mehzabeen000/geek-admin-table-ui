export const searchInUsers = (search: string, users: any[]) => {
  let tempSearch = search.toLowerCase();
  return users.map((user: { name: string; email: string; role: string; show: boolean; }) => {
    if (
      user.name.toLowerCase().includes(tempSearch) ||
      user.email.toLowerCase().includes(tempSearch) ||
      user.role.toLowerCase().includes(tempSearch)
    ) {
      user.show = true;
      return user;
    }
    user.show = false;
    return user;
  });
};
