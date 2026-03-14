"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="text-6xl mb-4">&#9888;&#65039;</div>
          <h1 className="text-2xl font-bold font-mono text-[var(--accent)] mb-2">
            Something went wrong
          </h1>
          <p className="text-[var(--text-dim)] mb-6 text-center max-w-md">
            An unexpected error occurred. This might be a temporary issue — try
            again or head back to the home page.
          </p>
          <div className="flex gap-3">
            <button
              onClick={this.handleReset}
              className="px-6 py-3 bg-[var(--accent)] text-black font-semibold rounded-lg hover:brightness-110 transition-all"
            >
              Try Again
            </button>
            <a
              href="/"
              className="px-6 py-3 border border-[var(--card-border)] text-[var(--text-dim)] font-semibold rounded-lg hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
            >
              Go Home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
