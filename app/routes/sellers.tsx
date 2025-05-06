import { redirect } from 'react-router';
import { useLoaderData, useActionData, Form } from 'react-router';
import { useState } from 'react';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs';
import { Badge } from '~/components/ui/badge';
import { IconPencil, IconTrash, IconUserPlus, IconX } from '@tabler/icons-react';
import { AppSidebar } from '~/components/navigation/app-sidebar';
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';
import { SiteHeader } from '~/components/site-header';
import { Separator } from '~/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '~/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

import { createVendor, deleteVendor, getAllVendors, getVendorById, updateVendor } from '~/lib/users.server';
import type { Vendor, VendorInput } from '~/lib/users.server';

// Define types for the loader and action
export type LoaderData = {
  vendors: Vendor[];
};

// Loader function to get all vendors
export async function loader() {
  const result = await getAllVendors();
  
  if (!result.success) {
    return ({ vendors: [] });
  }
  
  return ({ vendors: result.vendors });
}

// Action function to handle form submissions
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const action = formData.get('_action') as string;
  
  // Add new vendor
  if (action === 'add') {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const phone = formData.get('phone') as string;
    const addressLine1 = formData.get('addressLine1') as string;
    const addressLine2 = formData.get('addressLine2') as string;
    const zip = formData.get('zip') as string;
    const vendorType = formData.get('vendorType') as 'wholesaler' | 'retailer';
    
    if (!name || !email || !password || !vendorType) {
      return ({ success: false, error: 'Name, email, password, and vendor type are required' });
    }
    
    const vendorData: VendorInput = {
      Name: name,
      Email: email,
      Password: password,
      Phone: phone || undefined,
      AddressLine1: addressLine1 || undefined,
      AddressLine2: addressLine2 || undefined,
      Zip: zip || undefined,
      VendorType: vendorType,
    };
    
    const result = await createVendor(vendorData);
    
    if (!result.success) {
      return ({ success: false, error: 'Failed to create vendor' });
    }
    
    return redirect('/sellers');
  }
  
  // Update vendor
  if (action === 'update') {
    const licenseId = Number(formData.get('licenseId'));
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const addressLine1 = formData.get('addressLine1') as string;
    const addressLine2 = formData.get('addressLine2') as string;
    const zip = formData.get('zip') as string;
    const vendorType = formData.get('vendorType') as 'wholesaler' | 'retailer';
    
    if (!licenseId || !name || !email) {
      return ({ success: false, error: 'License ID, name, and email are required' });
    }
    
    const vendorData: Partial<VendorInput> = {
      Name: name,
      Email: email,
      Phone: phone || undefined,
      AddressLine1: addressLine1 || undefined,
      AddressLine2: addressLine2 || undefined,
      Zip: zip || undefined,
    };
    
    if (vendorType) {
      vendorData.VendorType = vendorType;
    }
    
    const result = await updateVendor(licenseId, vendorData);
    
    if (!result.success) {
      return ({ success: false, error: 'Failed to update vendor' });
    }
    
    return redirect('/sellers');
  }
  
  // Delete vendor
  if (action === 'delete') {
    const licenseId = Number(formData.get('licenseId'));
    
    if (!licenseId) {
      return ({ success: false, error: 'License ID is required' });
    }
    
    const result = await deleteVendor(licenseId);
    
    if (!result.success) {
      return ({ success: false, error: 'Failed to delete vendor' });
    }
    
    return redirect('/sellers');
  }
  
  return ({ success: false, error: 'Invalid action' });
}

