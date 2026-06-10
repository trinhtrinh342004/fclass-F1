import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";

type AuthErrorBoundaryState = {
  error: Error | null;
};

export default class AuthErrorBoundary extends Component<
  { children: ReactNode },
  AuthErrorBoundaryState
> {
  state: AuthErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): AuthErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[AuthErrorBoundary]", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="min-h-screen grid place-items-center bg-slate-50 px-4">
          <section className="max-w-lg rounded-lg border bg-white p-6 shadow-sm">
            <h1 className="text-xl font-semibold text-slate-950">Có lỗi auth/router</h1>
            <p className="mt-2 text-sm text-slate-600">{this.state.error.message}</p>
            <button
              className="mt-4 rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white"
              onClick={() => this.setState({ error: null })}
            >
              Thử lại
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
