import About from "../components/About";
import type { NextPage } from "next";
import Head from 'next/head';
import Header from "../components/Header";
import Hero from "../components/Hero";
import Acrylic from "@/components/Acrylic";
import Water from "@/components/WaterColour";
import Tanjore from "@/components/Tanjore";
import Oil from "@/components/Oil"
import Pencil from "@/components/Pencil";
import Students from "@/components/Students";
import Exam from "@/components/Exam"


const Home: NextPage = () => {
  return (
    <div className="bg-[rgba(115,176,250,0.5)] text-black-900 dark:bg-[#243447] dark:text-white h-screen snap-y snap-mandatory overflow-scroll z-0">
      <Head>
        <title>Jeeva Art School</title>
      </Head>
      {/* Header */}
      <Header/>
      {/* Hero */}
      <section id="hero" className="snap-center">
      <Hero />
      </section>
      {/* About */}
      <section id="about" className="snap-center">
        <About />
      </section>
      {/* Experience */}
      <section id="acrylic" className="snap-center">
        <Acrylic />
      </section>
      <section id="water" className="snap-center">
        <Water />
      </section>
      <section id="tanjore" className="snap-center">
        <Tanjore />
      </section>
      <section id="oil" className="snap-center">
        <Oil />
      </section>
      <section id="pencil" className="snap-center">
        <Pencil />
      </section>
      <section id="students" className="snap-center">
        <Students />
      </section>
      <section id="exam" className="snap-center">
        <Exam />
      </section>
    </div>
  )
}

export default Home;