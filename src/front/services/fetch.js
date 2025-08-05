const URL_base = "https://fuzzy-space-umbrella-jj9q5r5pjw4qcjqx9-3001.app.github.dev/";

export const login = async({ email, password }) => {
    try {
        const response = await fetch(`${URL_base}api/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al hacer login');
        }

        const data = await response.json();
        console.log(data);

        localStorage.setItem('token', data.Token);
    } catch (error) {
        console.error("Error al obtener el token:", error.message);
    }
};
