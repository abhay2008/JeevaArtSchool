import React from 'react'
import {ArtWorkCard13, ArtWorkCard14, ArtWorkCard15, ArtWorkCard16} from './ArtWorkCard';
import Image from "next/image";
import Link from 'next/link';
import GoUp from '../assets/up.png';

type Props = {}

export default function Oil({}: Props) {
  return (
    <div className="h-screen flex relative overflow-hidden flex-col text-lft md:flex-row max-w-full px-10 justify-evenly mx-auto items-center text-center">
      <h3 className="absolute top-24 uppercase tracking-[15px] dark:text-gray-400 text-2xl">Oil Painting</h3>
    
    <div className="w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory mt-40">
      <ArtWorkCard13 />
      <ArtWorkCard14 />
      <ArtWorkCard15 />
      <ArtWorkCard16 />
    </div>
    <Link href="#hero" className="absolute bottom-4 right-4">
      <button className="p-1">
        <Image src={GoUp} alt="" width="30" height="30"/>
      </button>
    </Link>
    </div>
  )
}