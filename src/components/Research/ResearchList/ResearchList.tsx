"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ResearchCard from "../ResearchCard/ResearchCard";
import styles from "./ResearchList.module.css";

interface ResearchItem {
    title: string;
    description: string;
    imageUrl: string;
    publicationUrl: string;
}

const ResearchList: React.FC = () => {
    const [researchData, setResearchData] = useState<ResearchItem[]>([]);

    useEffect(() => {
        const fetchResearch = async () => {
            const querySnapshot = await getDocs(collection(db, "Research"));
            const data: ResearchItem[] = querySnapshot.docs.map(doc => doc.data() as ResearchItem);
            setResearchData(data);
        };

        fetchResearch();
    }, []);

    return (
        <div className={styles.researchContainer}>
            {researchData.map((item, index) => (
                <ResearchCard key={index} {...item} />
            ))}
        </div>
    );
};

export default ResearchList;