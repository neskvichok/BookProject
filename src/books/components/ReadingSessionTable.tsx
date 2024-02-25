import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

// Отримуємо середню швидкість читання за годину
function calculateReadingSpeed(startPage, endPage, startTime, endTime) {
  const durationInHours = (endTime - startTime) / 3600000 // конвертуємо мілісекунди в години
  const pagesRead = endPage - startPage
  return pagesRead / durationInHours
}

// Основний компонент
function ReadingSessionTable({ readingSessions }) {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Start Time</Th>
          <Th>Start Page</Th>
          <Th>End Time</Th>
          <Th>End Page</Th>
          <Th>Reading Speed (pages per hour)</Th>
        </Tr>
      </Thead>
      <Tbody>
        {readingSessions.map((readingSession) => (
          <Tr key={readingSession.id}>
            <Td>{readingSession.startTime.toLocaleString()}</Td>
            <Td>{readingSession.startPage}</Td>
            <Td>
              {readingSession.endTime ? readingSession.endTime.toLocaleString() : "is running"}
            </Td>
            <Td>{readingSession.endPage ? readingSession.endPage : "N/A"}</Td>
            <Td>
              {readingSession.endTime
                ? calculateReadingSpeed(
                    readingSession.startPage,
                    readingSession.endPage,
                    readingSession.startTime,
                    readingSession.endTime
                  ).toFixed(2)
                : "N/A"}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default ReadingSessionTable
