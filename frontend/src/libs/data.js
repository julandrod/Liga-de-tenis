import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const registerUser = async ({ name, lastName, email, password }) => {
  try {
    const { data } = await instance.post("/auth/register", {
      name,
      lastName,
      email,
      password,
    });
    return data.code;
  } catch (error) {
    return error.response.data.error;
  }
};

export const fetchMyInfo = async ({ accessToken }) => {
  try {
    const { data } = await instance.get("/auth/showme", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.body;
  } catch (error) {
    return error.response.data.error;
  }
};

export const fetchUpdateUser = async ({
  accessToken,
  id,
  name,
  lastName,
  age,
  gender,
  email,
}) => {
  try {
    const { data } = await instance.put(
      `/users/${id}`,
      {
        name,
        lastName,
        age,
        gender,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return data.code;
  } catch (error) {
    return error.response.data.error;
  }
};

export const fetchUsers = async ({ accessToken, page }) => {
  try {
    const { data } = await instance.get(`/users?page=${page}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.body;
  } catch (error) {
    return error.response.data.error;
  }
};

export const fetchSingleUser = async ({ accessToken, id }) => {
  try {
    const { data } = await instance.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.body;
  } catch (error) {
    return error.response.data.error;
  }
};

export const fetchDeleteUser = async ({ accessToken, id }) => {
  try {
    const { data } = await instance.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.code;
  } catch (error) {
    return error.response.data.error;
  }
};

export const fetchTournaments = async ({ accessToken, page }) => {
  try {
    const { data } = await instance.get(`/tournaments?page=${page}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.body;
  } catch (error) {
    return error.response.data.error;
  }
};

export const fetchCreateTournament = async ({
  accessToken,
  name,
  description,
  startDate,
  endDate,
}) => {
  try {
    const { data } = await instance.post(
      "/tournaments",
      {
        name,
        description,
        startDate,
        endDate,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return data.code;
  } catch (error) {
    return error.response.data.error;
  }
};

export const fetchDeleteTournament = async ({ accessToken, id }) => {
  try {
    const { data } = await instance.delete(`/tournaments/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.code;
  } catch (error) {
    return error.response.data.error;
  }
};

export const fetchSingleTournament = async ({ accessToken, id }) => {
  try {
    const { data } = await instance.get(`/tournaments/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.body;
  } catch (error) {
    return error.response.data.error;
  }
};

export const fetchAddPlayerToTournament = async ({
  accessToken,
  id,
  playerId,
}) => {
  try {
    const { data } = await instance.post(
      `/tournaments/addplayer/${id}`,
      {
        playerId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return data.code;
  } catch (error) {
    return error.response.data.error;
  }
};
