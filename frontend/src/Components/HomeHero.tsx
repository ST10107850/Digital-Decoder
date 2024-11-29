const HomeHero = () => {
  return (
    <div className="flex flex-col justify-between w-full h-[50vh] bg-[#b0764d]">
      <div className="flex-1 text-white text-center px-4 md:px-8 lg:px-16">
        <h1 className="text-7xl font-cursive pt-20 italic tracking-wide">
          Welcome
        </h1>
        <p className="mt-4 text-3xl uppercase font-light">
          To your key to tech demystified.
        </p>
      </div>

      <div className="bg-white h-20  text-[#b0764d] p-4 rounded-lg shadow-lg m-4 mb-8">
        <p className="text-3xl leading-relaxed">
          Unlocking the world of technology, one clear and simple explanation at
          a time. Let&apos;s make tech work for you!
        </p>
      </div>
    </div>
  );
};

export default HomeHero;
