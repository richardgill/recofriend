import type { NextPage } from "next"
import Link from "next/link"
import Head from "next/head"
import { Flex, Text, Button, Stack } from "@chakra-ui/react"
import { LinkIcon } from "@chakra-ui/icons"
import { recommendationsWithTo, RecommendationWithTo } from "../db/queries"
import { User, XataClient } from "../db/xata"
import { MY_USER_ID } from "../db/constants"

type Props = {
  user: User
  recommendations: RecommendationWithTo[]
}
export const getServerSideProps = async () => {
  const xata = new XataClient({
    branch: "main",
    apiKey: process.env.XATA_API_KEY,
  })

  const user = await xata.db.user.filter("id", MY_USER_ID).getFirst()
  console.log(user)
  const recommendations = await recommendationsWithTo(
    await xata.db.recommendation.filter("owner.id", MY_USER_ID).getMany()
  )

  return {
    props: {
      user: user,
      recommendations: recommendations.map(r => ({...r, created: r.created?.toISOString()})),
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
      <Flex flexDirection={"column"} p={8}>
        <Flex flexDirection={"column"} pb={4}>
          <Text fontSize="xl">Logged in as</Text>
          <p>{props.user.name}</p>
          <p>{props.user.email}</p>
        </Flex>
        <Flex direction="column">
          <Text fontSize="xl">Recommendations</Text>
          <Stack marginY={4} spacing={4} direction="row" align="center">
            <Link href="/recommendations/new">
              <Button colorScheme="blue" size="sm">
                New Recommendation
              </Button>
            </Link>
          </Stack>
          {props.recommendations.map((r) => {
            if (r.url) {
              return (
                <Flex
                  mt={4}
                  p={5}
                  direction="column"
                  border="1px"
                  borderColor="gray.200"
                >
                  <Text>
                    <a href={r.url}>
                      {r.title} <LinkIcon />
                    </a>{" "}
                  </Text>
                  <Text>{r.description}</Text>
                  <Text>Created at: {r.created}</Text>
                  <Text>Shared with: {r.to.map((t) => t.name).join(", ")}</Text>
                </Flex>
              )
            }
          })}
        </Flex>
      </Flex>
    </div>
  )
}

export default Home
