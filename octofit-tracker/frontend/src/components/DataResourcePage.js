import { useEffect, useMemo, useState } from 'react';
import { buildApiEndpoint, normalizeApiData } from './api';

function DataResourcePage({
  endpoint,
  endpointTemplate,
  resource,
  title,
  description,
  columns,
  emptyMessage,
  detailsTitle,
}) {
  const resolvedEndpoint = endpoint || buildApiEndpoint(resource);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      console.log(`[${title}] REST API endpoint:`, resolvedEndpoint);

      try {
        setLoading(true);
        const response = await fetch(resolvedEndpoint);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        console.log(`[${title}] fetched data:`, payload);
        setItems(normalizeApiData(payload));
        setError('');
      } catch (fetchError) {
        console.error(`[${title}] fetch error:`, fetchError);
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, [resolvedEndpoint, title]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter(item =>
      columns.some(column => {
        const value = item[column.key];
        return String(value ?? '').toLowerCase().includes(normalizedQuery);
      })
    );
  }, [columns, items, query]);

  return (
    <>
      <section className="card data-panel shadow-sm">
        <div className="card-body p-4 p-lg-5">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-start gap-3 mb-4">
            <div>
              <h2 className="h2 mb-2">{title}</h2>
              <p className="text-secondary mb-0">{description}</p>
            </div>
            <div className="d-flex flex-column align-items-lg-end gap-2">
              <span className="badge rounded-pill endpoint-badge px-3 py-2">{resolvedEndpoint}</span>
              {endpointTemplate && (
                <span className="small text-secondary text-break text-lg-end">
                  Codespace pattern: {endpointTemplate}
                </span>
              )}
              <a
                className="btn btn-outline-primary btn-sm"
                href={resolvedEndpoint}
                target="_blank"
                rel="noreferrer"
              >
                Open REST endpoint
              </a>
            </div>
          </div>

          <div className="table-toolbar p-3 p-md-4 mb-4">
            <form className="row g-3 align-items-end" onSubmit={event => event.preventDefault()}>
              <div className="col-md-7 col-lg-8">
                <label className="form-label fw-semibold" htmlFor={`${resource}-search`}>
                  Search records
                </label>
                <input
                  id={`${resource}-search`}
                  className="form-control table-search-input"
                  type="search"
                  placeholder={`Search ${title.toLowerCase()}`}
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                />
              </div>
              <div className="col-md-5 col-lg-4">
                <div className="d-flex gap-2 justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => window.location.reload()}
                  >
                    Refresh view
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setQuery('')}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="h5 mb-0">{title} table</h3>
            <span className="badge rounded-pill table-count-badge px-3 py-2">
              {filteredItems.length} shown
            </span>
          </div>

          {loading && <div className="alert alert-info mb-0">Loading {title.toLowerCase()}...</div>}
          {!loading && error && <div className="alert alert-danger mb-0">{error}</div>}

          {!loading && !error && filteredItems.length === 0 && (
            <div className="empty-state p-4 text-center text-secondary">{emptyMessage}</div>
          )}

          {!loading && !error && filteredItems.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle data-table mb-0">
                <thead>
                  <tr>
                    {columns.map(column => (
                      <th key={column.key} scope="col">
                        {column.label}
                      </th>
                    ))}
                    <th className="table-actions" scope="col">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr key={item.id ?? item._id ?? `${resource}-${index}`}>
                      {columns.map(column => (
                        <td key={column.key}>{column.render ? column.render(item) : item[column.key] ?? 'N/A'}</td>
                      ))}
                      <td className="table-actions">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => setSelectedItem(item)}
                        >
                          View details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {selectedItem && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg">
                <div className="modal-header">
                  <div>
                    <h4 className="modal-title mb-1">{detailsTitle}</h4>
                    <p className="text-secondary mb-0 small">Detailed record preview</p>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedItem(null)}
                  />
                </div>
                <div className="modal-body">
                  <dl className="row detail-list mb-0">
                    {columns.map(column => (
                      <div className="col-md-6" key={column.key}>
                        <dt>{column.label}</dt>
                        <dd>{column.render ? column.render(selectedItem) : selectedItem[column.key] ?? 'N/A'}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setSelectedItem(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelectedItem(null)} />
        </>
      )}
    </>
  );
}

export default DataResourcePage;