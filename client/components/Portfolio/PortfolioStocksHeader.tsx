import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Divide, DollarSign} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";

type Props = {};
export default function PortfolioStocksWrapper({}: Props) {
    return (
    <div className="py-10 w-full bg-white">
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full mx-auto lg:max-w-5xl xl:max-w-6xl"
        >
            <CarouselContent className="w-full">
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <PortfolioCard/>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>     
    </div>
    );
};

export function PortfolioCard({}: Props) {
    return (
        <div>
            <Card className="border-0 rounded-b-none px-20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
            </Card>

        </div>
    );
};


