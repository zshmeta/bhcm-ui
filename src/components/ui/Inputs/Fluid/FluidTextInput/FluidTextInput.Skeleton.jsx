import React from 'react'
import TextInputSkeleton from '../../Text/TextInput/TextInput.Skeleton'
import { FormContext } from '../../FormWrapper/FormContext'

export default function FluidTextInputSkeleton(props) {
	return (
		<FormContext.Provider value={{ isFluid: true }}>
			<TextInputSkeleton {...props} />
		</FormContext.Provider>
	)
}

FluidTextInputSkeleton.displayName = 'FluidTextInputSkeleton'

