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
import { ChakraProvider, FormControl, Input, extendTheme, Box } from "@chakra-ui/react"
const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
}

import { z } from "zod"
export { FORM_ERROR } from "src/core/components/Form"

export function BookForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <Card>
        <CardHeader>
          <Heading size="lg">Create New Book</Heading>
        </CardHeader>
        <CardBody>
          <LabeledTextField
            name="name"
            label="Book name*"
            placeholder="Book name"
            type="text"
            isRequired
          />
          <LabeledTextField
            name="author"
            label="Author*"
            placeholder="Author"
            type="text"
            isRequired
          />
          <LabeledTextField
            name="pageNum"
            label="Page Num*"
            placeholder="Page Num"
            type="number"
            isRequired
          />
          <LabeledTextField name="isbn" label="Isbn*" placeholder="Isbn" type="text" isRequired />
          <Textarea
            height="auto"
            minHeight="100px"
            name="description"
            label="Description"
            placeholder="Description"
            type="text"
          />
          {/* <LabeledTextField name="rate" label="Rate" placeholder="Rate" type="number" isRequired /> */}
          {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
        </CardBody>
      </Card>
    </Form>
  )
}
