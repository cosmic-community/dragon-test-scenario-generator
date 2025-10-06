'use client'

import { useState } from 'react'
import { ScenarioTemplate } from '@/types'
import { Sparkles, Download, Copy, Check } from 'lucide-react'

interface ScenarioGeneratorProps {
  templates: ScenarioTemplate[]
}

export default function ScenarioGenerator({ templates }: ScenarioGeneratorProps) {
  const [featureDescription, setFeatureDescription] = useState('')
  const [scenarioType, setScenarioType] = useState<string>('all')
  const [scenarioCount, setScenarioCount] = useState(5)
  const [generatedScenarios, setGeneratedScenarios] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!featureDescription.trim()) {
      alert('Please enter a feature description')
      return
    }

    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          featureDescription,
          scenarioType,
          scenarioCount,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate scenarios')
      }

      const data = await response.json()
      setGeneratedScenarios(data.scenarios || [])
    } catch (error) {
      console.error('Error generating scenarios:', error)
      alert('Failed to generate scenarios. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = async () => {
    const text = generatedScenarios.join('\n\n')
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExport = () => {
    const csv = 'Scenario\n' + generatedScenarios.map(s => `"${s}"`).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `test-scenarios-${Date.now()}.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="dragon-card">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          Generate Test Scenarios
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-foreground/80 mb-2 font-medium">
              Feature Description
            </label>
            <textarea
              className="dragon-input min-h-[120px]"
              placeholder="Enter your feature description (e.g., Login screen with OTP validation)"
              value={featureDescription}
              onChange={(e) => setFeatureDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-foreground/80 mb-2 font-medium">
                Scenario Type
              </label>
              <select
                className="dragon-input"
                value={scenarioType}
                onChange={(e) => setScenarioType(e.target.value)}
              >
                <option value="all">🌐 All Types</option>
                <option value="positive">✅ Positive</option>
                <option value="negative">❌ Negative</option>
                <option value="ui">🎨 UI</option>
                <option value="api">⚙️ API</option>
                <option value="database">💾 Database</option>
              </select>
            </div>

            <div>
              <label className="block text-foreground/80 mb-2 font-medium">
                Number of Scenarios
              </label>
              <input
                type="number"
                min="1"
                max="20"
                className="dragon-input"
                value={scenarioCount}
                onChange={(e) => setScenarioCount(parseInt(e.target.value) || 5)}
              />
            </div>
          </div>

          <button
            className="dragon-button w-full flex items-center justify-center gap-2"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            <Sparkles className="w-5 h-5" />
            {isGenerating ? 'Summoning the Dragon...' : 'Summon the Dragon 🐉'}
          </button>
        </div>
      </div>

      {generatedScenarios.length > 0 && (
        <div className="dragon-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">
              Generated Scenarios
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-background-light text-foreground rounded-lg hover:bg-card transition-colors flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {generatedScenarios.map((scenario, index) => (
              <div
                key={index}
                className="p-4 bg-background-light border border-border rounded-lg hover:border-primary transition-colors"
              >
                <p className="text-foreground">{scenario}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}