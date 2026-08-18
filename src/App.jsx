import './App.css'

const workflows = [
  {
    id: 1,
    name: 'Lead Capture',
    lastRun: '2 minutes ago',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Client Onboarding',
    lastRun: '15 minutes ago',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Invoice Processing',
    lastRun: '1 hour ago',
    status: 'Paused',
  },
]

function App() {
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
          <h2>Recent Workflows</h2>

          {workflows.map((workflow) => (
            <div className="workflow-card" key={workflow.id}>
              <div>
                <strong>{workflow.name}</strong>
                <p>Last run {workflow.lastRun}</p>
              </div>

              <span>{workflow.status}</span>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default App