import React from 'react'
import {ArtWorkCard24, ArtWorkCard25, ArtWorkCard26, ArtWorkCard27, ArtWorkCard28, ArtWorkCard29, ArtWorkCard30} from './ArtWorkCard';
import Image from "next/image";
import Link from 'next/link';
import GoUp from '../assets/up.png';

type Props = {}

export default function Students({}: Props) {
  return (
    <div className="h-screen flex relative overflow-hidden flex-col text-lft md:flex-row max-w-full px-10 justify-evenly mx-auto items-center text-center">
      <h3 className="absolute top-24 md:top-4 lg:top-4 uppercase tracking-[15px] dark:text-gray-400 text-2xl">Emerging Artists</h3>
    
    <div className="w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory mt-40 xl:mt-20 md:mt-10">
      <ArtWorkCard24 />
      <ArtWorkCard25 />
      <ArtWorkCard26 />
      <ArtWorkCard27 />
      <ArtWorkCard28 />
      <ArtWorkCard29 />
      <ArtWorkCard30 />
    </div>
    <Link href="#hero" className="absolute bottom-20 md:bottom-40 lg:bottom-35 xl:bottom-10 right-1 ">
      <button className="p-1">
        <Image src={GoUp} alt="" width="30" height="30"/>
      </button>
    </Link>
    </div>
  )
}