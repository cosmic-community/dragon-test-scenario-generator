'use client'

import { ScenarioTemplate } from '@/types'
import { Lightbulb } from 'lucide-react'

interface TemplateShowcaseProps {
  templates: ScenarioTemplate[]
}

export default function TemplateShowcase({ templates }: TemplateShowcaseProps) {
  if (!templates || templates.length === 0) {
    return null
  }

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

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Lightbulb className="w-6 h-6 text-primary" />
        Scenario Templates
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const typeKey = template.metadata?.template_type?.key || ''
          const examples = template.metadata?.example_scenarios || []

          return (
            <div key={template.id} className="dragon-card">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">
                  {getTypeIcon(typeKey)}
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  {template.metadata?.template_name}
                </h3>
              </div>

              {examples.length > 0 && (
                <div className="space-y-2">
                  <p className="text-foreground/60 text-sm font-medium mb-2">
                    Example Scenarios:
                  </p>
                  <ul className="space-y-2">
                    {examples.slice(0, 3).map((example, index) => (
                      <li
                        key={index}
                        className="text-sm text-foreground/80 pl-3 border-l-2 border-primary/30"
                      >
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}