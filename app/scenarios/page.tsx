import { getTestScenarios } from '@/lib/cosmic'
import { TestScenario } from '@/types'
import Header from '@/components/Header'
import ScenarioList from '@/components/ScenarioList'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function ScenariosPage() {
  const scenarios = (await getTestScenarios()) as TestScenario[]

  return (
    <main className="min-h-screen bg-background">
      <Header appSettings={null} />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Generator
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            📋 Test Scenarios
          </h1>
          <p className="text-foreground/70">
            Manage all your generated test scenarios
          </p>
        </div>

        <ScenarioList scenarios={scenarios} />
      </div>
    </main>
  )
}