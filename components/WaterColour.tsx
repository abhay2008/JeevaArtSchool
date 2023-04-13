import React from 'react'
import {ArtWorkCard5, ArtWorkCard6, ArtWorkCard7, ArtWorkCard8} from './ArtWorkCard'

type Props = {}

export default function Water({}: Props) {
  return (
    <div className="h-screen flex relative overflow-hidden flex-col text-lft md:flex-row max-w-full px-10 justify-evenly mx-auto items-center text-center">
      <h3 className="absolute top-24 uppercase tracking-[15px] dark:text-gray-400 text-2xl">Water Colour Painting</h3>
    
    <div className="w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory mt-40">
      <ArtWorkCard5 />
      <ArtWorkCard6 />
      <ArtWorkCard7 />
      <ArtWorkCard8 />
    </div>
    </div>
  )
}