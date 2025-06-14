export interface User {
    id: number;
    name: string;
    avatar: string;
    role: string;
  }
  
  export const AuthService = {
    async getCurrentUser(): Promise<User | null> {
      try {
        const res = await fetch('/api/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        if (!res.ok) throw new Error('Unauthorized');
        const user = await res.json();
        return user;
      } catch (error) {
        console.error('Erreur lors de la récupération du user connecté', error);
        return null;
      }
    },
  };

type LoginResponse = {
    token: string;
    user?: { id: number; username: string; name: string };
  };
  
  const API_URL = '/api';
  
  export async function login(username: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  
    if (!res.ok) {
      throw new Error('Erreur de connexion');
    }
  
    const data: LoginResponse = await res.json();
    localStorage.setItem('token', data.token);
    return data;
  }
  
  export function logout() {
    localStorage.removeItem('token');
  }
  
  export function getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  export async function getCurrentUser() {
    const token = getToken();
    if (!token) return null;
  
    const res = await fetch(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      logout();
      return null;
    }
  
    return res.json();
  }
  
  