import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../api/api';
import { useAuth } from '../auth/authContext';
import './Metrics.css';

async function fetchResponses(token) {
  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : undefined;
  const { data: responses } = await axiosInstance.get(
    '/api/middleware/responses',
    config
  );
  if (!Array.isArray(responses)) {
    throw new Error('Invalid middleware responses: expected an array.');
  }

  return responses;
}

export default function Metrics() {
  const { token, isDevLogin } = useAuth();
  const {
    data: responses = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ['middleware', 'responses', token, isDevLogin],
    queryFn: () => fetchResponses(token),
    retry: false,
  });

  const successfulCount = responses.filter(
    ({ rc }) => Number(rc) >= 200 && Number(rc) < 300
  ).length;
  const failedCount = responses.length - successfulCount;

  if (isLoading) {
    return (
      <main className="metrics-page">
        <p>Loading middleware metrics...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="metrics-page" role="alert">
        <div className="metrics-heading">
          <div>
            <p className="metrics-eyebrow">Middleware</p>
            <h1>Response metrics</h1>
          </div>
          <button type="button" className="metrics-refresh" onClick={() => refetch()}>
            Retry
          </button>
        </div>
        <section className="metrics-error">
          <h2>Unable to load responses</h2>
          <p>{error instanceof Error ? error.message : String(error)}</p>
          {error instanceof Error && error.stack && <pre>{error.stack}</pre>}
        </section>
      </main>
    );
  }

  return (
    <main className="metrics-page">
      <div className="metrics-heading">
        <div>
          <p className="metrics-eyebrow">Middleware</p>
          <h1>Response metrics</h1>
        </div>
        <button
          type="button"
          className="metrics-refresh"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="metrics-summary">
        <article className="metrics-card">
          <span>Total requests</span>
          <strong>{responses.length}</strong>
        </article>
        <article className="metrics-card">
          <span>Successful (2xx)</span>
          <strong>{successfulCount}</strong>
        </article>
        <article className="metrics-card">
          <span>Non-2xx responses</span>
          <strong>{failedCount}</strong>
        </article>
      </div>

      <section className="metrics-table-section">
        <h2>Recent responses</h2>
        {responses.length === 0 ? (
          <p className="metrics-empty">No middleware responses recorded yet.</p>
        ) : (
          <div className="metrics-table-wrapper">
            <table className="metrics-table">
              <thead>
                <tr>
                  <th scope="col">Request ID</th>
                  <th scope="col">API</th>
                  <th scope="col">Method</th>
                  <th scope="col">Response code</th>
                  <th scope="col">Status</th>
                  <th scope="col">Called at</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((item, index) => {
                  const code = Number(item.rc);
                  const isSuccessful = code >= 200 && code < 300;

                  return (
                    <tr key={item.requestID ?? `${item.requestAPI}-${item.CalledAT}-${index}`}>
                      <td>{item.requestID ?? '—'}</td>
                      <td className="metrics-api">{item.requestAPI || '—'}</td>
                      <td>{item.Method || '—'}</td>
                      <td>
                        <span className={`metrics-code ${isSuccessful ? 'success' : 'failure'}`}>
                          {item.rc ?? '—'}
                        </span>
                      </td>
                      <td>{item.status || '—'}</td>
                      <td>
                        {item.CalledAT
                          ? new Date(item.CalledAT).toLocaleString()
                          : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
