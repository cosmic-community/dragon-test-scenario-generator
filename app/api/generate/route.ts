import { NextResponse } from 'next/server'
import { getActiveScenarioTemplates } from '@/lib/cosmic'
import { ScenarioTemplate } from '@/types'

export async function POST(request: Request) {
  try {
    const { featureDescription, scenarioType, scenarioCount } = await request.json()

    if (!featureDescription) {
      return NextResponse.json(
        { error: 'Feature description is required' },
        { status: 400 }
      )
    }

    const templates = (await getActiveScenarioTemplates()) as ScenarioTemplate[]
    
    // Mock AI generation (replace with actual OpenAI/Hugging Face integration)
    const scenarios = generateMockScenarios(
      featureDescription,
      scenarioType,
      scenarioCount,
      templates
    )

    return NextResponse.json({ scenarios })
  } catch (error) {
    console.error('Error generating scenarios:', error)
    return NextResponse.json(
      { error: 'Failed to generate scenarios' },
      { status: 500 }
    )
  }
}

function generateMockScenarios(
  featureDescription: string,
  scenarioType: string,
  count: number,
  templates: ScenarioTemplate[]
): string[] {
  const scenarios: string[] = []
  const types = scenarioType === 'all' 
    ? ['positive', 'negative', 'ui', 'api', 'database']
    : [scenarioType]

  for (let i = 0; i < count; i++) {
    const type = types[i % types.length]
    const template = templates.find(t => t.metadata?.template_type?.key === type)
    
    if (template?.metadata?.example_scenarios) {
      const examples = template.metadata.example_scenarios
      const example = examples[i % examples.length]
      scenarios.push(`Verify ${featureDescription} - ${example}`)
    } else {
      scenarios.push(`Verify ${featureDescription} meets ${type} test criteria`)
    }
  }

  return scenarios
}