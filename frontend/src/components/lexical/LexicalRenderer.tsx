import React, { memo, lazy, Suspense } from 'react'
import { buildTextStyles } from '../../lib/lexical-styles'

// Lazy load syntax highlighter to reduce bundle size
const SyntaxHighlighter = lazy(() =>
  import('react-syntax-highlighter').then((mod) => ({
    default: mod.Prism,
  }))
)

interface LexicalNode {
  type: string
  version?: number
  [key: string]: any
}

interface LexicalRendererProps {
  content: {
    root: {
      children: LexicalNode[]
      [key: string]: any
    }
  }
}

export function LexicalRenderer({ content }: LexicalRendererProps) {
  if (!content?.root?.children) {
    return <div className="text-gray-500 text-center py-12">No content available</div>
  }

  return (
    <div className="lexical-content prose prose-lg lg:prose-xl max-w-none">
      {content.root.children.map((node, index) => (
        <LexicalNode key={index} node={node} />
      ))}
    </div>
  )
}

const LexicalNode = memo(({ node }: { node: LexicalNode }) => {
  // Handle block types (custom Payload blocks)
  if (node.type === 'block' && node.fields) {
    return <BlockNode fields={node.fields} />
  }

  // Handle standard Lexical nodes
  switch (node.type) {
    case 'paragraph':
      return <ParagraphNode node={node} />
    case 'heading':
      return <HeadingNode node={node} />
    case 'list':
      return <ListNode node={node} />
    case 'listitem':
      return <ListItemNode node={node} />
    case 'quote':
      return <QuoteNode node={node} />
    case 'code':
      return <CodeNode node={node} />
    case 'text':
      return <TextNode node={node} />
    case 'linebreak':
      return <br />
    case 'link':
      return <LinkNode node={node} />
    default:
      return null
  }
})

const TextNode = memo(({ node }: { node: LexicalNode }) => {
  let text = node.text || ''
  let element: React.ReactNode = text

  // Handle text formatting with bitwise flags
  if (node.format) {
    const format = node.format

    // Apply formatting in correct order
    if (format & 16) element = <code className="font-mono text-sm bg-gray-100 px-1 rounded">{element}</code> // Code
    if (format & 1) element = <strong className="font-bold">{element}</strong> // Bold
    if (format & 2) element = <em className="italic">{element}</em> // Italic
    if (format & 8) element = <u className="underline">{element}</u> // Underline
    if (format & 4) element = <s className="line-through">{element}</s> // Strikethrough
    if (format & 32) element = <sub className="text-xs">{element}</sub> // Subscript
    if (format & 64) element = <sup className="text-xs">{element}</sup> // Superscript
  }

  // Handle text state (color, background, fontSize)
  if (node.state) {
    const styles = buildTextStyles(node.state)

    // Only wrap in span if there are styles to apply
    if (Object.keys(styles).length > 0) {
      element = <span style={styles}>{element}</span>
    }
  }

  return <>{element}</>
})

const ParagraphNode = memo(({ node }: { node: LexicalNode }) => {
  if (!node.children || node.children.length === 0) {
    return <p className="my-5">&nbsp;</p>
  }

  return (
    <p className="my-5 leading-[1.75] text-gray-800 text-base md:text-lg">
      {node.children.map((child: LexicalNode, index: number) => (
        <LexicalNode key={index} node={child} />
      ))}
    </p>
  )
})

const HeadingNode = memo(({ node }: { node: LexicalNode }) => {
  const Tag = (node.tag || 'h2') as keyof JSX.IntrinsicElements
  const classNames = {
    h1: 'text-3xl md:text-4xl font-bold mt-12 mb-5 text-gray-900 tracking-tight scroll-mt-24',
    h2: 'text-2xl md:text-3xl font-bold mt-10 mb-4 text-gray-900 tracking-tight scroll-mt-24',
    h3: 'text-xl md:text-2xl font-semibold mt-8 mb-3 text-gray-900 tracking-tight scroll-mt-24',
    h4: 'text-lg md:text-xl font-semibold mt-7 mb-3 text-gray-900 scroll-mt-24',
    h5: 'text-base md:text-lg font-semibold mt-6 mb-2 text-gray-900 scroll-mt-24',
    h6: 'text-base font-semibold mt-5 mb-2 text-gray-900 scroll-mt-24',
  }

  return (
    <Tag className={classNames[Tag as keyof typeof classNames] || classNames.h2}>
      {node.children?.map((child: LexicalNode, index: number) => (
        <LexicalNode key={index} node={child} />
      ))}
    </Tag>
  )
})

const ListNode = memo(({ node }: { node: LexicalNode }) => {
  const Tag = node.tag === 'ol' ? 'ol' : 'ul'
  const className = Tag === 'ol'
    ? 'list-decimal list-inside my-4 space-y-2'
    : 'list-disc list-inside my-4 space-y-2'

  return (
    <Tag className={className} style={{ marginLeft: `${(node.indent || 0) * 2}rem` }}>
      {node.children?.map((child: LexicalNode, index: number) => (
        <LexicalNode key={index} node={child} />
      ))}
    </Tag>
  )
})

const ListItemNode = memo(({ node }: { node: LexicalNode }) => {
  return (
    <li className="ml-4">
      {node.children?.map((child: LexicalNode, index: number) => (
        <LexicalNode key={index} node={child} />
      ))}
    </li>
  )
})

