import { Button } from "./ui/button"

const HeroSection = () => {
  return (
    <div className="text-center my-6 flex flex-col">
       
        <h1 className="text-5xl font-bold" > Search , Apply & <br /> Get Your <span className="text-[#54ccb4]">Dream Jobs</span></h1>
        <h2 className="font-semibold my-3"> Bridging Talent and Opportunity</h2>

        <div className="flex w-[40%] shadow-lg self-center rounded-xl my-4">

            <input className=" outline-none border-none w-full p-2 rounded-xl" placeholder="Find your dream jobs" type="text" />
            <Button className="rounded-xl bg-[#54ccb4]">Search</Button>
        </div>
    </div>
  )
}

export default HeroSection