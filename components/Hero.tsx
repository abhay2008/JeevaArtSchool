import React from 'react';
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from './BackgroundCircles';
import Image from "next/image";
import MainImage from "../assets/mainimage.jpeg"
import Link from 'next/link';
import { useState, useEffect } from 'react';

type Props = {}

export default function Hero({}: Props) {
  const [imageScale, setImageScale] = useState(1);
  const [cardHeight, setCardHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;
      if (height < 700 && width < 700) {
        setImageScale(0.6);
        setCardHeight(height/1.4);
      } else if(height < 700 && width > 700) {
        setImageScale(height/1000);
        setCardHeight(height/1.4);
      } else if(height < 1000 && width < 700) {
        setImageScale(0.8);
        setCardHeight(height/1.7);
      }
      else {
        setImageScale(1);
        setCardHeight(height/1.3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [text, count] = useTypewriter({
    words: [
      "Learn all types of Art",
      "Pencil Shading",
      "Water Colour Painting",
      "Acrylic Painting",
      "Oil Painting",
      "Tanjore Painting",
      "Charcoal Shading"
    ],
    loop: true,
    delaySpeed: 2000
  })

  return (
    <div className="h-screen flex flex-col space-y-8 md:space-y-0 items-center justify-center text-center overflow-hidden pt-8 md:pt-10 xl:pt-28">
      <BackgroundCircles />
      <Image src={MainImage} className="relative rounded-full h-32 w-32 mx-auto object-cover" alt="" />

      <div className="z-20">
        <h2 className="text-2xl lg:text-4xl uppercase text-cyan-900 dark:text-cyan-100 tracking-[4px] font-bold">Jeeva Art School</h2>
        <h1 className="text-2xl lg:text-4xl font-semibold px-10">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#F7AB0A" />
        </h1>
      </div>

      <div className="z-20 pt-10 md:pt-28 space-x-1">
        <Link href="#about">
          <button className="heroButton xl:text-md">about teacher</button>
        </Link>
        <Link href="#acrylic">
          <button className="acrylic xl:text-md">Acrylic Painting</button>
        </Link>
        <Link href="#water">
          <button className="water xl:text-md">Water Colours</button>
        </Link>
        <Link href="#tanjore">
          <button className="tanjore xl:text-md">Tanjore Painting</button>
        </Link>
        <Link href="#oil">
          <button className="oil xl:text-md">Oil Painting</button>
        </Link>
        <Link href="#pencil">
          <button className="pencil xl:text-md">Pencil Shading</button>
        </Link>
        <Link href="#students">
          <button className="student xl:text-md">Emerging Artists</button>
        </Link>
        <Link href="#exam">
          <button className="exam xl:text-md">Drawing Exams</button>
        </Link>
      </div>
    </div>
  )
}
