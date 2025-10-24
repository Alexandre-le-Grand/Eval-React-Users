import UserCard from "./UserCard";

interface User {
id: number;
firstName: string;
lastName: string;
email: string;
image: string;
}

export default function UserList({ users }: { users: User[] }) {
return (
<div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
    {users.map((u) => (
    <UserCard key={u.id} user={u} />
    ))}
</div>
);
}
