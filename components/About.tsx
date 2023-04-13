import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";
import MainImage from "../assets/pallete.png"
type Props = {}

export default function About({}: Props) {
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
        className="mt-16 md:mt-0 md:mb-0 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px]"
      >
        <Image className="flex-shrink-0 rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px]"
        src={MainImage}
        alt=""/>
      </motion.div>

      <div className="space-y-5 px-0 md:px-10">
        <h4 className="text-4xl font-semibold">
          Here is a{" "}
          <span className="underline decoration-[#9550fd]/50">little</span>{" "}
          background
        </h4>
        <p className="text-base">
        Hello! I am Jeeva Kumari. My career as an art teacher started in 2005. Teaching is my passion, though I am a commerce graduate, I chose Painting as my career. I coach children and adults for lower and higher grade drawing exams conducted by Karnataka Secondary Board.
        </p>
        <p className="text-lg font-bold text-orange-500 dark:text-yellow-200">
          <span className="text-cyan-700 dark:text-cyan-300">"</span>
          Being artistic or gifted is not a prerequisite for mastering Drawing, Painting, Sketching, and Pencil Shading. With practice and guidance, anyone can excel. Contact us to learn how.
          <span className="text-cyan-700 dark:text-cyan-300">"</span>
        </p>
        <h5 className="font-bold text-cyan-700">For further details contact <span className="text-blue-700 dark:text-blue-400">+91 99450 67101</span></h5>
      </div>
    </motion.div>
  );
}

// "You don't have to be artistic or a God-gifted to be good at Drawing, Painting, Sketching and Pencil Shading. With a few simple to moderate steps and a little practice, you can master them all. Want to know how? Just get in touch and we'll be happy to guide you."
// Hello! I am Jeeva Kumari. My career as an art teacher started in 2005. Teaching is my passion, though I am a commerce graduate, I chose Painting as my career. I coach children and adults for lower and higher grade drawing exams conducted by Karnataka Secondary Board.