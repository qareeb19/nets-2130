'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [birthYear, setBirthYear] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            // Check if the user already exists
            let { data: user, error: selectError } = await supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .single()

            if (selectError && selectError.code !== 'PGRST116') {
                // PGRST116 means no rows returned, i.e., user doesn't exist
                console.error('Error fetching user:', selectError)
                setError('An error occurred while processing your request.')
                return
            }

            if (!user) {
                // Insert new user
                const { data: insertData, error: insertError } = await supabase
                    .from('users')
                    .insert({ email, birth_year: parseInt(birthYear) })
                    .select('*')
                    .single()

                if (insertError) {
                    console.error('Error inserting user:', insertError)
                    setError('An error occurred while creating your account.')
                    return
                }

                user = insertData
            }

            // Store user_id in localStorage
            localStorage.setItem('userId', user.user_id)
            localStorage.setItem('userEmail', user.email)

            // Redirect to /play
            router.push('/play')
        } catch (err) {
            console.error('Error during login:', err)
            setError('An error occurred. Please try again.')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="p-6 bg-white rounded shadow-md w-full max-w-sm space-y-4"
            >
                <h1 className="text-2xl font-bold text-center">Welcome to LingoLoop!</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email:
                    </label>
                    <Input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label htmlFor="birthYear" className="block text-sm font-medium mb-1">
                        Birth Year:
                    </label>
                    <Input
                        id="birthYear"
                        type="number"
                        required
                        value={birthYear}
                        onChange={(e) => setBirthYear(e.target.value)}
                        placeholder="e.g., 1990"
                    />
                </div>
                <Button type="submit" className="w-full">
                    Continue
                </Button>
            </form>
        </div>
    )
}

