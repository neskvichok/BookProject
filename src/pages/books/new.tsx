import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { CreateBookSchema } from "src/books/schemas"
import createBook from "src/books/mutations/createBook"
import { BookForm, FORM_ERROR } from "src/books/components/BookForm"
import { Suspense } from "react"

const NewBookPage = () => {
  const router = useRouter()
  const [createBookMutation] = useMutation(createBook)

  return (
    <Layout title={"Create New Book"}>
      <h1>Create New Book</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <BookForm
          submitText="Create Book"
          schema={CreateBookSchema}
          // initialValues={{}}
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
      <p>
        <Link href={Routes.BooksPage()}>Books</Link>
      </p>
    </Layout>
  )
}

NewBookPage.authenticate = true

export default NewBookPage
