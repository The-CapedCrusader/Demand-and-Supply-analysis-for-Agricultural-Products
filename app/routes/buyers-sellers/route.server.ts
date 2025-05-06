import { getDatabaseConnection } from '~/lib/database.server';

// Define types for loader arguments
export interface RouteArgs {
  request: Request;
  params: Record<string, string>;
  context: any;
}

export async function loader({ }: RouteArgs) {
  const db = await getDatabaseConnection();

  // Fetch buyers
  const [buyers] = await db.query(`
    SELECT UserID, Name, Email, AddressLine1, AddressLine2, Zip
    FROM USER_T
    WHERE UserType = 'customer'
  `);

  // Fetch sellers (vendors)
  const [sellers] = await db.query(`
    SELECT v.LicenseID, u.Name, u.Email, u.AddressLine1, u.AddressLine2, u.Zip, v.VendorType
    FROM VENDOR_T v
    JOIN USER_T u ON v.UserID = u.UserID
  `);

  return { buyers, sellers };
} 