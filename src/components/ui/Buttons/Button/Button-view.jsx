import React from 'react'
import { Theme } from '../../System/Theme'
import Button, { BUTTON_KINDS, BUTTON_SIZES } from './Button'

function ButtonView() {
	return (
		<Theme>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
				<h2 style={{ margin: 0 }}>Button</h2>

				<div>
					<h3 style={{ margin: '0 0 8px' }}>Kinds</h3>
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
						{BUTTON_KINDS.map(kind => (
							<Button key={kind} kind={kind} onClick={() => {}}>
								{kind}
							</Button>
						))}
					</div>
				</div>

				<div>
					<h3 style={{ margin: '0 0 8px' }}>Sizes</h3>
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
						{BUTTON_SIZES.map(size => (
							<Button key={size} size={size} onClick={() => {}}>
								{size}
							</Button>
						))}
					</div>
				</div>
			</div>
		</Theme>
	)
}

export default ButtonView

