// import { cookies } from "next/headers";
import qs from "qs";

interface FetchResponse<T> {
  data: T | null;
  status: number;
  error?: string;
}

export const fetchApi = async <T>(
  path: string,
  populate?: any,
  options: RequestInit & {
    isMultipart?: boolean;
  } = {
    method: "GET",
    isMultipart: false,
  },
): Promise<FetchResponse<T>> => {
  // const coockie = await cookies();
  // const accessToken = coockie.get("access_token")?.value || "";
  const headers = {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${accessToken || ""}`,
  };

  const getUrl = (path: string, populate = {}) => {
    if (populate) {
      const url = new URL(path, process.env.API_URL);
      url.search = qs.stringify({
        populate: populate,
      });
      return url;
    } else {
      return `${process.env.API_URL}${path}`;
    }
  }

  const url = getUrl(path, populate);

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const error = await response.text();
      //console.log(error);
      return { data: null, status: response.status, error };
    }
    const result = await response.json();
    return {
      data: result,
      status: response.status,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { data: null, status: 500, error: error.message };
    }
    return { data: null, status: 500, error: "Unknown error" };
  }
};
