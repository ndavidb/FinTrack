import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

interface Props {
}

export default function HomePortfolioReview({}: Props) {
    return (
        <Card
            className="sm:col-span-2"
        >
            <CardHeader className="pb-5">
                <CardTitle>My portfolio</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
                <div>
                    <p className="font-semibold">
                        Best performing stocks
                    </p>
                    <div className="flex flex-row text-sm [&>*]:px-2 [&>*]:mr-4">
                        <p>Apple: 22%</p>
                        <p>Apple: 22%</p>
                        <p>Apple: 22%</p>
                        <p>Apple: 22%</p>
                    </div>
                </div>

                <div>
                    <p className="font-semibold">
                        Least performing stocks
                    </p>
                    <div className="flex flex-row text-sm [&>*]:px-2 [&>*]:mr-4">
                        <p>Apple: 22%</p>
                        <p>Apple: 22%</p>
                        <p>Apple: 22%</p>
                        <p>Apple: 22%</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button size={"sm"} className="text-sm font-medium">Review my portfolio</Button>
            </CardFooter>
        </Card>
    );
};
