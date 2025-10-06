import { getAppSettings, getActiveScenarioTemplates } from '@/lib/cosmic'
import { AppSettings, ScenarioTemplate } from '@/types'
import Header from '@/components/Header'
import WelcomeMessage from '@/components/WelcomeMessage'
import ScenarioGenerator from '@/components/ScenarioGenerator'
import TemplateShowcase from '@/components/TemplateShowcase'
import DragonAnimation from '@/components/DragonAnimation'

export default async function Home() {
  const settings = (await getAppSettings()) as AppSettings | null
  const templates = (await getActiveScenarioTemplates()) as ScenarioTemplate[]

  const enableAnimations = settings?.metadata?.enable_dragon_animations ?? true
  const welcomeMessage = settings?.metadata?.welcome_message ?? ''

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {enableAnimations && <DragonAnimation />}
      
      <div className="relative z-10">
        <Header appSettings={settings} />
        
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {welcomeMessage && <WelcomeMessage message={welcomeMessage} />}
          
          <ScenarioGenerator templates={templates} />
          
          <TemplateShowcase templates={templates} />
        </div>
      </div>
    </main>
  )
}