import React from 'react'
import Form from '../../FormWrapper/Form/Form'
import { FormContext } from '../../FormWrapper/FormContext'

export default function FluidForm({ className, children, ...rest }) {
  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <Form className={className} {...rest}>
        {children}
      </Form>
    </FormContext.Provider>
  )
}

FluidForm.displayName = 'FluidForm'
