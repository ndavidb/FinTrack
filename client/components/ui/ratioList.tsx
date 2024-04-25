import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

interface Props {
    config: any;
    data: any;
}
const RatioList = ({config, data}: Props) => {
    
    const renderedCells = config.map((row: any, index: number) => {
        return (
            <li key={index}>
                <Card className="flex justify-between items-center rounded-none border-t-0 border-x-0">
                    <CardHeader className="p-3">
                        <CardTitle className="text-sm lg:text-base text-zinc-800">{row.label}</CardTitle>
                        <CardDescription className="hidden lg:block">{row.subTitle}</CardDescription>
                    </CardHeader>
                    <CardContent className="py-0 px-4 md:px-8">
                        <p className="text-sm lg:text-base">{row.render(data)}</p>
                    </CardContent>
                </Card>
            </li>
        )
    })
    
    return (
        <div className="border border-slate-200 rounded-sm border-solid">
            <ul>{renderedCells}</ul>
        </div>
    )
};
export default RatioList;