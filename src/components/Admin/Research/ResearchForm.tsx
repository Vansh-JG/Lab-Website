"use client";

import { useEffect, useRef, useState } from "react";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ResearchItem } from "./ResearchPanel";

interface ResearchFormProps {
    editItem: ResearchItem | null;
    onClearEdit: () => void;
    onRefresh: () => void;
}

const ResearchForm: React.FC<ResearchFormProps> = ({
    editItem,
    onClearEdit,
    onRefresh,
}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [publicationUrl, setPublicationUrl] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [formMessage, setFormMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editItem) {
            setTitle(editItem.title);
            setDescription(editItem.description);
            setPublicationUrl(editItem.publicationUrl);
            setImageFile(null);
            setPreviewUrl(null);
        }
    }, [editItem]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormMessage("");

        if (!title || !description || !publicationUrl || !imageFile) {
            setFormMessage("Please fill in all fields.");
            return;
        }

        try {
            new URL(publicationUrl);
        } catch {
            setFormMessage("Invalid publication URL.");
            return;
        }

        const fileExtension = imageFile.name.split(".").pop();
        const sanitizedName = title.trim().toLowerCase().replace(/\s+/g, "-");
        const renamedImage = new File(
            [imageFile],
            `${sanitizedName}.${fileExtension}`,
            { type: imageFile.type }
        );

        const imageUrl = `/Research/${renamedImage.name}`;
        const data = {
            title,
            description,
            publicationUrl,
            imageUrl,
        };

        try {
            if (editItem?.id) {
                const docRef = doc(db, "Research", editItem.id);
                await updateDoc(docRef, data);
                setFormMessage("✅ Research entry updated.");
            } else {
                await addDoc(collection(db, "Research"), data);
                setFormMessage("✅ Research entry added. Move image to /public/Research manually.");
            }

            setTitle("");
            setDescription("");
            setPublicationUrl("");
            setImageFile(null);
            setPreviewUrl(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            onClearEdit();
            onRefresh(); // 🔁 refresh table
        } catch (error) {
            console.error("Firestore error:", error);
            setFormMessage("❌ Error saving to Firestore.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-4"
        >
            <h2 className="text-xl font-bold text-center">
                {editItem ? "Edit Research Entry" : "Add Research Entry"}
            </h2>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
            />

            <input
                type="url"
                placeholder="Publication URL"
                value={publicationUrl}
                onChange={(e) => setPublicationUrl(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
            />

            <div className="w-full border px-3 py-2 rounded bg-gray-50 text-sm flex items-center justify-between">
                <span>{imageFile ? imageFile.name : "No file chosen"}</span>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setImageFile(file);
                        setPreviewUrl(file ? URL.createObjectURL(file) : null);
                    }}
                    ref={fileInputRef}
                    className="ml-4"
                    required
                />
            </div>

            {previewUrl && (
                <div className="w-full mt-2">
                    <p className="text-sm text-gray-600 mb-1">Preview:</p>
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full max-h-[200px] object-contain border rounded"
                    />
                </div>
            )}

            {formMessage && (
                <p className="text-center text-sm text-gray-600">{formMessage}</p>
            )}

            <div className="flex gap-4 justify-center">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                >
                    {editItem ? "Update" : "Add"}
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setTitle("");
                        setDescription("");
                        setPublicationUrl("");
                        setImageFile(null);
                        setPreviewUrl(null);
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

export default ResearchForm;
