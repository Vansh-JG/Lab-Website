"use client";

import { useState, useRef, useEffect } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TeamMember, TeamCategory } from "./TeamPanel";

interface TeamFormProps {
    editItem: TeamMember | null;
    onClearEdit: () => void;
    onRefresh: () => void;
}

const CATEGORY_OPTIONS: TeamCategory[] = ["PI", "grad", "undergrad", "group-photo"];

const TeamForm: React.FC<TeamFormProps> = ({ editItem, onClearEdit, onRefresh }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<TeamCategory>("PI");
    const [office, setOffice] = useState("");
    const [email, setEmail] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formMessage, setFormMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editItem) {
            setName(editItem.name);
            setDescription(editItem.description);
            setCategory(editItem.category);
            setOffice(editItem.office || "");
            setEmail(editItem.email || "");
            setImageFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    }, [editItem]);

    const handleCategoryChange = (value: string) => {
        if (CATEGORY_OPTIONS.includes(value as TeamCategory)) {
            setCategory(value as TeamCategory);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (category !== "group-photo" && (!name || !description || (category === "PI" && (!office || !email)))) {
            setFormMessage("Please fill in all required fields.");
            return;
        }

        if (!imageFile) {
            setFormMessage("Please select an image.");
            return;
        }

        const fileExtension = imageFile.name.split(".").pop();
        const sanitizedName = name.trim().toLowerCase().replace(/\s+/g, "-");

        const newName = category === "group-photo"
            ? `group-photo.${fileExtension}`
            : `${sanitizedName}-${category.toLowerCase()}.${fileExtension}`;

        const folderName = category === "PI"
            ? "PI-photo"
            : category === "grad"
                ? "Grad-photo"
                : category === "undergrad"
                    ? "Undergrad-photo"
                    : "";

        const imageUrl = `/Team/${folderName}${folderName ? "/" : ""}${newName}`;

        const docData: Omit<TeamMember, "id"> = {
            name,
            description,
            category,
            imageUrl,
        };

        if (category === "PI") {
            docData.office = office;
            docData.email = email;
        }

        try {
            if (editItem?.id) {
                const docRef = doc(db, "Team", editItem.id);
                await updateDoc(docRef, docData);
                setFormMessage("✅ Team member updated successfully.");
            } else {
                await addDoc(collection(db, "Team"), docData);
                setFormMessage("✅ Entry added. Move the image to /public/Team manually.");
            }

            setName("");
            setDescription("");
            setOffice("");
            setEmail("");
            setCategory("PI");
            setImageFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            onClearEdit();
            onRefresh();
        } catch (error) {
            console.error("Error saving to Firestore:", error);
            setFormMessage("❌ Error saving to Firestore.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-4">
            <h2 className="text-xl font-bold text-center">
                {editItem ? "Edit Team Member" : "Add Team Member"}
            </h2>

            {category !== "group-photo" && (
                <>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />

                    <textarea
                        placeholder="Description (e.g., Ph.D. in Bioengineering)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </>
            )}

            <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full border px-3 py-2 rounded"
            >
                <option value="PI">Principal Investigator</option>
                <option value="grad">Graduate Students / Post-Doc</option>
                <option value="undergrad">Undergraduate Students</option>
                <option value="group-photo">Group Photo</option>
            </select>

            {category === "PI" && (
                <>
                    <input
                        type="text"
                        placeholder="Office"
                        value={office}
                        onChange={(e) => setOffice(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </>
            )}

            <div className="w-full border px-3 py-2 rounded bg-gray-50 text-sm flex items-center justify-between">
                <span>{imageFile ? imageFile.name : "No file chosen"}</span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    ref={fileInputRef}
                    className="ml-4"
                    required
                />
            </div>

            {formMessage && <p className="text-center text-sm text-gray-600">{formMessage}</p>}

            <div className="flex gap-4 justify-center">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
                    {editItem ? "Update" : "Add"}
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setName("");
                        setDescription("");
                        setOffice("");
                        setEmail("");
                        setCategory("PI");
                        setImageFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                        onClearEdit();
                    }}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded"
                >
                    Reset
                </button>
            </div>
        </form>
    );
};

export default TeamForm;
