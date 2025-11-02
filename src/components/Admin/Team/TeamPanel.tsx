"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import TeamForm from "./TeamForm";
import TeamTable from "./TeamTable";

export interface TeamMember {
    id?: string;
    name: string;
    description: string;
    category: "PI" | "grad" | "undergrad";
    imageUrl: string;
    office?: string;
    email?: string;
}

const TeamPanel = () => {
    const [editItem, setEditItem] = useState<TeamMember | null>(null);
    const [teamList, setTeamList] = useState<TeamMember[]>([]);

    const fetchTeam = async () => {
        const snapshot = await getDocs(collection(db, "Team"));
        const data: TeamMember[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<TeamMember, "id">),
        }));
        setTeamList(data);
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    return (
        <div className="space-y-10">
            <TeamForm
                editItem={editItem}
                onClearEdit={() => setEditItem(null)}
                onRefresh={fetchTeam}
            />
            <TeamTable
                teamList={teamList}
                onEdit={setEditItem}
                onRefresh={fetchTeam}
            />
        </div>
    );
};

export default TeamPanel;
