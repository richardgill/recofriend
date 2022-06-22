import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider, useColorMode } from "@chakra-ui/react"
import { theme } from "../theme"

function MyApp({ Component, pageProps }: AppProps) {
  const { colorMode, toggleColorMode } = useColorMode()
  if (colorMode === "dark") {
    toggleColorMode()
  }
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
