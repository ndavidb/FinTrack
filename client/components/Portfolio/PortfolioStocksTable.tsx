import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {format} from "date-fns/format";

interface Props {
    portfolioData : StockPortfolio[];
}

export default function PortfolioStocksTable({portfolioData} : Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="mb-4 text-xl font-semibold leading-none tracking-tight">Full detail of stocks</CardTitle>
                <CardDescription>List of all stocks</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[180px]">Stock</TableHead>
                                <TableHead>Current Price</TableHead>
                                <TableHead className="hidden md:table-cell">Purchase Price</TableHead>
                                <TableHead>Performance</TableHead>
                                <TableHead className="hidden md:table-cell">Purchase Date</TableHead>
                                <TableHead className="hidden sm:table-cell">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {portfolioData.map((stock) => (
                                <TableRow key={stock.id}>
                                    <TableCell className="font-medium">{stock.companyName}</TableCell>
                                    <TableCell>{stock.purchasePrice}</TableCell>
                                    <TableCell className="hidden md:table-cell">{stock.purchasePrice}</TableCell>
                                    <TableCell className="text-green-600">+25%</TableCell>
                                    <TableCell className="hidden md:table-cell">{format(new Date(stock.purchaseDate), 'dd-MM-yyyy')}</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge variant="secondary">Active</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}