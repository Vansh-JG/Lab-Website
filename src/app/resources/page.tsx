import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import Footer from "@/components/Footer/Footer";

const Resources = () => {
    return(
        <>
            <Navbar />
            <Hero imageUrl="/resources.png" />
            <SectionHeader title="Resources" />
            <Footer />
        </>
    );
};
export default Resources;