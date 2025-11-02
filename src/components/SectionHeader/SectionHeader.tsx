import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
    title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
    return <h1 className={styles.heading}>{title}</h1>;
};

export default SectionHeader;