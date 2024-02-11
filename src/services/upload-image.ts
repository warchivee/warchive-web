import axios from 'axios';

interface UploadImageResult {
  data: {
    delete_url: string;
    url: string;
  };
  success: boolean;
}

export const uploadImage = async (image: string, name: string) => {
  const formData = new FormData();

  formData.append('image', image);

  const response = await axios.post<UploadImageResult>(
    `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_API_KEY
    }&name=${name}`,
    formData,
    {
      headers: {
        'Content-Type': 'form-data',
      },
    },
  );

  return response?.data?.data;
};

export default uploadImage;
