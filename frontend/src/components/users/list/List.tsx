import UserListItem from "./ListItem";

interface UserListProps {
	users: IUser[];
}

const UserList = ({ users }: UserListProps) => {
	return (
		<>
			{users.map((user) => (
				<UserListItem key={user.id} user={user} />
			))}
		</>
	);
};

export default UserList;
