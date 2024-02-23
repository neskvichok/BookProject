import Layout from "src/core/layouts/Layout"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { ForgotPassword } from "src/auth/schemas"
import forgotPassword from "src/auth/mutations/forgotPassword"
import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { Center, Card, CardHeader, Heading, CardBody } from "@chakra-ui/react"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <Layout title="Forgot Your Password?">
      <Center>
        <Card margin="50px" minW="xl">
          <CardHeader>
            <Heading>Forgot your password?</Heading>
          </CardHeader>
          <CardBody>
            {isSuccess ? (
              <div>
                <h2>Request Submitted</h2>
                <p>
                  If your email is in our system, you will receive instructions to reset your
                  password shortly.
                </p>
              </div>
            ) : (
              <Form
                // minW="50px"
                submitText="Instructions"
                schema={ForgotPassword}
                initialValues={{ email: "" }}
                onSubmit={async (values) => {
                  try {
                    await forgotPasswordMutation(values)
                  } catch (error: any) {
                    return {
                      [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                    }
                  }
                }}
              >
                <LabeledTextField name="email" label="Email" placeholder="Email" />
              </Form>
            )}
          </CardBody>
        </Card>
      </Center>
    </Layout>
  )
}

export default ForgotPasswordPage
