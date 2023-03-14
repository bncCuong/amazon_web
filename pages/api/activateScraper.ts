// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import adminDB from "@/firebaseAdmin";
import * as admin from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    collection_id: string;
    start_eta: number;
};

type Error = {
    error: string;
};
const BRIGHTLIGHT_API_KEY = "f912d8d2-7728-4c0d-bb0f-986b2804bcee";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
    try {
        const { search } = req.body;

        console.log("Search is >>", search);

        const reponse = await fetch(
            "https://api.brightdata.com/dca/trigger?collector=c_lf3nzdof2avo3cdea3&queue_next=1",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${BRIGHTLIGHT_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    search,
                }),
            },
        );

        const data = await reponse.json();

        console.log("DATA IS >>>", data);

        const { collection_id, start_eta } = data;

        await adminDB.collection("search").doc(collection_id).set({
            search,
            start_eta,
            status: "pending",
            updateAt: start_eta,
        });

        res.status(200).json({ collection_id, start_eta });
    } catch (error: any) {
        console.log("ERROR IS >>", error);
        return res.status(500).json({ error: error.message });
    }
}
