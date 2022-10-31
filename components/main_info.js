import Image from 'next/image'
import Time from './time';

const MainInfo = (props) => {
  return (
    <div className="flex flex-col gap-y-16 bottom-24 left-14 absolute px-2 m-auto h-fit max-w-[75%] animate__animated animate__fadeIn delay-2">
      <div className="flex flex-row items-start justify-between gap-x-8">
        <h1 className="leading-none text-[11rem] font-bold text-white/90">{props.temp}</h1>
        <div className="flex flex-col justify-between h-full pt-4 gap-y-10">
          <p className="text-[5.5rem] font-semibold text-white/90 leading-none">{props.location}</p>
          <p className="text-base font-medium text-white/90 leading-none mt-[-0.75rem]"><Time/></p>
        </div>
        <div className="flex flex-col justify-between items-center h-full ml-4 pt-8 gap-y-3">
          <div className="min-h-10 min-w-10 mt-[-1.75rem] drop-shadow-[0_0_6px_#303030]">
            <Image src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} width={100} height={100}/>
          </div>
          <p className="leading-none text-2xl font-semibold text-white/90">{props.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default MainInfo;
