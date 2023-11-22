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

export const fetchInfo = async ({ accessToken, page, endpoint }) => {
  try {
    const { data } = await instance.get(`/${endpoint}?page=${page}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    return error.response.data.error;
  }
};

export const fetchSingleInfo = async ({ accessToken, id, endpoint }) => {
  try {
    const { data } = await instance.get(`/${endpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    return error.response.data.error;
  }
};

export const deleteSingleInfo = async ({ accessToken, id, endpoint }) => {
  try {
    const { data } = await instance.delete(`/${endpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.code;
  } catch (error) {
    return error.response.data.error;
  }
};

export const updateUser = async ({
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

export const createTournament = async ({
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

export const addPlayerToTournament = async ({ accessToken, id, playerId }) => {
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

export const createOrderPayment = async ({ accessToken, tournamentName }) => {
  try {
    const { data } = await instance.post("/checkout", tournamentName, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data.body.orderId;
  } catch (error) {
    return error.response.data.error;
  }
};

export const successOrder = async ({
  accessToken,
  playerId,
  tournamentId,
  paypalPayerId,
  paymentId,
  orderId,
}) => {
  try {
    const { data } = await instance.post(
      "/checkout/success",
      {
        playerId,
        tournamentId,
        paypalPayerId,
        paymentId,
        orderId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return data;
  } catch (error) {
    return error.response.data.error;
  }
};
