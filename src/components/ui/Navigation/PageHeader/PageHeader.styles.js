import styled, { css } from 'styled-components'

export const StyledRoot = styled.section`
  width: 100%;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

export const StyledBreadcrumbBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;

  ${props =>
    props.$border &&
    css`
      border-bottom: 1px solid ${props.theme.colors.border.subtle};
    `}
`

export const StyledBreadcrumbSlot = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex: 1 1 auto;
`

export const StyledBreadcrumbIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`

export const StyledActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
`

export const StyledContent = styled.div`
  padding: 14px 16px;
  display: grid;
  gap: 8px;
`

export const StyledTitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
`

export const StyledTitleIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  flex: 0 0 auto;
`

export const StyledTitle = styled.h1`
  margin: 0;
  font-size: 18px;
  line-height: 1.2;
  font-weight: 800;

  overflow-wrap: anywhere;
`

export const StyledSubtitle = styled.div`
  font-size: 12px;
  line-height: 1.25;
  font-weight: 700;
  color: ${props => props.theme.colors.text.secondary};
`

export const StyledBody = styled.div`
  font-size: 12px;
  line-height: 1.35;
  color: ${props => props.theme.colors.text.primary};
`

export const StyledTabBar = styled.div`
  padding: 0 16px 8px;
`

export const StyledPageActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`

export const StyledHeroImage = styled.div`
  width: 100%;
  overflow: hidden;
  border-top: 1px solid ${props => props.theme.colors.border.subtle};
  border-bottom: 1px solid ${props => props.theme.colors.border.subtle};
`

export const StyledHeroImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
`
