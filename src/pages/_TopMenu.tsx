import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React from "react"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { withBlitz } from "src/blitz-client"
import { useMutation, useQuery } from "@blitzjs/rpc"

// import "src/styles/globals.css"

import { ChakraProvider, HStack, Flex, Heading, Button, Center } from "@chakra-ui/react"
import logout from "src/auth/mutations/logout"
import getRunningReadingSessionByUser from "src/reading-sessions/queries/getRunningReadingSessionByUser"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import getCurrentUser from "src/users/queries/getCurrentUser"
import { ReadingSession } from "@prisma/client"
import MiniReadingSessionCard from "src/books/components/MiniReadingSessionCard"

function TopMenu() {
  const router = useRouter()
  const currentUser = useCurrentUser()

  const [logoutMutation] = useMutation(logout)
  const [runningReadingSession] = useQuery(
    getRunningReadingSessionByUser,
    {
      userId: currentUser?.id,
    },
    { useErrorBoundary: false }
  )

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      bg="grey"
      color="white"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
    >
      <HStack spacing="10">
        <Link href={Routes.Home()}>
          <Button variant="link" colorScheme="white">
            <Heading size="md" color="white">
              {" "}
              Main
            </Heading>
          </Button>
        </Link>
        <Link href={Routes.BooksPage()}>
          <Button variant="link" colorScheme="white">
            <Heading size="md" color="white">
              {" "}
              Books
            </Heading>
          </Button>
        </Link>
        <Link href={Routes.NewBookPage()}>
          <Button variant="link" colorScheme="white">
            <Heading size="md" color="white">
              {" "}
              Add New Book
            </Heading>
          </Button>
        </Link>
        <Link href={Routes.LikedBooksPage()}>
          <Button variant="link" colorScheme="white">
            <Heading size="md" color="white">
              {" "}
              My Favourite
            </Heading>
          </Button>
        </Link>
        <Link href={Routes.ReadBooksPage()}>
          <Button variant="link" colorScheme="white">
            <Heading size="md" color="white">
              My Read
            </Heading>
          </Button>
        </Link>
        {currentUser != null ? (
          <Button
            onClick={async () => {
              await logoutMutation()
            }}
            variant="link"
            colorScheme="white"
          >
            <Heading size="md" color="white">
              Logout
            </Heading>
          </Button>
        ) : (
          <></>
        )}
        {runningReadingSession != null ? (
          <MiniReadingSessionCard session={runningReadingSession} />
        ) : (
          <></>
        )}
      </HStack>
    </Flex>
  )
}

export default TopMenu
