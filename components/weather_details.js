const WeatherDetails = (props) => {
  return (
    <div className="flex flex-col gap-y-12">
      <h3 className='font-bold text-base text-white/90 drop-shadow-sm my-2'>Weather Details</h3>
      {props.data.map((detail) => {
        return(
          <div className="flex flex-row justify-between items-center">
            <p className='font-bold text-base text-white/70'>{detail.label}</p>
            <p className='font-bold text-base text-white/80'>{detail.value}</p>
          </div>
        );
      })}
    </div>
  );
}

export default WeatherDetails;
