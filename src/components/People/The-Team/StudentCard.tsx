interface StudentCardProps {
    name: string;
    description: string;
    imageUrl: string;
}

const StudentCard: React.FC<StudentCardProps> = ({ name, description, imageUrl }) => {
    return (
        <div className="bg-white rounded shadow-md p-4 flex flex-col items-center">
            {/* Photo */}
            <div className="w-[150px] h-[150px] mb-4">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover rounded-full"
                />
            </div>

            {/* Description */}
            <div className="text-center">
                <h4 className="font-semibold">{name}</h4>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>
        </div>
    );
};

export default StudentCard;
