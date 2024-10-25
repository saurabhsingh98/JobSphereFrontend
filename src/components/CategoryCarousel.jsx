import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./ui/carousel";
import { Button } from "./ui/button";

const CategoryCarousel = () => {
    
    const category = [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Data Scientist",
        "DevOps Engineer",
        "UI/UX Designer",
        
    ];

    return (
        <div className="relative">  {/* Add relative class for positioning */}

            
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem className="md:basis-1/2 lg-basis-1/3" key={index}>
                            <Button variant='outline'>{cat}</Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Previous and Next buttons */}
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}

export default CategoryCarousel;
