import { ExternalLink } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Program {
  name: string
  type: string
  coverage?: string
  description: string
  link?: string
}

interface ProgramTableProps {
  programs: Program[]
  title: string
}

export function ProgramTable({ programs, title }: ProgramTableProps) {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-lg">{title}</h4>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Programa</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Cobertura</TableHead>
              <TableHead className="text-right">Enlace</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programs.map((program, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div>
                    <p className="font-medium">{program.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{program.description}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{program.type}</Badge>
                </TableCell>
                <TableCell>{program.coverage || "N/A"}</TableCell>
                <TableCell className="text-right">
                  {program.link && (
                    <a
                      href={program.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Ver más
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
