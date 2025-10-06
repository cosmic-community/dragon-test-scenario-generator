// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

// App Settings interface
export interface AppSettings extends CosmicObject {
  type: 'app-settings'
  metadata: {
    app_name: string
    theme_mode?: {
      key: 'light' | 'dark' | 'auto'
      value: string
    }
    primary_color?: string
    enable_dragon_animations?: boolean
    ai_provider?: {
      key: 'openai' | 'huggingface' | 'custom'
      value: string
    }
    default_scenario_count?: number
    export_formats?: string[]
    feature_flags?: {
      enable_document_upload?: boolean
      enable_multilingual?: boolean
      enable_feedback_rating?: boolean
      enable_dragon_wisdom?: boolean
      enable_scenario_history?: boolean
    }
    welcome_message?: string
  }
}

// Scenario Template interface
export interface ScenarioTemplate extends CosmicObject {
  type: 'scenario-templates'
  metadata: {
    template_name: string
    template_type?: {
      key: 'positive' | 'negative' | 'ui' | 'api' | 'database'
      value: string
    }
    ai_prompt_template: string
    example_scenarios?: string[]
    icon?: string
    is_active?: boolean
  }
}

// Test Scenario interface
export interface TestScenario extends CosmicObject {
  type: 'test-scenarios'
  metadata: {
    scenario_title: string
    scenario_type?: {
      key: 'positive' | 'negative' | 'ui' | 'api' | 'database'
      value: string
    }
    scenario_description: string
    feature_context?: string
    priority?: {
      key: 'high' | 'medium' | 'low'
      value: string
    }
    tags?: string
    expected_result?: string
    test_steps?: {
      steps?: string[]
    }
  }
}

// Type literals for select-dropdown values
export type ScenarioType = 'positive' | 'negative' | 'ui' | 'api' | 'database'
export type PriorityLevel = 'high' | 'medium' | 'low'
export type ThemeMode = 'light' | 'dark' | 'auto'

// API response type
export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit?: number
  skip?: number
}

// Form data types
export interface GenerateScenarioFormData {
  featureDescription: string
  scenarioType: ScenarioType | 'all'
  scenarioCount: number
}

export interface CreateScenarioFormData {
  title: string
  scenarioType: ScenarioType
  description: string
  featureContext?: string
  priority: PriorityLevel
  tags?: string
  expectedResult?: string
  testSteps?: string[]
}