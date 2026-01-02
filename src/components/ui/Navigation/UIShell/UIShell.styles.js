import styled, { css } from 'styled-components'

export const SkipLink = styled.a`
	position: absolute;
	top: 0;
	left: 0;
	transform: translateY(-120%);
	padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
	background: ${props => props.theme.colors.bg.surfaceRaised};
	color: ${props => props.theme.colors.text.primary};
	border: 1px solid ${props => props.theme.colors.border.subtle};
	border-radius: 8px;
	z-index: 1000;

	&:focus {
		transform: translateY(0);
		outline: 2px solid ${props => props.theme.colors.action.focus};
		outline-offset: 2px;
	}
`

export const HeaderRoot = styled.header`
	display: flex;
	align-items: center;
	height: 48px;
	padding: 0 ${props => props.theme.spacing.md};
	gap: ${props => props.theme.spacing.md};
	border-bottom: 1px solid ${props => props.theme.colors.border.subtle};
	background: ${props => props.theme.colors.bg.surfaceRaised};
	color: ${props => props.theme.colors.text.primary};
	position: relative;
	z-index: 500;
`

export const HeaderNav = styled.nav`
	display: flex;
	align-items: center;
	min-width: 0;
	flex: 1;
`

export const HeaderMenuBar = styled.ul`
	display: flex;
	align-items: center;
	gap: ${props => props.theme.spacing.sm};
	list-style: none;
	padding: 0;
	margin: 0;
`

export const HeaderGlobalBar = styled.div`
	display: flex;
	align-items: center;
	gap: ${props => props.theme.spacing.xs};
`

export const HeaderPanelWrap = styled.div`
	position: absolute;
	top: 100%;
	right: 0;
	min-width: 260px;
	margin-top: ${props => props.theme.spacing.xs};
	border: 1px solid ${props => props.theme.colors.border.subtle};
	background: ${props => props.theme.colors.bg.surfaceRaised};
	border-radius: 12px;
	padding: ${props => props.theme.spacing.sm};
	z-index: 600;

	${props =>
		!props.$expanded &&
		css`
			display: none;
		`}
`

export const SideNavOverlay = styled.div`
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.35);
	z-index: 400;

	${props =>
		!props.$active &&
		css`
			display: none;
		`}
`

export const SideNavNav = styled.nav`
	position: fixed;
	top: 48px;
	left: 0;
	height: calc(100vh - 48px);
	overflow: auto;
	border-right: 1px solid ${props => props.theme.colors.border.subtle};
	background: ${props => props.theme.colors.bg.surfaceRaised};
	color: ${props => props.theme.colors.text.primary};
	z-index: 450;

	width: ${props => (props.$rail ? '48px' : props.$expanded ? '256px' : '0px')};
	transition: width 140ms ease;

	${props =>
		props.$fixed &&
		css`
			position: sticky;
			top: 0;
			height: auto;
		`}
`

export const SideNavItemsList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`
