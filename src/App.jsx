import { useState } from 'react'
import './App.css'

const workflows = [
  {
    id: 1,
    name: 'Lead Capture',
    lastRun: '2 minutes ago',
    status: 'Active',
    executions: 128,
    failures: 2,
  },
  {
    id: 2,
    name: 'Client Onboarding',
    lastRun: '15 minutes ago',
    status: 'Active',
    executions: 94,
    failures: 0,
  },
  {
    id: 3,
    name: 'Invoice Processing',
    lastRun: '1 hour ago',
    status: 'Paused',
    executions: 67,
    failures: 4,
  },
]

function App() {
  const [filter, setFilter] = useState('All')

  const filteredWorkflows =
    filter === 'All'
      ? workflows
      : workflows.filter((workflow) => workflow.status === filter)

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>FlowPilot</h2>

        <nav>
          <a href="/">Dashboard</a>
          <a href="/">Workflows</a>
          <a href="/">Executions</a>
          <a href="/">Settings</a>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Good afternoon, Thelma</h1>
          <p>Here's what's happening with your workflows.</p>
        </header>

        <section className="stats">
          <div className="stat-card">
            <span>Total Workflows</span>
            <strong>12</strong>
          </div>

          <div className="stat-card">
            <span>Active Workflows</span>
            <strong>9</strong>
          </div>

          <div className="stat-card">
            <span>Failed Executions</span>
            <strong>3</strong>
          </div>
        </section>

        <section className="workflows">
          <div className="workflow-header">
            <h2>Recent Workflows</h2>

            <div className="filters">
              {['All', 'Active', 'Paused'].map((status) => (
                <button
                  key={status}
                  type="button"
                  className={filter === status ? 'active-filter' : ''}
                  onClick={() => setFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {filteredWorkflows.map((workflow) => (
            <div className="workflow-card" key={workflow.id}>
              <div>
                <strong>{workflow.name}</strong>
                <p>Last run {workflow.lastRun}</p>
                <small>
                  {workflow.executions} executions · {workflow.failures} failures
                </small>
              </div>

              <span className={`status-badge ${workflow.status.toLowerCase()}`}>
                {workflow.status}
              </span>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default App