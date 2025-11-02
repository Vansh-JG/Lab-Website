"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

const PublicationsForm = () => {
    const [citation, setCitation] = useState("");
    const [inputType, setInputType] = useState("link"); // "link" or "pmid"
    const [inputValue, setInputValue] = useState("");
    const [year, setYear] = useState("");
    const [formMessage, setFormMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormMessage("");

        if (!citation || !inputValue || !year) {
            setFormMessage("Please fill in all fields.");
            return;
        }

        const numericYear = parseInt(year);
        if (isNaN(numericYear)) {
            setFormMessage("Year must be a valid number.");
            return;
        }

        let link = "";
        if (inputType === "link") {
            try {
                const url = new URL(inputValue);
                link = url.toString();
            } catch {
                setFormMessage("Invalid URL format.");
                return;
            }
        } else if (inputType === "pmid") {
            link = `https://pubmed.ncbi.nlm.nih.gov/${inputValue}/`;
        }

        try {
            await addDoc(collection(db, "Publications"), {
                citation,
                link,
                year: numericYear,
            });
            setFormMessage("Publication entry successfully added.");
            setCitation("");
            setInputValue("");
            setYear("");
            setInputType("link");
        } catch {
            setFormMessage("Failed to add publication entry.");
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Add Publication Entry</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <textarea
                    placeholder="Enter citation text"
                    value={citation}
                    onChange={(e) => setCitation(e.target.value)}
                    className="border px-4 py-2 rounded h-32"
                />

                <div className="flex gap-4 items-center">
                    <label className="font-medium">Link type:</label>
                    <label className="flex items-center gap-1">
                        <input
                            type="radio"
                            name="inputType"
                            value="link"
                            checked={inputType === "link"}
                            onChange={() => setInputType("link")}
                        />
                        Link
                    </label>
                    <label className="flex items-center gap-1">
                        <input
                            type="radio"
                            name="inputType"
                            value="pmid"
                            checked={inputType === "pmid"}
                            onChange={() => setInputType("pmid")}
                        />
                        PMID
                    </label>
                </div>

                <input
                    type="text"
                    placeholder={inputType === "link" ? "Enter full URL" : "Enter PMID number"}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="border px-4 py-2 rounded"
                />

                <input
                    type="number"
                    placeholder="Enter year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="border px-4 py-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit Publication
                </button>

                {formMessage && <p className="text-sm text-center text-gray-700">{formMessage}</p>}
            </form>
        </div>
    );
};

export default PublicationsForm;