import { Suspense, useState } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getBook from "src/books/queries/getBook"
import deleteBook from "src/books/mutations/deleteBook"
import {
  ButtonGroup,
  Card,
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Container,
  Divider,
  HStack,
  Heading,
  Img,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react"
import { HeartFill, Heart, Pencil, Plus, CheckCircleFill, Trash3 } from "react-bootstrap-icons"
import LargeBookCard from "src/books/components/LargeBookCard"
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"

export const Book = () => {
  const router = useRouter()
  const bookId = useParam("bookId", "number")
  const [deleteBookMutation] = useMutation(deleteBook)
  const [book] = useQuery(getBook, { id: bookId })
  const [isLiked, changeIsLiked] = useState(false)
  const [isRead, changeIsRead] = useState(false)
  const goToPreviousPage = () => router.push(`/books/${book.id - 1}`)
  const goToNextPage = () => router.push(`/books/${book.id + 1}`)

  return (
    <>
      <Head>
        <title>Book {book.id}</title>
      </Head>

      <div>
        <Center>
          <HStack>
            <Button
              position="fixed"
              top="50%"
              left="4%"
              leftIcon={<ArrowBackIcon />}
              colorScheme="grey"
              variant="outline"
              isDisabled={book.id === 1}
              onClick={goToPreviousPage}
              marginRight="15px"
            >
              Previous
            </Button>
            <LargeBookCard book={book} />
            <Button
              position="fixed"
              top="50%"
              right="4%"
              rightIcon={<ArrowForwardIcon />}
              colorScheme="grey"
              variant="outline"
              onClick={goToNextPage}
              marginLeft="15px"
            >
              Next
            </Button>
          </HStack>
        </Center>
      </div>
    </>
  )
}

const ShowBookPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Book />
      </Suspense>
    </div>
  )
}

ShowBookPage.authenticate = true
ShowBookPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowBookPage
