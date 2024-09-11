import { NextResponse } from "next/server"
import { signIn } from '@/auth'
export async function GET() {
    await signIn('credentials', { 'email', 'password' })
    return NextResponse.json('hello')
    
}