import { useEffect, useState, memo, ReactNode } from 'react';
import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

interface CodeBlockProps {
  children: ReactNode;
  language?: string;
}

// Singleton highlighter with only the languages we need
let highlighterPromise: Promise<HighlighterCore> | null = null;

async function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [import('shiki/themes/github-dark.mjs')],
      langs: [
        import('shiki/langs/html.mjs'),
        import('shiki/langs/javascript.mjs'),
        import('shiki/langs/css.mjs'),
      ],
      engine: createJavaScriptRegexEngine(),
    });
  }
  return highlighterPromise;
}

const CodeBlock = memo(({ children, language = 'html' }: CodeBlockProps) => {
  const [html, setHtml] = useState('');
  const code = typeof children === 'string' ? children.trim() : String(children).trim();

  useEffect(() => {
    let cancelled = false;

    getHighlighter().then((highlighter) => {
      if (!cancelled) {
        const highlighted = highlighter.codeToHtml(code, {
          lang: language,
          theme: 'github-dark',
        });
        setHtml(highlighted);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  if (!html) {
    return (
      <pre className="shiki-fallback">
        <code>{code}</code>
      </pre>
    );
  }

  return <div className="shiki-wrapper" dangerouslySetInnerHTML={{ __html: html }} />;
});

CodeBlock.displayName = 'CodeBlock';

export default CodeBlock;
