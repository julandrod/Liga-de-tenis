import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

/**
 * Method to register a new user
 * @param {Object} User User info
 * @param {String} User.name User name
 * @param {String} User.lastName User last name
 * @param {String} User.email User email
 * @param {String} User.password User password
 * @returns {String} User code if successful, error message if not
 */
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

/**
 * Method to get the current user info
 * @param {Object} Token JWT token
 * @param {String} Token.accessToken User JWT access token
 * @returns {Object | String} User info if successful, error message if not
 */
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

/**
 * Method to fetch data from and endpoint (users, tournaments, payments)
 * @param {Object} Params
 * @param {String} Params.accessToken User JWT access token
 * @param {Number} Params.page Page number
 * @param {String} Params.endpoint Endpoint to fetch
 * @returns {Object | String} Data info if successful, error message if not
 */
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

/**
 * Method to fetch a single data from an endpoint (users, tournaments, payments)
 * @param {Object} params
 * @param {String} params.accessToken User JWT access token
 * @param {String} params.id Id of the data to fetch
 * @param {String} params.endpoint Endpoint to fetch
 * @returns {Object | String} Single data info if successful, error message if not
 */
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

/**
 * Method to delete a single data from an endpoint (users, tournaments, payments)
 * @param {Object} params
 * @param {String} params.accessToken User JWT access token
 * @param {String} params.id Id of the data to delete
 * @param {String} params.endpoint Endpoint to delete the data from
 * @returns {Number | String} Data info code if successful, error message if not
 */
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

/**
 * Method to update a user
 * @param {Object} params
 * @param {String} params.accessToken User JWT access token
 * @param {String} params.id Id of the user to update
 * @param {String} params.name User name
 * @param {String} params.lastName User last name
 * @param {Number} params.age User age
 * @param {String} params.gender User gender
 * @param {String} params.email User email
 * @returns {Number | String} Data info code if successful, error message if not
 */
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

/**
 * Method to create a tournament
 * @param {Object} params
 * @param {String} params.accessToken User JWT access token
 * @param {String} params.name Tournament name
 * @param {String} params.description Tournament description
 * @param {Date} params.startDate Tournament start date
 * @param {Date} params.endDate Tournament end date
 * @returns {Number | String} Tournament code if successful, error message if not
 */
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

/**
 * Method to add a player to a tournament
 * @param {Object} params
 * @param {String} params.accessToken User JWT access token
 * @param {Number} params.id Tournament id
 * @param {Number} params.playerId Player id to add to the tournament
 * @returns {Number | String} Tournament code if successful, error message if not
 */
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

/**
 * Method to create an order payment
 * @param {Object} params
 * @param {String} params.accessToken User JWT access token
 * @param {String} params.tournamentName Tournament name
 * @returns {String} Order id if successful, error message if not
 */
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

/**
 * Method to create a success payment
 * @param {Object} params
 * @param {String} params.accessToken User JWT access token
 * @param {String} params.playerId Player id
 * @param {String} params.tournamentId Tournament id
 * @param {String} params.paypalPayerId PayPal payer id
 * @param {String} params.paymentId PayPal payment id
 * @param {String} params.orderId PayPal order id
 * @returns {Object | String} Payment info if successful, error message if not
 */
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
