'use client';

import { AppSidebar } from '~/components/navigation/app-sidebar';
import { SiteHeader } from '~/components/site-header';
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Input } from '~/components/ui/input';
import {
  IconSearch,
  IconPlant2,
  IconDroplet,
  IconSun,
  IconTemperature,
  IconEdit,
  IconTrash,
  IconPlus,
} from '@tabler/icons-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface Crop {
  id: number;
  name: string;
  category: string;
  sunlight: string;
  waterNeeds: string;
  temperature: string;
  soilType: string;
  growingSeason: string;
  varieties: string[];
  profit: string;
}

// Add dummy data
const initialCrops: Crop[] = [
  {
    id: 1,
    name: 'Rice (Oryza sativa)',
    category: 'Grains',
    sunlight: 'Full sun (6-8 hours)',
    waterNeeds: 'High (flooded fields)',
    temperature: '20-35°C (68-95°F)',
    soilType: 'Clay or silt loam',
    growingSeason: '3-6 months',
    varieties: ['Jasmine', 'Basmati', 'Arborio', 'Short-grain'],
    profit: 'High',
  },
  {
    id: 2,
    name: 'Wheat (Triticum)',
    category: 'Grains',
    sunlight: 'Full sun (6+ hours)',
    waterNeeds: 'Moderate (12-15 inches)',
    temperature: '15-30°C (59-86°F)',
    soilType: 'Well-drained loam',
    growingSeason: 'Winter: Fall to Summer, Spring: Spring to Summer',
    varieties: ['Hard Red', 'Soft White', 'Durum', 'Spelt'],
    profit: 'High',
  },
  {
    id: 3,
    name: 'Corn (Zea mays)',
    category: 'Grains',
    sunlight: 'Full sun (8+ hours)',
    waterNeeds: 'Moderate (20-25 inches)',
    temperature: '21-30°C (70-86°F)',
    soilType: 'Well-drained loam',
    growingSeason: '3-4 months',
    varieties: ['Sweet Corn', 'Field Corn', 'Popcorn', 'Flint Corn'],
    profit: 'Medium',
  },
  {
    id: 4,
    name: 'Soybeans (Glycine max)',
    category: 'Legumes',
    sunlight: 'Full sun (6+ hours)',
    waterNeeds: 'Moderate (15-20 inches)',
    temperature: '20-30°C (68-86°F)',
    soilType: 'Well-drained loam',
    growingSeason: '3-5 months',
    varieties: ['Early Maturity', 'Mid Maturity', 'Late Maturity'],
    profit: 'High',
  },
  {
    id: 5,
    name: 'Tomatoes (Solanum lycopersicum)',
    category: 'Vegetables',
    sunlight: 'Full sun (6-8 hours)',
    waterNeeds: 'Moderate (1-2 inches/week)',
    temperature: '21-27°C (70-80°F)',
    soilType: 'Rich, well-drained',
    growingSeason: '2-3 months',
    varieties: ['Beefsteak', 'Cherry', 'Roma', 'Heirloom'],
    profit: 'Medium',
  }
];

// Add chart data
const yieldData = [
  { year: '2020', Rice: 4.2, Wheat: 3.8, Corn: 5.1, Soybeans: 3.5, Tomatoes: 2.8 },
  { year: '2021', Rice: 4.5, Wheat: 4.0, Corn: 5.3, Soybeans: 3.7, Tomatoes: 3.0 },
  { year: '2022', Rice: 4.3, Wheat: 3.9, Corn: 5.0, Soybeans: 3.6, Tomatoes: 2.9 },
  { year: '2023', Rice: 4.6, Wheat: 4.2, Corn: 5.4, Soybeans: 3.8, Tomatoes: 3.2 },
];

