import Image from "next/image"

export default function Home() {
  return (
    <main className="h-screen">
      <div className="absolute w-full h-full left-0 top-0" style={{ backgroundImage: "url(background.jpg)", backgroundSize: "cover", filter: "blur(2px) brightness(0.6)" }} />
      <div className="absolute w-full h-full left-0 top-0 flex flex-col items-center pt-5">
        <div className="relative w-[300px] h-[300px]">
          <Image
            src="/logo.png"
            alt="New Frontiers Logo"
            fill={true}
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="relative w-[430px] h-[70px]">
            <Image
              src="/new-frontiers.png"
              alt="New Frontiers name"
              fill={true}
            />
          </div>
          <p className="text-base text-gray-300">A NEW DAYZ EXPERIENCE</p>
        </div>
        <div className="flex grow items-center">
          <div className="flex flex-col items-center">
            <h1 className="text-[90px] font-bold text-center leading-[86px]">COMING SOON</h1>
            <p className="text-[28px] font-bold text-certer text-gray-300">ON THIS YEAR</p>
          </div>
        </div>
        <p className=" text-center text-gray-600 pb-2">New Frontiers Team © 2022</p>
      </div>
    </main>
  )
}
