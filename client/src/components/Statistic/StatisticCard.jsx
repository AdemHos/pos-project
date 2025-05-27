import React from 'react'

const StatisticCard = ({title,amount,image}) => {
  return (
    <div>
      <div className="card-item bg-slate-800 p-8 rounded-lg ">
            <div className='flex items-center gap-4'>
            <div className='rounded-full bg-white w-16 h-16 p-3'>
              <img src={image} alt="" />
            </div>
            <div className='text-gray-400'>
              <p className='mb-2 font-medium text-xl'>{title}</p>
              <p className='text-gray-200 font-bold text-lg'>{amount}</p>
            </div>
            </div>
          </div>
    </div>
  )
}

export default StatisticCard
