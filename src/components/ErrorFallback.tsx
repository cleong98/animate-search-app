interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card bg-base-100 shadow-xl max-w-md">
        <div className="card-body">
          <h2 className="card-title text-error">⚠️ Something went wrong</h2>

          <p className="text-sm text-gray-600">
            An unexpected error occurred. This has been logged.
          </p>

          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary" onClick={resetErrorBoundary}>
              Try Again
            </button>

            <button
              className="btn btn-ghost"
              onClick={() => (window.location.href = "/")}
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorFallback;
