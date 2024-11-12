'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

interface User {
    user_id: number
    email: string
    birth_year: number
    generation_id: number
    created_at: string
}

export function ContributeComponent() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [slangTerm, setSlangTerm] = useState('')
    const [exampleSentence, setExampleSentence] = useState('')
    const [definition, setDefinition] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem('userId')
            if (!userId) {
                // No user_id found, redirect to login
                router.push('/login')
                return
            }

            // Fetch user data from the database
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('user_id', parseInt(userId))
                .single()

            if (error || !data) {
                console.error('Error fetching user data:', error)
                router.push('/login')
            } else {
                setUser(data)
            }
        }

        fetchUser()
    }, [router])

    const handleContributeSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccessMessage(null)

        if (!user) {
            setError('User not found.')
            return
        }

        try {
            const { data, error } = await supabase.from('slang_terms').insert([
                {
                    term: slangTerm,
                    definition: definition,
                    example_sentence: exampleSentence,
                    contributor_birth_year: user.birth_year,
                    submitted_by: user.user_id,
                },
            ])

            if (error) {
                console.error('Error inserting data:', error)
                setError('An error occurred while submitting your slang term.')
            } else {
                setSuccessMessage('Slang term submitted successfully!')
                // Reset form fields
                setSlangTerm('')
                setExampleSentence('')
                setDefinition('')
            }
        } catch (err) {
            console.error('Error during submission:', err)
            setError('An unexpected error occurred. Please try again.')
        }
    }

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Contribute Your Slang Knowledge</CardTitle>
            </CardHeader>
            <CardContent>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                <form onSubmit={handleContributeSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="slangTerm" className="block text-sm font-medium mb-1">
                            Slang Term:
                        </label>
                        <Input
                            id="slangTerm"
                            placeholder="lit"
                            value={slangTerm}
                            onChange={(e) => setSlangTerm(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="exampleSentence" className="block text-sm font-medium mb-1">
                            Example Sentence:
                        </label>
                        <Input
                            id="exampleSentence"
                            placeholder="That party was lit!"
                            value={exampleSentence}
                            onChange={(e) => setExampleSentence(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="definition" className="block text-sm font-medium mb-1">
                            Definition:
                        </label>
                        <Textarea
                            id="definition"
                            placeholder="Something that is exciting or excellent"
                            rows={3}
                            value={definition}
                            onChange={(e) => setDefinition(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Submit <Send className="ml-2 h-4 w-4" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
