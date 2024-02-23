import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React from "react"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { withBlitz } from "src/blitz-client"
// import "src/styles/globals.css"

import { ChakraProvider, HStack, Flex, Heading } from "@chakra-ui/react"

function TopMenu() {
  const router = useRouter()
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      bg="blue.500"
      color="white"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
    >
      <HStack spacing="10">
        <Link href={Routes.Home()}>
          <Heading size="md"> Main</Heading>
        </Link>
        <Link href={Routes.BooksPage()}>
          <Heading size="md"> Books</Heading>
        </Link>
        <Link href={Routes.NewBookPage()}>
          <Heading size="md"> Add New Book</Heading>
        </Link>
        <Link href={Routes.Page404()}>
          <Heading size="md"> Account</Heading>
        </Link>
        <Link href={Routes.LikedBooksPage()}>
          <Heading size="md"> My Favourite</Heading>
        </Link>
        <Link href={Routes.ReadBooksPage()}>
          <Heading size="md"> My Read</Heading>
        </Link>
      </HStack>
    </Flex>
  )
}

export default TopMenu
