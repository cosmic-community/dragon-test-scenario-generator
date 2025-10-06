'use client'

import { TestScenario } from '@/types'
import { Trash2, Eye } from 'lucide-react'
import { useState } from 'react'

interface ScenarioListProps {
  scenarios: TestScenario[]
}

export default function ScenarioList({ scenarios }: ScenarioListProps) {
  const [scenarioList, setScenarioList] = useState(scenarios)
  const [selectedScenario, setSelectedScenario] = useState<TestScenario | null>(null)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'positive': return '✅'
      case 'negative': return '❌'
      case 'ui': return '🎨'
      case 'api': return '⚙️'
      case 'database': return '💾'
      default: return '📋'
    }
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'priority-high'
      case 'medium': return 'priority-medium'
      case 'low': return 'priority-low'
      default: return 'priority-medium'
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this scenario?')) {
      return
    }

    try {
      const response = await fetch(`/api/scenarios/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete scenario')
      }

      setScenarioList(scenarioList.filter(s => s.id !== id))
      if (selectedScenario?.id === id) {
        setSelectedScenario(null)
      }
    } catch (error) {
      console.error('Error deleting scenario:', error)
      alert('Failed to delete scenario')
    }
  }

  if (!scenarioList || scenarioList.length === 0) {
    return (
      <div className="dragon-card text-center py-12">
        <p className="text-foreground/60">
          No test scenarios found. Generate some scenarios to get started!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {scenarioList.map((scenario) => {
          const typeKey = scenario.metadata?.scenario_type?.key || ''
          const priorityKey = scenario.metadata?.priority?.key || ''

          return (
            <div key={scenario.id} className="dragon-card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">
                      {getTypeIcon(typeKey)}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">
                      {scenario.metadata?.scenario_title}
                    </h3>
                  </div>

                  <p className="text-foreground/70 mb-3">
                    {scenario.metadata?.scenario_description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {priorityKey && (
                      <span className={`scenario-badge ${getPriorityClass(priorityKey)}`}>
                        {scenario.metadata?.priority?.value}
                      </span>
                    )}
                    {scenario.metadata?.feature_context && (
                      <span className="scenario-badge bg-card border border-border">
                        {scenario.metadata.feature_context}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedScenario(scenario)}
                    className="p-2 bg-background-light rounded-lg hover:bg-card transition-colors"
                  >
                    <Eye className="w-4 h-4 text-foreground/60" />
                  </button>
                  <button
                    onClick={() => handleDelete(scenario.id)}
                    className="p-2 bg-background-light rounded-lg hover:bg-red-900/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="lg:col-span-1">
        {selectedScenario ? (
          <div className="dragon-card sticky top-4">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Scenario Details
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-foreground/60 text-sm mb-1">Title</p>
                <p className="text-foreground font-medium">
                  {selectedScenario.metadata?.scenario_title}
                </p>
              </div>

              <div>
                <p className="text-foreground/60 text-sm mb-1">Description</p>
                <p className="text-foreground">
                  {selectedScenario.metadata?.scenario_description}
                </p>
              </div>

              {selectedScenario.metadata?.expected_result && (
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Expected Result</p>
                  <p className="text-foreground">
                    {selectedScenario.metadata.expected_result}
                  </p>
                </div>
              )}

              {selectedScenario.metadata?.test_steps?.steps && (
                <div>
                  <p className="text-foreground/60 text-sm mb-2">Test Steps</p>
                  <ol className="list-decimal list-inside space-y-1">
                    {selectedScenario.metadata.test_steps.steps.map((step, index) => (
                      <li key={index} className="text-foreground text-sm">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {selectedScenario.metadata?.tags && (
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Tags</p>
                  <p className="text-foreground text-sm">
                    {selectedScenario.metadata.tags}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="dragon-card sticky top-4 text-center py-12">
            <Eye className="w-12 h-12 text-foreground/30 mx-auto mb-3" />
            <p className="text-foreground/60">
              Select a scenario to view details
            </p>
          </div>
        )}
      </div>
    </div>
  )
}