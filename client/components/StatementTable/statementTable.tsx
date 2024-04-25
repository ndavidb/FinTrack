import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {TestDataCompany} from "@/components/StatementTable/TestData";

interface Props {
    config: any;
    data: any;
}

export default function StatementTable({config, data}: Props) {
    const renderedHeaders = (
        <TableRow>
            {config.map((value: any, index: number) =>{
                return (
                    <TableHead key={index}>
                        {value.label}
                    </TableHead>
                )
            })}
        </TableRow>
    )
    const renderedRows = data.map((company: any, rowIndex: number) => {
        const rowKey = company.id || `row_${rowIndex}`;
        return(
            <TableRow key={rowKey}>
                {config.map((value: any, index: number) =>{
                    return (
                        <TableCell key={index}>
                            {value.render(company)}
                        </TableCell>
                    )
                })}
            </TableRow>
        )
    });
    
    return (
        <div className="w-full border border-slate-200 rounded-sm border-solid md:overflow-x-scroll">
            <Table>
                <TableHeader className="text-zinc-800">
                    {renderedHeaders}
                </TableHeader>
                <TableBody>
                    {renderedRows}
                </TableBody>
            </Table>
        </div>
        
    );
};
