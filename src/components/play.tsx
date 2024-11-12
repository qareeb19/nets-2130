'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ArrowRight } from 'lucide-react'

export function PlayComponent() {
    const [score, setScore] = useState(75)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Test Your Slang Knowledge!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center text-3xl font-bold mb-6 animate-pulse">
                    Current Term: "cap"
                </div>
                <div className="space-y-4">
                    <p className="font-medium text-lg">What does this term mean?</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['To lie or fake something', 'A hat', 'Maximum limit', "I don't know this term"].map((option, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                className="p-4 h-auto text-left justify-start"
                                onClick={() => setScore((prev) => Math.min(100, prev + 5))}
                            >
                                {option}
                                <ArrowRight className="ml-auto h-4 w-4" />
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Score: {score}/100</span>
                        <span className="text-sm">Gen Z Knowledge</span>
                    </div>
                    <Progress value={score} className="w-full" />
                </div>
            </CardContent>
        </Card>
    )
}