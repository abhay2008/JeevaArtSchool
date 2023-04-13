import React from 'react'
import {ArtWorkCard24, ArtWorkCard25, ArtWorkCard26, ArtWorkCard27, ArtWorkCard28, ArtWorkCard29, ArtWorkCard30} from './ArtWorkCard'

type Props = {}

export default function Students({}: Props) {
  return (
    <div className="h-screen flex relative overflow-hidden flex-col text-lft md:flex-row max-w-full px-10 justify-evenly mx-auto items-center text-center">
      <h3 className="absolute top-24 uppercase tracking-[15px] dark:text-gray-400 text-2xl">Emerging Artists</h3>
    
    <div className="w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory mt-40">
      <ArtWorkCard24 />
      <ArtWorkCard25 />
      <ArtWorkCard26 />
      <ArtWorkCard27 />
      <ArtWorkCard28 />
      <ArtWorkCard29 />
      <ArtWorkCard30 />
    </div>
    </div>
  )
}