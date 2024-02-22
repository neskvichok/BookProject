import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import { useField, useFormikContext, ErrorMessage } from "formik"

import { Textarea, TextareaProps } from "@chakra-ui/react"
import { FormControl, FormLabel } from "@chakra-ui/form-control"

export interface LabeledLargeTextFieldProps extends TextareaProps {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledLargeTextField = forwardRef<HTMLInputElement, LabeledLargeTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const [input] = useField(name)
    const { isSubmitting } = useFormikContext()

    return (
      <div {...outerProps}>
        <FormLabel>
          {label}
          <Textarea {...input} disabled={isSubmitting} {...props} ref={ref} />
        </FormLabel>
        <ErrorMessage name={name}>
          {(msg) => (
            <div role="alert" style={{ color: "red" }}>
              {msg}
            </div>
          )}
        </ErrorMessage>
      </div>
    )
  }
)

export default LabeledLargeTextField
