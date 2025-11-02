interface PICardProps {
    name: string;
    degrees: string[];
    office?: string;
    email?: string;
    imageUrl: string;
}

const PICard: React.FC<PICardProps> = ({ name, degrees, office, email, imageUrl }) => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-white rounded shadow-md p-8">
                {/* Photo */}
                <div className="w-[200px] flex-shrink-0">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-auto rounded shadow object-cover"
                    />
                </div>

                {/* Description */}
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2">{name}</h3>

                    {degrees.map((degree, idx) => (
                        <p key={idx} className="text-gray-700">
                            {degree}
                        </p>
                    ))}

                    {office && <p className="mt-3 text-gray-700">Office: {office}</p>}
                    {email && <p className="text-gray-700">Email: {email}</p>}
                </div>
            </div>
        </div>
    );
};

export default PICard;
