const API_URL = `${import.meta.env.VITE_API_URL}/api/user`;

export const getUsers = async () => {
    const response = await fetch(
        `${API_URL}/getallusers`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return response.json();
};

export const createUser = async (user) => {
    const response = await fetch(
        `${API_URL}/create`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(user)
        }
    );

    return response.json();
};

export const updateUser = async (id, user) => {
    const response = await fetch(
        `${API_URL}/update/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(user)
        }
    );

    return response.json();
};

export const deleteUser = async (id) => {
    const response = await fetch(
        `${API_URL}/delete/${id}`,
        {
            method: "DELETE"
        }
    );

    return response.json();
};