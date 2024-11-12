'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

interface Generation {
    generation_id: number
    generation_name: string
    start_year: number
    end_year: number
}

interface SlangTerm {
    slang_id: number
    term: string
    definition: string
    example_sentence: string
    contributor_birth_year: number
    created_at: string
}

export default function TestPage() {
    const [generations, setGenerations] = useState<Generation[]>([])
    const [slangTerms, setSlangTerms] = useState<SlangTerm[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch generations
                const { data: genData, error: genError } = await supabase
                    .from('generations')
                    .select('*')
                    .order('start_year', { ascending: false })

                if (genError) throw genError

                // Fetch slang terms
                const { data: slangData, error: slangError } = await supabase
                    .from('slang_terms')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(10)

                if (slangError) throw slangError

                setGenerations(genData)
                setSlangTerms(slangData)
                setLoading(false)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className="space-y-8 p-4">
            <section>
                <h2 className="text-2xl font-bold mb-4">Generations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {generations.map((gen) => (
                        <div key={gen.generation_id} className="p-4 border rounded-lg">
                            <h3 className="font-bold">{gen.generation_name}</h3>
                            <p className="text-sm text-gray-600">
                                {gen.start_year} - {gen.end_year}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Recent Slang Terms</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {slangTerms.map((term) => (
                        <div key={term.slang_id} className="p-4 border rounded-lg">
                            <h3 className="font-bold">{term.term}</h3>
                            <p className="text-sm text-gray-600 mt-2">{term.definition}</p>
                            {term.example_sentence && (
                                <p className="text-sm italic mt-2">
                                    Example: {term.example_sentence}
                                </p>
                            )}
                            <p className="text-xs text-gray-500 mt-2">
                                Contributed by someone born in {term.contributor_birth_year}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}