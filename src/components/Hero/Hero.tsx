import styles from './Hero.module.css';

interface HeroProps {
    imageUrl: string;
}

const Hero: React.FC<HeroProps> = ({ imageUrl }) => {
    return (
        <section
            className={styles.hero}
            style={{ backgroundImage: `url(/Hero${imageUrl})` }}
        >
            <div className={styles.overlay}>
                {/* Optional: Add title/subtitle here */}
            </div>
        </section>
    );
};

export default Hero;
