"use client";

import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/Admin/LoginForm";
import SectionSelector from "@/components/Admin/SelectionSelector";
import ResearchPanel from "@/components/Admin/Research/ResearchPanel";
import PublicationsForm from "@/components/Admin/PublicationsForm";
import HomeForm from "@/components/Admin/HomeForm";
// import TeamForm from "@/components/Admin/Team/TeamForm";
import TeamPanel from "@/components/Admin/Team/TeamPanel";

const AdminPage = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState("");
    const [selectedSection, setSelectedSection] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);
    
    const handleLogin = async (email: string, password: string) => {
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch {
            setError("Invalid credentials");
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        setSelectedSection("");
        router.push("/admin");
    };

    if (!user) {
        return <LoginForm onLogin={handleLogin} error={error} />;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
                <button
                    onClick={handleLogout}
                    className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >
                    Log Out
                </button>
            </div>

            <SectionSelector selected={selectedSection} onChange={setSelectedSection} />
            {selectedSection === "home" && <HomeForm />}
            {selectedSection === "research" && <ResearchPanel />}
            {selectedSection === "publications" && <PublicationsForm />}
            {selectedSection === "team" && <TeamPanel />}
        </div>
    );
};

export default AdminPage;