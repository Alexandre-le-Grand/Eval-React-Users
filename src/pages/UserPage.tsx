import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface User {
id: number;
firstName: string;
lastName: string;
age: number;
company: { name: string };
address: { city: string };
image: string;
email: string;
}

export default function UserPage() {
const { id } = useParams();
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
async function fetchUser() {
    try {
    const response = await fetch(`https://dummyjson.com/users/${id}`);
    if (!response.ok) throw new Error("Utilisateur introuvable");
    const data = await response.json();
    setUser(data);
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
fetchUser();
}, [id]);

if (loading) return <p>Chargement...</p>;
if (error) return <p>Erreur : {error}</p>;
if (!user) return <p>Aucun utilisateur trouvé</p>;

return (
<div style={{ padding: "1rem" }}>
    <Link to="/">← Retour</Link>
    <h2>
    {user.firstName} {user.lastName}
    </h2>
    <img src={user.image} alt={user.firstName} width="150" />
    <p>Âge : {user.age}</p>
    <p>Email : {user.email}</p>
    <p>Entreprise : {user.company.name}</p>
    <p>Ville : {user.address.city}</p>
</div>
);
}
