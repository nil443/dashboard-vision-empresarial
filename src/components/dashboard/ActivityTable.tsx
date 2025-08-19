import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown, FileText } from "lucide-react";

const recentActivity = [
  {
    id: "FAC-2024-001",
    type: "ingreso",
    description: "Factura de servicios de consultoría",
    client: "Empresa ABC S.L.",
    amount: "2.500,00 €",
    date: "15/01/2024",
    status: "pagada"
  },
  {
    id: "GAS-2024-015",
    type: "gasto",
    description: "Material de oficina y suministros",
    client: "Papelería Central",
    amount: "156,78 €",
    date: "14/01/2024",
    status: "pendiente"
  },
  {
    id: "FAC-2024-002",
    type: "ingreso",
    description: "Desarrollo aplicación web",
    client: "StartupXYZ",
    amount: "4.800,00 €",
    date: "13/01/2024",
    status: "pagada"
  },
  {
    id: "GAS-2024-014",
    type: "gasto",
    description: "Hosting y dominio anual",
    client: "DigitalServices",
    amount: "245,99 €",
    date: "12/01/2024",
    status: "pagada"
  },
  {
    id: "FAC-2024-003",
    type: "ingreso",
    description: "Mantenimiento sistema",
    client: "TechCorp Ltd.",
    amount: "890,00 €",
    date: "11/01/2024",
    status: "pendiente"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pagada":
      return <Badge className="bg-success/10 text-success border-success/20">Pagada</Badge>;
    case "pendiente":
      return <Badge className="bg-warning/10 text-warning border-warning/20">Pendiente</Badge>;
    case "vencida":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Vencida</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "ingreso":
      return <TrendingUp className="w-4 h-4 text-success" />;
    case "gasto":
      return <TrendingDown className="w-4 h-4 text-destructive" />;
    default:
      return <FileText className="w-4 h-4 text-muted-foreground" />;
  }
};

export function ActivityTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Actividad Reciente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Cliente/Proveedor</TableHead>
              <TableHead>Importe</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivity.map((activity) => (
              <TableRow key={activity.id} className="hover:bg-muted/50 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(activity.type)}
                    <span className="capitalize text-sm font-medium">
                      {activity.type}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">{activity.id}</TableCell>
                <TableCell className="max-w-xs">
                  <p className="truncate" title={activity.description}>
                    {activity.description}
                  </p>
                </TableCell>
                <TableCell>{activity.client}</TableCell>
                <TableCell className="font-medium">{activity.amount}</TableCell>
                <TableCell className="text-muted-foreground">{activity.date}</TableCell>
                <TableCell>{getStatusBadge(activity.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}