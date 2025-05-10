import { NextRequest } from 'next/server';

interface AuthUser {
  id: string;
  email: string;
  [key: string]: any;
}

/**
 * Validates the 'g' header to prevent authentication bypass attacks
 * 
 * @param req NextRequest object
 * @returns Validated user object or null if invalid
 */
export function validateAuthHeader(req: NextRequest): AuthUser | null {
  try {
    // Check for middleware subrequest attempt - should be blocked in middleware but add defense in depth
    if (req.headers.get('x-middleware-subrequest')) {
      console.warn('Possible auth bypass attempt detected: x-middleware-subrequest header present');
      return null;
    }

    // Get the g header
    const gHeader = req.headers.get('g');
    if (!gHeader) {
      return null;
    }

    // Parse the g header
    const userData = JSON.parse(gHeader);
    
    // Validate required fields
    if (!userData.id || !userData.email) {
      return null;
    }
    
    // Validate timestamp to prevent replay attacks (optional, 5 minute window)
    const timestamp = userData.timestamp || 0;
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    
    if (now - timestamp > fiveMinutes) {
      console.warn('Auth header timestamp expired');
      return null;
    }

    return userData;
  } catch (error) {
    console.error('Error validating auth header:', error);
    return null;
  }
}
