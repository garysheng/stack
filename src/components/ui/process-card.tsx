"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GlowCard } from "@/components/ui/glow-card"
import { Process } from "@/types"
import { CalendarCheck2, FileEdit, Goal, HeartHandshake, Lightbulb, ListTodo } from "lucide-react"

interface ProcessCardProps {
  title: string
  slug: string
  description: string
  toolsInvolved: string[]
  steps: string[]
  notes?: string
  category: Process["category"]
  showContent?: boolean
}

export type { ProcessCardProps }

const getProcessIcon = (slug: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'annual-review': <Goal className="w-6 h-6" />,
    'blog-post-workflow': <FileEdit className="w-6 h-6" />,
    'daily-task-management': <ListTodo className="w-6 h-6" />,
    'project-evaluation': <Lightbulb className="w-6 h-6" />,
    'relationship-management': <HeartHandshake className="w-6 h-6" />,
    'staying-open': <CalendarCheck2 className="w-6 h-6" />,
  }
  return iconMap[slug] || <Lightbulb className="w-6 h-6" />
}

export function ProcessCard({
  title,
  slug,
  description,
  toolsInvolved,
  steps,
  notes,
  category,
  showContent = false,
}: ProcessCardProps) {
  const content = (
    <Card className="h-full min-h-[300px] transition-colors group-hover:bg-muted/50 relative select-none flex flex-col">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-bold transition-colors group-hover:text-emerald-400">
            {title}
          </CardTitle>
        </div>
        <div className="flex flex-wrap gap-2">
          {(toolsInvolved || []).slice(0, showContent ? undefined : 3).map((tool) => (
            <Badge key={tool} variant="secondary" className="text-xs">
              {tool}
            </Badge>
          ))}
          {!showContent && toolsInvolved && toolsInvolved.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{toolsInvolved.length - 3} more
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6 flex-1">
        <p className="text-sm text-muted-foreground">{description}</p>
        {showContent && (
          <>
            <div className="space-y-2">
              <h3 className="font-semibold">Key Steps</h3>
              <ol className="list-decimal list-inside text-sm text-muted-foreground">
                {steps.map((step, index) => (
                  <li key={index} className="mb-1">{step}</li>
                ))}
              </ol>
            </div>
            {notes && (
              <div className="space-y-2">
                <h3 className="font-semibold">Notes</h3>
                <div className="text-sm text-muted-foreground">
                  {notes}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
      <div className="p-6 mt-auto border-t flex justify-between items-center">
        <div className="text-muted-foreground/40">
          {getProcessIcon(slug)}
        </div>
        <Badge variant="outline" className="shrink-0">
          {category}
        </Badge>
      </div>
    </Card>
  )

  if (showContent) {
    return <GlowCard>{content}</GlowCard>
  }

  return (
    <div className="group relative">
      <Link href={`/processes/${slug}`}>
        <GlowCard>{content}</GlowCard>
      </Link>
    </div>
  )
} 