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
} from "@chakra-ui/react"

const ITEMS_PER_PAGE = 100

export const BooksList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
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
            <Card key={book.id} maxW="lg">
              <HStack>
                <Img
                  src={`https://picsum.photos/id/${book.id + 250}/200/300`}
                  width="200px"
                  height="300px"
                />
                <Container>
                  <CardBody>
                    <Stack mt="6" spacing="3">
                      <Heading size="md">
                        <Link href={Routes.ShowBookPage({ bookId: book.id })}>{book.name}</Link>
                      </Heading>
                      <Text>This is book description сапмроилд аспмрио прмои </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Heading size="sm">Add to favourite</Heading>
                    </ButtonGroup>
                  </CardFooter>
                </Container>
              </HStack>
            </Card>
          ))}
        </SimpleGrid>
      </Center>
      <footer>
        <button disabled={page === 0} onClick={goToPreviousPage}>
          Previous
        </button>
        <button disabled={!hasMore} onClick={goToNextPage}>
          Next
        </button>
      </footer>
    </VStack>
  )
}

const BooksPage = () => {
  return (
    <Layout>
      <Head>
        <title>Books</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <BooksList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default BooksPage
