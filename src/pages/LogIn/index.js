import React, { Component } from 'react'
import { Formik } from 'formik'

import Layout from '../../components/Layout'
import { H1 } from '../../components/Typography'
import { Form, GlobalFormError } from '../../components/Form'
import { Input } from '../../components/Input'
import Button from '../../components/Button'
import { schema } from './schema'
import { logIn } from '../../api/log-in'
import { getCustomerById } from '../../api/customers/get-customer'
import { connect } from 'react-redux'
import { setCustomer } from '../../store/customer/actions'

class LogInComponent extends Component

{
  state = {
    globalError: '',
  }

  initialValues = {
    email: '',
    password: '',
  }

  handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true)
      const ownerId = await logIn(values.email, values.password)
      console.log(ownerId)
      const customerJson = await getCustomerById(ownerId)
      console.log('customerDetail:' + JSON.stringify(customerJson))
      this.props.setCustomer(customerJson)
      this.props.history.push('/account')
    } catch (error) {
      this.setState({
        globalError: error.message,
      })
    }
    setSubmitting(false)
  }

  render() {
    const { globalError } = this.state

    return (
      <Layout>
        <H1 textAlign="center">Log in</H1>
        <Formik
          initialValues={this.initialValues}
          validationSchema={schema}
          onSubmit={this.handleSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              {Boolean(globalError) && (
                <GlobalFormError>{globalError}</GlobalFormError>
              )}
              <Input name="email" type="email" label="Email address" />
              <Input name="password" type="password" label="Password" />
              <Button disabled={isSubmitting}>
                {isSubmitting ? 'Logging In...' : 'Log In'}
              </Button>
            </Form>
          )}
        </Formik>
      </Layout>
    )
  }
}


const mapStateToProps = state => ({
  state
})

const mapDispatchToProps = {
  setCustomer,
}

const LogIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInComponent)

export { LogIn }
