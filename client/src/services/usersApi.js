const { api, updateToken } = require("./apiHelper");

const registerUser = async (user) => {
  try {
    const { email, password, username, allergy } = user;

    const resp = await api.post("/users/", user);

    const { data } = resp;

    // updateToken(data);
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

registerUser({
  email: "dan@dan.com",
  password: "danpass",
  username: "dan",
  allergy: "danallergy"
})

const verifyToken = async () => {
  const token = await localStorage.getItem("authToken");
  if (token === null) {
    console.log("no token");
    return false;
  } else {
    try {
      console.log("token verified", token);
      const resp = await api.get("/users/verify", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      updateToken(token);
      console.log("this is verify token resp", resp.data);
      return resp.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};

const loginUser = async ({ email, password }) => {
  const resp = await api.post("/users/login", {
    email,
    password
  });
  const data = resp.data;

  updateToken(data.token);

  return resp.data;
};

// export { registerUser, verifyToken, loginUser };
