import type { NextPage } from "next"
import Head from "next/head"
import { recommendationsWithTo, RecommendationWithTo } from "../db/queries"
import {
  User,
  UserRecord,
  XataClient,
  RecommendationRecord,
  RecommendationsRecord,
} from "../db/xata"

const MY_ID = "rec_capcejgmnftpeb250su0"
type Props = {
  user: User
  recommendations: RecommendationWithTo[]
}
export const getServerSideProps = async () => {
  const xata = new XataClient({
    branch: "main",
    apiKey: process.env.XATA_API_KEY,
  })

  const user = await xata.db.user.filter("id", MY_ID).getFirst()

  const recommendations = await recommendationsWithTo(
    await xata.db.recommendation.filter("owner", MY_ID).getMany()
  )

  return {
    props: {
      user: user,
      recommendations: recommendations,
    },
  }
}

const Home: NextPage<Props> = (props) => {
  return (
    <div>
      <Head>
        <title>Recofriend</title>
        <meta name="description" content="Recofriend" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <p>Logged in as</p>
        <p>{props.user.name}</p>
        <p>{props.user.email}</p>
      </div>
      {props.recommendations.map((r) => {
        return (
          <div>
            {r.description}
            {r.url}
            {r.created}
            by: {r.owner?.name}
            to: {r.to.map((t) => t.name)}
          </div>
        )
      })}
    </div>
  )
}

export default Home
