"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Publication {
    citation: string;
    link?: string;
    year: number;
}

const PublicationsList: React.FC = () => {
    const [grouped, setGrouped] = useState<Record<number, Publication[]>>({});

    useEffect(() => {
        const fetchPublications = async () => {
            const snapshot = await getDocs(collection(db, "Publications"));
            const allPubs = snapshot.docs
                .map((doc) => doc.data() as Publication)
                .filter((pub) => pub.year);

            // Group by year
            const groupedByYear: Record<number, Publication[]> = {};
            for (const pub of allPubs) {
                if (!groupedByYear[pub.year]) groupedByYear[pub.year] = [];
                groupedByYear[pub.year].push(pub);
            }

            setGrouped(groupedByYear);
        };

        fetchPublications();
    }, []);

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            {Object.keys(grouped)
                .map(Number)
                .sort((a, b) => b - a) // 🔽 Sort years: newest to oldest
                .map((year) => (
                    <div key={year} className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">{year}</h3>
                        <ul className="space-y-3 text-sm leading-relaxed">
                            {grouped[year].map((pub, idx) => (
                                <li key={idx}>
                                    {pub.citation}
                                    {pub.link && (
                                        <a
                                            href={pub.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline ml-1"
                                        >
                                            [link]
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
        </div>
    );
};

export default PublicationsList;
