import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import Footer from "@/components/Footer/Footer";

const Contact = () => {
    return(
        <>
            <Navbar />
            <Hero imageUrl="/contact.jpg"/>
            <SectionHeader title="Contact Us"/>
            <Footer />
        </>
    );
};

export default Contact;