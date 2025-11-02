"use client";

import { useEffect, useState } from "react";
import styles from './TextSection.module.css';
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const TextSection = () => {
  const [paragraph, setParagraph] = useState<string | null>(null);

  useEffect(() => {
    const fetchParagraph = async () => {
      const docRef = doc(db, "Home", "content");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setParagraph(data.paragraph || null);
      }
    };
    fetchParagraph();
  }, []);

  if (!paragraph) return null;

  return (
    <section className={styles.textSection}>
      <div className={styles.paragraph}>
        {paragraph.split("\n").map((para, index) => (
          <p key={index}>{para}</p>
        ))}
      </div>
    </section>
  );
};

export default TextSection;



