'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export function SearchComponent() {
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <Card>
            <CardHeader>
                <CardTitle>Search Slang Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex space-x-2">
                    <Input
                        placeholder="Search for a slang term..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button>
                        <Search className="mr-2 h-4 w-4" />
                        Search
                    </Button>
                </div>
                <div className="border rounded p-4">
                    <p className="font-medium">Search results will appear here.</p>
                </div>
            </CardContent>
        </Card>
    )
}