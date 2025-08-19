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
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface InvoiceFormProps {
  onSave: (invoice: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export function InvoiceForm({ onSave, onCancel, initialData }: InvoiceFormProps) {
  const [formData, setFormData] = useState({
    numero: initialData?.numero || "",
    cliente: initialData?.cliente || "",
    descripcion: initialData?.descripcion || "",
    fecha: initialData?.fecha || new Date(),
    vencimiento: initialData?.vencimiento || new Date(),
    baseImponible: initialData?.baseImponible || "",
    iva: initialData?.iva || "21",
    total: initialData?.total || "",
    estado: initialData?.estado || "pendiente",
    lineas: initialData?.lineas || [
      { concepto: "", cantidad: 1, precio: 0, total: 0 }
    ]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.cliente.trim()) {
      newErrors.cliente = "El cliente es obligatorio";
    }
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria";
    }
    if (!formData.baseImponible || parseFloat(formData.baseImponible) <= 0) {
      newErrors.baseImponible = "La base imponible debe ser mayor a 0";
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
      onSave(formData);
    }
  };

  const addLine = () => {
    setFormData(prev => ({
      ...prev,
      lineas: [...prev.lineas, { concepto: "", cantidad: 1, precio: 0, total: 0 }]
    }));
  };

  const removeLine = (index: number) => {
    setFormData(prev => ({
      ...prev,
      lineas: prev.lineas.filter((_, i) => i !== index)
    }));
  };

  const updateLine = (index: number, field: string, value: any) => {
    setFormData(prev => {
      const newLineas = [...prev.lineas];
      newLineas[index] = { ...newLineas[index], [field]: value };
      
      if (field === 'cantidad' || field === 'precio') {
        newLineas[index].total = newLineas[index].cantidad * newLineas[index].precio;
      }
      
      return { ...prev, lineas: newLineas };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Datos de la Factura</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numero">Número de factura</Label>
              <Input
                id="numero"
                value={formData.numero}
                onChange={(e) => setFormData(prev => ({ ...prev, numero: e.target.value }))}
                placeholder="FAC-2024-001"
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
                  <SelectItem value="pagada">Pagada</SelectItem>
                  <SelectItem value="vencida">Vencida</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cliente">Cliente / Empresa *</Label>
            <Input
              id="cliente"
              value={formData.cliente}
              onChange={(e) => setFormData(prev => ({ ...prev, cliente: e.target.value }))}
              placeholder="Nombre del cliente o empresa"
              className={errors.cliente ? "border-destructive" : ""}
            />
            {errors.cliente && <p className="text-sm text-destructive">{errors.cliente}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción *</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
              placeholder="Descripción de los servicios o productos"
              className={errors.descripcion ? "border-destructive" : ""}
            />
            {errors.descripcion && <p className="text-sm text-destructive">{errors.descripcion}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fecha de emisión *</Label>
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
              <Label>Fecha de vencimiento *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.vencimiento ? format(formData.vencimiento, "dd/MM/yyyy", { locale: es }) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.vencimiento}
                    onSelect={(date) => date && setFormData(prev => ({ ...prev, vencimiento: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Líneas de Factura
            <Button type="button" variant="outline" size="sm" onClick={addLine}>
              <Plus className="w-4 h-4 mr-2" />
              Añadir línea
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formData.lineas.map((linea, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-5">
                  <Label>Concepto</Label>
                  <Input
                    value={linea.concepto}
                    onChange={(e) => updateLine(index, 'concepto', e.target.value)}
                    placeholder="Descripción del concepto"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Cantidad</Label>
                  <Input
                    type="number"
                    value={linea.cantidad}
                    onChange={(e) => updateLine(index, 'cantidad', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Precio</Label>
                  <Input
                    type="number"
                    value={linea.precio}
                    onChange={(e) => updateLine(index, 'precio', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Total</Label>
                  <Input
                    value={linea.total.toFixed(2)}
                    disabled
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLine(index)}
                    disabled={formData.lineas.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Importe Total</CardTitle>
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

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {initialData ? "Actualizar" : "Crear"} Factura
        </Button>
      </div>
    </form>
  );
}