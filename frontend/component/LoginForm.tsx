import Button from "../ui/Button"
import { signIn } from "@/auth"

export default function LoginForm() {



  return (

      <form className="w-full max-w-[480px] bg-card p-10 rounded-2xl shadow-lg text-center m-auto"
      action = {async ()=> {
        "use server"
        await signIn("google")}}
        >
        
        <h1 className="text-3xl font-bold text-foreground">
          Academia Promúsica
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Ingresa con tu cuenta de gmail
        </p>

        <Button
          variant="primary"
          size="lg"
          className="w-full justify-center gap-3 "
        >
          <GoogleIcon />
          Continuar con Google
        </Button>

        <p className="text-xs text-gray-400 mt-6">
            Al continuar, aceptas nuestros Términos de servicio.
        </p>
      </form>
   
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.9-6.9C35.5 2.3 30.1 0 24 0 14.7 0 6.7 5.4 2.7 13.2l8 6.2C12.6 13 17.8 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.5c-.5 2.7-2 5-4.2 6.6l6.6 5.1c3.8-3.5 6.2-8.7 6.2-15.2z"/>
      <path fill="#FBBC05" d="M10.7 28.4c-.5-1.5-.8-3.1-.8-4.9s.3-3.4.8-4.9l-8-6.2C1 16.1 0 19.9 0 24s1 7.9 2.7 11.6l8-6.2z"/>
      <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.8l-6.6-5.1c-2 1.4-4.6 2.3-9.4 2.3-6.2 0-11.4-4.2-13.3-9.9l-8 6.2C6.7 42.6 14.7 48 24 48z"/>
    </svg>
  )
}