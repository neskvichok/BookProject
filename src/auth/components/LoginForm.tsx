import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import login from "src/auth/mutations/login"
import { Login } from "src/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { Card, CardBody, CardHeader, Center, HStack, Heading, Td, Text } from "@chakra-ui/react"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  return (
    <div>
      <Center>
        <Card margin="50px" minW="xl">
          <CardHeader>
            <Heading>Login</Heading>
          </CardHeader>

          <CardBody>
            <Form
              submitText="Login"
              schema={Login}
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                try {
                  const user = await loginMutation(values)
                  props.onSuccess?.(user)
                } catch (error: any) {
                  if (error instanceof AuthenticationError) {
                    return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
                  } else {
                    return {
                      [FORM_ERROR]:
                        "Sorry, we had an unexpected error. Please try again. - " +
                        error.toString(),
                    }
                  }
                }
              }}
            >
              <LabeledTextField name="email" label="Email" placeholder="Email" />
              <LabeledTextField
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
            </Form>
            <HStack>
              <Link href={Routes.ForgotPasswordPage()}>
                <Text margin="5px" color="grey">
                  Forgot your password?
                </Text>
              </Link>
              <Link href={Routes.SignupPage()}>
                <Text marginLeft="10px" color="grey">
                  Sing Up
                </Text>
              </Link>
            </HStack>
          </CardBody>
        </Card>
      </Center>
    </div>
  )
}

export default LoginForm
