import { useState } from "react"

function App() {
  const [message, setMessage] = useState("")
  const [selectedAgent, setSelectedAgent] = useState("Auto")
  const [tasks, setTasks] = useState([])
  const [activePage, setActivePage] = useState("Dashboard")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const agents = [
    {
      icon: "◈",
      name: "Research Agent",
      description: "Deep research & intelligent analysis",
    },
    {
      icon: "◉",
      name: "Reader Agent",
      description: "Reads and extracts useful web content",
    },
    {
      icon: "◇",
      name: "Writer Agent",
      description: "Creates structured research reports",
    },
    {
      icon: "✦",
      name: "Critic Agent",
      description: "Reviews reports and gives feedback",
    },
  ]

  const runTask = async () => {
    if (!message.trim() || loading) return

    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://127.0.0.1:8000/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: message,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Something went wrong")
      }

      const newTask = {
        id: Date.now(),
        text: message,
        agent: selectedAgent,
        time: "Just now",
        report: data.report,
        feedback: data.feedback,
      }

      setTasks((oldTasks) => [newTask, ...oldTasks])
      setMessage("")
    } catch (err) {
      console.error(err)
      setError(err.message || "Backend se connection nahi ho pa raha.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#06070a] text-white">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[-15%] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute right-[5%] top-[20%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      {/* Navbar */}
      <header className="relative z-20 flex h-20 items-center justify-between border-b border-white/10 bg-black/20 px-5 backdrop-blur-xl md:px-8">

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-xl text-violet-300">
            ✦
          </div>

          <div>
            <h1 className="font-semibold tracking-widest">
              NEXUS
            </h1>

            <p className="text-[9px] tracking-[0.35em] text-slate-500">
              MULTI-AGENT SYSTEM
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/5 px-4 py-2 text-xs text-slate-400 md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            System Online
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            ⚙
          </button>
        </div>

      </header>

      <div className="relative z-10 flex">

        {/* Sidebar */}
        <aside className="hidden min-h-[calc(100vh-80px)] w-64 border-r border-white/10 bg-black/10 p-5 md:block">

          <p className="mb-4 px-3 text-[10px] font-semibold tracking-[0.25em] text-slate-600">
            WORKSPACE
          </p>

          <div className="space-y-2">

            <button
              onClick={() => setActivePage("Dashboard")}
              className={
                activePage === "Dashboard"
                  ? "flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white"
                  : "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-500 hover:bg-white/5 hover:text-white"
              }
            >
              <span>⌂</span>
              Dashboard
            </button>

            <button
              onClick={() => setActivePage("Conversations")}
              className={
                activePage === "Conversations"
                  ? "flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white"
                  : "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-500 hover:bg-white/5 hover:text-white"
              }
            >
              <span>◌</span>
              Conversations
            </button>

            <button
              onClick={() => setActivePage("AI Agents")}
              className={
                activePage === "AI Agents"
                  ? "flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white"
                  : "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-500 hover:bg-white/5 hover:text-white"
              }
            >
              <span>✦</span>
              AI Agents
            </button>

            <button
              onClick={() => setActivePage("Tools")}
              className={
                activePage === "Tools"
                  ? "flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white"
                  : "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-500 hover:bg-white/5 hover:text-white"
              }
            >
              <span>⌘</span>
              Tools
            </button>

          </div>

          <p className="mb-4 mt-10 px-3 text-[10px] font-semibold tracking-[0.25em] text-slate-600">
            SYSTEM
          </p>

          <div className="space-y-2">

            <button
              onClick={() => setActivePage("Activity")}
              className={
                activePage === "Activity"
                  ? "flex w-full items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm text-white"
                  : "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-500 hover:bg-white/5 hover:text-white"
              }
            >
              <span>◫</span>
              Activity
            </button>

            <button
              onClick={() => setActivePage("Settings")}
              className={
                activePage === "Settings"
                  ? "flex w-full items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm text-white"
                  : "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-500 hover:bg-white/5 hover:text-white"
              }
            >
              <span>⚙</span>
              Settings
            </button>

          </div>

          {/* System Load */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-4">

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                SYSTEM LOAD
              </span>

              <span className="text-xs text-emerald-400">
                {loading ? "PROCESSING" : "24%"}
              </span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
              <div
                className={
                  loading
                    ? "h-full w-[75%] animate-pulse rounded-full bg-violet-400"
                    : "h-full w-[24%] rounded-full bg-violet-400"
                }
              />
            </div>

          </div>

        </aside>

        {/* Main */}
        <main className="relative flex-1 px-5 py-8 md:px-10">

          <div className="mx-auto max-w-7xl">

            {/* Hero */}
            <section className="mb-10">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/10 bg-violet-400/5 px-3 py-1.5 text-xs text-violet-300">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                Autonomous AI workspace
              </div>

              <h2 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                Intelligence that
                <span className="block bg-gradient-to-r from-violet-300 via-white to-cyan-300 bg-clip-text text-transparent">
                  works together.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
                Coordinate multiple specialized AI agents to research,
                analyze, write and review complex tasks from one intelligent
                workspace.
              </p>

            </section>

            {/* Stats */}
            <section className="mb-10 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <p className="text-[10px] tracking-[0.2em] text-slate-600">
                  ACTIVE AGENTS
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  04
                </p>
                <p className="mt-1 text-xs text-emerald-400">
                  All systems online
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <p className="text-[10px] tracking-[0.2em] text-slate-600">
                  TASKS PROCESSED
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {128 + tasks.length}
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  This workspace
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <p className="text-[10px] tracking-[0.2em] text-slate-600">
                  SYSTEM STATUS
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  99.9%
                </p>
                <p className="mt-1 text-xs text-cyan-400">
                  Operational
                </p>
              </div>

            </section>

            {/* Agents */}
            <section className="mb-10">

              <div className="mb-5 flex items-end justify-between">

                <div>
                  <p className="text-[10px] tracking-[0.25em] text-slate-600">
                    INTELLIGENCE LAYER
                  </p>

                  <h3 className="mt-1 text-xl font-semibold">
                    AI Agents
                  </h3>
                </div>

                <span className="text-xs text-slate-600">
                  {selectedAgent === "Auto"
                    ? "Auto routing enabled"
                    : "Selected: " + selectedAgent}
                </span>

              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {agents.map((agent) => (

                  <button
                    key={agent.name}
                    onClick={() => setSelectedAgent(agent.name)}
                    className={
                      selectedAgent === agent.name
                        ? "group rounded-2xl border border-violet-400/40 bg-violet-500/[0.08] p-5 text-left backdrop-blur-xl"
                        : "group rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-left backdrop-blur-xl hover:border-white/20 hover:bg-white/[0.06]"
                    }
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl text-violet-300">
                        {agent.icon}
                      </div>

                      <span className="text-[9px] tracking-widest text-emerald-400">
                        ● ONLINE
                      </span>

                    </div>

                    <h4 className="mt-5 font-medium">
                      {agent.name}
                    </h4>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {agent.description}
                    </p>

                    <div className="mt-5 text-xs text-slate-500">
                      {selectedAgent === agent.name
                        ? "✓ Selected"
                        : "Select agent →"}
                    </div>

                  </button>

                ))}

              </div>

            </section>

            {/* Command Center */}
            <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-2xl md:p-8">

              <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-500/10 blur-[100px]" />

              <div className="relative">

                <div className="mb-6 flex items-center justify-between">

                  <div>
                    <p className="text-[10px] tracking-[0.25em] text-violet-300">
                      COMMAND CENTER
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold">
                      What should your agents do?
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Give your task to the system and let agents collaborate.
                    </p>
                  </div>

                  <div className="hidden rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-right sm:block">

                    <p className="text-[9px] text-slate-600">
                      ROUTING
                    </p>

                    <p className="mt-1 text-xs text-violet-300">
                      {selectedAgent === "Auto"
                        ? "AUTONOMOUS"
                        : "MANUAL"}
                    </p>

                  </div>

                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-2">

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        runTask()
                      }
                    }}
                    placeholder="Ask your agents anything..."
                    className="h-32 w-full resize-none bg-transparent p-4 text-sm text-white outline-none placeholder:text-slate-700"
                  />

                  <div className="flex flex-col gap-3 border-t border-white/5 px-3 pt-3 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex gap-2">

                      <button className="rounded-lg px-3 py-2 text-xs text-slate-600 hover:bg-white/5 hover:text-white">
                        + Attach
                      </button>

                      <button
                        onClick={() => setSelectedAgent("Auto")}
                        className="rounded-lg px-3 py-2 text-xs text-slate-600 hover:bg-white/5 hover:text-white"
                      >
                        ◈ Auto route
                      </button>

                    </div>

                    <button
                      onClick={runTask}
                      disabled={!message.trim() || loading}
                      className="rounded-xl bg-white px-6 py-2.5 text-sm font-medium text-black hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      {loading ? "Agents working..." : "Run task →"}
                    </button>

                  </div>

                </div>

                {error && (
                  <div className="mt-4 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300">
                    {error}
                  </div>
                )}

              </div>

            </section>

            {/* Results */}
            <section className="mt-10">

              <div className="mb-5">

                <p className="text-[10px] tracking-[0.25em] text-slate-600">
                  AI OUTPUT
                </p>

                <h3 className="mt-1 text-xl font-semibold">
                  Research Results
                </h3>

              </div>

              {tasks.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">

                  <div className="mb-3 text-2xl text-slate-700">
                    ◈
                  </div>

                  <p className="text-sm text-slate-600">
                    No research yet. Give your agents a topic to investigate.
                  </p>

                </div>

              ) : (

                <div className="space-y-6">

                  {tasks.map((task) => (

                    <div
                      key={task.id}
                      className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
                    >

                      <div className="flex flex-col gap-3 border-b border-white/10 p-5 md:flex-row md:items-center md:justify-between">

                        <div className="flex min-w-0 items-center gap-4">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                            ✦
                          </div>

                          <div className="min-w-0">

                            <p className="truncate text-sm font-medium">
                              {task.text}
                            </p>

                            <p className="mt-1 text-xs text-slate-600">
                              {task.agent} · {task.time}
                            </p>

                          </div>

                        </div>

                        <span className="text-xs text-emerald-400">
                          ● COMPLETED
                        </span>

                      </div>

                      {/* Report */}
                      <div className="p-6 md:p-8">

                        <p className="mb-4 text-xs tracking-[0.2em] text-violet-300">
                          RESEARCH REPORT
                        </p>

                        <div className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                          {task.report}
                        </div>

                      </div>

                      {/* Feedback */}
                      <div className="border-t border-white/10 bg-black/20 p-6 md:p-8">

                        <p className="mb-4 text-xs tracking-[0.2em] text-cyan-300">
                          CRITIC FEEDBACK
                        </p>

                        <div className="whitespace-pre-wrap text-sm leading-7 text-slate-400">
                          {task.feedback}
                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </section>

          </div>

        </main>

      </div>

    </div>
  )
}

export default App