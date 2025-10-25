import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

export default function UserCard({ user }: { user: User }) {
  const { favorites, toggleFavorite } = useAppContext();
  const isFav = favorites.includes(user.id);

  return (
    <div
      className="user-card"
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        width: "200px",
        position: "relative",
        background: "white",
      }}
    >
      <button
        onClick={() => toggleFavorite(user.id)}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "1.2rem",
        }}
      >
        {isFav ? "⭐" : "☆"}
      </button>

      <Link
        to={`/user/${user.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
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
    </div>
  );
}
