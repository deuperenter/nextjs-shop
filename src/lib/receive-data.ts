import { redirect } from "next/navigation";

function errroHandler(e: unknown) {
  if (e instanceof Error) {
    console.error(e.message);
  } else {
    console.error(e);
  }
  redirect("/");
}

export async function receiveData(url: string | URL) {
  return fetch(url)
    .then((r) => r.json())
    .catch(errroHandler);
}
