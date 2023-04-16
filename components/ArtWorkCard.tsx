import React from 'react';
import Image from "next/image";
import Acrylic1 from "../assets/acrylic.jpeg";
import Acrylic2 from "../assets/acrylicboat.jpeg";
import Acrylic3 from "../assets/horse.jpeg";
import Acrylic4 from "../assets/arcylicvase.jpeg";
import Water1 from "../assets/water.jpeg";
import Water2 from "../assets/coconut.jpeg";
import Water3 from "../assets/templewater.jpeg";
import Water4 from "../assets/loafwater.jpeg";
import Tanjore1 from "../assets/tanjore.jpeg";
import Tanjore2 from "../assets/tanjorekrishna.jpeg";
import Tanjore3 from "../assets/tanjoreganesh.jpeg";
import Tanjore4 from "../assets/tanjorekrish.jpeg";
import Oil1 from "../assets/oil1.jpeg";
import Oil2 from "../assets/oil2.jpeg";
import Oil3 from "../assets/oil3.jpeg";
import Oil4 from "../assets/oil4.jpeg";
import Pencil1 from "../assets/pencil1.jpeg";
import Pencil2 from "../assets/pencil2.jpeg";
import Pencil3 from "../assets/pencil3.jpeg";
import Pencil4 from "../assets/pencil4.jpeg";
import Charcoal1 from "../assets/charcoal.jpeg";
import Charcoal2 from "../assets/charcoal2.jpeg";
import Charcoal3 from "../assets/charcoal3.jpeg";
import student1 from "../assets/studentvasant.jpeg";
import student2 from "../assets/studentabhay.jpeg";
import student3 from "../assets/studentabhinav.jpeg";
import studentlast from "../assets/studentcharu.jpeg";
import student4 from "../assets/studentsinchana.jpeg";
import student5 from "../assets/studentabhay2.jpeg";
import student6 from "../assets/studentabhay3.jpeg";
import { useState, useEffect } from 'react';
import {motion} from "framer-motion";

type Props = {}

export function ArtWorkCard1() {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:h-[600px] md:w-[510px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#a6341e] bg-[#ffb784] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold ">A Forest Scenery</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">painting of a forest lake with animals and trees</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="xl:w-[500px] xl:h-[500px] xl:p-5 xl:pb-5">
        <Image className="rounded-md object-cover object-center" src={Acrylic1} alt="" width={500 * imageScale} height={500 * imageScale} />
      </motion.div>
    </article>
  )
}


export function ArtWorkCard2({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#a6341e] bg-[#ffb784] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">An Ocean view</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold pb-9 md:pb-0">painting of a turqoise ocean with sail boats</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="xl:w-[450px] xl:h-[400px] xl:p-5">
        <Image className="rounded-md object-cover object-center" src={Acrylic2} alt="" width={500 * imageScale} height={500 * imageScale}/>
      </motion.div>
    </article>
  )
}

