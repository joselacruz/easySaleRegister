import axios from 'axios';

export async function savedImgToCloud({ selectedFiles }) {
  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const apiUrl = `https://api.imgbb.com/1/upload?&key=${imgbbApiKey}`;
  const uploadedImageURLs = [];

  try {
    // Crea un array de promesas para cargar todas las imágenes en paralelo
    const uploadPromises = selectedFiles.map(async (file, index) => {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post(apiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          const imageURL = response.data.data.url;
          uploadedImageURLs[index] = imageURL; // Almacena la URL en el índice correcto
        } else {
          console.error('Error al cargar una imagen:', response.statusText);
        }
      } catch (error) {
        console.error('Error al cargar una imagen:', error);
      }
    });

    // Espera a que se completen todas las promesas de carga de imágenes
    await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error en la solicitud:', error);
  } finally {
    return uploadedImageURLs;
  }
}

export const modifyImages = async function (images) {
  // Mapea las imágenes a un array de promesas
  const arrayNewUrl = images;
  const promises = arrayNewUrl.map(async (img, index) => {
    if (img instanceof File) {
      // Reemplaza el objeto File con el resultado de savedImgToCloud
      const response = await savedImgToCloud({ selectedFiles: [img] });

      arrayNewUrl[index] = response[0]; // Guarda la URL resultante
    }
    return img; // Si no es una instancia de File, mantenlo sin cambios
  });

  // Espera a que todas las promesas se resuelvan
  await Promise.all(promises);
  return arrayNewUrl;
};
