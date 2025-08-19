import { useState } from "react";
import { Save, Upload, Building, Globe, Clock, Euro, Palette, Shield, Bell, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const configuracion = {
  empresa: {
    nombre: "TechCorp S.L.",
    logo: "",
    descripcion: "Empresa de consultoría tecnológica especializada en desarrollo de software y transformación digital",
    direccion: "Calle Principal, 123, 28001 Madrid",
    telefono: "+34 912 345 678",
    email: "contacto@techcorp.com",
    web: "www.techcorp.com",
    cif: "B12345678"
  },
  facturacion: {
    ivaPorDefecto: "21",
    moneda: "EUR",
    simboloMoneda: "€",
    numeracionFacturas: "FAC-{YYYY}-{000}",
    terminosPago: "30",
    metodoPagoDefecto: "transferencia"
  },
  regional: {
    pais: "España",
    zonaHoraria: "Europe/Madrid",
    formatoFecha: "dd/mm/yyyy",
    separadorDecimal: ",",
    separadorMiles: "."
  },
  notificaciones: {
    emailFacturas: true,
    emailPagos: true,
    emailVencimientos: true,
    notificacionesPush: false
  },
  seguridad: {
    autenticacion2FA: false,
    caducidadSesion: "24",
    loginSeguro: true
  }
};

export default function Ajustes() {
  const [activeTab, setActiveTab] = useState("empresa");
  const [config, setConfig] = useState(configuracion);

  const handleSave = () => {
    console.log("Guardando configuración:", config);
    // Aquí iría la lógica para guardar en la base de datos
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
          <p className="text-muted-foreground">
            Administra la configuración de tu empresa y aplicación
          </p>
        </div>
        <Button onClick={handleSave} className="gap-2 bg-gradient-primary hover:bg-primary-hover">
          <Save className="w-4 h-4" />
          Guardar Cambios
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="empresa" className="gap-2">
            <Building className="w-4 h-4" />
            Empresa
          </TabsTrigger>
          <TabsTrigger value="facturacion" className="gap-2">
            <Euro className="w-4 h-4" />
            Facturación
          </TabsTrigger>
          <TabsTrigger value="regional" className="gap-2">
            <Globe className="w-4 h-4" />
            Regional
          </TabsTrigger>
          <TabsTrigger value="notificaciones" className="gap-2">
            <Bell className="w-4 h-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="seguridad" className="gap-2">
            <Shield className="w-4 h-4" />
            Seguridad
          </TabsTrigger>
        </TabsList>

        <TabsContent value="empresa" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Información de la Empresa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo */}
              <div className="space-y-4">
                <Label>Logo de la empresa</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={config.empresa.logo} />
                    <AvatarFallback className="text-lg font-bold">
                      {config.empresa.nombre.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="gap-2">
                      <Upload className="w-4 h-4" />
                      Subir Logo
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      Formatos: PNG, JPG. Máximo 2MB. Recomendado: 200x200px
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Datos básicos */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre de la empresa *</Label>
                  <Input
                    id="nombre"
                    value={config.empresa.nombre}
                    onChange={(e) => setConfig({
                      ...config,
                      empresa: { ...config.empresa, nombre: e.target.value }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cif">CIF/NIF *</Label>
                  <Input
                    id="cif"
                    value={config.empresa.cif}
                    onChange={(e) => setConfig({
                      ...config,
                      empresa: { ...config.empresa, cif: e.target.value }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={config.empresa.telefono}
                    onChange={(e) => setConfig({
                      ...config,
                      empresa: { ...config.empresa, telefono: e.target.value }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={config.empresa.email}
                    onChange={(e) => setConfig({
                      ...config,
                      empresa: { ...config.empresa, email: e.target.value }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="web">Sitio web</Label>
                  <Input
                    id="web"
                    value={config.empresa.web}
                    onChange={(e) => setConfig({
                      ...config,
                      empresa: { ...config.empresa, web: e.target.value }
                    })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección completa</Label>
                <Textarea
                  id="direccion"
                  value={config.empresa.direccion}
                  onChange={(e) => setConfig({
                    ...config,
                    empresa: { ...config.empresa, direccion: e.target.value }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción de la empresa</Label>
                <Textarea
                  id="descripcion"
                  value={config.empresa.descripcion}
                  onChange={(e) => setConfig({
                    ...config,
                    empresa: { ...config.empresa, descripcion: e.target.value }
                  })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facturacion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Euro className="w-5 h-5" />
                Configuración de Facturación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="iva">IVA por defecto (%)</Label>
                  <Select value={config.facturacion.ivaPorDefecto}>
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
                  <Label htmlFor="moneda">Moneda</Label>
                  <Select value={config.facturacion.moneda}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR - Euro (€)</SelectItem>
                      <SelectItem value="USD">USD - Dólar ($)</SelectItem>
                      <SelectItem value="GBP">GBP - Libra (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numeracion">Formato numeración facturas</Label>
                  <Input
                    id="numeracion"
                    value={config.facturacion.numeracionFacturas}
                    placeholder="FAC-{YYYY}-{000}"
                  />
                  <p className="text-sm text-muted-foreground">
                    Usar {"{YYYY}"} para año, {"{000}"} para número secuencial
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="terminos">Términos de pago (días)</Label>
                  <Select value={config.facturacion.terminosPago}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Pago inmediato</SelectItem>
                      <SelectItem value="15">15 días</SelectItem>
                      <SelectItem value="30">30 días</SelectItem>
                      <SelectItem value="60">60 días</SelectItem>
                      <SelectItem value="90">90 días</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Configuración Regional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pais">País</Label>
                  <Select value={config.regional.pais}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="España">España</SelectItem>
                      <SelectItem value="Francia">Francia</SelectItem>
                      <SelectItem value="Portugal">Portugal</SelectItem>
                      <SelectItem value="Italia">Italia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zona">Zona horaria</Label>
                  <Select value={config.regional.zonaHoraria}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Madrid">Europe/Madrid</SelectItem>
                      <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                      <SelectItem value="Europe/London">Europe/London</SelectItem>
                      <SelectItem value="Europe/Rome">Europe/Rome</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="formato">Formato de fecha</Label>
                  <Select value={config.regional.formatoFecha}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">dd/mm/yyyy</SelectItem>
                      <SelectItem value="mm/dd/yyyy">mm/dd/yyyy</SelectItem>
                      <SelectItem value="yyyy-mm-dd">yyyy-mm-dd</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Separadores numéricos</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Decimal"
                      value={config.regional.separadorDecimal}
                      className="w-20"
                    />
                    <Input
                      placeholder="Miles"
                      value={config.regional.separadorMiles}
                      className="w-20"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificaciones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Configuración de Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificaciones por email</p>
                    <p className="text-sm text-muted-foreground">Recibir emails cuando se creen nuevas facturas</p>
                  </div>
                  <Switch checked={config.notificaciones.emailFacturas} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Confirmaciones de pago</p>
                    <p className="text-sm text-muted-foreground">Notificar cuando una factura sea marcada como pagada</p>
                  </div>
                  <Switch checked={config.notificaciones.emailPagos} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Avisos de vencimiento</p>
                    <p className="text-sm text-muted-foreground">Recordatorios de facturas próximas a vencer</p>
                  </div>
                  <Switch checked={config.notificaciones.emailVencimientos} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificaciones push</p>
                    <p className="text-sm text-muted-foreground">Notificaciones del navegador en tiempo real</p>
                  </div>
                  <Switch checked={config.notificaciones.notificacionesPush} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguridad" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Configuración de Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Autenticación en dos pasos (2FA)</p>
                    <p className="text-sm text-muted-foreground">Añade una capa extra de seguridad a tu cuenta</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Próximamente</Badge>
                    <Switch checked={config.seguridad.autenticacion2FA} disabled />
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Caducidad de sesión</p>
                    <p className="text-sm text-muted-foreground">Tiempo antes de cerrar sesión automáticamente</p>
                  </div>
                  <Select value={config.seguridad.caducidadSesion}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hora</SelectItem>
                      <SelectItem value="8">8 horas</SelectItem>
                      <SelectItem value="24">24 horas</SelectItem>
                      <SelectItem value="168">1 semana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Login seguro</p>
                    <p className="text-sm text-muted-foreground">Requerir verificación de dispositivos nuevos</p>
                  </div>
                  <Switch checked={config.seguridad.loginSeguro} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}