const QuoteNode = memo(({ node }: { node: LexicalNode }) => {
  return (
    <blockquote className="border-l-4 border-blue-500 pl-6 py-3 my-7 italic text-gray-700 text-lg bg-blue-50/40 rounded-r-lg">
      {node.children?.map((child: LexicalNode, index: number) => (
        <LexicalNode key={index} node={child} />
      ))}
    </blockquote>
  )
})

const CodeNode = memo(({ node }: { node: LexicalNode }) => {
  const code = node.children?.map((c: any) => c.text).join('') || ''

  return (
    <div className="my-4">
      <Suspense fallback={<pre className="p-4 bg-gray-900 text-white rounded-lg overflow-auto"><code>{code}</code></pre>}>
        <SyntaxHighlighter
          language={node.language || 'text'}
          style={{}}
          customStyle={{ borderRadius: '0.5rem' }}
        >
          {code}
        </SyntaxHighlighter>
      </Suspense>
    </div>
  )
})

const LinkNode = memo(({ node }: { node: LexicalNode }) => {
  return (
    <a
      href={node.url}
      target={node.target || '_self'}
      rel={node.rel}
      className="text-blue-600 hover:text-blue-700 underline decoration-1 underline-offset-2 transition-colors"
    >
      {node.children?.map((child: LexicalNode, index: number) => (
        <LexicalNode key={index} node={child} />
      ))}
    </a>
  )
})

// Handle Payload custom blocks
function BlockNode({ fields }: { fields: any }) {
  const blockType = fields.blockType

  switch (blockType) {
    case 'image':
      return <ImageBlock fields={fields} />
    case 'callout':
      return <CalloutBlock fields={fields} />
    case 'table':
      return <TableBlock fields={fields} />
    case 'accordion':
      return <AccordionBlock fields={fields} />
    case 'quote':
    case 'blockQuote':
      return <QuoteBlock fields={fields} />
    default:
      console.warn(`Unknown block type: ${blockType}`)
      return null
  }
}

function ImageBlock({ fields }: { fields: any }) {
  const image = fields.image

  if (!image || !image.url) return null

  return (
    <figure className={`my-10 ${fields.position === 'center' ? 'text-center' : ''}`}>
      <img
        src={image.url}
        alt={image.alt || fields.caption || ''}
        loading="lazy"
        className="rounded-xl shadow-md max-w-full h-auto hover:shadow-lg transition-shadow duration-300"
      />
      {fields.caption && (
        <figcaption className="mt-3 text-sm text-gray-600 italic text-center">
          {fields.caption}
        </figcaption>
      )}
    </figure>
  )
}

function CalloutBlock({ fields }: { fields: any }) {
  const typeStyles = {
    info: 'bg-blue-50 border-blue-500 text-blue-900',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-900',
    error: 'bg-red-50 border-red-500 text-red-900',
    success: 'bg-green-50 border-green-500 text-green-900',
  }

  const type = fields.type || 'info'
  const className = typeStyles[type as keyof typeof typeStyles] || typeStyles.info

  return (
    <div className={`border-l-4 p-6 my-8 rounded-r-xl ${className}`}>
      {fields.title && (
        <h4 className="font-bold mb-3 text-lg">{fields.title}</h4>
      )}
      <p className="leading-relaxed">{fields.content}</p>
    </div>
  )
}

function TableBlock({ fields }: { fields: any }) {
  return (
    <div className="my-8 overflow-x-auto">
      <table className={`w-full border-collapse ${fields.bordered ? 'border border-gray-300' : ''}`}>
        {fields.headers && (
          <thead className="bg-gray-100">
            <tr>
              {/* Handle both string[] and object[] formats for headers */}
              {fields.headers.map((header: any, i: number) => (
                <th key={i} className="border px-4 py-2 text-left font-semibold">
                  {typeof header === 'string' ? header : header.header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {fields.rows?.map((row: any, rowIndex: number) => (
            <tr key={row.id || rowIndex} className={fields.striped && rowIndex % 2 === 1 ? 'bg-gray-50' : ''}>
              {/* Handle both string[] and object[] formats for rows */}
              {Array.isArray(row)
                ? row.map((cell: string, j: number) => (
                    <td key={j} className="border px-4 py-2">
                      {cell}
                    </td>
                  ))
                : row.cells?.map((cell: any) => (
                    <td key={cell.id} className="border px-4 py-2">
                      {cell.content}
                    </td>
                  ))
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function AccordionBlock({ fields }: { fields: any }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="my-8 space-y-4">
      {fields.items?.map((item: any, index: number) => (
        <div key={index} className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-4 py-3 text-left font-semibold flex justify-between items-center hover:bg-gray-50"
          >
            {item.title}
            <span>{openIndex === index ? '−' : '+'}</span>
          </button>
          {openIndex === index && (
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function QuoteBlock({ fields }: { fields: any }) {
  return (
    <blockquote className="border-l-4 border-gray-400 pl-6 italic my-8 text-lg">
      <p className="text-gray-800">"{fields.quote}"</p>
      {fields.author && (
        <footer className="text-sm text-gray-600 mt-3 not-italic">
          — {fields.author}
          {fields.authorTitle && `, ${fields.authorTitle}`}
        </footer>
      )}
    </blockquote>
  )
}
