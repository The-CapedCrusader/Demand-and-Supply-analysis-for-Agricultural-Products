import { getDatabaseConnection } from './database.server';
import { hashPassword, verifyPassword } from './password.server';

/**
 * Types for Buyers (Customers) and Sellers (Vendors)
 */
export type Customer = {
  UserID: number;
  Name: string;
  Email: string;
  Phone?: string;
  AddressLine1?: string;
  AddressLine2?: string;
  Zip?: string;
  created_at?: string;
  updated_at?: string;
};

export type Vendor = {
  UserID: number;
  LicenseID: number;
  Name: string;
  Email: string;
  Phone?: string;
  AddressLine1?: string;
  AddressLine2?: string;
  Zip?: string;
  VendorType: 'wholesaler' | 'retailer';
  RegistrationDate?: string;
  created_at?: string;
  updated_at?: string;
};

export type CustomerInput = Omit<Customer, 'UserID' | 'created_at' | 'updated_at'> & {
  Password: string;
};

export type VendorInput = Omit<Vendor, 'UserID' | 'LicenseID' | 'created_at' | 'updated_at'> & {
  Password: string;
};

/**
 * Customer (Buyer) CRUD Operations
 */

// Create a new customer
export async function createCustomer(customer: CustomerInput) {
  const db = await getDatabaseConnection();
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Insert into USER_T
    const hashedPassword = await hashPassword(customer.Password);
    const [userResult] = await connection.execute(
      `INSERT INTO USER_T (Name, Email, PASSWORD, Phone, AddressLine1, AddressLine2, Zip, UserType)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'customer')`,
      [
        customer.Name,
        customer.Email,
        hashedPassword,
        customer.Phone || null,
        customer.AddressLine1 || null,
        customer.AddressLine2 || null,
        customer.Zip || null,
      ]
    );

    const userId = (userResult as any).insertId;

    // Insert into CUSTOMER_T
    await connection.execute(
      `INSERT INTO CUSTOMER_T (UserID) VALUES (?)`,
      [userId]
    );

    await connection.commit();
    return { success: true, userId };
  } catch (error) {
    await connection.rollback();
    console.error('Error creating customer:', error);
    return { success: false, error };
  } finally {
    connection.release();
  }
}

// Get all customers
export async function getAllCustomers() {
  const db = await getDatabaseConnection();
  
  try {
    const [rows] = await db.query(`
      SELECT u.UserID, u.Name, u.Email, u.Phone, u.AddressLine1, u.AddressLine2, u.Zip, 
             u.created_at, u.updated_at
      FROM USER_T u
      JOIN CUSTOMER_T c ON u.UserID = c.UserID
      WHERE u.UserType = 'customer'
      ORDER BY u.Name
    `);
    
    return { success: true, customers: rows };
  } catch (error) {
    console.error('Error fetching customers:', error);
    return { success: false, error };
  }
}

// Get customer by ID
export async function getCustomerById(userId: number) {
  const db = await getDatabaseConnection();
  
  try {
    const [rows] = await db.query(
      `SELECT u.UserID, u.Name, u.Email, u.Phone, u.AddressLine1, u.AddressLine2, u.Zip, 
              u.created_at, u.updated_at
       FROM USER_T u
       JOIN CUSTOMER_T c ON u.UserID = c.UserID
       WHERE u.UserID = ? AND u.UserType = 'customer'`,
      [userId]
    );
    
    const customers = rows as any[];
    if (customers.length === 0) {
      return { success: false, error: 'Customer not found' };
    }
    
    return { success: true, customer: customers[0] };
  } catch (error) {
    console.error('Error fetching customer:', error);
    return { success: false, error };
  }
}

// Update customer
export async function updateCustomer(userId: number, data: Partial<CustomerInput>) {
  const db = await getDatabaseConnection();
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // Prepare update fields for USER_T
    const updateFields = [];
    const updateValues = [];
    
    if (data.Name) {
      updateFields.push('Name = ?');
      updateValues.push(data.Name);
    }
    
    if (data.Email) {
      updateFields.push('Email = ?');
      updateValues.push(data.Email);
    }
    
    if (data.Password) {
      updateFields.push('PASSWORD = ?');
      updateValues.push(await hashPassword(data.Password));
    }
    
    if (data.Phone !== undefined) {
      updateFields.push('Phone = ?');
      updateValues.push(data.Phone || null);
    }
    
    if (data.AddressLine1 !== undefined) {
      updateFields.push('AddressLine1 = ?');
      updateValues.push(data.AddressLine1 || null);
    }
    
    if (data.AddressLine2 !== undefined) {
      updateFields.push('AddressLine2 = ?');
      updateValues.push(data.AddressLine2 || null);
    }
    
    if (data.Zip !== undefined) {
      updateFields.push('Zip = ?');
      updateValues.push(data.Zip || null);
    }
    
    if (updateFields.length > 0) {
      // Add userId to values array
      updateValues.push(userId);
      
      // Update USER_T
      await connection.execute(
        `UPDATE USER_T SET ${updateFields.join(', ')} WHERE UserID = ? AND UserType = 'customer'`,
        updateValues
      );
    }
    
    await connection.commit();
    return { success: true };
  } catch (error) {
    await connection.rollback();
    console.error('Error updating customer:', error);
    return { success: false, error };
  } finally {
    connection.release();
  }
}

