'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function StatsComponent() {
    const [chartType, setChartType] = useState<'bar' | 'line'>('bar')

    const mockChartData = [
        { generation: 'Gen Z', usage: 65 },
        { generation: 'Millennials', usage: 59 },
        { generation: 'Gen X', usage: 80 },
        { generation: 'Baby Boomers', usage: 81 },
    ]

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Slang Usage Across Generations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <Select value={chartType} onValueChange={(value) => setChartType(value as 'bar' | 'line')}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select visualization type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="bar">Bar Chart</SelectItem>
                        <SelectItem value="line">Line Chart</SelectItem>
                    </SelectContent>
                </Select>
                <div className="h-[400px] w-full">
                    {/* Chart will go here later */}
                </div>
            </CardContent>
        </Card>
    )
}