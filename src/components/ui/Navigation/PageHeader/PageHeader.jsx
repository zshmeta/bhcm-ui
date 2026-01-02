import React from 'react'
import {
  StyledActions,
  StyledBody,
  StyledBreadcrumbBar,
  StyledBreadcrumbIcon,
  StyledBreadcrumbSlot,
  StyledContent,
  StyledHeroImage,
  StyledHeroImg,
  StyledPageActions,
  StyledRoot,
  StyledSubtitle,
  StyledTabBar,
  StyledTitle,
  StyledTitleIcon,
  StyledTitleRow,
} from './PageHeader.styles'

export function PageHeaderRoot({ children, className, ...rest }) {
  return (
    <StyledRoot className={className} {...rest}>
      {children}
    </StyledRoot>
  )
}

export function PageHeaderBreadcrumbBar({
  children,
  border = true,
  renderIcon: RenderIcon,
  pageActions,
  contentActions,
  className,
  ...rest
}) {
  return (
    <StyledBreadcrumbBar className={className} $border={!!border} {...rest}>
      <StyledBreadcrumbSlot>
        {RenderIcon ? (
          <StyledBreadcrumbIcon aria-hidden="true">
            <RenderIcon />
          </StyledBreadcrumbIcon>
        ) : null}
        {children}
      </StyledBreadcrumbSlot>
      {contentActions ? <StyledActions>{contentActions}</StyledActions> : null}
      {pageActions ? <StyledActions>{pageActions}</StyledActions> : null}
    </StyledBreadcrumbBar>
  )
}

export function PageHeaderContent({
  title,
  renderIcon: RenderIcon,
  children,
  pageActions,
  className,
  ...rest
}) {
  return (
    <StyledContent className={className} {...rest}>
      <StyledTitleRow>
        {RenderIcon ? (
          <StyledTitleIcon aria-hidden="true">
            <RenderIcon />
          </StyledTitleIcon>
        ) : null}
        <div style={{ minWidth: 0, flex: '1 1 auto' }}>
          <StyledTitle>{title}</StyledTitle>
        </div>
        {pageActions ? <StyledPageActions>{pageActions}</StyledPageActions> : null}
      </StyledTitleRow>
      {children}
    </StyledContent>
  )
}

export function PageHeaderContentText({ subtitle, children, className, ...rest }) {
  return (
    <div className={className} {...rest}>
      {subtitle ? <StyledSubtitle>{subtitle}</StyledSubtitle> : null}
      <StyledBody>{children}</StyledBody>
    </div>
  )
}

export function PageHeaderContentPageActions({ children, className, ...rest }) {
  return (
    <StyledPageActions className={className} {...rest}>
      {children}
    </StyledPageActions>
  )
}

export function PageHeaderTabBar({ children, className, ...rest }) {
  return (
    <StyledTabBar className={className} {...rest}>
      {children}
    </StyledTabBar>
  )
}

export function PageHeaderHeroImage({ alt = '', src, className, ...rest }) {
  if (!src) return null
  return (
    <StyledHeroImage className={className} {...rest}>
      <StyledHeroImg src={src} alt={alt} />
    </StyledHeroImage>
  )
}

export default function PageHeader(props) {
  return <PageHeaderRoot {...props} />
}

PageHeader.Root = PageHeaderRoot
PageHeader.BreadcrumbBar = PageHeaderBreadcrumbBar
PageHeader.Content = PageHeaderContent
PageHeader.TabBar = PageHeaderTabBar
PageHeader.ContentText = PageHeaderContentText
PageHeader.ContentPageActions = PageHeaderContentPageActions
PageHeader.HeroImage = PageHeaderHeroImage

PageHeader.displayName = 'PageHeader'
