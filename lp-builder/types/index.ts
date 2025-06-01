// Database types
export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  created_at: string
}

export interface Project {
  id: string
  user_id: string
  title: string
  description: string | null
  content: LPContent | null
  template_id: string | null
  published_url: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Template {
  id: string
  name: string
  category: string | null
  preview_image: string | null
  content: LPContent
  is_public: boolean
  created_at: string
}

export interface Analytics {
  id: string
  project_id: string
  event_type: string
  data: Record<string, any>
  timestamp: string
}

// LP Content types
export interface LPContent {
  title: string
  subtitle: string
  heroSection: HeroSection
  features: Feature[]
  testimonials: Testimonial[]
  pricing: PricingSection
}

export interface HeroSection {
  headline: string
  description: string
  ctaText: string
}

export interface Feature {
  title: string
  description: string
  icon: string
}

export interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
}

export interface PricingSection {
  title: string
  description: string
  plans: PricingPlan[]
}

export interface PricingPlan {
  name: string
  price: string
  features: string[]
  recommended: boolean
}

// UI State types
export interface EditorState {
  isLoading: boolean
  currentSection: string | null
  isDragMode: boolean
  selectedComponent: string | null
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Form types
export interface CreateProjectForm {
  title: string
  description?: string
  businessDescription: string
  targetAudience: string
  keyFeatures: string[]
  tone: 'professional' | 'friendly' | 'urgent' | 'luxury'
}

export interface UpdateProjectForm {
  title?: string
  description?: string
  content?: LPContent
  isPublished?: boolean
}

// Component Props types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  onClick?: () => void
} 