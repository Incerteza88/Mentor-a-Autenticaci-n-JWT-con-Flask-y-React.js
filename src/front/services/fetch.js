const URL_base =
  "https://fuzzy-space-umbrella-jj9q5r5pjw4qcjqx9-3001.app.github.dev/";

export const login = async ({ email, password, dispatch }) => {
  try {
    const response = await fetch(`${URL_base}api/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al hacer login");
    }

    const data = await response.json();
    console.log(data);

    localStorage.setItem("token", data.Token);
    dispatch({
      type: "save_token",
      payload: data.Token,
    });
    return { ok: true, data: data.user };
  } catch (error) {
    console.error("Error al obtener el token:", error.message);
    return { ok: false, data: { Mensaje: "Error en la solicitud" } };
  }
};

export const registerUsuario = async (email, password) => {
  try {
    const response = await fetch(`${URL_base}api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return { ok: true, data: data };
  } catch (error) {
    console.log("Error al crear el usuario");
    return { ok: false, data: { Mensaje: "Error en la solicitud" } };
  }
};

export const getProfile = async (token) => {
  try {
    const response = await fetch(`${URL_base}api/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, //Bearer tipo de autentificacion
      },
    });
    const data = response.json();
    if(!response.ok){
      return null
    }
    return data
  } catch (error) {console.error("error al obtener el perfil", error)}
  return null
};
