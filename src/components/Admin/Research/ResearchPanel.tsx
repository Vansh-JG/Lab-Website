"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ResearchForm from "./ResearchForm";
import ResearchTable from "./ResearchTable";

export interface ResearchItem {
    id?: string;
    title: string;
    description: string;
    imageUrl: string;
    publicationUrl: string;
}

const ResearchPanel = () => {
    const [editItem, setEditItem] = useState<ResearchItem | null>(null);
    const [researchList, setResearchList] = useState<ResearchItem[]>([]);

    const fetchResearch = async () => {
        const snapshot = await getDocs(collection(db, "Research"));
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<ResearchItem, "id">),
        }));
        setResearchList(data);
    };

    useEffect(() => {
        fetchResearch();
    }, []);

    return (
        <div className="space-y-10">
            <ResearchForm
                editItem={editItem}
                onClearEdit={() => setEditItem(null)}
                onRefresh={fetchResearch} // ✅ passes refresh function to form
            />
            <ResearchTable
                researchList={researchList}
                onEdit={setEditItem}
                onRefresh={fetchResearch} // ✅ passes refresh function to table for delete
            />
        </div>
    );
};

export default ResearchPanel;