import { Routes } from "@blitzjs/next"
import {
  Stack,
  Card,
  HStack,
  Img,
  Container,
  CardBody,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"
import { Book } from "@prisma/client"
import { CheckCircleFill, CheckLg, Heart, HeartFill, PatchPlus, Plus } from "react-bootstrap-icons"
import { useState } from "react"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import getBookrecord from "src/bookrecords/queries/getBookrecord"
import getBookrecordByUserAndBook from "src/bookrecords/queries/getBookrecordByUserAndBook"
import { useMutation, useQuery } from "@blitzjs/rpc"
import updateStatusOfBookrecord from "src/bookrecords/mutations/updateBookrecord"
import updateBookrecord from "src/bookrecords/mutations/updateBookrecord"
import { FORM_ERROR } from "src/core/components/Form"

interface SmallBookCardProps {
  book: Book
}

function SmallBookCard({ book }: SmallBookCardProps) {
  const currentUser = useCurrentUser()
  const [record] = useQuery(getBookrecordByUserAndBook, {
    userId: currentUser!.id,
    bookId: book.id,
  })

  const [isLiked, changeIsLiked] = useState(record ? record.isLiked : false)
  const [isRead, changeIsRead] = useState(record ? record.isRead : false)
  const [changeRecordMutation] = useMutation(updateBookrecord)

  return (
    <Card key={book.id} maxW="xl">
      <HStack>
        <Img
          src={`https://picsum.photos/id/${book.id + 250}/200/300`}
          width="200px"
          height="300px"
          margin="15px"
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
            </ButtonGroup>
            <ButtonGroup marginLeft="5px" spacing="2">
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
                  // <CheckLg size="20px" color="green" />
                )}
                {/* <Heading marginLeft="5px" size="sm">
                  Read
                </Heading> */}
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Container>
      </HStack>
    </Card>
  )
}

export default SmallBookCard
