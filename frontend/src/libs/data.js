import axios from "axios";
import { headers } from "../../next.config";

const baseUrl = "http://localhost:5000/api/v1";

export const registerUser = async ({ name, lastName, email, password }) => {
  try {
    const { data } = await axios.post(`${baseUrl}/auth/register`, {
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
    const { data } = await axios.get(`${baseUrl}/auth/showme`, {
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
    const { data } = await axios.put(
      `${baseUrl}/users/${id}`,
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
    const { data } = await axios.get(`${baseUrl}/users?page=${page}`, {
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
    const { data } = await axios.get(`${baseUrl}/users/${id}`, {
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
    const { data } = await axios.delete(`${baseUrl}/users/${id}`, {
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
    const { data } = await axios.get(`${baseUrl}/tournaments?page=${page}`, {
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
    const { data } = await axios.post(
      `${baseUrl}/tournaments`,
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

export const fetchDeleteTournament = async ({
  accessToken,
  id
}) => {
  try {
    const { data } = await axios.delete(
      `${baseUrl}/tournaments/${id}`,
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

export const fetchSingleTournament = async ({ accessToken, id }) => {
  try {
    const { data } = await axios.get(`${baseUrl}/tournaments/${id}`, {
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
    const { data } = await axios.post(
      `${baseUrl}/tournaments/addplayer/${id}`,
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
