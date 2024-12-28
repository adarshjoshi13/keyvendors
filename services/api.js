import axios from "axios";

axios.interceptors.request.use(function (config) {
  try {
    if (typeof window !== "undefined") {
      document.body.classList.add("loading-indicator");
      const token = JSON.parse(
        JSON.parse(localStorage.getItem("persist:root")).auth
      ).token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    config.headers["Accept"] = "application/json";
  } catch (error) {
    console.error(error);
  }

  return config;
});

axios.interceptors.response.use(
  function (response) {
    if (typeof window !== "undefined") {
      document.body.classList.remove("loading-indicator");
    }
    return response;
  },
  function (error) {
    if (typeof window !== "undefined") {
      document.body.classList.remove("loading-indicator");
    }
    throw error;
  }
);

export const fetchData = async (url, reqData,opt) => {
  try {
    let options =opt?opt: {};

    if (reqData) {
      options["params"] = {
        ...reqData,
      };
    }
    const res = await axios.get(`${process.env.API_URL}/${url}`, options);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error:" + error.response.status + "::" + error.response.statusText
      );
      return { statusCode: error.response.status, error: error.response.data };
    } else {
      console.error(error);
      return { statusCode: 400, error: "bad request" };
    }
  }
};

export const postFormData = async (url, reqData, token) => {
  try {
    const options = {
      responseType: "json",
    };

    if (token) {
      options["headers"] = {
        "Content-Type": "multipart/form-data",
        Authorization: 'Bearer '+token,
      };
    }

    const res = await axios.post(
      `${process.env.API_URL}/${url}`,
      reqData,
      options
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postData = async (url, reqData, token) => {
  try {
    const options = {
      responseType: "json",
    };

    if (token) {
      options["headers"] = {
        "Content-Type": "application/json",
        Authorization: 'Bearer '+token,
      };
    }

    const res = await axios.post(
      `${process.env.API_URL}/${url}`,
      reqData,
      options
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postDataWithUrl = async (url, reqData) => {
  try {
    const res = await axios.post(url, reqData);
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchDataWithUrl = async (url, reqData={}) => {
  try {
    const res = await axios.get(url, reqData);
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchNotificationsSMG = async (url, reqData,opt) => {
  try {
    let options =opt?opt: {};

    if (reqData) {
      options["params"] = {
        ...reqData,
      };
    }
    const res = await axios.get(`${process.env.API_URL}/${url}`);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error:" + error.response.status + "::" + error.response.statusText
      );
      return { statusCode: error.response.status, error: error.response.data };
    } else {
      console.error(error);
      return { statusCode: 400, error: "bad request" };
    }
  }
};

export const fetchPeymantOptions = async (url, reqData,opt) => {
  try {
    let options =opt?opt: {};

    if (reqData) {
      options["params"] = {
        ...reqData,
      };
    }
    const res = await axios.get(`${process.env.API_URL}/${url}`);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error:" + error.response.status + "::" + error.response.statusText
      );
      return { statusCode: error.response.status, error: error.response.data };
    } else {
      console.error(error);
      return { statusCode: 400, error: "bad request" };
    }
  }
};

export const fetchOrderSummary = async (url, reqData,opt) => {
  try {
    let options =opt?opt: {};

    if (reqData) {
      options["params"] = {
        ...reqData,
      };
    }
    const res = await axios.get(`${process.env.API_URL}/${url}`);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error:" + error.response.status + "::" + error.response.statusText
      );
      return { statusCode: error.response.status, error: error.response.data };
    } else {
      console.error(error);
      return { statusCode: 400, error: "bad request" };
    }
  }
};

// export const serviceLocation = async (url, reqData,opt) => {
//   try {
//     let options =opt?opt: {};

//     if (reqData) {
//       options["params"] = {
//         ...reqData,
//       };
//     }
//     const res = await axios.get(`${process.env.API_URL}/${url}`);
//     return res.data;
//   } catch (error) {
//     if (error.response) {
//       console.error(
//         "Error:" + error.response.status + "::" + error.response.statusText
//       );
//       return { statusCode: error.response.status, error: error.response.data };
//     } else {
//       console.error(error);
//       return { statusCode: 400, error: "bad request" };
//     }
//   }
// };