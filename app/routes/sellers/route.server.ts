import { redirect } from 'react-router';
import { createVendor, deleteVendor, getAllVendors, updateVendor } from '~/lib/users.server';
import type { Vendor, VendorInput } from '~/lib/users.server';

// Define types for action and loader arguments
export interface RouteArgs {
  request: Request;
  params: Record<string, string>;
  context: any;
}

// Loader function to get all vendors
export async function loader() {
  const result = await getAllVendors();
  
  if (!result.success) {
    return { vendors: [] };
  }
  
  return { vendors: result.vendors };
}

// Action function to handle form submissions
export async function action({ request }: RouteArgs) {
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
      return { success: false, error: 'Name, email, password, and vendor type are required' };
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
      return { success: false, error: 'Failed to create vendor' };
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
      return { success: false, error: 'License ID, name, and email are required' };
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
      return { success: false, error: 'Failed to update vendor' };
    }
    
    return redirect('/sellers');
  }
  
  // Delete vendor
  if (action === 'delete') {
    const licenseId = Number(formData.get('licenseId'));
    
    if (!licenseId) {
      return { success: false, error: 'License ID is required' };
    }
    
    const result = await deleteVendor(licenseId);
    
    if (!result.success) {
      return { success: false, error: 'Failed to delete vendor' };
    }
    
    return redirect('/sellers');
  }
  
  return { success: false, error: 'Invalid action' };
} 