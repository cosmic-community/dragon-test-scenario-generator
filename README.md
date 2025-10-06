# 🐉 Dragon Test Scenario Generator

![App Preview](https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=300&fit=crop&auto=format)

A powerful AI-driven test scenario generator with a dramatic "Fire & Logic" dragon theme. Generate comprehensive test scenarios for Positive, Negative, UI, API, and Database testing with the power of AI.

## ✨ Features

- 🤖 **AI-Powered Generation**: Create detailed test scenarios using OpenAI or Hugging Face
- 🎯 **Multiple Test Types**: Support for Positive, Negative, UI, API, and Database scenarios
- 📋 **Template System**: Pre-built templates with example scenarios for each test type
- 💾 **Export Options**: Download scenarios to CSV or Excel formats
- 🔥 **Dragon Theme**: Dramatic dark UI with flame animations and ember accents
- 📱 **Fully Responsive**: Works beautifully on desktop, tablet, and mobile
- ⚙️ **Feature Flags**: Control app features dynamically through CMS settings
- 🎨 **Scenario Management**: View, edit, and organize all your test scenarios
- 🏷️ **Priority Tracking**: Tag scenarios as High, Medium, or Low priority
- 🔍 **Feature Context**: Link scenarios to specific features or user stories

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68e36b81260d9dd939d1bf80&clone_repository=68e36e6b260d9dd939d1bf9e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Core Functionalities
>
> Input Section
>
> A text input box where users can describe a feature, user story, or requirement in plain English.
>
> Example placeholder: "Enter your feature description (e.g., Login screen with OTP validation)"
>
> Scenario Type Dropdown
>
> A dropdown to select the type of test scenario:
>
> ✅ Positive
>
> ❌ Negative
>
> 🎨 UI
>
> ⚙️ API
>
> 💾 Database (DB)
>
> 🌐 All of the above
>
> Generate Button
>
> A button labeled "Summon the Dragon 🐉" (themed for creativity) — clicking it triggers the AI to generate scenarios.
>
> Output Section
>
> Display generated test scenarios in a clean card layout.
>
> Each scenario starts with the word "Verify".
>
> Example output:
>
> ✅ Verify user can log in with valid credentials.
>
> ❌ Verify system rejects incorrect OTP attempts.
>
> 🎨 Verify login button is aligned as per design spec.
>
> Extra Features
>
> Download button: Export generated scenarios to CSV or Excel.
>
> Copy to clipboard: Copy all generated test cases with one click.
>
> Edit mode: Users can tweak scenarios before exporting.
>
> Dark mode toggle (for late-night QA warriors 😄).
>
> ⚙️ AI Integration
>
> Use a free AI API (like OpenAI GPT via a trial key or Hugging Face models) to generate test scenarios.
>
> Example API prompt behind the scenes:
>
> "Generate 5 detailed test scenarios that start with the word 'Verify' 
> based on the following description: {user_input}. 
> Focus on {scenario_type} type scenarios (Positive/Negative/UI/API/DB). 
> Format them as a numbered list."
>
> 🎨 UI/UX Design (Dragon Theme)
>
> Theme Name: "Fire & Logic" 🔥🐉
>
> Design Aesthetic:
>
> Background: Dark slate with glowing ember accents.
>
> Primary Color: Fiery orange-red.
>
> Font: Futuristic (e.g., Orbitron or Rajdhani).
>
> Button hover effects mimic flame flicker animation.
>
> A minimal animated dragon silhouette in the corner breathing light sparks when generating.
>
> Layout:
>
> Centered card interface.
>
> Use TailwindCSS + Framer Motion for sleek animations.
>
> Each scenario card glows softly when hovered.
>
> 🧑‍💻 Technical Stack Recommendation
>
> Frontend: React + TailwindCSS + Framer Motion
>
> Backend (optional): Node.js + Express (for AI API proxy)
>
> AI Integration: OpenAI GPT or HuggingFace model
>
> Storage (optional): Firebase or Supabase (to save user sessions or scenario history)
>
> 💡 Bonus Features (optional)
>
> Allow users to upload a requirement document (PDF/DOCX) and auto-extract test scenarios.
>
> Enable multi-language support (English, French, Hindi, etc.)
>
> Add a feedback meter where users rate AI-generated quality.
>
> Include a "Dragon Wisdom" mode where AI gives test ideas & coverage hints."

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with custom dragon theme
- **Framer Motion**: Smooth animations and transitions
- **Cosmic CMS**: Headless CMS for content management
- **React Hook Form**: Form handling and validation
- **Lucide Icons**: Beautiful icon set

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account and bucket

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
OPENAI_API_KEY=your-openai-api-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📚 Cosmic SDK Examples

### Fetching App Settings

```typescript
import { cosmic } from '@/lib/cosmic'

const { object } = await cosmic.objects
  .findOne({
    type: 'app-settings',
    slug: 'dragon-test-generator-settings'
  })
  .props(['id', 'title', 'metadata'])
  .depth(0)
```

### Fetching Scenario Templates

```typescript
const response = await cosmic.objects
  .find({
    type: 'scenario-templates',
    'metadata.is_active': true
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(0)
```

### Creating a Test Scenario

```typescript
await cosmic.objects.insertOne({
  type: 'test-scenarios',
  title: 'New Test Scenario',
  metadata: {
    scenario_title: 'Verify login functionality',
    scenario_type: 'positive',
    scenario_description: 'Verify user can log in with valid credentials',
    feature_context: 'Login screen',
    priority: 'high',
    tags: 'authentication, login',
    expected_result: 'User successfully logs in',
    test_steps: {
      steps: [
        'Navigate to login page',
        'Enter valid credentials',
        'Click login button',
        'Verify redirect to dashboard'
      ]
    }
  }
})
```

## 🌐 Cosmic CMS Integration

This application uses Cosmic CMS with three content types:

### App Settings (Singleton)
- App Name, Theme Mode, Primary Color
- AI Provider configuration
- Feature Flags for enabling/disabling features
- Default scenario count and export formats

### Scenario Templates
- Pre-built templates for each test type
- AI prompt templates with placeholders
- Example scenarios for reference
- Active/inactive status control

### Test Scenarios
- Generated and saved test scenarios
- Full scenario details with steps
- Priority and tagging system
- Feature context linking

## 📦 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the button above
2. Add your environment variables in Vercel dashboard
3. Deploy!

### Environment Variables

Make sure to set these in your hosting platform:

- `COSMIC_BUCKET_SLUG`: Your Cosmic bucket slug
- `COSMIC_READ_KEY`: Your Cosmic read key
- `COSMIC_WRITE_KEY`: Your Cosmic write key
- `OPENAI_API_KEY`: Your OpenAI API key (for AI generation)

<!-- README_END -->