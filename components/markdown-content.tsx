// @ts-nocheck

import { marked } from 'marked'
import parse, { DOMNode, domToReact } from 'html-react-parser'

// Convert Markdown to HTML with syntax highlighting
export const markdownToHtml = (markdown: string) => {
  marked.setOptions({
    gfm: true, // GitHub Flavored Markdown
    breaks: true, // Convert line breaks to <br>
    highlight: function (code: string, lang: string) {
      // You can integrate a syntax highlighter like Prism.js here
      return code
    },
  })

  return marked(markdown)
} // Individual styled components for each HTML element

// Individual styled components for each HTML element
const Paragraph = ({ children }: { children: DOMNode[] | DOMNode }) => (
  <p className="text-gray-600 leading-8 mb-6 text-lg font-normal selection:bg-blue-100/75">
    {children}
  </p>
)

const Heading1 = ({ children }: { children: DOMNode[] | DOMNode }) => (
  <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-12 mb-8 leading-tight tracking-tight">
    {children}
  </h1>
)

const Heading2 = ({ children }: { children: DOMNode[] | DOMNode }) => (
  <h2
    className="text-3xl font-bold text-gray-800 mt-12 mb-6 leading-snug tracking-tight relative
      after:content-[''] after:block after:w-20 after:h-1 after:bg-gradient-to-r after:from-blue-500/50 after:to-purple-500/50 after:mt-2 after:rounded-full"
  >
    {children}
  </h2>
)

const Heading3 = ({ children }: { children: DOMNode[] | DOMNode }) => (
  <h3 className="text-2xl font-semibold text-gray-700 mt-10 mb-4 leading-snug group">
    <span className="group-hover:text-blue-600 transition-colors duration-200 ease-in-out">
      {children}
    </span>
  </h3>
)

const UnorderedList = ({ children }: { children: DOMNode[] | DOMNode }) => (
  <ul className="list-none mb-8 space-y-3 ml-4">{children}</ul>
)

const OrderedList = ({ children }: { children: DOMNode[] | DOMNode }) => (
  <ol className="list-none mb-8 space-y-3 ml-4 counter-reset-item">{children}</ol>
)

const ListItem = ({ children }: { children: DOMNode[] | DOMNode }) => (
  <li className="text-gray-600 text-lg leading-relaxed pl-8 relative before:absolute before:left-0 before:top-[11px] before:w-3 before:h-3 before:bg-blue-100 before:rounded-full before:border before:border-blue-300 hover:before:bg-blue-200 hover:before:border-blue-400 transition-all duration-200">
    {children}
  </li>
)

const BlockQuote = ({ children }: { children: DOMNode[] | DOMNode }) => (
  <blockquote className="relative my-12 px-8 py-6 text-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-[inset_0_0_1px_rgba(0,0,0,0.1)] border border-blue-100/50">
    <span className="absolute text-6xl text-blue-300/20 font-serif -top-4 -left-2">"</span>
    <div className="relative z-10 italic">{children}</div>
  </blockquote>
)

const CodeBlock = ({ children }: { children: DOMNode[] | DOMNode }) => (
  <pre
    className="bg-gray-900 p-8 rounded-xl overflow-x-auto mb-8 text-gray-100 shadow-lg relative
      after:content-[''] after:absolute after:top-0 after:right-0 after:w-40 after:h-full 
      after:bg-gradient-to-l after:from-gray-900 after:to-transparent after:pointer-events-none"
  >
    <div className="absolute top-4 left-4 flex space-x-2">
      <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
      <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
    </div>
    <code className="text-sm font-mono leading-relaxed block pt-6">{children}</code>
  </pre>
)

const InlineCode = ({ children }: { children: DOMNode[] | DOMNode }) => (
  <code className="bg-blue-50 px-2.5 py-1 rounded-md text-sm font-mono text-blue-600 border border-blue-100 shadow-sm">
    {children}
  </code>
)

const Link = ({ href, children }: { href: string; children: DOMNode[] | DOMNode }) => (
  <a
    href={href}
    className="text-blue-600 hover:text-blue-700 font-medium relative inline-block 
      after:content-[''] after:absolute after:w-full after:h-px after:bottom-0 after:left-0
      after:bg-blue-300 hover:after:h-[3px] after:transition-all after:duration-200
      hover:after:bg-blue-500"
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
)

// Options for the HTML parser
const options = {
  replace: ({
    name,
    attribs,
    children,
  }: {
    name: string
    attribs: any
    children: DOMNode[] | DOMNode
  }) => {
    switch (name) {
      case 'p':
        return <Paragraph>{domToReact(children, options)}</Paragraph>
      case 'h1':
        return <Heading1>{domToReact(children, options)}</Heading1>
      case 'h2':
        return <Heading2>{domToReact(children, options)}</Heading2>
      case 'h3':
        return <Heading3>{domToReact(children, options)}</Heading3>
      case 'ul':
        return <UnorderedList>{domToReact(children, options)}</UnorderedList>
      case 'ol':
        return <OrderedList>{domToReact(children, options)}</OrderedList>
      case 'li':
        return <ListItem>{domToReact(children, options)}</ListItem>
      case 'blockquote':
        return <BlockQuote>{domToReact(children, options)}</BlockQuote>
      case 'pre':
        return <CodeBlock>{domToReact(children, options)}</CodeBlock>
      case 'code':
        // Only use InlineCode if it's not inside a pre tag
        if (children[0]?.parent?.name !== 'pre') {
          return <InlineCode>{domToReact(children, options)}</InlineCode>
        }
        return null
      case 'a':
        return <Link href={attribs.href}>{domToReact(children, options)}</Link>
    }
  },
}

// Main component that receives HTML content
export default function MdContentBlock({ content }) {
  if (!content) return null

  const htmlContent = markdownToHtml(content)

  return <article className="max-w-3xl mx-auto">{parse(htmlContent, options)}</article>
}
