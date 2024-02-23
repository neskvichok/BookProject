import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import getBooks from "src/books/queries/getBooks"
import {
  ButtonGroup,
  Flex,
  HStack,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  Container,
  Image,
  Img,
  Center,
  SimpleGrid,
  VStack,
  Button,
  CardHeader,
} from "@chakra-ui/react"
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { Heart, HeartFill } from "react-bootstrap-icons"
import SmallBookCard from "src/books/components/SmallBookCard"
import LikedSmallBookCard from "src/books/components/LikedSmallBookCard"

const ITEMS_PER_PAGE = 100

export const LikedBooksList = () => {
  const router = useRouter()
  // const page = Number(router.query.page) || 0
  const page = 0
  const [{ books, hasMore }] = usePaginatedQuery(getBooks, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })
  const height = 100
  const width = 50
  return (
    <VStack>
      <Center>
        <SimpleGrid columns={2} spacing={10}>
          {books.map((book) => (
            <LikedSmallBookCard key={book.id} book={book} />
          ))}
        </SimpleGrid>
      </Center>
      <footer style={{ margin: "20px", padding: "5px" }}>
        <Button
          leftIcon={<ArrowBackIcon />}
          colorScheme="grey"
          variant="outline"
          isDisabled={page === 0}
          onClick={goToPreviousPage}
          marginRight="15px"
        >
          Previous
        </Button>
        <Button
          colorScheme="grey"
          rightIcon={<ArrowForwardIcon />}
          variant="outline"
          isDisabled={!hasMore}
          onClick={goToNextPage}
        >
          Next
        </Button>
      </footer>
    </VStack>
  )
}

const LikedBooksPage = () => {
  return (
    <Layout>
      <Head>
        <title>Books</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <LikedBooksList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default LikedBooksPage
