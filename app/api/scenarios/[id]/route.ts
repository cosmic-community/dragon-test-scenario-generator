// app/api/scenarios/[id]/route.ts
import { NextResponse } from 'next/server'
import { deleteTestScenario, updateTestScenario } from '@/lib/cosmic'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteTestScenario(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting scenario:', error)
    return NextResponse.json(
      { error: 'Failed to delete scenario' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    const updated = await updateTestScenario(id, data)
    return NextResponse.json({ scenario: updated })
  } catch (error) {
    console.error('Error updating scenario:', error)
    return NextResponse.json(
      { error: 'Failed to update scenario' },
      { status: 500 }
    )
  }
}