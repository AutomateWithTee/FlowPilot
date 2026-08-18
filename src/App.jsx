import './App.css'

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

          <div className="workflow-card">
            <div>
              <strong>Lead Capture</strong>
              <p>Last run 2 minutes ago</p>
            </div>
            <span>Active</span>
          </div>

          <div className="workflow-card">
            <div>
              <strong>Client Onboarding</strong>
              <p>Last run 15 minutes ago</p>
            </div>
            <span>Active</span>
          </div>

          <div className="workflow-card">
            <div>
              <strong>Invoice Processing</strong>
              <p>Last run 1 hour ago</p>
            </div>
            <span>Paused</span>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App