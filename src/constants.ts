export const RES_ERROR_MESSAGES = {
  400: 'Invalid credentials',
  401: 'User is not authorized',
  403: 'Invalid login or password',
  409: 'User already exist. Please login',
  500: 'Internal Server error',
} as const;

export const TOKEN_TYPE = 'Bearer';
export const IS_PUBLIC_KEY = 'isPublic';

export const PUBLIC_PATHS = [
  '/',
  '/api',
  '/docs',
  '/docs-json',
  '/auth/login',
  '/auth/signup',
  '/auth/refresh',
];

// export const AUTH_ERROR_MESSAGES = {
//   400: 'Invalid credentials',
//   401: 'Token is required',
//   403: 'Invalid token',
// };
