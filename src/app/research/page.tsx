import Navbar from "../../components/Navbar/Navbar";
import ResearchList from "../../components/Research/ResearchList/ResearchList";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";
import SectionHeader from "../../components/SectionHeader/SectionHeader";

const Research = () => {
    return (
        <>
            <Navbar />
            <Hero imageUrl="/research.jpg" />
            <SectionHeader title="Research Areas" />
            <ResearchList />
            <Footer />
        </>
    );
};

export default Research;