export default function SellersPage() {
  const { vendors } = useLoaderData<LoaderData>();
  const actionData = useActionData();
  
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const handleEditClick = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteClick = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setIsDeleteDialogOpen(true);
  };
  
  const getVendorTypeBadge = (type: string) => {
    if (type === 'wholesaler') {
      return <Badge className="border-0 bg-blue-100 text-blue-800">Wholesaler</Badge>;
    }
    return <Badge className="border-0 bg-purple-100 text-purple-800">Retailer</Badge>;
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
              <div className="px-4 lg:px-6">
                <h1 className="mb-2 text-2xl font-bold">Manage Sellers</h1>
                <p className="text-muted-foreground">
                  Add, edit, and remove sellers from your system
                </p>
              </div>
              
              <div className="flex justify-between items-center px-4 lg:px-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold">Sellers List</h2>
                  <p className="text-muted-foreground text-sm">
                    {vendors.length} {vendors.length === 1 ? 'seller' : 'sellers'} registered
                  </p>
                </div>
                
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <IconUserPlus className="mr-2 h-4 w-4" />
                  Add Seller
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
                    <CardTitle>Registered Sellers</CardTitle>
                    <CardDescription>
                      Vendors who sell products in your marketplace
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {vendors.length === 0 ? (
                      <div className="text-center p-6">
                        <p className="text-muted-foreground">No sellers found</p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => setIsAddDialogOpen(true)}
                        >
                          Add Your First Seller
                        </Button>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {vendors.map((vendor) => (
                          <div key={vendor.LicenseID} className="bg-muted/20 rounded-lg p-4">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{vendor.Name}</h3>
                                {getVendorTypeBadge(vendor.VendorType)}
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditClick(vendor)}
                                >
                                  <IconPencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-500 hover:text-red-600"
                                  onClick={() => handleDeleteClick(vendor)}
                                >
                                  <IconTrash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                              <div>
                                <p className="text-muted-foreground text-sm">Email</p>
                                <p className="font-medium">{vendor.Email}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-sm">Phone</p>
                                <p className="font-medium">{vendor.Phone || 'Not provided'}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-sm">Address</p>
                                <p className="font-medium">
                                  {vendor.AddressLine1 ? `${vendor.AddressLine1}, ${vendor.Zip || ''}` : 'Not provided'}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-sm">License ID</p>
                                <p className="font-medium">{vendor.LicenseID}</p>
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
      
      {/* Add Vendor Dialog */}
      <AlertDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <AlertDialogContent className="sm:max-w-md">
          <Form method="post">
            <AlertDialogHeader>
              <AlertDialogTitle>Add New Seller</AlertDialogTitle>
              <AlertDialogDescription>
                Fill in the details to add a new seller to your system
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Business Name</Label>
                <Input id="name" name="name" placeholder="Business Name" required />
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
                <Label htmlFor="vendorType">Seller Type</Label>
                <select 
                  id="vendorType" 
                  name="vendorType" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                  aria-label="Seller Type"
                >
                  <option value="">Select a seller type</option>
                  <option value="wholesaler">Wholesaler</option>
                  <option value="retailer">Retailer</option>
                </select>
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
                <Button type="submit">Add Seller</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Edit Vendor Dialog */}
      <AlertDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <AlertDialogContent className="sm:max-w-md">
          <Form method="post">
            <AlertDialogHeader>
              <AlertDialogTitle>Edit Seller</AlertDialogTitle>
              <AlertDialogDescription>
                Update seller's information
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Business Name</Label>
                <Input 
                  id="edit-name" 
                  name="name" 
                  defaultValue={selectedVendor?.Name || ''} 
                  required 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input 
                  id="edit-email" 
                  name="email" 
                  type="email" 
                  defaultValue={selectedVendor?.Email || ''} 
                  required 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-vendorType">Seller Type</Label>
                <select 
                  id="edit-vendorType" 
                  name="vendorType" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={selectedVendor?.VendorType || ''}
                  required
                  aria-label="Seller Type"
                >
                  <option value="wholesaler">Wholesaler</option>
                  <option value="retailer">Retailer</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input 
                  id="edit-phone" 
                  name="phone" 
                  defaultValue={selectedVendor?.Phone || ''} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-addressLine1">Address Line 1</Label>
                <Input 
                  id="edit-addressLine1" 
                  name="addressLine1" 
                  defaultValue={selectedVendor?.AddressLine1 || ''} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-addressLine2">Address Line 2</Label>
                <Input 
                  id="edit-addressLine2" 
                  name="addressLine2" 
                  defaultValue={selectedVendor?.AddressLine2 || ''} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-zip">ZIP Code</Label>
                <Input 
                  id="edit-zip" 
                  name="zip" 
                  defaultValue={selectedVendor?.Zip || ''} 
                />
              </div>
            </div>
            
            <input type="hidden" name="_action" value="update" />
            <input type="hidden" name="licenseId" value={selectedVendor?.LicenseID} />
            
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit">Update Seller</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Delete Vendor Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <Form method="post">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Seller</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this seller? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="mt-4 p-4 bg-red-50 rounded-md">
              <p className="font-medium">{selectedVendor?.Name}</p>
              <p className="text-sm text-muted-foreground">
                {selectedVendor?.VendorType === 'wholesaler' ? 'Wholesaler' : 'Retailer'} - License ID: {selectedVendor?.LicenseID}
              </p>
              <p className="text-sm text-muted-foreground">{selectedVendor?.Email}</p>
            </div>
            
            <input type="hidden" name="_action" value="delete" />
            <input type="hidden" name="licenseId" value={selectedVendor?.LicenseID} />
            
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit" className="bg-red-500 hover:bg-red-600">
                  Delete Seller
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
} 