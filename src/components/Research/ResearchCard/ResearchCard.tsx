import React from "react";
import Image from "next/image";
import styles from "./ResearchCard.module.css";

interface ResearchCardProps {
    title: string;
    description: string;
    imageUrl: string;
    publicationUrl: string;
}

const ResearchCard: React.FC<ResearchCardProps> = ({ title, description, imageUrl, publicationUrl}) => {
    return (
        <div className={styles.card}>
            {/* Image Section */}
            <div className={styles.imageContainer}>
                <Image src={imageUrl} alt={title} fill className={styles.image} />
            </div>

            {/* Text Section */}
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>

                {/* Button Aligned to Bottom */}
                <div className={styles.buttonContainer}>
                    {/* <button className={styles.button}>📖 View publications</button> */}
                    <a href={publicationUrl} target="_blank" rel="noopener noreferrer" className={styles.button}>
                        📖 View publications
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResearchCard;