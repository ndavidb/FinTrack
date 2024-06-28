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

export default function PortfolioStocksTable() {
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
                            <TableRow>
                                <TableCell className="font-medium">Microsoft Corp - MSFT</TableCell>
                                <TableCell>$250.00</TableCell>
                                <TableCell className="hidden md:table-cell">$200.00</TableCell>
                                <TableCell className="text-green-600">+25%</TableCell>
                                <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <Badge variant="secondary">Active</Badge>
                                </TableCell>
                            </TableRow>
                            {/* Add more rows as needed */}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}