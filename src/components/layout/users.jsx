import { useGetUsersQuery } from "../../api/apislice";

const Users = () => {
  const { data, isLoading, isError, error } = useGetUsersQuery();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error: {error.message}</h1>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Users</h1>
      {data?.map((user) => (
        <div
          key={user.id}
          className="flex justify-between items-center border p-2 my-2"
        >
          <h2>
            {user.name?.firstname} {user.name?.lastname}
          </h2>
          <p>{user.email}</p>
          <p>@{user.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
