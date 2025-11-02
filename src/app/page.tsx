"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import TextSection from "../components/Home/TextSection/TextSection";
import Footer from "../components/Footer/Footer";
import SectionHeader from "../components/SectionHeader/SectionHeader";

const Home = () => {
  const [heading, setHeading] = useState("");

  useEffect(() => {
    const fetchHeading = async () => {
      const docRef = doc(db, "Home", "content");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setHeading(data.heading || "Welcome");
      }
    };
    fetchHeading();
  }, []);

  return (
    <>
      <Head>
        <title>Venugopal Lab</title>
        <meta name="description" content="Welcome to Venugopal Lab's research website" />
        <meta name="keywords" content="Venugopal, lab, research, publications, team" />
      </Head>
      <Navbar />
      <Hero imageUrl="/home.jpg" />
      <SectionHeader title={heading} />
      <TextSection />
      <Footer />
    </>
  );
};

export default Home;
