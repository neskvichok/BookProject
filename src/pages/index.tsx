import { Suspense } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Img,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import getBooks from "src/books/queries/getBooks"
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import SmallBookCard from "src/books/components/SmallBookCard"

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
            <SmallBookCard key={book.id} book={book} />
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

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <Center>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <BooksList />
          </Suspense>
        </div>
      </Center>
    )
  } else {
    return (
      <>
        <Center padding="40px">
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
  }
}

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </Layout>
  )
}

export default Home
