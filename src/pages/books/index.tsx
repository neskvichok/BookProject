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

const ITEMS_PER_PAGE = 10

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
                      <Text as="i">{book.author}</Text>
                      {book.description ? (
                        <div>
                          <Text as="b">Description:</Text>
                          <Text>
                            <Text>
                              {book.description.substring(0, 90)}
                              {book.description.length > 90 ? "..." : ""}
                            </Text>
                          </Text>
                        </div>
                      ) : (
                        <Text>There is no Description</Text>
                      )}
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
      <footer style={{ margin: "20px", padding: "5px" }}>
        <Button
          leftIcon={<ArrowBackIcon />}
          colorScheme="blue"
          variant="outline"
          isDisabled={page === 0}
          onClick={goToPreviousPage}
          marginRight="15px"
        >
          Previous
        </Button>
        <Button
          colorScheme="blue"
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
