import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Fetch app settings
export async function getAppSettings() {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'app-settings',
        slug: 'dragon-test-generator-settings',
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)

    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch app settings')
  }
}

// Fetch scenario templates
export async function getScenarioTemplates() {
  try {
    const response = await cosmic.objects
      .find({
        type: 'scenario-templates',
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)

    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch scenario templates')
  }
}

// Fetch active scenario templates only
export async function getActiveScenarioTemplates() {
  try {
    const response = await cosmic.objects
      .find({
        type: 'scenario-templates',
        'metadata.is_active': true,
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)

    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch active scenario templates')
  }
}

// Fetch all test scenarios
export async function getTestScenarios() {
  try {
    const response = await cosmic.objects
      .find({
        type: 'test-scenarios',
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(0)

    // Sort by created date (newest first)
    return response.objects.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch test scenarios')
  }
}

// Fetch single test scenario
export async function getTestScenario(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'test-scenarios',
        slug: slug,
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(0)

    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch test scenario')
  }
}

// Create a test scenario
export async function createTestScenario(data: {
  title: string
  metadata: {
    scenario_title: string
    scenario_type: string
    scenario_description: string
    feature_context?: string
    priority?: string
    tags?: string
    expected_result?: string
    test_steps?: { steps: string[] }
  }
}) {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'test-scenarios',
      title: data.title,
      metadata: data.metadata,
    })

    return response.object
  } catch (error) {
    throw new Error('Failed to create test scenario')
  }
}

// Update a test scenario
export async function updateTestScenario(
  id: string,
  data: {
    title?: string
    metadata?: {
      scenario_title?: string
      scenario_type?: string
      scenario_description?: string
      feature_context?: string
      priority?: string
      tags?: string
      expected_result?: string
      test_steps?: { steps: string[] }
    }
  }
) {
  try {
    const response = await cosmic.objects.updateOne(id, data)
    return response.object
  } catch (error) {
    throw new Error('Failed to update test scenario')
  }
}

// Delete a test scenario
export async function deleteTestScenario(id: string) {
  try {
    await cosmic.objects.deleteOne(id)
    return true
  } catch (error) {
    throw new Error('Failed to delete test scenario')
  }
}