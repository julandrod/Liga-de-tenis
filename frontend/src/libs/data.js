import axios from "axios";

export const registerUser = async ({ name, lastName, email, password }) => {
  try {
    const { data } = await axios.post(`${process.env.API_URL}/auth/register`, {
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
    const { data } = await axios.get(`${process.env.API_URL}/auth/showme`, {
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
      `${process.env.API_URL}/users/${id}`,
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
    const { data } = await axios.get(`${process.env.API_URL}/users?page=${page}`, {
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
    const { data } = await axios.get(`${process.env.API_URL}/users/${id}`, {
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
    const { data } = await axios.delete(`${process.env.API_URL}/users/${id}`, {
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
    const { data } = await axios.get(`${process.env.API_URL}/tournaments?page=${page}`, {
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
      `${process.env.API_URL}/tournaments`,
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
      `${process.env.API_URL}/tournaments/${id}`,
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
    const { data } = await axios.get(`${process.env.API_URL}/tournaments/${id}`, {
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
      `${process.env.API_URL}/tournaments/addplayer/${id}`,
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
