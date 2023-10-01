const baseUrl = `http://10.0.2.2:8000/dados_sensor1`;

export const loadDadosSensor1 = () => {
    return fetch(baseUrl).then((response) => response.json());
}

export const getDadosSenssor1v = (id: any) => {
    return fetch(`${baseUrl}/${id}`).then((response) => response.json());
}

export const createDadosSensor1 = (dados_sensor1: any) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            temperatura: dados_sensor1.temperatura,
            umidade: dados_sensor1.umidade,
            pressao: dados_sensor1.pressao,
        }),
    }).then((response) => response.json());
}

export const updateDadosSensor1 = (dados_sensor1: any) => {
    return fetch(`${baseUrl}/${dados_sensor1.id}`, {
        method: "PUT",
        headers: {
            "Content-/type": "apllication/json",
        },
        body: JSON.stringify({
            id: dados_sensor1.id,
            temperatura: dados_sensor1.temperatura,
            umidade: dados_sensor1.umidade,
            pressao: dados_sensor1.pressao,
        }),
    }).then((respense) => respense.json());
}

export const deleteDadosSensor1 = (id: any) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    }).then((response) => response.json());
}