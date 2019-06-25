import * as Marked from 'marked'
import * as hljs from 'highlight.js'
import { IToc } from './article.entity'

const renderer = new Marked.Renderer()

Marked.setOptions({
  highlight: function(code: string, lang: string) {
    if (hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code).value
    } else {
      return hljs.highlightAuto(code).value
    }
  },
  renderer,
})

export const marked = (content: string): { html: string; toc: Array<IToc> } => {
  const toc: Array<IToc> = []

  renderer.heading = function(text: string, level: number) {
    let anchor = 'heading-' + toc.length

    toc.push({
      level: level,
      anchor: anchor,
      title: text,
    })
    return `<h${level} id="${anchor}">${text}</h${level}>`
  }

  const marked = (text: string) => {
    var tok = Marked.lexer(text)
    text = Marked.parser(tok).replace(/<pre>/gi, '<pre class="hljs">')
    return text
  }

  let html = marked(content)
  return { html, toc }
}
