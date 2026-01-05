import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
    console.log("Healthcheck hit");
    return json({ status: "ok" }, { status: 200 });
}
