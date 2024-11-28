import logo from "../assets/logo.png";

const HomeHero = () => {
  return (
          <div
          className="flex w-full items-center " 
          style={{
            backgroundImage: `url(${logo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "85vh",
            width: "100%",
          }}
        >
      
    </div>
  )
}

export default HomeHero
