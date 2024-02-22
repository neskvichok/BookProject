import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdateBookSchema } from "src/books/schemas"
import getBook from "src/books/queries/getBook"
import updateBook from "src/books/mutations/updateBook"
import { BookForm, FORM_ERROR } from "src/books/components/BookForm"
import { Box, Card, CardBody, CardHeader, Flex, Heading } from "@chakra-ui/react"

export const EditBook = () => {
  const router = useRouter()
  const bookId = useParam("bookId", "number")
  const [book, { setQueryData }] = useQuery(
    getBook,
    { id: bookId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateBookMutation] = useMutation(updateBook)

  return (
    <>
      <Head>
        <title>Edit Book {book.id}</title>
      </Head>

      <div>
        <Layout title={"Edit Book"}>
          <Flex direction="column" align="center" justify="center" minHeight="80vh">
            <Box width="100%" maxWidth="600px">
              <Card>
                <CardHeader>
                  <Heading>Edit Book</Heading>
                </CardHeader>
                <CardBody>
                  <Suspense fallback={<div>Loading...</div>}>
                    <BookForm
                      submitText="Update Book"
                      schema={UpdateBookSchema}
                      initialValues={book}
                      onSubmit={async (values) => {
                        try {
                          const updated = await updateBookMutation({
                            id: book.id,
                            ...values,
                          })
                          await setQueryData(updated)
                          await router.push(Routes.ShowBookPage({ bookId: updated.id }))
                        } catch (error: any) {
                          console.error(error)
                          return {
                            [FORM_ERROR]: error.toString(),
                          }
                        }
                      }}
                    />
                  </Suspense>
                </CardBody>
              </Card>
            </Box>
          </Flex>
        </Layout>
      </div>
    </>
  )
}

const EditBookPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditBook />
      </Suspense>
    </div>
  )
}

EditBookPage.authenticate = true
EditBookPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditBookPage
