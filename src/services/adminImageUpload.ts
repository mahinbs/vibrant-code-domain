const SUPABASE_URL = "https://upxsbhsamorhvnfebvor.supabase.co";
const ADMIN_UPLOAD_TOKEN = "admin-upload-token-2024";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function uploadPortfolioImage(
  file: File,
  folder: "covers" | "gallery" = "covers",
): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Image must be 10MB or smaller");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/upload-portfolio-image`,
    {
      method: "POST",
      headers: {
        "x-admin-token": ADMIN_UPLOAD_TOKEN,
      },
      body: formData,
    },
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Upload failed");
  }

  const result = await response.json();
  return result.url as string;
}
