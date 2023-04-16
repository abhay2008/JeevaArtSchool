import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";
import MainImage from "../assets/pallete.png";
import Link from 'next/link';
import GoUp from '../assets/up.png'

type Props = {}

export default function About({}: Props) {
  const [height, setHeight] = React.useState<number | undefined>(undefined);
  const [width, setWidth] = React.useState<number | undefined>(undefined);
  const [copySuccess, setCopySuccess] = React.useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText("+91 99450 67101");
    setCopySuccess(true);
  }
  React.useEffect(() => {
    setHeight(window.innerHeight);
    const handleResize = () => setHeight(window.innerHeight);
    setWidth(window.innerWidth);
    const handleResize2 = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize2);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleResize2);
    };
  }, []);  

  const shouldDisplayImage = (height !== undefined) && height >= 820 || width >= 500;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex relative flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl">
        About
      </h3>

      {shouldDisplayImage && (
        <motion.div
        initial={{
          x: -200,
          opacity: 0,
        }}
        transition={{
          duration: 1.2,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
        viewport={{ once: true }}
        className="mt-8 -mb-12 md:mt-0 md:mb-0 flex-shrink-0 w-40 h-40 rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[500px]"
      >
        <Image className="flex-shrink-0 rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px]"
        src={MainImage}
        alt=""/>
      </motion.div>      
      )}

      <div className="space-y-3 px-0 md:px-10 ">
        <h4 className="text-2xl md:text-4xl font-semibold">
          Here is a{" "}
          <span className="underline decoration-[#9550fd]/50">little</span>{" "}
          background
        </h4>
        <p className="text-base">
        I'm Jeeva Kumari, an art teacher since 2005. I'm passionate about teaching Painting, Drawing, and Sketching to all ages. I provide coaching for drawing exams conducted by the Karnataka Secondary Board.
        </p>
        <p className="text-lg font-bold text-orange-500 dark:text-yellow-200">
          <span className="text-cyan-700 dark:text-cyan-300">"</span>
          You don't need natural talent to master art. With guidance and practice, anyone can excel. Contact us.
          <span className="text-cyan-700 dark:text-cyan-300">"</span>
        </p>
        <h5 className="font-bold text-cyan-700">For further details contact <span className="text-blue-700 dark:text-blue-400 underline hover:text-blue-900 dark:hover:text-blue-100 cursor-pointer" onClick={copyToClipboard}>+91 99450 67101</span>{copySuccess && <span className="text-green-500 p-5">Copied!</span>}
</h5>
        <Link href="#hero" className="absolute bottom-4 right-4">
          <button className="p-1">
          <Image src={GoUp} alt="" width="30" height="30"/>
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
