'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

export function ContributeComponent() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Contribute Your Slang Knowledge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="birthYear" className="block text-sm font-medium mb-1">Your Birth Year:</label>
                        <Input id="birthYear" type="number" placeholder="1990" />
                    </div>
                    <div>
                        <label htmlFor="slangTerm" className="block text-sm font-medium mb-1">Slang Term:</label>
                        <Input id="slangTerm" placeholder="lit" />
                    </div>
                </div>
                <div>
                    <label htmlFor="exampleSentence" className="block text-sm font-medium mb-1">Example Sentence:</label>
                    <Input id="exampleSentence" placeholder="That party was lit!" />
                </div>
                <div>
                    <label htmlFor="definition" className="block text-sm font-medium mb-1">Definition:</label>
                    <Textarea id="definition" placeholder="Something that is exciting or excellent" rows={3} />
                </div>
                <Button className="w-full">
                    Submit <Send className="ml-2 h-4 w-4" />
                </Button>
            </CardContent>
        </Card>
    )
}