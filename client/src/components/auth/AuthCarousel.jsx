

const AuthCarousel = ({image,title,desc}) => {
  return (
    
      <div className='!flex flex-col items-center justify-center h-full mb-10'>
        <img src={image} alt="" className='w-[600px] h-[500px]' />
        <h3 className='text-white text-center font-bold text-4xl'>{title}</h3>
        <p className='text-center text-white   text-2xl mt-5'>{desc}</p>
      </div>
  )
}

export default AuthCarousel
