"use client";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ResearchItem } from "./ResearchPanel";

interface ResearchTableProps {
    researchList: ResearchItem[];
    onEdit: (item: ResearchItem) => void;
    onRefresh: () => void;
}

const ResearchTable: React.FC<ResearchTableProps> = ({
    researchList,
    onEdit,
    onRefresh,
}) => {
    const handleDelete = async (id: string) => {
        const confirmed = confirm("Are you sure you want to delete this?");
        if (!confirmed) return;

        try {
            await deleteDoc(doc(db, "Research", id));
            onRefresh(); // 🔁 Refresh list after delete
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4">Existing Research</h2>
            {researchList.map((item) => (
                <div
                    key={item.id}
                    className="border border-gray-300 rounded p-4 mb-4 bg-white shadow"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-700 line-clamp-2">
                                {item.description}
                            </p>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => onEdit(item)}
                                className="text-blue-600 hover:underline"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item.id!)}
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

export default ResearchTable;
