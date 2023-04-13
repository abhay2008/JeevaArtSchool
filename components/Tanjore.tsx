import React from 'react'
import {ArtWorkCard9, ArtWorkCard10, ArtWorkCard11, ArtWorkCard12} from './ArtWorkCard'

type Props = {}

export default function Tanjore({}: Props) {
  return (
    <div className="h-screen flex relative overflow-hidden flex-col text-lft md:flex-row max-w-full px-10 justify-evenly mx-auto items-center text-center">
      <h3 className="absolute top-24 uppercase tracking-[15px] dark:text-gray-400 text-2xl">Tanjore Painting</h3>
    
    <div className="w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory mt-40">
      <ArtWorkCard9 />
      <ArtWorkCard10 />
      <ArtWorkCard11 />
      <ArtWorkCard12 />
    </div>
    </div>
  )
}