export function ArtWorkCard3({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#a6341e] bg-[#ffb784] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">A Horse</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">painting of a brown horse</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="md:w-[300px] md:h-[500px] xl:w-[350px] xl:h-[500px] xl:p-5">
        <Image className="rounded-md object-cover object-center" src={Acrylic3} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}

export function ArtWorkCard4({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#a6341e] bg-[#ffb784] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">A Flower Vase</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">painting of a vase filled with white flowers</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="md:w-[350px] md:h-[500px] xl:w-[450px] xl:h-[500px] xl:p-5">
        <Image className="rounded-md object-cover object-center" src={Acrylic4} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}

export function ArtWorkCard5({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#1a2b45] bg-[#84b1ff] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">Water Colour Peonies</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">painting of crimson peonies</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="md:w-[350px] md:h-[500px] xl:w-[350px] xl:h-[500px] xl:p-5">
        <Image className="rounded-md object-cover object-center" src={Water1} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}

export function ArtWorkCard6({}: Props) {const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#1a2b45] bg-[#84b1ff] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">A coconut village</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">painting of a village filled with coconut trees</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="md:w-[420px] md:h-[500px] xl:w-[600px] xl:h-[500px] xl:p-5">
        <Image className="rounded-md object-cover object-center" src={Water2} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}

export function ArtWorkCard7({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#1a2b45] bg-[#84b1ff] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">A traditional Temple</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">painting of a simplistic temple</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="w-[280px] md:w-[400px] md:h-[500px] xl:w-[600px] xl:h-[500px] xl:p-5">
        <Image className="rounded-md object-cover object-center" src={Water3} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}
export function ArtWorkCard8({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#1a2b45] bg-[#84b1ff] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">A Portrait</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">portrait painting of a child wearing a british hat</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="md:w-[300px] md:h-[450px] xl:w-[350px] xl:h-[500px] xl:p-5">
        <Image className="rounded-md object-cover object-center" src={Water4} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}

export function ArtWorkCard9({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#404414] bg-[#f4ffac] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-3xl font-bold">Goddess Lakshmi</h2>
        {showText && <p className="text-lg mt-2 dark:text-green-300 text-green-700 font-bold">tanjore painting of the goddess of wealth</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="p-7 md:w-[300px] md:h-[500px] xl:w-[360px] xl:h-[500px] xl:p-10">
        <Image className="rounded-md object-cover object-center" src={Tanjore1} alt="" width={420 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}

export function ArtWorkCard10({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#404414] bg-[#f4ffac] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">Alellai Krishna</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">tanjore painting of Lord Krishna on lotus alellai leaf</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="md:w-[350px] md:h-[500px] xl:w-[350px] xl:h-[500px] xl:p-5">
        <Image className="rounded-md object-cover object-center" src={Tanjore4} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}

export function ArtWorkCard11({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#404414] bg-[#f4ffac] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">Lord Ganesha</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">tanjore painting of Lord Ganesha</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="md:w-[350px] md:h-[500px] xl:w-[350px] xl:h-[500px] xl:p-5">
        <Image className="rounded-md object-cover object-center" src={Tanjore3} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}

export function ArtWorkCard12({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#404414] bg-[#f4ffac] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">Lord Krishna</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">painting of baby Krishna</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="p-6 md:p-10 md:w-[350px] md:h-[500px] xl:w-[350px] xl:h-[500px] xl:p-9">
        <Image className="rounded-md object-cover object-center" src={Tanjore2} alt="" width={420 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}

export function ArtWorkCard13({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#1c351f] bg-[#adffa4] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">Smooth Mountains</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">painting of a lake and mountains in the background</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="p-6 md:p-10 md:w-[400px] md:h-[500px] xl:w-[450px] xl:h-[500px] xl:p-9">
        <Image className="rounded-md object-cover object-center" src={Oil1} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}
export function ArtWorkCard14({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#1c351f] bg-[#adffa4] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">Alpine scenery</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">painting of mountains, a pond and trees</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="p-6 md:p-10 md:w-[400px] md:h-[500px] xl:w-[450px] xl:h-[500px] xl:p-9">
        <Image className="rounded-md object-cover object-center" src={Oil2} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}
export function ArtWorkCard15({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#1c351f] bg-[#adffa4] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">Serene River</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">painting of a calm river with plenty of trees on the side</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="p-6 md:p-10 md:w-[400px] md:h-[500px] xl:w-[450px] xl:h-[500px] xl:p-9">
        <Image className="rounded-md object-cover object-center" src={Oil3} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}
export function ArtWorkCard16({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#1c351f] bg-[#adffa4] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">Colorful contrast</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">Ladybugs on white, a colorful painting captured</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="p-6 md:p-10 md:w-[400px] md:h-[500px] xl:w-[450px] xl:h-[500px] xl:p-9">
        <Image className="rounded-md object-cover object-center" src={Oil4} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}

export function ArtWorkCard17({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#2b213e] bg-[#c098ff] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">An Elephant</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">pencil shading of an elephant</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="p-6 md:p-10 md:w-[380px] md:h-[500px] xl:w-[400px] xl:h-[500px] xl:p-9">
        <Image className="rounded-md object-cover object-center" src={Pencil1} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}
export function ArtWorkCard18({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#2b213e] bg-[#c098ff] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">An Old Man</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">pencil shading of an old man with wrinkles</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="p-6 md:p-10 md:w-[400px] md:h-[500px] xl:w-[400px] xl:h-[500px] xl:p-9">
        <Image className="rounded-md object-cover object-center" src={Pencil2} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}
export function ArtWorkCard19({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#2b213e] bg-[#c098ff] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">An old woman</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">pencil shading of a wrinkled woman</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="p-6 md:p-10 md:w-[400px] md:h-[500px] xl:w-[450px] xl:h-[500px] xl:p-9">
        <Image className="rounded-md object-cover object-center" src={Pencil3} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}
export function ArtWorkCard20({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#2b213e] bg-[#c09bfc] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">A young woman</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">pencil shading portrait of a woman</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="p-6 md:p-10 md:w-[400px] md:h-[500px] xl:w-[450px] xl:h-[500px] xl:p-9">
        <Image className="rounded-md object-cover object-center" src={Pencil4} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}
export function ArtWorkCard21({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#3a213e] bg-[#f1a7fc] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">Charcoal portait</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold"></p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="p-6 md:p-10 md:w-[370px] md:h-[500px] xl:w-[370px] xl:h-[500px] xl:p-9">
        <Image className="rounded-md object-cover object-center" src={Charcoal1} alt="" width={420 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}
export function ArtWorkCard22({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#3a213e] bg-[#f1a7fc] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">Charcoal portrait</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">Marilyn Monroe</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="p-6 md:p-10 md:w-[400px] md:h-[500px] xl:w-[450px] xl:h-[500px] xl:p-9">
        <Image className="rounded-md object-cover object-center" src={Charcoal2} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}
export function ArtWorkCard23({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#3a213e] bg-[#f1a7fc] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">Pencil shading portrait</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold"></p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="p-6 md:p-10 md:w-[400px] md:h-[500px] xl:w-[420px] xl:h-[500px] xl:p-13">
        <Image className="rounded-md object-cover object-center" src={Charcoal3} alt="" width={420 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}

export function ArtWorkCard24({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#69c8cf] bg-[#9becfd] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">Vasanth</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">Acrylic Painting</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="p-6 w-[380px] md:p-10 md:w-[460px] md:h-[500px] xl:w-[500px] xl:h-[500px] xl:p-13">
        <Image className="rounded-md object-cover object-center" src={student1} alt="" width={700 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}
export function ArtWorkCard25({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#69c8cf] bg-[#9becfd] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">Abhay</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">Oil Painting</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="p-6 md:p-10 md:w-[400px] md:h-[500px] xl:w-[420px] xl:h-[500px] xl:p-13">
        <Image className="rounded-md object-cover object-center" src={student5} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}
export function ArtWorkCard26({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#69c8cf] bg-[#9becfd] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">Abhay</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">Oil Painting</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="p-6 md:p-10 md:w-[400px] md:h-[500px] xl:w-[400px] xl:h-[500px] xl:p-13">
        <Image className="rounded-md object-cover object-center" src={student6} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}
export function ArtWorkCard27({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#69c8cf] bg-[#9becfd] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">Abhay</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">Acrylic Painting</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="p-6 md:p-10 md:w-[400px] md:h-[500px] xl:w-[420px] xl:h-[500px] xl:p-13">
        <Image className="rounded-md object-cover object-center" src={student2} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}
export function ArtWorkCard28({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#69c8cf] bg-[#9becfd] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">Abhinav</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">Acrylic Painting</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="p-6 md:p-10 md:w-[370px] md:h-[500px] xl:w-[380px] xl:h-[500px] xl:p-13">
        <Image className="rounded-md object-cover object-center" src={student3} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}
export function ArtWorkCard29({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#69c8cf] bg-[#9becfd] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">Sinchana</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">Oil Painting</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="p-6 md:p-10 md:w-[400px] md:h-[500px] xl:w-[420px] xl:h-[500px] xl:p-13">
        <Image className="rounded-md object-cover object-center" src={student4} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}
export function ArtWorkCard30({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setImageScale(0.4);
        setShowText(false);
      } else {
        setImageScale(1);
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#69c8cf] bg-[#9becfd] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <div className="px-0 md:px-10">
        <h2 className="text-4xl font-bold">Charu</h2>
        {showText && <p className="text-xl mt-2 dark:text-green-300 text-green-700 font-bold">Pencil and charcoal shading</p>}
      </div>
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="p-6 md:p-10 md:w-[400px] md:h-[500px] xl:w-[400px] xl:h-[500px] xl:p-13">
        <Image className="rounded-md object-cover object-center" src={studentlast} alt="" width={500 * imageScale} height={500 * imageScale}></Image>
      </motion.div>
    </article>
  )
}

export function ExamCard({}: Props) {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) {
        setShowText(false);
      } else {
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[310px] md:w-[510px] md:h-[600px] xl:w-[1100px] xl:h-[600px] snap-center p-10 dark:bg-[#201f2d] bg-[#9ba0fd] cursor-pointer transition-opacity duration-200 overflow-hidden text-center">
      <h2 className="text-3xl lg:text-4xl font-bold">INFO</h2>
      {showText && <p className="text-lg md:text-xl mt-2 xl:text-2xl dark:text-green-300 text-green-700 font-bold">Get ready to excel in your artistic skills with our comprehensive 6-month exam coaching program! With six exciting subjects to learn - object drawing, memory drawing, nature coloring, geometry, design, and coloring, as well as free-hand drawing - you'll develop the creativity and confidence you need to succeed. This program is open to children aged 13 and above, so don't miss this opportunity to unleash your artistic potential!</p>}
      {!showText && <p className="text-lg md:text-xl mt-2 xl:text-2xl dark:text-green-300 text-green-700 font-bold">Enroll in our 6-month art coaching program and unlock your creative potential through six exciting subjects including object drawing, memory drawing, nature coloring, geometry, design, and coloring, plus free-hand drawing. Open to kids 13 and up.</p>}
    </article>
  )
}