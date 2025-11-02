import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import Footer from "@/components/Footer/Footer";
import PublicationsList from "@/components/Publications/PublicationsList";

const Publications = () => {
    return(
        <>
            <Navbar />
            <Hero imageUrl="/publications.jpg" />
            <SectionHeader title="Publications" />
            <PublicationsList />
            <Footer />
        </>
    );
};

export default Publications;