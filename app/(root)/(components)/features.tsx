import { Book, CircleDollarSign, Globe, Notebook } from 'lucide-react'
import React from 'react'

const Features = () => {
  return (
    <section className="py-2">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
            <span
                className="py-1 px-4 bg-indigo-100 rounded-full text-xs font-medium text-indigo-600 text-center">Features</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold text-[#00E599] py-5">
                Revolutionary Features
            </h2>
            <p className="text-lg font-normal text-gray-500 max-w-md md:max-w-2xl mx-auto">
                Provides advanced features like Search funtionality, reading mode,
                secure payment method, create your own book.
            </p>
        </div>
        <div
            className="flex justify-center items-center gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
            <div className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
                <div className="rounded-lg flex justify-center items-center mb-3 w-20 h-20 mx-auto cursor-pointer transition-all text-indigo-600  duration-500 group-hover:bg-indigo-600 group-hover:text-white">
                   <Book size={30}/>
                </div>
                <h4 className="text-lg font-medium text-white mb-3 capitalize">
                    Free Books
                </h4>
                <p className="text-sm font-normal text-gray-400">
                    We provide 70% free books with unlimited access.
                </p>
            </div>
            <div className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
                <div className="rounded-lg flex justify-center items-center mb-3 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 text-pink-600 group-hover:text-white  group-hover:bg-pink-600">
                <CircleDollarSign size={30} />

                </div>
                <h4 className="text-lg font-medium text-white mb-3 capitalize">
                    Secure Payment
                </h4>
                <p className="text-sm font-normal text-gray-400">
                   We provide fastest and secure payment for paid ebook.
                </p>
            </div>
            <div className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
                <div className="rounded-lg flex justify-center items-center mb-3 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 text-teal-600 group-hover:text-white group-hover:bg-teal-600">
                <Notebook size={30} />
                </div>
                <h4 className="text-lg font-medium text-white mb-3 capitalize">
                    Reading Mode
                </h4>
                <p className="text-sm font-normal text-gray-400">
                   We provide best and seamless reading mode.
                </p>
            </div>
            <div className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
                <div className=" rounded-lg flex justify-center items-center mb-3 w-20 h-20 mx-auto cursor-pointer text-orange-600 group-hover:text-white  transition-all duration-500 group-hover:bg-orange-600">
                <Globe  size={30}/>
                </div>
                <h4 className="text-lg font-medium text-white mb-3 capitalize">
                    Smooth UI/UX
                </h4>
                <p className="text-sm font-normal text-gray-400">
                    Providing the UI/UX experience to user for reading
                </p>
            </div>
        </div>
    </div>
</section>
                                        
  )
}

export default Features
