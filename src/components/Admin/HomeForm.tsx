"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const HomeForm = () => {
    const [heading, setHeading] = useState("");
    const [paragraph, setParagraph] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [existingHeroImage, setExistingHeroImage] = useState<string | undefined>(undefined);
    const [existingHeading, setExistingHeading] = useState<string | undefined>(undefined);
    const [preview, setPreview] = useState(false);
    const [formMessage, setFormMessage] = useState("");

    useEffect(() => {
        const fetchHomeContent = async () => {
            const docRef = doc(db, "Home", "content");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setHeading(data.heading || "");
                setExistingHeading(data.heading || "");
                setParagraph(data.paragraph || "");
                setExistingHeroImage(data.heroImage);
            }
        };
        fetchHomeContent();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const heroImage = imageFile
            ? `/Hero/${imageFile.name}`
            : existingHeroImage || "";

        const finalHeading = heading.trim() ? heading : existingHeading || "";

        try {
            await setDoc(doc(db, "Home", "content"), {
                heading: finalHeading,
                paragraph,
                heroImage,
            });
            setFormMessage("Home content updated. Move the image to /public/Hero/ if new.");
            setHeading("");
            setParagraph("");
            setImageFile(null);
            setPreview(false);
            const input = document.querySelector("input[type='file']") as HTMLInputElement;
            if (input) input.value = "";
        } catch  {
            setFormMessage("Failed to update home content.");
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Update Home Page Content</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Welcome heading (optional)"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    className="border px-4 py-2 rounded"
                />
                <textarea
                    placeholder="Welcome paragraph"
                    value={paragraph}
                    onChange={(e) => setParagraph(e.target.value)}
                    className="border px-4 py-2 rounded h-32"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="border px-4 py-2 rounded"
                />
                <div className="flex items-center gap-4">
                    <label className="text-sm">
                        <input
                            type="checkbox"
                            checked={preview}
                            onChange={() => setPreview(!preview)}
                            className="mr-2"
                        />
                        Preview
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
                {formMessage && <p className="text-sm text-center text-gray-700">{formMessage}</p>}
            </form>

            {preview && (
                <div className="mt-6 p-4 border rounded bg-gray-50">
                    <h2 className="text-xl font-bold mb-2">{heading.trim() || existingHeading}</h2>
                    <p className="text-sm text-gray-700">{paragraph}</p>
                    {(imageFile || existingHeroImage) && (
                        <div className="mt-4">
                            <p className="text-xs mb-1 text-gray-500">Image Preview:</p>
                            <img
                                src={imageFile ? URL.createObjectURL(imageFile) : existingHeroImage}
                                alt="Hero Preview"
                                className="w-full rounded"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HomeForm;