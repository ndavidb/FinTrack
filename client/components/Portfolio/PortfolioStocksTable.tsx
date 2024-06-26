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
            <CardHeader className="px-7">
                <CardTitle>Stocks</CardTitle>
                <CardDescription>List of all stocks.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Stock</TableHead>
                            <TableHead>Current Price</TableHead>
                            <TableHead>Purchase Price</TableHead>
                            <TableHead className="hidden md:table-cell">Purchase Date</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="bg-accent">
                            <TableCell>
                                <div className="font-medium">Microsoft Corp - MSFT</div>
                            </TableCell>
                            <TableCell>$250.00</TableCell>
                            <TableCell>$300.00</TableCell>
                            <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
                            <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant="secondary">
                                    Active
                                </Badge>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
