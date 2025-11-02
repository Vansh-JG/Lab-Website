"use client";

interface SectionSelectorProps {
    selected: string;
    onChange: (value: string) => void;
}

const SectionSelector: React.FC<SectionSelectorProps> = ({ selected, onChange }) => {
    return (
        <div>
            <label className="block mb-2 font-medium">Select a section to manage:</label>
            <select
                className="border px-4 py-2 rounded mb-6"
                value={selected}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">-- Select Page --</option>
                <option value="home">Home</option>
                <option value="research">Research</option>
                <option value="team">Team</option>
                <option value="publications">Publications</option>
                <option value="resources">Resources</option>
            </select>
        </div>
    );
};

export default SectionSelector;
