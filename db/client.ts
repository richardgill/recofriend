import { XataClient } from "./xata"

export const xata = new XataClient({
  branch: "main",
  apiKey: process.env.XATA_API_KEY,
})
