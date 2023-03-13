import { NextApiRequest } from "next";

export async function POST(request: NextApiRequest) {
    console.log("Submitting");

    const search = request.body.search;

    console.log("search is >>", search);
}
