import React from 'react';
import { motion } from "framer-motion";

type Props = {};

function BackgroundCircles({}: Props) {
  return (
    <motion.div
    initial={{
      opacity: 0,
    }}
    animate={{
      scale: [1, 2, 2, 3, 1],
      opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1.0],
      borderRadius: ["20%", "20%", "50%", "80%", "20%"]
    }}
    transition={{
      duration: 2.5
    }}
    className="relative flex justify-center items-center">
      <div className="absolute border border-[#97c5fd0c] dark:border-[#81ace010] rounded-full h-[13.5em] w-[13.5em] mt-52 animate-ping" />
      <div className="rounded-full border border-[#81ace00f] dark:border-[#81ace004] h-[220px] w-[220px] lg:h-[300px] absolute lg:w-[300px] mt-52" />
      <div className="rounded-full border border-[#81ace00e] dark:border-[#81ace005] h-[400px] lg:h-[500px] absolute lg:w-[500px] w-[400px] mt-52" />
      <div className="rounded-full border border-[#7065e4] opacity-20 h-[390px] w-[370px] lg:h-[625px] lg:w-[625px] absolute mt-52 animate-pulse"/>
      <div className="rounded-full border border-[#81ace005] dark:border-[#81ace009] lg:h-[800px] absolute lg:w-[800px] mt-52" />
    </motion.div>
  )
}

export default BackgroundCircles