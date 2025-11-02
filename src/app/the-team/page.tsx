"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

import Navbar from "@/components/Navbar/Navbar";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import Footer from "@/components/Footer/Footer";
import PICard from "@/components/People/The-Team/PICard";
import StudentCard from "@/components/People/The-Team/StudentCard";
import Hero from "@/components/Hero/Hero";

interface TeamMember {
    name: string;
    description: string;
    imageUrl: string;
    category: "PI" | "grad" | "undergrad" | "group-photo";
    office?: string;
    email?: string;
}

const TheTeam = () => {
    const [pi, setPI] = useState<TeamMember | null>(null);
    const [gradStudents, setGradStudents] = useState<TeamMember[]>([]);
    const [undergradStudents, setUndergradStudents] = useState<TeamMember[]>([]);
    const [groupPhotoUrl, setGroupPhotoUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeam = async () => {
            const snapshot = await getDocs(collection(db, "Team"));
            const team: TeamMember[] = snapshot.docs.map((doc) => doc.data() as TeamMember);

            setPI(team.find((person) => person.category === "PI") || null);
            setGradStudents(team.filter((person) => person.category === "grad"));
            setUndergradStudents(team.filter((person) => person.category === "undergrad"));
            setGroupPhotoUrl(team.find((person) => person.category === "group-photo")?.imageUrl || null);
        };

        fetchTeam();
    }, []);

    return (
        <>
            <Navbar />
            <Hero imageUrl="/the-team.jpg" />
            <SectionHeader title="The Team" />

            {/* Group Photo */}
            <div className="w-full max-w-6xl mx-auto px-4 py-6">
                <img
                    src={groupPhotoUrl || "/Team/default-group.png"}
                    alt="Group Photo"
                    className="w-full max-h-[400px] mx-auto rounded shadow-md object-cover"
                />
            </div>

            {/* Principal Investigator */}
            {pi && (
                <>
                    <hr className="border-t border-gray-300 my-6 w-3/4 mx-auto" />
                    <SectionHeader title="Principal Investigator" />
                    <PICard
                        name={pi.name}
                        degrees={[pi.description]}
                        office={pi.office}
                        email={pi.email}
                        imageUrl={pi.imageUrl}
                    />
                </>
            )}

            {/* Graduate Students */}
            {gradStudents.length > 0 && (
                <>
                    <hr className="border-t border-gray-300 my-6 w-3/4 mx-auto" />
                    <SectionHeader title="Graduate Students / Post-Doc" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 py-6">
                        {gradStudents.map((student, idx) => (
                            <StudentCard
                                key={idx}
                                name={student.name}
                                description={student.description}
                                imageUrl={student.imageUrl}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Undergraduate Students */}
            {undergradStudents.length > 0 && (
                <>
                    <hr className="border-t border-gray-300 my-6 w-3/4 mx-auto" />
                    <SectionHeader title="Undergraduate Students" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 py-6">
                        {undergradStudents.map((student, idx) => (
                            <StudentCard
                                key={idx}
                                name={student.name}
                                description={student.description}
                                imageUrl={student.imageUrl}
                            />
                        ))}
                    </div>
                </>
            )}

            <Footer />
        </>
    );
};

export default TheTeam;
