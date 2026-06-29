const BASE_URL = "http://localhost:8000";

export async function uploadPDF(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/upload-pdf`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}