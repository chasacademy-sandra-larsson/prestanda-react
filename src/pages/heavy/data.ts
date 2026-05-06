const FIRST = ['Anna', 'Erik', 'Maja', 'Liam', 'Saga', 'Noah', 'Elin', 'Hugo', 'Alma', 'Vera']
const LAST = ['Andersson', 'Berg', 'Carlsson', 'Dahl', 'Eklund', 'Fors', 'Gren', 'Holm']
const CITIES = ['Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Lund', 'Umeå']

export interface Person {
  id: number
  name: string
  city: string
  score: number
}

export interface RankedPerson extends Person {
  popularity: number
}

export const PEOPLE: Person[] = Array.from({ length: 12000 }, (_, i) => ({
  id: i,
  name: `${FIRST[i % FIRST.length]} ${LAST[(i * 7) % LAST.length]}`,
  city: CITIES[(i * 3) % CITIES.length],
  score: ((i * 9301 + 49297) % 1000) / 10,
}))

// Avsiktligt långsam: O(n²) popularity-ranking + filter + sort.
// Kostnaden är konstant (~150–400 ms) oavsett om query är tom eller ej —
// vilket gör laggigheten synlig i Performance-fliken vid varje render.
export function expensiveFilterAndSort(query: string): RankedPerson[] {
  const q = query.toLowerCase()
  const result: RankedPerson[] = []
  for (const p of PEOPLE) {
    // Dyrt: räkna hur många andra personer som har samma stad
    let popularity = 0
    for (const other of PEOPLE) {
      if (other.city === p.city) popularity++
    }
    if (q === '' || p.name.toLowerCase().includes(q)) {
      result.push({ ...p, popularity })
    }
  }
  result.sort(
    (a, b) => b.popularity - a.popularity || a.name.localeCompare(b.name),
  )
  return result.slice(0, 50)
}
