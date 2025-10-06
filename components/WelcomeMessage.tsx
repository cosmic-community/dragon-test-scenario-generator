'use client'

interface WelcomeMessageProps {
  message: string
}

export default function WelcomeMessage({ message }: WelcomeMessageProps) {
  return (
    <div 
      className="dragon-card mb-8 border-l-4 border-primary"
      dangerouslySetInnerHTML={{ __html: message }}
    />
  )
}