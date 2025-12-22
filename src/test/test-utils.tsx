import { render, type RenderOptions } from '@testing-library/react';
import { Router } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';
import type { ReactElement, ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
}

export function renderWithRouter(
  ui: ReactElement,
  { route = '/', ...options }: CustomRenderOptions = {}
) {
  const { hook } = memoryLocation({ path: route, record: true });

  function Wrapper({ children }: WrapperProps) {
    return <Router hook={hook}>{children}</Router>;
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
}

export * from '@testing-library/react';
export { renderWithRouter as render };
