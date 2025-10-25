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
<div
    style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
    gap: "1.5rem",
    justifyContent: "center",
    }}
>
    {users.map((u) => (
    <UserCard key={u.id} user={u} />
    ))}
</div>
);
}
