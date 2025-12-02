import { Dot } from "lucide-react";

export default function AboutMe() {
    return (
        <>
            <div className="min-h-[50vh] w-full bg-white px-5 md:px-10 lg:px-20 xl:px-32 py-20">
                <h5 className="text-md text-black/70 font-inter mb-5 flex items-center gap-5">
                    <span className="font-fira text-primary font-bold lg:text-7xl md:text-6xl sm:text-5xl text-4xl">01</span>
                    <div className="lg:h-15 md:h-10 h-7 bg-primary w-1"></div>
                    <div className="border border-primary bg-transparent rounded-full px-3 text-xs w-fit text-primary font-fira">
                        About Me
                    </div>
                </h5>

                <h2 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold text-black">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est minima qui ea similique temporibus doloribus debitis? Nulla maxime cum ea nesciunt, quo, exercitationem excepturi voluptatum in nobis ipsum autem itaque pariatur suscipit labore deleniti veritatis.
                </h2>
                <hr className="my-10 border-primary" />
                <div className="flex gap-5 items-center justify-between max-w-2xl mx-auto p-3">
                    <div className="flex items-center justify-between flex-col gap-2">
                        <h2 className="lg:text-5xl text-4xl font-bold text-black flex items-center gap-2">
                            <Dot size={50} className="text-primary" /> 3+
                        </h2>
                        <p className="text-black/70">
                            Years of Operation
                        </p>
                    </div>
                    <div className="flex items-center justify-between flex-col gap-2">
                        <h2 className="lg:text-5xl text-4xl font-bold text-black flex items-center gap-2">
                            <Dot size={50} className="text-primary" /> 20+
                        </h2>
                        <p className="text-black/70">
                            Projects Completed
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}