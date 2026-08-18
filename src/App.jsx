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

const executions = [
  {
    id: 1,
    workflow: 'Lead Capture',
    time: '2 minutes ago',
    status: 'Success',
  },
  {
    id: 2,
    workflow: 'Client Onboarding',
    time: '15 minutes ago',
    status: 'Success',
  },
  {
    id: 3,
    workflow: 'Invoice Processing',
    time: '1 hour ago',
    status: 'Failed',
  },
  {
    id: 4,
    workflow: 'Lead Capture',
    time: '2 hours ago',
    status: 'Success',
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
          <a href="#dashboard">Dashboard</a>
          <a href="#workflows">Workflows</a>
          <a href="#executions">Executions</a>
          <a href="#settings">Settings</a>
        </nav>
      </aside>

      <main className="main-content" id="dashboard">
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

        <section className="workflows" id="workflows">
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

              <span
                className={`status-badge ${workflow.status.toLowerCase()}`}
              >
                {workflow.status}
              </span>
            </div>
          ))}
        </section>

        <section className="workflows executions-section" id="executions">
          <div className="workflow-header">
            <h2>Recent Executions</h2>
          </div>

          {executions.map((execution) => (
            <div className="workflow-card" key={execution.id}>
              <div>
                <strong>{execution.workflow}</strong>
                <p>{execution.time}</p>
              </div>

              <span
                className={`status-badge ${execution.status.toLowerCase()}`}
              >
                {execution.status}
              </span>
            </div>
          ))}
        </section>

        <section className="workflows settings-section" id="settings">
          <div className="workflow-header">
            <h2>Settings</h2>
          </div>

          <p className="empty-state">
            FlowPilot settings will be available here.
          </p>
        </section>
      </main>
    </div>
  )
}

export default App