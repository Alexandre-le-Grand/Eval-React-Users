import { useEffect, useState } from "react";
import UserList from "../components/UserList";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("https://dummyjson.com/users");
        if (!response.ok) throw new Error("Erreur réseau");
        const data = await response.json();
        setUsers(data.users);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return <UserList users={users} />;
}
