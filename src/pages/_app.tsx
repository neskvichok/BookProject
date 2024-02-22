import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React from "react"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { withBlitz } from "src/blitz-client"
import "src/styles/globals.css"

import { ChakraProvider, HStack, Flex } from "@chakra-ui/react"
import TopMenu from "./_TopMenu"

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ChakraProvider>
      <TopMenu />
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <div style={{ marginTop: "60px" }}> {getLayout(<Component {...pageProps} />)}</div>
      </ErrorBoundary>
    </ChakraProvider>
  )
}

export default withBlitz(MyApp)
