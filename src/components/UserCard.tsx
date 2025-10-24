import { Link } from "react-router-dom";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

export default function UserCard({ user }: { user: User }) {
  return (
    <Link
      to={`/user/${user.id}`}
      style={{
        display: "block",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        textDecoration: "none",
        color: "inherit",
        width: "200px",
      }}
    >
      <img
        src={user.image}
        alt={user.firstName}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <p>{user.email}</p>
    </Link>
  );
}
