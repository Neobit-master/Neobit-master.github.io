import { useEffect, useState, memo, ReactNode } from 'react';
import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  children: ReactNode;
  language?: string;
}

const CodeBlock = memo(({ children, language = 'html' }: CodeBlockProps) => {
  const [html, setHtml] = useState('');
  const code = typeof children === 'string' ? children.trim() : String(children).trim();

  useEffect(() => {
    let cancelled = false;

    codeToHtml(code, {
      lang: language,
      theme: 'github-dark',
    }).then((highlighted) => {
      if (!cancelled) {
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
