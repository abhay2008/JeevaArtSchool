import React from 'react';
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from './BackgroundCircles';
import Image from "next/image";
import MainImage from "../assets/mainimage.jpeg"
import Link from 'next/link';

type Props = {}

export default function Hero({}: Props) {
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
  <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden pt-36">
    <BackgroundCircles />
    <Image src={MainImage} className="relative rounded-full h-32 w-32 mx-auto object-cover" alt="" />

    <div className="z-20">
      <h2 className="text-2xl lg:text-4xl uppercase text-cyan-900 dark:text-cyan-100 tracking-[4px] font-bold">Jeeva Art School</h2>
      <h1 className="text-2xl lg:text-4xl font-semibold px-10">
        <span className="mr-3">{text}</span>
        <Cursor cursorColor="#F7AB0A" />
      </h1>
    </div>
    <div className="z-20 pt-28 space-x-2">
        <Link href="#about">
        <button className="heroButton">about teacher</button>
        </Link>
        <Link href="#acrylic">
        <button className="acrylic">Acrylic Painting</button>
        </Link>
        <Link href="#water">
        <button className="water">Water Colours</button>
        </Link>
        <Link href="#tanjore">
        <button className="tanjore">Tanjore Painting</button>
        </Link>
        <Link href="#oil">
        <button className="oil">Oil Painting</button>
        </Link>
        <Link href="#pencil">
        <button className="pencil">Pencil Shading</button>
        </Link>
        <Link href="#students">
        <button className="student">Emerging Artists</button>
        </Link>
        <Link href="#exam">
        <button className="exam">Drawing Exams</button>
        </Link>
      </div>
  </div>
  )
}