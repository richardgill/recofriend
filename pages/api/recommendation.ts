import type { NextApiRequest, NextApiResponse } from "next"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { xata } from "../../db/client"
import { MY_USER_ID } from "../../db/constants"

dayjs.extend(utc)

type Data = {
  name: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "POST") {
    const recommendation = JSON.parse(req.body)
    console.log("recommendation", recommendation)
    await xata.db.recommendation.create({
      ...recommendation,
      created: dayjs.utc().format(),
      owner: MY_USER_ID,
    })
    res.status(200).json({ name: "John Doe" })
  } else {
    res.status(200).json({ name: "John Doe" })
  }
}
