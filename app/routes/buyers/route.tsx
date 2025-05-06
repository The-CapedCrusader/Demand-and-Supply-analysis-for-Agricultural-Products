import { Link } from 'react-router';
import { useState } from 'react';
import { useLoaderData, useActionData, Form } from 'react-router';
import { loader } from './route.server';
import { action } from './route.server';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs';
import { Badge } from '~/components/ui/badge';
import { IconPencil, IconTrash, IconUserPlus, IconArrowLeft } from '@tabler/icons-react';
import { AppSidebar } from '~/components/navigation/app-sidebar';
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';
import { SiteHeader } from '~/components/site-header';
import { Separator } from '~/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '~/components/ui/alert-dialog';

import type { Customer } from '~/lib/users.server';

export { loader, action };

export default function BuyersPage() {
  const { customers } = useLoaderData<{ customers: Customer[] }>();
  const actionData = useActionData();
  
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const handleEditClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteDialogOpen(true);
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
          role: 'admin',
          name: 'Admin User',
          email: 'admin@example.com',
          avatar: '/avatars/admin.jpg',
        }}
      />
      
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6 flex items-center justify-between">
                <div>
                  <h1 className="mb-2 text-2xl font-bold">Manage Buyers</h1>
                  <p className="text-muted-foreground">
                    Add, edit, and remove buyers from your system
                  </p>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => {
                    window.location.href = '/buyers-sellers';
                  }}
                >
                  <IconArrowLeft className="mr-2 h-4 w-4" />
                  Back to Overview
                </Button>
              </div>
              
              <div className="flex justify-between items-center px-4 lg:px-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold">Buyers List</h2>
                  <p className="text-muted-foreground text-sm">
                    {customers.length} {customers.length === 1 ? 'buyer' : 'buyers'} registered
                  </p>
                </div>
                
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <IconUserPlus className="mr-2 h-4 w-4" />
                  Add Buyer
                </Button>
              </div>
              
              <div className="px-4 lg:px-6">
                {actionData?.error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                    <p className="text-red-700">{actionData.error}</p>
                  </div>
                )}
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Registered Buyers</CardTitle>
                    <CardDescription>
                      Customers who can purchase your products
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {customers.length === 0 ? (
                      <div className="text-center p-6">
                        <p className="text-muted-foreground">No buyers found</p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => setIsAddDialogOpen(true)}
                        >
                          Add Your First Buyer
                        </Button>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {customers.map((customer) => (
                          <div key={customer.UserID} className="bg-muted/20 rounded-lg p-4">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{customer.Name}</h3>
                                <Badge className="border-0 bg-green-100 text-green-800">
                                  Customer
                                </Badge>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditClick(customer)}
                                >
                                  <IconPencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-500 hover:text-red-600"
                                  onClick={() => handleDeleteClick(customer)}
                                >
                                  <IconTrash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                              <div>
                                <p className="text-muted-foreground text-sm">Email</p>
                                <p className="font-medium">{customer.Email}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-sm">Phone</p>
                                <p className="font-medium">{customer.Phone || 'Not provided'}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-sm">Address</p>
                                <p className="font-medium">
                                  {customer.AddressLine1 ? `${customer.AddressLine1}, ${customer.Zip || ''}` : 'Not provided'}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
      
      {/* Add Customer Dialog */}
      <AlertDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <AlertDialogContent className="sm:max-w-md">
          <Form method="post">
            <AlertDialogHeader>
              <AlertDialogTitle>Add New Buyer</AlertDialogTitle>
              <AlertDialogDescription>
                Fill in the details to add a new buyer to your system
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Full Name" required />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" placeholder="email@example.com" type="email" required />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" placeholder="Password" type="password" required />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" placeholder="Phone Number" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input id="addressLine1" name="addressLine1" placeholder="Street Address" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input id="addressLine2" name="addressLine2" placeholder="Apt, Suite, etc." />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" name="zip" placeholder="ZIP Code" />
              </div>
            </div>
            
            <input type="hidden" name="_action" value="add" />
            
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit">Add Buyer</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Edit Customer Dialog */}
      <AlertDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <AlertDialogContent className="sm:max-w-md">
          <Form method="post">
            <AlertDialogHeader>
              <AlertDialogTitle>Edit Buyer</AlertDialogTitle>
              <AlertDialogDescription>
                Update buyer's information
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input 
                  id="edit-name" 
                  name="name" 
                  defaultValue={selectedCustomer?.Name || ''} 
                  required 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input 
                  id="edit-email" 
                  name="email" 
                  type="email" 
                  defaultValue={selectedCustomer?.Email || ''} 
                  required 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input 
                  id="edit-phone" 
                  name="phone" 
                  defaultValue={selectedCustomer?.Phone || ''} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-addressLine1">Address Line 1</Label>
                <Input 
                  id="edit-addressLine1" 
                  name="addressLine1" 
                  defaultValue={selectedCustomer?.AddressLine1 || ''} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-addressLine2">Address Line 2</Label>
                <Input 
                  id="edit-addressLine2" 
                  name="addressLine2" 
                  defaultValue={selectedCustomer?.AddressLine2 || ''} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-zip">ZIP Code</Label>
                <Input 
                  id="edit-zip" 
                  name="zip" 
                  defaultValue={selectedCustomer?.Zip || ''} 
                />
              </div>
            </div>
            
            <input type="hidden" name="_action" value="update" />
            <input type="hidden" name="userId" value={selectedCustomer?.UserID} />
            
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit">Update Buyer</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Delete Customer Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <Form method="post">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Buyer</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this buyer? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="mt-4 p-4 bg-red-50 rounded-md">
              <p className="font-medium">{selectedCustomer?.Name}</p>
              <p className="text-sm text-muted-foreground">{selectedCustomer?.Email}</p>
            </div>
            
            <input type="hidden" name="_action" value="delete" />
            <input type="hidden" name="userId" value={selectedCustomer?.UserID} />
            
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit" className="bg-red-500 hover:bg-red-600">
                  Delete Buyer
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
} 