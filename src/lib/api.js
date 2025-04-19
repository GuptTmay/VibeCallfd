import { AuthMenuStatus } from '../constants/AuthMenuStatus';
const BASE_URL = import.meta.env.VITE_base_url;

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/api/v1/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');

  localStorage.setItem("user", JSON.stringify(data));
  localStorage.setItem("AuthMenuStatus", AuthMenuStatus.AUTHENTICATED);
  return data;
};

export const registerUser = async (name ,email, password) => {
  const res = await fetch(`${BASE_URL}/api/v1/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registeration failed');

  localStorage.setItem("user", JSON.stringify(data));
  localStorage.setItem("AuthMenuStatus", AuthMenuStatus.AUTHENTICATED);
  return data;
}

export const logoutUser = async (email) => {
  const res = await fetch(`${BASE_URL}/api/v1/users/logout?email=${email}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Logout failed');
  localStorage.removeItem("user");
  localStorage.removeItem("AuthMenuStatus");
}

export const setUserStatus = async (email, status) => {
  const res = await fetch(`${BASE_URL}/api/v1/users/setuserstatus?email=${email}&status=${status}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Updation failed');
}