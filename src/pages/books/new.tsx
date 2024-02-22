import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { CreateBookSchema } from "src/books/schemas"
import createBook from "src/books/mutations/createBook"
import { BookForm, FORM_ERROR } from "src/books/components/BookForm"
import { Suspense } from "react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import TopMenu from "../_TopMenu"
import { Heading, Flex, Box, Button } from "@chakra-ui/react"

const NewBookPage = () => {
  const router = useRouter()
  const [createBookMutation] = useMutation(createBook)

  return (
    <Layout title={"Create New Book"}>
      <Flex direction="column" align="center" justify="center" minHeight="80vh">
        <Box width="100%" maxWidth="600px">
          <Suspense fallback={<div>Loading...</div>}>
            <BookForm
              submitText={
                <Button
                  size="md"
                  height="48px"
                  width="200px"
                  border="2px"
                  borderColor="blue.500"
                  textColor="blue.500"
                  type="submit"
                  colorScheme="teal"
                  variant="outline"
                  rightIcon={<ArrowForwardIcon />}
                >
                  Create Book
                </Button>
              }
              schema={CreateBookSchema}
              onSubmit={async (values) => {
                try {
                  const book = await createBookMutation(values)
                  await router.push(Routes.ShowBookPage({ bookId: book.id }))
                } catch (error: any) {
                  console.error(error)
                  return {
                    [FORM_ERROR]: error.toString(),
                  }
                }
              }}
            />
          </Suspense>
        </Box>
      </Flex>
    </Layout>
  )
}

NewBookPage.authenticate = true

export default NewBookPage
