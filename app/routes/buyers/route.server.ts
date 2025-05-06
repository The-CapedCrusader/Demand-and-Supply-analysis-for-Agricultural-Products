import { redirect } from 'react-router';
import { createCustomer, deleteCustomer, getAllCustomers, updateCustomer } from '~/lib/users.server';
import type { Customer, CustomerInput } from '~/lib/users.server';

// Define types for action and loader arguments
export interface RouteArgs {
  request: Request;
  params: Record<string, string>;
  context: any;
}

// Loader function to get all customers
export async function loader() {
  const result = await getAllCustomers();
  
  if (!result.success) {
    return { customers: [] };
  }
  
  return { customers: result.customers };
}

// Action function to handle form submissions
export async function action({ request }: RouteArgs) {
  const formData = await request.formData();
  const action = formData.get('_action') as string;
  
  // Add new customer
  if (action === 'add') {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const phone = formData.get('phone') as string;
    const addressLine1 = formData.get('addressLine1') as string;
    const addressLine2 = formData.get('addressLine2') as string;
    const zip = formData.get('zip') as string;
    
    if (!name || !email || !password) {
      return { success: false, error: 'Name, email, and password are required' };
    }
    
    const customerData: CustomerInput = {
      Name: name,
      Email: email,
      Password: password,
      Phone: phone || undefined,
      AddressLine1: addressLine1 || undefined,
      AddressLine2: addressLine2 || undefined,
      Zip: zip || undefined,
    };
    
    const result = await createCustomer(customerData);
    
    if (!result.success) {
      return { success: false, error: 'Failed to create customer' };
    }
    
    return redirect('/buyers');
  }
  
  // Update customer
  if (action === 'update') {
    const userId = Number(formData.get('userId'));
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const addressLine1 = formData.get('addressLine1') as string;
    const addressLine2 = formData.get('addressLine2') as string;
    const zip = formData.get('zip') as string;
    
    if (!userId || !name || !email) {
      return { success: false, error: 'User ID, name, and email are required' };
    }
    
    const customerData: Partial<CustomerInput> = {
      Name: name,
      Email: email,
      Phone: phone || undefined,
      AddressLine1: addressLine1 || undefined,
      AddressLine2: addressLine2 || undefined,
      Zip: zip || undefined,
    };
    
    const result = await updateCustomer(userId, customerData);
    
    if (!result.success) {
      return { success: false, error: 'Failed to update customer' };
    }
    
    return redirect('/buyers');
  }
  
  // Delete customer
  if (action === 'delete') {
    const userId = Number(formData.get('userId'));
    
    if (!userId) {
      return { success: false, error: 'User ID is required' };
    }
    
    const result = await deleteCustomer(userId);
    
    if (!result.success) {
      return { success: false, error: 'Failed to delete customer' };
    }
    
    return redirect('/buyers');
  }
  
  return { success: false, error: 'Invalid action' };
} 