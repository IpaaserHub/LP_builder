import { SignIn } from "@clerk/nextjs"
import { AuthLayout } from "@/components/layout"

export default function SignInPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-6">
            <div className="h-12 w-12 rounded-lg bg-primary" />
          </div>
          <h1 className="text-2xl font-bold">LP Builderにサインイン</h1>
          <p className="text-muted-foreground">
            AIでランディングページを簡単に作成
          </p>
        </div>
        
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-none border-0",
            }
          }}
        />
      </div>
    </AuthLayout>
  )
} 