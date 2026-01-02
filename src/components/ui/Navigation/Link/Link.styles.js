import styled, { css } from 'styled-components'

const sizeStyles = {
	sm: css`
		font-size: 12px;
		line-height: 16px;
	`,
	md: css`
		font-size: 13px;
		line-height: 18px;
	`,
	lg: css`
		font-size: 14px;
		line-height: 20px;
	`,
}

export const StyledLink = styled.a`
	color: ${props => props.theme.colors.action.primary};
	text-decoration: none;
	display: inline-flex;
	align-items: center;
	gap: ${props => props.theme.spacing.xs};
	font-weight: 500;

	${props => (props.$size ? sizeStyles[props.$size] : sizeStyles.md)}

	&:hover {
		color: ${props => props.theme.colors.action.primaryHover};
		text-decoration: underline;
	}

	&:focus-visible {
		outline: 2px solid ${props => props.theme.colors.action.focus};
		outline-offset: 2px;
		border-radius: 4px;
	}

	${props =>
		props.$visited &&
		css`
			&:visited {
				color: ${props.theme.colors.action.visited ?? props.theme.colors.action.primary};
			}
		`}

	${props =>
		props.$disabled &&
		css`
			color: ${props.theme.colors.text.disabled};
			cursor: not-allowed;
			text-decoration: none;
			pointer-events: none;
		`}

	${props =>
		props.$inline &&
		css`
			display: inline;
		`}
`

export const StyledLinkIcon = styled.span`
	display: inline-flex;
	align-items: center;
`
