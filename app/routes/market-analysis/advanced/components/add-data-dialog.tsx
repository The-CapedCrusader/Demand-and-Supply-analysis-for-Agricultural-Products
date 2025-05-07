import { useState } from 'react';
import { Form } from 'react-router';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from '~/components/ui/dialog';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

interface AddDataDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dataType: string;
  products: any[];
  regions: any[];
  isSubmitting: boolean;
}

export function AddDataDialog({ 
  isOpen, 
  onClose, 
  dataType, 
  products, 
  regions, 
  isSubmitting 
}: AddDataDialogProps) {
  // Convert dataType to a valid tab value
  const getDefaultTab = () => {
    switch (dataType) {
      case 'production': return 'production';
      case 'demand': return 'demand';
      case 'supply': return 'inventory';
      case 'weather': return 'weather';
      case 'recommendation': return 'recommendation';
      default: return 'production';
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Market Analysis Data</DialogTitle>
          <DialogDescription>
            Enter new data to enhance market analysis and forecasting
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={getDefaultTab()}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="production">Production</TabsTrigger>
            <TabsTrigger value="demand">Demand</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
            <TabsTrigger value="recommendation">Recommendation</TabsTrigger>
          </TabsList>
          
          {/* Production Data Form */}
          <TabsContent value="production">
            <Form method="post" onSubmit={() => {
              if (!isSubmitting) return true;
              return false;
            }}>
              <input type="hidden" name="actionType" value="updateProduction" />
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productId" className="text-right">Product</Label>
                  <div className="col-span-3">
                    <Select name="productId">
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map(prod => (
                          <SelectItem key={prod.ProductID} value={prod.ProductID.toString()}>
                            {prod.ProductName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="year" className="text-right">Year</Label>
                  <Input name="year" type="number" defaultValue={new Date().getFullYear()} className="col-span-3" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="region" className="text-right">Region</Label>
                  <div className="col-span-3">
                    <Select name="region">
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region: any) => (
                          <SelectItem key={region.Region} value={region.Region}>
                            {region.Region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="totalAcreage" className="text-right">Total Acreage (ha)</Label>
                  <Input name="totalAcreage" type="number" step="0.01" className="col-span-3" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="averageYield" className="text-right">Average Yield (t/ha)</Label>
                  <Input name="averageYield" type="number" step="0.01" className="col-span-3" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productionCost" className="text-right">Production Cost ($/t)</Label>
                  <Input name="productionCost" type="number" step="0.01" className="col-span-3" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="totalProduction" className="text-right">Total Production (t)</Label>
                  <Input name="totalProduction" type="number" step="0.01" className="col-span-3" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">Notes</Label>
                  <Textarea name="notes" className="col-span-3" />
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Add Production Data'}
                </Button>
              </DialogFooter>
            </Form>
          </TabsContent>
          
          {/* Inventory Data Form */}
          <TabsContent value="inventory">
            <Form method="post" onSubmit={() => {
              if (!isSubmitting) return true;
              return false;
            }}>
              <input type="hidden" name="actionType" value="updateInventory" />
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productId" className="text-right">Product</Label>
                  <div className="col-span-3">
                    <Select name="productId">
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map(prod => (
                          <SelectItem key={prod.ProductID} value={prod.ProductID.toString()}>
                            {prod.ProductName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="warehouseId" className="text-right">Warehouse ID</Label>
                  <Input name="warehouseId" type="number" className="col-span-3" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="currentStock" className="text-right">Current Stock</Label>
                  <Input name="currentStock" type="number" step="0.01" className="col-span-3" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="minimumStock" className="text-right">Minimum Stock</Label>
                  <Input name="minimumStock" type="number" step="0.01" className="col-span-3" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="maximumCapacity" className="text-right">Maximum Capacity</Label>
                  <Input name="maximumCapacity" type="number" step="0.01" className="col-span-3" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="qualityGrade" className="text-right">Quality Grade</Label>
                  <div className="col-span-3">
                    <Select name="qualityGrade">
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A - Premium</SelectItem>
                        <SelectItem value="B">B - Standard</SelectItem>
                        <SelectItem value="C">C - Basic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="storageCondition" className="text-right">Storage Condition</Label>
                  <Input name="storageCondition" className="col-span-3" placeholder="e.g., Temperature: 15-20°C, Humidity: 40-60%" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">Notes</Label>
                  <Textarea name="notes" className="col-span-3" />
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Update Inventory Data'}
                </Button>
              </DialogFooter>
            </Form>
          </TabsContent>
          
          {/* Weather Impact Form */}
          <TabsContent value="weather">
            <Form method="post" onSubmit={() => {
              if (!isSubmitting) return true;
              return false;
            }}>
              <input type="hidden" name="actionType" value="addWeatherImpact" />
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productId" className="text-right">Product</Label>
                  <div className="col-span-3">
                    <Select name="productId">
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map(prod => (
                          <SelectItem key={prod.ProductID} value={prod.ProductID.toString()}>
                            {prod.ProductName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="region" className="text-right">Region</Label>
                  <div className="col-span-3">
                    <Select name="region">
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region: any) => (
                          <SelectItem key={region.Region} value={region.Region}>
                            {region.Region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="weatherType" className="text-right">Weather Type</Label>
                  <div className="col-span-3">
                    <Select name="weatherType">
                      <SelectTrigger>
                        <SelectValue placeholder="Select weather type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Drought">Drought</SelectItem>
                        <SelectItem value="Flood">Flood</SelectItem>
                        <SelectItem value="Heat Wave">Heat Wave</SelectItem>
                        <SelectItem value="Frost">Frost</SelectItem>
                        <SelectItem value="Excessive Rain">Excessive Rain</SelectItem>
                        <SelectItem value="Normal">Normal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="year" className="text-right">Year</Label>
                  <Input name="year" type="number" defaultValue={new Date().getFullYear()} className="col-span-3" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="month" className="text-right">Month</Label>
                  <div className="col-span-3">
                    <Select name="month">
                      <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
                          <SelectItem key={month} value={month.toString()}>
                            {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="yieldImpactPercent" className="text-right">Yield Impact (%)</Label>
                  <Input name="yieldImpactPercent" type="number" step="0.01" className="col-span-3" placeholder="-15.20 for negative impact" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priceImpactPercent" className="text-right">Price Impact (%)</Label>
                  <Input name="priceImpactPercent" type="number" step="0.01" className="col-span-3" placeholder="8.50 for price increase" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">Notes</Label>
                  <Textarea name="notes" className="col-span-3" />
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Add Weather Impact Data'}
                </Button>
              </DialogFooter>
            </Form>
          </TabsContent>
          
          {/* Demand Data Form Placeholder */}
          <TabsContent value="demand">
            <Form method="post" onSubmit={() => {
              if (!isSubmitting) return true;
              return false;
            }}>
              <input type="hidden" name="actionType" value="addDemandData" />
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productId" className="text-right">Product</Label>
                  <div className="col-span-3">
                    <Select name="productId">
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map(prod => (
                          <SelectItem key={prod.ProductID} value={prod.ProductID.toString()}>
                            {prod.ProductName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="year" className="text-right">Year</Label>
                  <Input name="year" type="number" defaultValue={new Date().getFullYear()} className="col-span-3" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quarter" className="text-right">Quarter</Label>
                  <div className="col-span-3">
                    <Select name="quarter">
                      <SelectTrigger>
                        <SelectValue placeholder="Select quarter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Q1</SelectItem>
                        <SelectItem value="2">Q2</SelectItem>
                        <SelectItem value="3">Q3</SelectItem>
                        <SelectItem value="4">Q4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="demographicGroup" className="text-right">Demographic Group</Label>
                  <div className="col-span-3">
                    <Select name="demographicGroup">
                      <SelectTrigger>
                        <SelectValue placeholder="Select demographic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Urban">Urban</SelectItem>
                        <SelectItem value="Rural">Rural</SelectItem>
                        <SelectItem value="High-income">High-income</SelectItem>
                        <SelectItem value="Low-income">Low-income</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="region" className="text-right">Region</Label>
                  <div className="col-span-3">
                    <Select name="region">
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region: any) => (
                          <SelectItem key={region.Region} value={region.Region}>
                            {region.Region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">Notes</Label>
                  <Textarea name="notes" className="col-span-3" />
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Add Demand Data'}
                </Button>
              </DialogFooter>
            </Form>
          </TabsContent>
          
          {/* Recommendation Data Form Placeholder */}
          <TabsContent value="recommendation">
            <Form method="post" onSubmit={() => {
              if (!isSubmitting) return true;
              return false;
            }}>
              <input type="hidden" name="actionType" value="addRecommendation" />
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productId" className="text-right">Product</Label>
                  <div className="col-span-3">
                    <Select name="productId">
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map(prod => (
                          <SelectItem key={prod.ProductID} value={prod.ProductID.toString()}>
                            {prod.ProductName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="region" className="text-right">Region</Label>
                  <div className="col-span-3">
                    <Select name="region">
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region: any) => (
                          <SelectItem key={region.Region} value={region.Region}>
                            {region.Region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">Notes</Label>
                  <Textarea name="notes" className="col-span-3" />
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Add Recommendation'}
                </Button>
              </DialogFooter>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 