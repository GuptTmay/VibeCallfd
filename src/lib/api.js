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

export const getAllUsers = async () => {
  const res = await fetch(`${BASE_URL}/api/v1/users/findall`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Read failed');
  return data
}

export const sendUserInvite = async (senderId, recipientId, roomId) => {
  const res = await fetch(`${BASE_URL}/api/v1/users/senduserinvite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ senderId, recipientId, roomId }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Invite failed');
  }
}

export const getUserInvite = async (id) => {
  const res = await fetch(`${BASE_URL}/api/v1/users/getuserinvite?id=${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Getting Invite failed');
  return data;
}

export const removeUserInvite = async (id) => {
  const res = await fetch(`${BASE_URL}/api/v1/users/removeuserinvite?inviteId=${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Removing Invite failed');
  }
}


/*
    senduserinvite POST
    Request: (String senderId, String recipientId, String roomId)
    Response: null

    getuserinvite POST
    Request:
    {
      "id": user id
    }
    Response:
    Info about the person who send the invite
    {
      "invId": inviteId,
      "senderId": senderId,
      "name": senderName,
      "email": senderEmail,
      "roomId" room to join id, 
    }

    removeuserinvite DELETE 
    Request: (String invId)
    Response: null
 */ 