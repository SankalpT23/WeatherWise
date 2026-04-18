export const API_BASE_URL = 'http://localhost:8080';

// Utility for authenticated fetch requests
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = sessionStorage.getItem('token');
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  headers.set('Content-Type', 'application/json');

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, config);
  
  if (!response.ok) {
    const errorData = await response.text();
    let errorMessage = errorData;
    try {
      const parsed = JSON.parse(errorData);
      errorMessage = parsed.message || errorData;
    } catch (e) {
      // Not JSON
    }
    throw new Error(errorMessage || 'An error occurred during the request');
  }

  // Handle empty responses
  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return null;
  }
  
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}
