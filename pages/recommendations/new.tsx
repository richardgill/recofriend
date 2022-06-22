import type { NextPage } from "next"
import Link from "next/link"
import Head from "next/head"
import {
  Flex,
  Textarea,
  Text,
  FormLabel,
  Input,
  Button,
  FormControl,
  VStack,
} from "@chakra-ui/react"
import { LinkIcon } from "@chakra-ui/icons"
import { User, XataClient } from "../../db/xata"

const MY_ID = "rec_capcejgmnftpeb250su0"
type Props = {}
export const getServerSideProps = async () => {
  return {
    props: {},
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
        <Text fontSize="xl" mb={4}>
          New Recommendation
        </Text>
        <Flex
          as="form"
          flexDirection={"column"}
          onSubmit={async (e) => {
            e.preventDefault()
            console.log(e.target)
            const recommendation = {
              title: e.target.elements.title.value,
              description: e.target.elements.title.value,
              url: e.target.elements.url.value,
            }
            const recommendationResponse = await fetch("/api/recommendation", {
              method: "POST",
              body: JSON.stringify(recommendation),
            })
            console.log("recommendationResponse", recommendationResponse)
          }}
        >
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input id="title" />
            <FormLabel htmlFor="url">Url</FormLabel>
            <Input id="url" />
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea id="description" />
            <Button mt={4} colorScheme="teal" type="submit">
              Recommend
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </div>
  )
}

export default Home
