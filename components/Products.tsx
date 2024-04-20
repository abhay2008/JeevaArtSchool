import React from 'react'
import {ExamCard, ProductCard} from './ArtWorkCard';
import Image from "next/image";
import Link from 'next/link';
import GoUp from '../assets/up.png';

type Props = {}

export default function Product({}: Props) {
  return (
    <div className="h-screen flex relative overflow-hidden flex-col text-left md:flex-row max-w-full px-10 justify-evenly mx-auto items-center text-center">
      <h3 className="absolute top-24 md:top-4 lg:top-4 uppercase tracking-[5px] text-red-600 text-2xl md:text-3xl lg:text-4xl font-extrabold">Artwork for sale</h3>
      <div className="w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory mt-40">
        <ProductCard />
      </div>
      <Link href="#hero" className="absolute bottom-20 md:bottom-40 lg:bottom-35 xl:bottom-10 right-1 ">
        <button className="p-1">
          <Image src={GoUp} alt="" width="30" height="30"/>
        </button>
      </Link>
    </div>
  )
}