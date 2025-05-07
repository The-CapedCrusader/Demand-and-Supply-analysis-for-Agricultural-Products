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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Badge } from '~/components/ui/badge';
import { Input } from '~/components/ui/input';
import {
  IconDownload,
  IconFileAnalytics,
  IconFileChart,
  IconFileDollar,
  IconFileReport,
  IconFileStar,
  IconFileText,
  IconCalendar,
  IconUser,
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
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
  AreaChart,
  Area,
} from 'recharts';

interface MarketReport {
  id: number;
  title: string;
  type: string;
  date: string;
  author: string;
  status: string;
  description: string;
  downloadCount: number;
}

// Dummy data for market reports
const initialReports: MarketReport[] = [
  {
    id: 1,
    title: 'Weekly Price Trends',
    type: 'Weekly',
    date: '2023-08-12',
    author: 'Market Analysis Team',
    status: 'Published',
    description: 'Analysis of commodity price movements over the past week with forecasts for the coming week.',
    downloadCount: 245,
  },
  {
    id: 2,
    title: 'Market Demand Report',
    type: 'Weekly',
    date: '2023-08-11',
    author: 'Regional Analysts',
    status: 'Published',
    description: 'Comprehensive review of current market demand by region and product category.',
    downloadCount: 189,
  },
  {
    id: 3,
    title: 'Weather Impact Analysis',
    type: 'Weekly',
    date: '2023-08-10',
    author: 'Meteorological Team',
    status: 'Draft',
    description: 'Assessment of weather patterns and their projected impact on crop production and prices.',
    downloadCount: 156,
  },
];

// Chart data
const priceTrendData = [
  { month: 'Jan', Rice: 4000, Wheat: 2400, Corn: 1800 },
  { month: 'Feb', Rice: 4200, Wheat: 2600, Corn: 1900 },
  { month: 'Mar', Rice: 4100, Wheat: 2500, Corn: 1850 },
  { month: 'Apr', Rice: 4300, Wheat: 2700, Corn: 2000 },
  { month: 'May', Rice: 4400, Wheat: 2800, Corn: 2100 },
  { month: 'Jun', Rice: 4500, Wheat: 2900, Corn: 2200 },
];

const demandData = [
  { name: 'Rice', value: 35 },
  { name: 'Wheat', value: 25 },
  { name: 'Corn', value: 20 },
  { name: 'Soybeans', value: 15 },
  { name: 'Vegetables', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const exportData = [
  { year: '2020', value: 4000 },
  { year: '2021', value: 4500 },
  { year: '2022', value: 5000 },
  { year: '2023', value: 5500 },
];

const regionalData = [
  { region: 'North', production: 4000, consumption: 3000 },
  { region: 'South', production: 3000, consumption: 3500 },
  { region: 'East', production: 2000, consumption: 2500 },
  { region: 'West', production: 3500, consumption: 2800 },
];

export default function MarketReportsPage() {
  const [reports, setReports] = useState<MarketReport[]>(initialReports);
  const [editingReport, setEditingReport] = useState<MarketReport | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddReport = (newReport: Omit<MarketReport, 'id'>) => {
    setReports([...reports, { ...newReport, id: reports.length + 1 }]);
    setIsAddDialogOpen(false);
  };

  const handleEditReport = (editedReport: MarketReport) => {
    setReports(reports.map(report => report.id === editedReport.id ? editedReport : report));
    setIsEditDialogOpen(false);
    setEditingReport(null);
  };

  const handleDeleteReport = (id: number) => {
    setReports(reports.filter(report => report.id !== id));
  };

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    handleAddReport({
      title: formData.get('title')?.toString() || '',
      type: formData.get('type')?.toString() || '',
      date: formData.get('date')?.toString() || '',
      author: formData.get('author')?.toString() || '',
      status: formData.get('status')?.toString() || '',
      description: formData.get('description')?.toString() || '',
      downloadCount: 0,
    });
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingReport) return;

    const formData = new FormData(e.currentTarget);
    
    handleEditReport({
      ...editingReport,
      title: formData.get('title')?.toString() || '',
      type: formData.get('type')?.toString() || '',
      date: formData.get('date')?.toString() || '',
      author: formData.get('author')?.toString() || '',
      status: formData.get('status')?.toString() || '',
      description: formData.get('description')?.toString() || '',
    });
  };

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                    <h1 className="mb-2 text-2xl font-bold">Market Reports</h1>
                    <p className="text-muted-foreground mb-6">
                      Access comprehensive agricultural market analysis and reports
                    </p>
                  </div>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <IconPlus className="mr-2 h-4 w-4" />
                        Add Report
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Report</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddSubmit}>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="title">Report Title</Label>
                            <Input id="title" name="title" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="type">Report Type</Label>
                            <Input id="type" name="type" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" name="date" type="date" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="author">Author</Label>
                            <Input id="author" name="author" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Input id="status" name="status" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" required />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">Add Report</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Charts Section */}
              <div className="px-4 lg:px-6">
                <h2 className="mb-4 text-xl font-semibold">Market Analytics</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Price Trends Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Price Trends (2023)</CardTitle>
                      <CardDescription>Monthly price variations for major crops</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={priceTrendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Rice" stroke="#8884d8" />
                            <Line type="monotone" dataKey="Wheat" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="Corn" stroke="#ffc658" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Demand Distribution Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Demand Distribution</CardTitle>
                      <CardDescription>Percentage of total demand by crop</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={demandData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {demandData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Export Trends Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Export Trends</CardTitle>
                      <CardDescription>Annual export volume in metric tons</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={exportData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Regional Production vs Consumption */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Regional Analysis</CardTitle>
                      <CardDescription>Production vs Consumption by Region</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={regionalData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="region" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="production" fill="#8884d8" name="Production" />
                            <Bar dataKey="consumption" fill="#82ca9d" name="Consumption" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Reports Table Section */}
              <div className="px-4 lg:px-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="relative w-64">
                    <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reports..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>{report.title}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{report.author}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              report.status === 'Published'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                            }
                          >
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{report.downloadCount}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog open={isEditDialogOpen && editingReport?.id === report.id} onOpenChange={setIsEditDialogOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setEditingReport(report)}
                                >
                                  <IconEdit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Report</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleEditSubmit}>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="title">Report Title</Label>
                                      <Input id="title" name="title" defaultValue={report.title} required />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="type">Report Type</Label>
                                      <Input id="type" name="type" defaultValue={report.type} required />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="date">Date</Label>
                                      <Input id="date" name="date" type="date" defaultValue={report.date} required />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="author">Author</Label>
                                      <Input id="author" name="author" defaultValue={report.author} required />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="status">Status</Label>
                                      <Input id="status" name="status" defaultValue={report.status} required />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="description">Description</Label>
                                      <Textarea id="description" name="description" defaultValue={report.description} required />
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
                              onClick={() => handleDeleteReport(report.id)}
                            >
                              <IconTrash className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <IconDownload className="h-4 w-4" />
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
