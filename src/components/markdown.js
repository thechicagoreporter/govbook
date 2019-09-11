import safeGet from 'lodash.get'
import React, { useMemo } from "react"
import styled from '@emotion/styled'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import { Link } from 'gatsby-plugin-intl'

const Container = styled.div()
const CodeSpan = styled.span`
  font-family: monospace;
`
const P = styled.p()
const ImgDiv = styled.div()

const RenderParagraph = ({ children }) => {
  const imgSrc = safeGet(children, '0.props.src', '')
  const dotPos = imgSrc.lastIndexOf('.')
  const ext = (dotPos ? imgSrc.substring(dotPos + 1) : '').toLowerCase()

  switch (ext) {
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'png':
    case 'bmp':
      return <ImgDiv>{children}</ImgDiv>
    default:
      return <P>{children}</P>
  }
}

const RenderImage = arg => {
  const { src, alt, title } = arg
  return <img src={src} alt={alt} title={title} />
}

const RenderAnchor = ({ href, title, children }) => {
  // external image links should be rendered using normal image tag
  if (!href || href.startsWith('http')) {
    return <a href={href} title={title}>{children}</a>
  } else {
    return <Link to={href} title={title}>{children}</Link>
  }
}

const RenderCode = ({ children }) => {
  return <CodeSpan>{children}</CodeSpan>
}

const Markdown = ({ markdown, className }) => {
  const output = useMemo(() => (
    unified()
      .use(parse)
      .use(remark2react, {
        remarkReactComponents: {
          p: RenderParagraph,
          img: RenderImage,
          a: RenderAnchor,
        }
      })
      .processSync(markdown).contents
  ), [ markdown ])

  return (
    <Container className={className}>{output}</Container>
  )
}

export default Markdown
