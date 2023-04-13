import React from 'react'
import { SocialIcon } from 'react-social-icons';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from "@fortawesome/free-brands-svg-icons";
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
type Props = {};

export default function Header({}: Props) {
  return (
    <header className="sticky top-0 flex items-start justify-between max-w-7xl mx-auto z-20 xl:items-center p-4">
      <motion.div initial={{
        x: -500,
        opacity: 0,
        scale: 0.5
      }} 
      animate={{
        x: 0,
        opacity: 1,
        scale: 1
      }}
      transition={{
        duration: 1.5
      }}
      className="flex flex-row items-center">
        {/* Social Icons */}
        <SocialIcon url="https://www.youtube.com/@jeevakumari3640" fgColor="red" bgColor="transparent"/>
        <SocialIcon url="https://www.instagram.com/jeevasri12" fgColor="violet" bgColor="transparent"/>
        <SocialIcon network="whatsapp" url="https://wa.me/919945067101" fgColor="green" bgColor="transparent"/>
      </motion.div>

      <motion.div 
      initial={{
        x: 500,
        opacity: 0,
        scale: 0.5
      }}
      animate={{
        x: 0,
        opacity: 1,
        scale: 1
      }}
      transition={{
        duration: 1.5
      }}
      className="flex flex-row items-center text-gray-300 cursor-pointer">
        <div className="text-2xl pt-2">
          <a href="https://goo.gl/maps/EJr4xqwJZS1abiPf9">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="dark:text-blue-500 text-blue-700"/>
          </a>
        </div>
        <p className="uppercase hidden md:inline-flex text-sm dark:text-gray-400 text-gray-700 px-2 pt-2">Location</p>
      </motion.div>
    </header>
  )
}