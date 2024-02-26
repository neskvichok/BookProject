import {
  Card,
  CardBody,
  CardHeader,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Textarea,
} from "@chakra-ui/react"
import React, { Suspense } from "react"
import { Form, FormProps } from "src/core/components/Form"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { LabeledLargeTextField } from "src/core/components/LabeledLargeTextField"
import { ChakraProvider, FormControl, Input, extendTheme, Box } from "@chakra-ui/react"
const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
}

import { z } from "zod"
export { FORM_ERROR } from "src/core/components/Form"

export function BookForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField
        name="name"
        label="Book name*"
        placeholder="Book name"
        type="text"
        isRequired
      />
      <LabeledTextField name="author" label="Author*" placeholder="Author" type="text" isRequired />
      <LabeledTextField
        name="pageNum"
        label="Page Num*"
        placeholder="Page Num"
        type="number"
        isRequired
      />
      <LabeledTextField name="isbn" label="Isbn*" placeholder="Isbn" type="text" isRequired />
      <LabeledTextField
        name="coverlink"
        label="Book Cover Link"
        placeholder="Book Cover Link"
        type="text"
        isRequired
      />
      <LabeledLargeTextField
        height="auto"
        minHeight="100px"
        name="description"
        label="Description"
        placeholder="Description"
        type="text"
      />
    </Form>
  )
}
