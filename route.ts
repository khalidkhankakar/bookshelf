

export const AUTH_ROUTES:string[] = ['/auth/sign-in', '/auth/sign-up','/auth/verify-token','/auth/auth-error'];

export const PUBLIC_ROUTES:string[] = ['/','/explore','/explore/book-category/:name','/explore/publisher/:name','/explore/book/viewer/:pdfUrl'];

export const PROTECTED_ROUTES = []

export const AUTH_API_PREFIX:string = '/api/auth';

export const DEFAULT_LOGIN_REDIRECT:string = '/';