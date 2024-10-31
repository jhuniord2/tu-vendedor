import React, { useState } from 'react'
import { CalendarIcon, Info, MapPin, Menu, Package, PieChart, Route, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import './styles/dashboard.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'

const navItems = [
  { icon: Info, label: 'Información' },
  { icon: Users, label: 'Cliente' },
  { icon: Package, label: 'Producto' },
  { icon: PieChart, label: 'Ventas' },
  { icon: Route, label: 'Usuarios' },
]

const stats = [
  { title: 'Vendedores', value: '4' },
  { title: 'Ventas por dia', value: 'Bs. 12,543' },
  { title: 'Cantidad de ventas', value: '34' },
  { title: 'Proyeccion', value: '85%' },
]

export default function Dashboard() {
  const [date, setDate] = useState(new Date())
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`border-r bg-muted/40 transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className={`flex items-center gap-2 ${isCollapsed ? "hidden" : ""}`}>
            <MapPin className="h-6 w-6 text-primary" />
            <span className="font-bold">dPos</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="space-y-1 p-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <item.icon className="h-4 w-4" />
                <span className={`text-sm font-medium ${isCollapsed ? "hidden" : ""}`}>
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>30-10-2024</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Users className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>USUARIO</DropdownMenuItem>
                <DropdownMenuItem>SUCURSAL Nº</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="p-6">
          <div className="grid gap-6">
            {/* Date Range Selector */}
            <Card>
              <CardHeader>
                <CardTitle>Periodo</CardTitle>
                <CardDescription>Seleccione el rango de fechas</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Inicio
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Fin
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map Placeholder */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-[21/9] rounded-lg bg-muted">
                  <div className="flex h-full items-center justify-center">
                    Mapa de Rutas
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}