import React from 'react'
import {ArtWorkCard17, ArtWorkCard18, ArtWorkCard19, ArtWorkCard20, ArtWorkCard21, ArtWorkCard22, ArtWorkCard23} from './ArtWorkCard'

type Props = {}

export default function Pencil({}: Props) {
  return (
    <div className="h-screen flex relative overflow-hidden flex-col text-lft md:flex-row max-w-full px-10 justify-evenly mx-auto items-center text-center">
      <h3 className="absolute top-24 uppercase tracking-[15px] dark:text-gray-400 text-2xl">Pencil and charcoal shading</h3>
    
    <div className="w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory mt-40">
      <ArtWorkCard17 />
      <ArtWorkCard18 />
      <ArtWorkCard19 />
      <ArtWorkCard20 />
      <ArtWorkCard21 />
      <ArtWorkCard22 />
      <ArtWorkCard23 />
    </div>
    </div>
  )
}