// Delete customer
export async function deleteCustomer(userId: number) {
  const db = await getDatabaseConnection();
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // Delete from CUSTOMER_T
    await connection.execute(
      'DELETE FROM CUSTOMER_T WHERE UserID = ?',
      [userId]
    );
    
    // Delete from USER_T
    await connection.execute(
      'DELETE FROM USER_T WHERE UserID = ? AND UserType = "customer"',
      [userId]
    );
    
    await connection.commit();
    return { success: true };
  } catch (error) {
    await connection.rollback();
    console.error('Error deleting customer:', error);
    return { success: false, error };
  } finally {
    connection.release();
  }
}

/**
 * Vendor (Seller) CRUD Operations
 */

// Create a new vendor
export async function createVendor(vendor: VendorInput) {
  const db = await getDatabaseConnection();
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // Insert into USER_T
    const hashedPassword = await hashPassword(vendor.Password);
    const [userResult] = await connection.execute(
      `INSERT INTO USER_T (Name, Email, PASSWORD, Phone, AddressLine1, AddressLine2, Zip, UserType)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        vendor.Name,
        vendor.Email,
        hashedPassword,
        vendor.Phone || null,
        vendor.AddressLine1 || null,
        vendor.AddressLine2 || null,
        vendor.Zip || null,
        vendor.VendorType === 'wholesaler' ? 'wholesaler' : 'retailer'
      ]
    );
    
    const userId = (userResult as any).insertId;
    
    // Insert into VENDOR_T
    const [vendorResult] = await connection.execute(
      `INSERT INTO VENDOR_T (UserID, RegistrationDate, VendorType)
       VALUES (?, ?, ?)`,
      [
        userId,
        vendor.RegistrationDate || new Date(),
        vendor.VendorType
      ]
    );
    
    const licenseId = (vendorResult as any).insertId;
    
    // Insert into specific vendor type table (WHOLESALER_T or RETAILER_T)
    if (vendor.VendorType === 'wholesaler') {
      await connection.execute(
        `INSERT INTO WHOLESALER_T (WLicenseID, MinOrderQuantity)
         VALUES (?, ?)`,
        [licenseId, 0] // Default MinOrderQuantity
      );
    } else {
      await connection.execute(
        `INSERT INTO RETAILER_T (RLicenseID, StoreType)
         VALUES (?, ?)`,
        [licenseId, 'General'] // Default StoreType
      );
    }
    
    await connection.commit();
    return { success: true, userId, licenseId };
  } catch (error) {
    await connection.rollback();
    console.error('Error creating vendor:', error);
    return { success: false, error };
  } finally {
    connection.release();
  }
}

// Get all vendors
export async function getAllVendors() {
  const db = await getDatabaseConnection();
  
  try {
    const [rows] = await db.query(`
      SELECT v.LicenseID, u.UserID, u.Name, u.Email, u.Phone, u.AddressLine1, u.AddressLine2, u.Zip,
             v.VendorType, v.RegistrationDate, u.created_at, u.updated_at
      FROM VENDOR_T v
      JOIN USER_T u ON v.UserID = u.UserID
      ORDER BY u.Name
    `);
    
    return { success: true, vendors: rows };
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return { success: false, error };
  }
}

// Get vendor by ID
export async function getVendorById(licenseId: number) {
  const db = await getDatabaseConnection();
  
  try {
    const [rows] = await db.query(
      `SELECT v.LicenseID, u.UserID, u.Name, u.Email, u.Phone, u.AddressLine1, u.AddressLine2, u.Zip,
              v.VendorType, v.RegistrationDate, u.created_at, u.updated_at
       FROM VENDOR_T v
       JOIN USER_T u ON v.UserID = u.UserID
       WHERE v.LicenseID = ?`,
      [licenseId]
    );
    
    const vendors = rows as any[];
    if (vendors.length === 0) {
      return { success: false, error: 'Vendor not found' };
    }
    
    return { success: true, vendor: vendors[0] };
  } catch (error) {
    console.error('Error fetching vendor:', error);
    return { success: false, error };
  }
}

// Update vendor
export async function updateVendor(licenseId: number, data: Partial<VendorInput>) {
  const db = await getDatabaseConnection();
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // Get vendor information first
    const [vendorRows] = await connection.query(
      `SELECT UserID, VendorType FROM VENDOR_T WHERE LicenseID = ?`,
      [licenseId]
    );
    
    const vendors = vendorRows as any[];
    if (vendors.length === 0) {
      await connection.rollback();
      return { success: false, error: 'Vendor not found' };
    }
    
    const vendor = vendors[0];
    
    // Prepare update fields for USER_T
    const userUpdateFields = [];
    const userUpdateValues = [];
    
    if (data.Name) {
      userUpdateFields.push('Name = ?');
      userUpdateValues.push(data.Name);
    }
    
    if (data.Email) {
      userUpdateFields.push('Email = ?');
      userUpdateValues.push(data.Email);
    }
    
    if (data.Password) {
      userUpdateFields.push('PASSWORD = ?');
      userUpdateValues.push(await hashPassword(data.Password));
    }
    
    if (data.Phone !== undefined) {
      userUpdateFields.push('Phone = ?');
      userUpdateValues.push(data.Phone || null);
    }
    
    if (data.AddressLine1 !== undefined) {
      userUpdateFields.push('AddressLine1 = ?');
      userUpdateValues.push(data.AddressLine1 || null);
    }
    
    if (data.AddressLine2 !== undefined) {
      userUpdateFields.push('AddressLine2 = ?');
      userUpdateValues.push(data.AddressLine2 || null);
    }
    
    if (data.Zip !== undefined) {
      userUpdateFields.push('Zip = ?');
      userUpdateValues.push(data.Zip || null);
    }
    
    // Update user details if needed
    if (userUpdateFields.length > 0) {
      userUpdateValues.push(vendor.UserID);
      await connection.execute(
        `UPDATE USER_T SET ${userUpdateFields.join(', ')} WHERE UserID = ?`,
        userUpdateValues
      );
    }
    
    // Update vendor details if needed
    if (data.VendorType || data.RegistrationDate) {
      const vendorUpdateFields = [];
      const vendorUpdateValues = [];
      
      if (data.VendorType) {
        vendorUpdateFields.push('VendorType = ?');
        vendorUpdateValues.push(data.VendorType);
        
        // Update user type as well
        await connection.execute(
          `UPDATE USER_T SET UserType = ? WHERE UserID = ?`,
          [data.VendorType, vendor.UserID]
        );
      }
      
      if (data.RegistrationDate) {
        vendorUpdateFields.push('RegistrationDate = ?');
        vendorUpdateValues.push(data.RegistrationDate);
      }
      
      if (vendorUpdateFields.length > 0) {
        vendorUpdateValues.push(licenseId);
        await connection.execute(
          `UPDATE VENDOR_T SET ${vendorUpdateFields.join(', ')} WHERE LicenseID = ?`,
          vendorUpdateValues
        );
      }
    }
    
    await connection.commit();
    return { success: true };
  } catch (error) {
    await connection.rollback();
    console.error('Error updating vendor:', error);
    return { success: false, error };
  } finally {
    connection.release();
  }
}

// Delete vendor
export async function deleteVendor(licenseId: number) {
  const db = await getDatabaseConnection();
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // Get the userId first
    const [vendorRows] = await connection.query(
      `SELECT UserID, VendorType FROM VENDOR_T WHERE LicenseID = ?`,
      [licenseId]
    );
    
    const vendors = vendorRows as any[];
    if (vendors.length === 0) {
      await connection.rollback();
      return { success: false, error: 'Vendor not found' };
    }
    
    const vendor = vendors[0];
    
    // Delete from WHOLESALER_T or RETAILER_T based on vendor type
    if (vendor.VendorType === 'wholesaler') {
      await connection.execute(
        'DELETE FROM WHOLESALER_T WHERE WLicenseID = ?',
        [licenseId]
      );
    } else {
      await connection.execute(
        'DELETE FROM RETAILER_T WHERE RLicenseID = ?',
        [licenseId]
      );
    }
    
    // Delete from VENDOR_T
    await connection.execute(
      'DELETE FROM VENDOR_T WHERE LicenseID = ?',
      [licenseId]
    );
    
    // Delete from USER_T
    await connection.execute(
      'DELETE FROM USER_T WHERE UserID = ?',
      [vendor.UserID]
    );
    
    await connection.commit();
    return { success: true };
  } catch (error) {
    await connection.rollback();
    console.error('Error deleting vendor:', error);
    return { success: false, error };
  } finally {
    connection.release();
  }
} 