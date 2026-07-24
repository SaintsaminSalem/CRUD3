const BASE_URL = "http://localhost:8000/api/notifications";

export const getMyNotifications = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/mine`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const markNotificationRead = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/read/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};