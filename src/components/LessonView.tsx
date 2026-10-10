import type { Lesson } from '../data/types'
import { Ar } from './Ar'
import { PhraseRow } from './PhraseRow'

const AR_PREFIX = 'ar:'

export function LessonView({ lesson }: { lesson: Lesson }) {
  return (
    <article className="card space-y-2">
      <h3 className="text-lg font-bold">{lesson.title}</h3>
      {lesson.paragraphs.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
      {lesson.table && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="muted">
                {lesson.table.headers.map((h) => (
                  <th key={h} className="py-1 pr-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lesson.table.rows.map((row, i) => (
                <tr key={i} className="border-t border-trait">
                  {row.map((cell, j) => (
                    <td key={j} className="py-1 pr-3">
                      {cell.startsWith(AR_PREFIX) ? <Ar text={cell.slice(AR_PREFIX.length)} keepTashkeel className="text-2xl" /> : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {lesson.examples && (
        <div className="divide-y divide-trait">
          {lesson.examples.map((ex, i) => (
            <PhraseRow key={i} phrase={ex} keepTashkeel />
          ))}
        </div>
      )}
    </article>
  )
}
