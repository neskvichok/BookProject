import { Routes, useParam } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Divider,
  HStack,
  Heading,
  Img,
  Stack,
  Text,
  Table,
  Tbody,
  Td,
  Tr,
  VStack,
  Box,
  Center,
} from "@chakra-ui/react"
import Link from "next/link"
import router, { useRouter } from "next/router"
import { useState } from "react"
import { HeartFill, Heart, Plus, CheckCircleFill, Pencil, Trash3 } from "react-bootstrap-icons"
import deleteBook from "../mutations/deleteBook"
import { Book } from "@prisma/client"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import getBookrecordByUserAndBook from "src/bookrecords/queries/getBookrecordByUserAndBook"
import updateBookrecord from "src/bookrecords/mutations/updateBookrecord"
import { FORM_ERROR } from "./BookForm"
import getReadingSessionsByUserAndBook from "src/reading-sessions/queries/getReadingSessionsByUserAndBook"
import getRunningReadingSessionByUserAndBook from "src/reading-sessions/queries/getRunningReadingSessionByUserAndBook"
import startReadingSession from "src/reading-sessions/mutations/startReadingSession"
import { Ctx } from "blitz"
import finishReadingSession from "src/reading-sessions/mutations/finishReadingSession"
import ReadingSessionTable from "./ReadingSessionTable"

interface LargeBookCardProps {
  book: Book
}

function LargeBookCard({ book }: LargeBookCardProps) {
  const router = useRouter()
  const [deleteBookMutation] = useMutation(deleteBook)

  const currentUser = useCurrentUser()
  const [record] = useQuery(getBookrecordByUserAndBook, {
    userId: currentUser!.id,
    bookId: book.id,
  })

  const [readingSessions] = useQuery(getReadingSessionsByUserAndBook, {
    userId: currentUser!.id,
    bookId: book.id,
  })

  const runningSession = useQuery(getRunningReadingSessionByUserAndBook, {
    userId: currentUser!.id,
    bookId: book.id,
  })

  const [isLiked, changeIsLiked] = useState(record ? record.isLiked : false)
  const [isRead, changeIsRead] = useState(record ? record.isRead : false)
  const [changeRecordMutation] = useMutation(updateBookrecord)
  const [startPage, setStartPage] = useState(1)

  const [finishPage, setFinishPage] = useState(1)
  return (
    <Card maxW="5xl">
      <HStack>
        {book.coverlink != null ? (
          <Img src={book.coverlink} margin="30px" width="350px" height="550px" />
        ) : (
          <Img
            src={`https://picsum.photos/id/${book.id}/350/550`}
            margin="30px"
            width="350px"
            height="550px"
          />
        )}
        <Container>
          <Stack mt="6" spacing="3">
            <CardHeader>
              <Heading size="md">{book.name}</Heading>
              <Text as="i">{book.author}</Text>
            </CardHeader>
            <CardBody>
              <VStack>
                <Table>
                  <Tbody>
                    <Tr>
                      <Td color="grey">Author</Td>
                      <Td>{book.author}</Td>
                    </Tr>
                    <Tr>
                      <Td color="grey">Pages</Td>
                      <Td>{book.pageNum}</Td>
                    </Tr>
                    <Tr>
                      <Td color="grey">ISBN</Td>
                      <Td>{book.isbn}</Td>
                    </Tr>
                    <Tr>
                      <Td color="grey">Added</Td>
                      <Td>{book.createdAt.toDateString()}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </VStack>
            </CardBody>
          </Stack>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button
                onClick={async () => {
                  if (currentUser && book) {
                    try {
                      const record = await changeRecordMutation({
                        userId: currentUser.id,
                        bookId: book.id,
                        isLiked: !isLiked,
                        isRead: isRead,
                      })
                      changeIsLiked(!isLiked)
                    } catch (error: any) {
                      console.error(error)
                      return {
                        [FORM_ERROR]: error.toString(),
                      }
                    }
                  }
                }}
              >
                {isLiked ? <HeartFill color="#F52694" /> : <Heart color="grey" />}

                <Heading marginLeft="5px" size="sm">
                  {" "}
                  Add to favourite
                </Heading>
              </Button>
              <Button
                onClick={async () => {
                  if (currentUser && book) {
                    try {
                      const record = await changeRecordMutation({
                        userId: currentUser.id,
                        bookId: book.id,
                        isLiked: isLiked,
                        isRead: !isRead,
                      })
                      changeIsRead(!isRead)
                    } catch (error: any) {
                      console.error(error)
                      return {
                        [FORM_ERROR]: error.toString(),
                      }
                    }
                  }
                }}
              >
                {!isRead ? (
                  <Plus size="30px" color="grey" />
                ) : (
                  <CheckCircleFill size="20px" color="green" />
                )}
                {!isRead ? (
                  <Heading marginLeft="5px" size="sm">
                    Read
                  </Heading>
                ) : (
                  <></>
                )}
              </Button>
              <Link href={Routes.EditBookPage({ bookId: book.id })}>
                <Button>
                  <Pencil size="20px" color="grey" />
                  <Heading marginLeft="5px" size="sm">
                    Edit
                  </Heading>
                </Button>
              </Link>
              <Button
                type="button"
                onClick={async () => {
                  if (window.confirm("This will be deleted")) {
                    await deleteBookMutation({ id: book.id })
                    await router.push(Routes.BooksPage())
                  }
                }}
                style={{ marginLeft: "0.5rem" }}
              >
                <Trash3 size="20px" color="grey" />
                Delete
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Container>
      </HStack>
      <Container>
        <Center margin="10px" marginBottom="20px">
          {runningSession[0] !== null ? (
            <div>
              <Text fontWeight="bold" fontSize="xl">
                Running Reading Session:
              </Text>
              <Text>
                Start Time: {runningSession[0].startTime.toLocaleDateString()}{" "}
                {runningSession[0].startTime.toLocaleTimeString()}
              </Text>

              <Button
                onClick={() => {
                  const pageFinish = prompt("Enter the start page:")
                  if (pageFinish !== null) {
                    setFinishPage(parseInt(pageFinish))
                    finishReadingSession({ endPage: parseInt(pageFinish) }, {} as Ctx)
                      .then(() => {
                        router.reload()
                      })
                      .catch((error) => {
                        console.error("Error finishing reading session:", error)
                      })
                  }
                }}
              >
                Finish Reading
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => {
                const pageStart = prompt("Enter the start page:")
                if (pageStart !== null) {
                  setStartPage(parseInt(pageStart))
                  startReadingSession(
                    { bookId: book.id, startPage: parseInt(pageStart) },
                    {} as Ctx
                  )
                    .then(() => {
                      router.reload()
                    })
                    .catch((error) => {
                      console.error("Error starting reading session:", error)
                    })
                }
              }}
            >
              Start Reading
            </Button>
          )}
        </Center>
        <Text fontWeight="bold" fontSize="xl">
          Reading Sessions:
        </Text>

        <ReadingSessionTable readingSessions={readingSessions} />
        <Box marginTop="50px" marginBottom="50px">
          {book.description ? (
            <div>
              <Text as="b">Description:</Text>
              <Text>{book.description}</Text>
            </div>
          ) : (
            <Text>There is no Description(</Text>
          )}
        </Box>
      </Container>
    </Card>
  )
}

export default LargeBookCard
