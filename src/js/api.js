export async function getWord() {
  // Fetch a random word from the API (https://clientes.api.greenborn.com.ar/public-random-word)
  try {
    const response = await fetch('https://clientes.api.greenborn.com.ar/public-random-word');
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    const data =  await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}