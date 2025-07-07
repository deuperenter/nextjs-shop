import { redirect } from "next/navigation";

function errorHandler(e: unknown) {
  if (e instanceof Error) {
    console.error(e.message);
  } else {
    console.error(e);
  }
  return Response.json({ success: false });
}

export async function getData(url: string | URL) {
  return fetch(url)
    .then((r) => r.json())
    .catch(errorHandler);
}

export async function postData(url: string | URL, data?: FormData) {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    body: data,
  })
    .then((r) => r.json())
    .catch(errorHandler);
}
