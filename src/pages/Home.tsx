import { useEffect, useState, useMemo } from "react";
import UserList from "../components/UserList";

interface User {
id: number;
firstName: string;
lastName: string;
email: string;
image: string;
age: number;
}

export default function Home() {
const [users, setUsers] = useState<User[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

// Nouveaux états 👇
const [search, setSearch] = useState("");
const [sortBy, setSortBy] = useState<"name" | "age">("name");
const [currentPage, setCurrentPage] = useState(1);
const usersPerPage = 10;

useEffect(() => {
async function fetchUsers() {
    try {
    setLoading(true);
    setError(null);
    const response = await fetch("https://dummyjson.com/users?limit=100");
    if (!response.ok) throw new Error("Erreur réseau");
    const data = await response.json();
    setUsers(data.users);
     } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Une erreur est survenue');
        }
    } finally {
    setLoading(false);
    }
}
fetchUsers();
}, []);

const filteredUsers = useMemo(() => {
return users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email}`
    .toLowerCase()
    .includes(search.toLowerCase())
);
}, [users, search]);

const sortedUsers = useMemo(() => {
return [...filteredUsers].sort((a, b) => {
    if (sortBy === "name") {
    return a.lastName.localeCompare(b.lastName);
    } else {
    return a.age - b.age;
    }
});
}, [filteredUsers, sortBy]);

const indexOfLast = currentPage * usersPerPage;
const indexOfFirst = indexOfLast - usersPerPage;
const currentUsers = sortedUsers.slice(indexOfFirst, indexOfLast);
const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

if (loading) return <p>Chargement...</p>;
if (error) return <p>Erreur : {error}</p>;

return (
<div style={{ padding: "1rem" }}>
    <h1>Liste des utilisateurs</h1>

    
    <input
    type="text"
    placeholder="Rechercher par nom ou email"
    value={search}
    onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1); 
    }}
    style={{
        padding: "0.5rem",
        width: "300px",
        marginRight: "1rem",
        marginBottom: "1rem",
    }}
    />

    
    <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value as "name" | "age")}
    style={{ padding: "0.5rem", marginBottom: "1rem" }}
    >
    <option value="name">Trier par nom</option>
    <option value="age">Trier par âge</option>
    </select>

    
    <UserList users={currentUsers} />

    
    <div style={{ marginTop: "1rem" }}>
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
        key={page}
        onClick={() => setCurrentPage(page)}
        style={{
            margin: "0 0.25rem",
            padding: "0.5rem 1rem",
            background: page === currentPage ? "#333" : "#eee",
            color: page === currentPage ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
        }}
        >
        {page}
        </button>
    ))}
    </div>
</div>
);
}
