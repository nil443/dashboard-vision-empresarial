import { 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  Users, 
  Calculator,
  Euro 
} from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { ActivityTable } from "@/components/dashboard/ActivityTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Resumen financiero de TechCorp S.L. - Últimos 30 días
        </p>
      </div>

      {/* KPIs Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <KPICard
          title="Ingresos Hoy"
          value="1.250,00 €"
          change={{ value: "+8.2%", type: "increase" }}
          icon={<TrendingUp className="w-6 h-6 text-success" />}
          className="bg-gradient-to-br from-success/5 to-success/10 border-success/20"
        />
        
        <KPICard
          title="Ingresos 7 días"
          value="8.750,00 €"
          change={{ value: "+15.3%", type: "increase" }}
          icon={<TrendingUp className="w-6 h-6 text-success" />}
          className="bg-gradient-to-br from-success/5 to-success/10 border-success/20"
        />
        
        <KPICard
          title="Ingresos 30 días"
          value="24.800,00 €"
          change={{ value: "+12.5%", type: "increase" }}
          icon={<TrendingUp className="w-6 h-6 text-success" />}
          className="bg-gradient-to-br from-success/5 to-success/10 border-success/20"
        />
        
        <KPICard
          title="Gastos 30 días"
          value="8.420,00 €"
          change={{ value: "-3.1%", type: "decrease" }}
          icon={<TrendingDown className="w-6 h-6 text-destructive" />}
          className="bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20"
        />
        
        <KPICard
          title="Margen"
          value="16.380,00 €"
          change={{ value: "+22.8%", type: "increase" }}
          icon={<Calculator className="w-6 h-6 text-primary" />}
          className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
        />
        
        <KPICard
          title="Nº Facturas"
          value="47"
          change={{ value: "+18", type: "increase" }}
          icon={<FileText className="w-6 h-6 text-warning" />}
          className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Evolución de Ingresos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center space-y-2">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Gráfico de líneas - Ingresos por día
                </p>
                <p className="text-xs text-muted-foreground">
                  Últimos 30 días: Tendencia positiva +12.5%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-destructive" />
              Distribución de Gastos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center space-y-2">
                <TrendingDown className="w-12 h-12 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Gráfico de barras - Gastos por categoría
                </p>
                <p className="text-xs text-muted-foreground">
                  Mayor gasto: Salarios (45%), Material oficina (20%)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Table */}
      <ActivityTable />
    </div>
  );
}