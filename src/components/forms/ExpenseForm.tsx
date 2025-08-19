import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Upload, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ExpenseFormProps {
  onSave: (expense: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export function ExpenseForm({ onSave, onCancel, initialData }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    proveedor: initialData?.proveedor || "",
    categoria: initialData?.categoria || "",
    descripcion: initialData?.descripcion || "",
    fecha: initialData?.fecha || new Date(),
    baseImponible: initialData?.baseImponible || "",
    iva: initialData?.iva || "21",
    total: initialData?.total || "",
    metodoPago: initialData?.metodoPago || "",
    referencia: initialData?.referencia || "",
    estado: initialData?.estado || "pendiente",
    notas: initialData?.notas || ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const categorias = [
    "Salarios y personal",
    "Material de oficina",
    "Software y licencias",
    "Marketing y publicidad",
    "Gastos generales",
    "Viajes y dietas",
    "Formación",
    "Servicios profesionales",
    "Impuestos y tasas",
    "Otros"
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.proveedor.trim()) {
      newErrors.proveedor = "El proveedor es obligatorio";
    }
    if (!formData.categoria) {
      newErrors.categoria = "La categoría es obligatoria";
    }
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria";
    }
    if (!formData.baseImponible || parseFloat(formData.baseImponible) <= 0) {
      newErrors.baseImponible = "El importe debe ser mayor a 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotal = () => {
    const base = parseFloat(formData.baseImponible) || 0;
    const ivaPercent = parseFloat(formData.iva) || 0;
    const ivaAmount = (base * ivaPercent) / 100;
    const total = base + ivaAmount;
    
    setFormData(prev => ({
      ...prev,
      total: total.toFixed(2)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({ ...formData, archivo: selectedFile });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Datos del Gasto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="proveedor">Proveedor *</Label>
              <Input
                id="proveedor"
                value={formData.proveedor}
                onChange={(e) => setFormData(prev => ({ ...prev, proveedor: e.target.value }))}
                placeholder="Nombre del proveedor o empresa"
                className={errors.proveedor ? "border-destructive" : ""}
              />
              {errors.proveedor && <p className="text-sm text-destructive">{errors.proveedor}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoría *</Label>
              <Select value={formData.categoria} onValueChange={(value) => setFormData(prev => ({ ...prev, categoria: value }))}>
                <SelectTrigger className={errors.categoria ? "border-destructive" : ""}>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoria && <p className="text-sm text-destructive">{errors.categoria}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción *</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
              placeholder="Descripción detallada del gasto"
              className={errors.descripcion ? "border-destructive" : ""}
            />
            {errors.descripcion && <p className="text-sm text-destructive">{errors.descripcion}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fecha del gasto *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.fecha ? format(formData.fecha, "dd/MM/yyyy", { locale: es }) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.fecha}
                    onSelect={(date) => date && setFormData(prev => ({ ...prev, fecha: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="metodoPago">Método de pago</Label>
              <Select value={formData.metodoPago} onValueChange={(value) => setFormData(prev => ({ ...prev, metodoPago: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="efectivo">Efectivo</SelectItem>
                  <SelectItem value="transferencia">Transferencia bancaria</SelectItem>
                  <SelectItem value="tarjeta">Tarjeta de crédito/débito</SelectItem>
                  <SelectItem value="domiciliacion">Domiciliación bancaria</SelectItem>
                  <SelectItem value="otros">Otros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="referencia">Número de factura/referencia</Label>
              <Input
                id="referencia"
                value={formData.referencia}
                onChange={(e) => setFormData(prev => ({ ...prev, referencia: e.target.value }))}
                placeholder="Ej: FAC-2024-001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Select value={formData.estado} onValueChange={(value) => setFormData(prev => ({ ...prev, estado: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="pagado">Pagado</SelectItem>
                  <SelectItem value="vencido">Vencido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Importe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="baseImponible">Base imponible (€) *</Label>
              <Input
                id="baseImponible"
                type="number"
                step="0.01"
                min="0"
                value={formData.baseImponible}
                onChange={(e) => setFormData(prev => ({ ...prev, baseImponible: e.target.value }))}
                onBlur={calculateTotal}
                placeholder="0.00"
                className={errors.baseImponible ? "border-destructive" : ""}
              />
              {errors.baseImponible && <p className="text-sm text-destructive">{errors.baseImponible}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="iva">IVA (%)</Label>
              <Select value={formData.iva} onValueChange={(value) => {
                setFormData(prev => ({ ...prev, iva: value }));
                setTimeout(calculateTotal, 0);
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0% - Exento</SelectItem>
                  <SelectItem value="4">4% - Súper reducido</SelectItem>
                  <SelectItem value="10">10% - Reducido</SelectItem>
                  <SelectItem value="21">21% - General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="total">Total (€)</Label>
              <Input
                id="total"
                value={formData.total}
                disabled
                className="bg-muted font-medium"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Adjuntar Justificante</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium">
                    Arrastra un archivo aquí o{" "}
                    <span className="text-primary">haz clic para subir</span>
                  </span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="mt-1 text-xs text-muted-foreground">
                  PDF, JPG, PNG hasta 10MB
                </p>
              </div>
            </div>
          </div>

          {selectedFile && (
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                  <Upload className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={removeFile}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notas Adicionales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="notas">Notas</Label>
            <Textarea
              id="notas"
              value={formData.notas}
              onChange={(e) => setFormData(prev => ({ ...prev, notas: e.target.value }))}
              placeholder="Información adicional sobre el gasto..."
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {initialData ? "Actualizar" : "Crear"} Gasto
        </Button>
      </div>
    </form>
  );
}