const profitData = [
  { name: 'Rice', value: 35 },
  { name: 'Wheat', value: 25 },
  { name: 'Corn', value: 20 },
  { name: 'Soybeans', value: 15 },
  { name: 'Tomatoes', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const waterUsageData = [
  { crop: 'Rice', usage: 2500 },
  { crop: 'Wheat', usage: 1500 },
  { crop: 'Corn', usage: 2000 },
  { crop: 'Soybeans', usage: 1800 },
  { crop: 'Tomatoes', usage: 1200 },
];

export default function CropDatabasePage() {
  const [crops, setCrops] = useState<Crop[]>(initialCrops);
  const [editingCrop, setEditingCrop] = useState<Crop | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddCrop = (newCrop: Omit<Crop, 'id'>) => {
    setCrops([...crops, { ...newCrop, id: crops.length + 1 }]);
    setIsAddDialogOpen(false);
  };

  const handleEditCrop = (editedCrop: Crop) => {
    setCrops(crops.map(crop => crop.id === editedCrop.id ? editedCrop : crop));
    setIsEditDialogOpen(false);
    setEditingCrop(null);
  };

  const handleDeleteCrop = (id: number) => {
    setCrops(crops.filter(crop => crop.id !== id));
  };

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const varieties = formData.get('varieties')?.toString().split(',').map(v => v.trim()) || [];
    
    handleAddCrop({
      name: formData.get('name')?.toString() || '',
      category: formData.get('category')?.toString() || '',
      sunlight: formData.get('sunlight')?.toString() || '',
      waterNeeds: formData.get('waterNeeds')?.toString() || '',
      temperature: formData.get('temperature')?.toString() || '',
      soilType: formData.get('soilType')?.toString() || '',
      growingSeason: formData.get('growingSeason')?.toString() || '',
      varieties,
      profit: formData.get('profit')?.toString() || '',
    });
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCrop) return;

    const formData = new FormData(e.currentTarget);
    const varieties = formData.get('varieties')?.toString().split(',').map(v => v.trim()) || [];
    
    handleEditCrop({
      ...editingCrop,
      name: formData.get('name')?.toString() || '',
      category: formData.get('category')?.toString() || '',
      sunlight: formData.get('sunlight')?.toString() || '',
      waterNeeds: formData.get('waterNeeds')?.toString() || '',
      temperature: formData.get('temperature')?.toString() || '',
      soilType: formData.get('soilType')?.toString() || '',
      growingSeason: formData.get('growingSeason')?.toString() || '',
      varieties,
      profit: formData.get('profit')?.toString() || '',
    });
  };

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar
        variant="inset"
        user={{
          id: 1,
          role: 'farmer',
          name: 'John Doe',
          email: 'john.doe@example.com',
          avatar: '/avatars/farmer.jpg',
        }}
      />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="mb-2 text-2xl font-bold">Crop Database</h1>
                    <p className="text-muted-foreground mb-6">
                      Comprehensive information on various crop types and growing conditions
                    </p>
                  </div>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <IconPlus className="mr-2 h-4 w-4" />
                        Add Crop
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Crop</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddSubmit}>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="name">Crop Name</Label>
                            <Input id="name" name="name" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Input id="category" name="category" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="sunlight">Sunlight Requirements</Label>
                            <Input id="sunlight" name="sunlight" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="waterNeeds">Water Needs</Label>
                            <Input id="waterNeeds" name="waterNeeds" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="temperature">Temperature Range</Label>
                            <Input id="temperature" name="temperature" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="soilType">Soil Type</Label>
                            <Input id="soilType" name="soilType" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="growingSeason">Growing Season</Label>
                            <Textarea id="growingSeason" name="growingSeason" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="varieties">Varieties (comma-separated)</Label>
                            <Input id="varieties" name="varieties" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="profit">Profit Level</Label>
                            <Input id="profit" name="profit" required />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">Add Crop</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Charts Section */}
              <div className="px-4 lg:px-6">
                <h2 className="mb-4 text-xl font-semibold">Crop Analytics</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Yield Trends Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Crop Yield Trends (2020-2023)</CardTitle>
                      <CardDescription>Annual yield in tons per hectare</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={yieldData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Rice" stroke="#8884d8" />
                            <Line type="monotone" dataKey="Wheat" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="Corn" stroke="#ffc658" />
                            <Line type="monotone" dataKey="Soybeans" stroke="#ff8042" />
                            <Line type="monotone" dataKey="Tomatoes" stroke="#0088fe" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Profit Distribution Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Profit Distribution</CardTitle>
                      <CardDescription>Percentage of total profit by crop</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={profitData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {profitData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Water Usage Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Water Usage</CardTitle>
                      <CardDescription>Annual water requirement in mm</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={waterUsageData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="crop" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="usage" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Growing Season Comparison */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Growing Season Comparison</CardTitle>
                      <CardDescription>Optimal growing periods</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {crops.map((crop) => (
                          <div key={crop.id} className="flex items-center gap-4">
                            <div className="w-32 font-medium">{crop.name}</div>
                            <div className="flex-1">
                              <div className="h-4 rounded-full bg-muted">
                                <div
                                  className="h-full rounded-full bg-primary"
                                  style={{ width: '75%' }}
                                />
                              </div>
                            </div>
                            <div className="w-24 text-sm text-muted-foreground">
                              {crop.growingSeason}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Table Section */}
              <div className="px-4 lg:px-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Crop Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Sunlight</TableHead>
                      <TableHead>Water Needs</TableHead>
                      <TableHead>Temperature</TableHead>
                      <TableHead>Soil Type</TableHead>
                      <TableHead>Growing Season</TableHead>
                      <TableHead>Varieties</TableHead>
                      <TableHead>Profit</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {crops.map((crop) => (
                      <TableRow key={crop.id}>
                        <TableCell>{crop.name}</TableCell>
                        <TableCell>{crop.category}</TableCell>
                        <TableCell>{crop.sunlight}</TableCell>
                        <TableCell>{crop.waterNeeds}</TableCell>
                        <TableCell>{crop.temperature}</TableCell>
                        <TableCell>{crop.soilType}</TableCell>
                        <TableCell>{crop.growingSeason}</TableCell>
                        <TableCell>{crop.varieties.join(', ')}</TableCell>
                        <TableCell>{crop.profit}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog open={isEditDialogOpen && editingCrop?.id === crop.id} onOpenChange={setIsEditDialogOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setEditingCrop(crop)}
                                >
                                  <IconEdit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Crop</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleEditSubmit}>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="name">Crop Name</Label>
                                      <Input id="name" name="name" defaultValue={crop.name} required />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="category">Category</Label>
                                      <Input id="category" name="category" defaultValue={crop.category} required />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="sunlight">Sunlight Requirements</Label>
                                      <Input id="sunlight" name="sunlight" defaultValue={crop.sunlight} required />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="waterNeeds">Water Needs</Label>
                                      <Input id="waterNeeds" name="waterNeeds" defaultValue={crop.waterNeeds} required />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="temperature">Temperature Range</Label>
                                      <Input id="temperature" name="temperature" defaultValue={crop.temperature} required />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="soilType">Soil Type</Label>
                                      <Input id="soilType" name="soilType" defaultValue={crop.soilType} required />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="growingSeason">Growing Season</Label>
                                      <Textarea id="growingSeason" name="growingSeason" defaultValue={crop.growingSeason} required />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="varieties">Varieties (comma-separated)</Label>
                                      <Input id="varieties" name="varieties" defaultValue={crop.varieties.join(', ')} required />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="profit">Profit Level</Label>
                                      <Input id="profit" name="profit" defaultValue={crop.profit} required />
                                    </div>
                                  </div>
                                  <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                      Cancel
                                    </Button>
                                    <Button type="submit">Save Changes</Button>
                                  </div>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteCrop(crop.id)}
                            >
                              <IconTrash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
