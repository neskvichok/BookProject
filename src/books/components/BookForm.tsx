import React, { Suspense } from "react"
import { Form, FormProps } from "src/core/components/Form"
import { LabeledTextField } from "src/core/components/LabeledTextField"

import { z } from "zod"
export { FORM_ERROR } from "src/core/components/Form"

export function BookForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" type="text" />
      <LabeledTextField name="author" label="Author" placeholder="Author" type="text" />
      <LabeledTextField name="pageNum" label="Page Num" placeholder="Page Num" type="number" />
      <LabeledTextField name="isbn" label="Isbn" placeholder="Isbn" type="text" />
      <LabeledTextField name="rate" label="Rate" placeholder="Rate" type="number" />
      {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
    </Form>
  )
}
