import { useState } from 'react'
import './App.css'

const initialWorkflows = [
  {
    id: 1,
    name: 'Lead Capture',
    description: 'Capture and qualify new leads.',
    trigger: 'New lead submitted',
    lastRun: '2 minutes ago',
    status: 'Active',
    executions: 128,
    failures: 2,
  },
  {
    id: 2,
    name: 'Client Onboarding',
    description: 'Automate new client onboarding.',
    trigger: 'New client created',
    lastRun: '15 minutes ago',
    status: 'Active',
    executions: 94,
    failures: 0,
  },
  {
    id: 3,
    name: 'Invoice Processing',
    description: 'Process incoming invoices automatically.',
    trigger: 'Invoice received',
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
  const [workflows, setWorkflows] = useState(initialWorkflows)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    trigger: '',
  })

  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesStatus =
      filter === 'All' || workflow.status === filter

    const matchesSearch = workflow.name
      .toLowerCase()
      .includes(search.toLowerCase())

    return matchesStatus && matchesSearch
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const createWorkflow = (event) => {
    event.preventDefault()

    if (!formData.name.trim()) {
      return
    }

    const newWorkflow = {
      id: Date.now(),
      name: formData.name,
      description:
        formData.description || 'No description provided.',
      trigger:
        formData.trigger || 'Manual trigger',
      lastRun: 'Not run yet',
      status: 'Active',
      executions: 0,
      failures: 0,
    }

    setWorkflows((current) => [newWorkflow, ...current])

    setFormData({
      name: '',
      description: '',
      trigger: '',
    })

    setShowForm(false)
    setFilter('All')
    setSearch('')
  }

  const toggleWorkflow = (id) => {
    setWorkflows((currentWorkflows) =>
      currentWorkflows.map((workflow) =>
        workflow.id === id
          ? {
              ...workflow,
              status:
                workflow.status === 'Active'
                  ? 'Paused'
                  : 'Active',
            }
          : workflow
      )
    )
  }

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
          <p>
            Here's what's happening with your workflows.
          </p>
        </header>

        <section className="stats">
          <div className="stat-card">
            <span>Total Workflows</span>
            <strong>{workflows.length}</strong>
          </div>

          <div className="stat-card">
            <span>Active Workflows</span>
            <strong>
              {
                workflows.filter(
                  (workflow) => workflow.status === 'Active'
                ).length
              }
            </strong>
          </div>

          <div className="stat-card">
            <span>Failed Executions</span>
            <strong>3</strong>
          </div>
        </section>

        <section className="workflows" id="workflows">
          <div className="workflow-header">
            <div>
              <h2>Workflows</h2>
              <p>
                Manage and monitor your automation workflows.
              </p>
            </div>

            <button
              className="primary-button"
              type="button"
              onClick={() => setShowForm(true)}
            >
              + Create Workflow
            </button>
          </div>

          {showForm && (
            <form
              className="workflow-form"
              onSubmit={createWorkflow}
            >
              <h3>Create Workflow</h3>

              <label>
                Workflow Name
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. New Lead Notification"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Description
                <textarea
                  name="description"
                  placeholder="What does this workflow do?"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                />
              </label>

              <label>
                Trigger
                <input
                  type="text"
                  name="trigger"
                  placeholder="e.g. New form submission"
                  value={formData.trigger}
                  onChange={handleInputChange}
                />
              </label>

              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Create Workflow
                </button>
              </div>
            </form>
          )}

          <div className="workflow-tools">
            <input
              type="search"
              placeholder="Search workflows..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            <div className="filters">
              {['All', 'Active', 'Paused'].map((status) => (
                <button
                  key={status}
                  type="button"
                  className={
                    filter === status ? 'active-filter' : ''
                  }
                  onClick={() => setFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {filteredWorkflows.length > 0 ? (
            filteredWorkflows.map((workflow) => (
              <div className="workflow-card" key={workflow.id}>
                <div>
                  <strong>{workflow.name}</strong>

                  <p>{workflow.description}</p>

                  <small>
                    Trigger: {workflow.trigger}
                  </small>

                  <small>
                    {workflow.executions} executions ·{' '}
                    {workflow.failures} failures
                  </small>

                  <small>
                    Last run: {workflow.lastRun}
                  </small>
                </div>

                <div className="workflow-actions">
                  <span
                    className={`status-badge ${workflow.status.toLowerCase()}`}
                  >
                    {workflow.status}
                  </span>

                  <button
                    className="secondary-button"
                    type="button"
                    onClick={() =>
                      toggleWorkflow(workflow.id)
                    }
                  >
                    {workflow.status === 'Active'
                      ? 'Pause'
                      : 'Activate'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-state">
              No workflows found.
            </p>
          )}
        </section>

        <section
          className="workflows"
          id="executions"
        >
          <div className="workflow-header">
            <div>
              <h2>Recent Executions</h2>
              <p>
                Monitor recent workflow activity.
              </p>
            </div>
          </div>

          {executions.map((execution) => (
            <div
              className="workflow-card"
              key={execution.id}
            >
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

        <section
          className="workflows"
          id="settings"
        >
          <div className="workflow-header">
            <div>
              <h2>Settings</h2>
              <p>FlowPilot configuration.</p>
            </div>
          </div>

          <p className="empty-state">
            Settings will be available here.
          </p>
        </section>
      </main>
    </div>
  )
}

export default App