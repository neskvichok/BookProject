import { ReadingSession } from "@prisma/client"
import { Box, HStack, Text } from "@chakra-ui/react"
import React, { useState, useEffect } from "react"
import getBook from "../queries/getBook"
import { useQuery } from "@blitzjs/rpc"
import { HSquare } from "react-bootstrap-icons"
import Link from "next/link"
import { Routes } from "@blitzjs/next"

const MiniReadingSessionCard: React.FC<{ session: ReadingSession }> = ({ session }) => {
  const [elapsedTime, setElapsedTime] = useState<number | null>(null)

  const [book] = useQuery(getBook, { id: session.bookId })

  useEffect(() => {
    // If the session is not ended, update time every second
    if (!session.endTime) {
      const interval = setInterval(() => {
        const now = new Date()
        const elapsed = Math.floor((now.getTime() - new Date(session.startTime).getTime()) / 1000)
        setElapsedTime(elapsed)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [session.endTime, session.startTime])

  return (
    <Link href={Routes.ShowBookPage({ bookId: book.id })}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="1.5"
        // m="4"
        display="flex"
        // flexDirection="column"
      >
        <Text fontWeight="bold" marginRight="5px">
          {book.name}
        </Text>
        {session.endTime ? (
          <Text>Ended: {session.endTime.toLocaleString()}</Text>
        ) : (
          <Text>{elapsedTime !== null ? formatElapsedTime(elapsedTime) : "Not determined"}</Text>
        )}
      </Box>
    </Link>
  )
}

function formatElapsedTime(elapsedTime: number): string {
  const hours = Math.floor(elapsedTime / 3600)
  const minutes = Math.floor((elapsedTime % 3600) / 60)
  const seconds = elapsedTime % 60
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`
}

export default MiniReadingSessionCard
