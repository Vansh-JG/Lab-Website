"use client";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TeamMember } from "./TeamPanel";

interface TeamTableProps {
    teamList: TeamMember[];
    onEdit: (member: TeamMember) => void;
    onRefresh: () => void;
}

const TeamTable: React.FC<TeamTableProps> = ({ teamList, onEdit, onRefresh }) => {
    const handleDelete = async (id: string) => {
        const confirmDelete = confirm("Are you sure you want to delete this member?");
        if (!confirmDelete) return;
        try {
            await deleteDoc(doc(db, "Team", id));
            onRefresh();
        } catch (error) {
            console.error("Error deleting team member:", error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4">Current Team Members</h2>
            {teamList.map((member) => (
                <div
                    key={member.id}
                    className="border border-gray-300 rounded p-4 mb-4 bg-white shadow"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold">{member.name}</h3>
                            <p className="text-sm text-gray-600">{member.description}</p>
                            <p className="text-xs text-gray-400">Category: {member.category}</p>
                            {member.office && <p className="text-xs text-gray-500">Office: {member.office}</p>}
                            {member.email && <p className="text-xs text-gray-500">Email: {member.email}</p>}
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => onEdit(member)}
                                className="text-blue-600 hover:underline"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(member.id!)}
                                className="text-red-600 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TeamTable;
