import { Suspense } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Img,
  VStack,
} from "@chakra-ui/react"
import { BooksList } from "./books"
import TopMenu from "./_TopMenu"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <Center>
        <Card minW="3xl">
          <CardBody>
            <button
              onClick={async () => {
                await logoutMutation()
              }}
            >
              Logout
            </button>
            <div>
              User id: <code>{currentUser.id}</code>
              <br />
              User role: <code>{currentUser.role}</code>
            </div>
          </CardBody>
        </Card>
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
