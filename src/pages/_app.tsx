import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React, { Suspense } from "react"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { withBlitz } from "src/blitz-client"
import "src/styles/globals.css"

import {
  ChakraProvider,
  HStack,
  Flex,
  Center,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Img,
  VStack,
} from "@chakra-ui/react"
import TopMenu from "./_TopMenu"

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return (
      <>
        <Center padding="115px">
          <VStack>
            <Card>
              <CardHeader>
                <Heading size="md">You must be logged in to access the site</Heading>
              </CardHeader>
              <CardBody>
                <Center>
                  <Heading size="sm">You can:</Heading>
                  <Link href={Routes.SignupPage()}>
                    <Button margin="10px">Sign Up</Button>
                  </Link>
                  <Heading size="sm">or</Heading>
                  <Link href={Routes.LoginPage()}>
                    <Button margin="10px">Log In</Button>
                  </Link>
                </Center>
              </CardBody>
            </Card>
            <Img
              src={`https://zaxid.net/resources/photos/news/202401/1578978_3029217.jpg?20240130015707&q=100`}
              margin="30px"
              width="512px"
              height="341px"
            />
          </VStack>
        </Center>
        {/* <BooksList /> */}
      </>
    )
  } else if (error instanceof AuthorizationError) {
    return (
      <>
        <ErrorComponent
          statusCode={error.statusCode}
          title="Sorry, you are not authorized to access this"
        />
      </>
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
      <Suspense fallback="Loading...">
        <TopMenu />
      </Suspense>

      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <div style={{ marginTop: "75px" }}> {getLayout(<Component {...pageProps} />)}</div>
      </ErrorBoundary>
    </ChakraProvider>
  )
}

export default withBlitz(MyApp)
