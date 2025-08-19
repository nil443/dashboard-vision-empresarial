import { useState } from "react";
import { Plus, Search, Filter, Receipt, Eye, Edit, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const gastos = [
  {
    id: "GAS-2024-015",
    numero: "GAS-015",
    proveedor: "Papelería Central",
    descripcion: "Material de oficina y suministros",
    categoria: "Oficina",
    fecha: "14/01/2024",
    baseImponible: "129,41 €",
    iva: "27,17 €",
    total: "156,78 €",
    estado: "pendiente"
  },
  {
    id: "GAS-2024-014",
    numero: "GAS-014",
    proveedor: "DigitalServices",
    descripcion: "Hosting y dominio anual",
    categoria: "Tecnología",
    fecha: "12/01/2024",
    baseImponible: "203,30 €",
    iva: "42,69 €",
    total: "245,99 €",
    estado: "pagada"
  },
  {
    id: "GAS-2024-013",
    numero: "GAS-013",
    proveedor: "Transportes Rápidos",
    descripcion: "Envío de documentación",
    categoria: "Logística",
    fecha: "10/01/2024",
    baseImponible: "28,93 €",
    iva: "6,07 €",
    total: "35,00 €",
    estado: "pagada"
  },
  {
    id: "GAS-2024-012",
    numero: "GAS-012",
    proveedor: "Consultoría Legal",
    descripcion: "Asesoría jurídica trimestral",
    categoria: "Servicios",
    fecha: "08/01/2024",
    baseImponible: "826,45 €",
    iva: "173,55 €",
    total: "1.000,00 €",
    estado: "pendiente"
  },
  {
    id: "GAS-2024-011",
    numero: "GAS-011",
    proveedor: "Seguros Empresariales",
    descripcion: "Seguro responsabilidad civil",
    categoria: "Seguros",
    fecha: "05/01/2024",
    baseImponible: "495,87 €",
    iva: "104,13 €",
    total: "600,00 €",
    estado: "pagada"
  }
];

const categorias = ["Todos", "Oficina", "Tecnología", "Logística", "Servicios", "Seguros"];

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

const getCategoryColor = (categoria: string) => {
  const colors: Record<string, string> = {
    "Oficina": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "Tecnología": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    "Logística": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    "Servicios": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "Seguros": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  };
  return colors[categoria] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
};

export default function Gastos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [categoryFilter, setCategoryFilter] = useState("Todos");

  const filteredGastos = gastos.filter(gasto => {
    const matchesSearch = gasto.proveedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gasto.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gasto.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || gasto.estado === statusFilter;
    const matchesCategory = categoryFilter === "Todos" || gasto.categoria === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalGastos = gastos.reduce((sum, gasto) => sum + parseFloat(gasto.total.replace(' €', '').replace('.', '').replace(',', '.')), 0);
  const gastosPagados = gastos.filter(g => g.estado === 'pagada').length;
  const gastosPendientes = gastos.filter(g => g.estado === 'pendiente').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gastos</h1>
          <p className="text-muted-foreground">
            Gestiona los gastos y proveedores de tu empresa
          </p>
        </div>
        <Button 
          className="gap-2 bg-gradient-primary hover:bg-primary-hover"
          onClick={() => console.log("Abrir formulario de nuevo gasto")}
        >
          <Plus className="w-4 h-4" />
          Nuevo Gasto
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Gastos</p>
                <p className="text-2xl font-bold text-destructive">{totalGastos.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
              </div>
              <Receipt className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Gastos Pagados</p>
                <p className="text-2xl font-bold text-success">{gastosPagados}</p>
              </div>
              <Receipt className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendientes</p>
                <p className="text-2xl font-bold text-warning">{gastosPendientes}</p>
              </div>
              <Receipt className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Promedio</p>
                <p className="text-2xl font-bold text-primary">{(totalGastos / gastos.length).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
              </div>
              <Receipt className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Gastos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por proveedor, número o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categorias.map(categoria => (
                  <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="pagada">Pagadas</SelectItem>
                <SelectItem value="pendiente">Pendientes</SelectItem>
                <SelectItem value="vencida">Vencidas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-[100px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGastos.map((gasto) => (
                <TableRow key={gasto.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-mono text-sm font-medium">
                    {gasto.numero}
                  </TableCell>
                  <TableCell className="font-medium">{gasto.proveedor}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate" title={gasto.descripcion}>
                      {gasto.descripcion}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(gasto.categoria)}>
                      {gasto.categoria}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{gasto.fecha}</TableCell>
                  <TableCell className="font-medium">{gasto.total}</TableCell>
                  <TableCell>{getStatusBadge(gasto.estado)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          •••
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Descargar PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}