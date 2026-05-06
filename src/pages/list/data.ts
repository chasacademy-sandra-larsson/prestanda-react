const FIRST = ['Anna', 'Erik', 'Maja', 'Liam', 'Saga', 'Noah', 'Elin', 'Hugo', 'Alma', 'Vera', 'Oscar', 'Iris', 'Kalle', 'Tilde']
const LAST = ['Andersson', 'Berg', 'Carlsson', 'Dahl', 'Eklund', 'Fors', 'Gren', 'Holm', 'Isaksson', 'Jönsson']
const CITIES = ['Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Lund', 'Umeå', 'Linköping', 'Örebro']

export interface Row {
  id: number
  name: string
  city: string
  score: number
}

export const ROWS: Row[] = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: `${FIRST[i % FIRST.length]} ${LAST[(i * 7) % LAST.length]}`,
  city: CITIES[(i * 3) % CITIES.length],
  score: ((i * 9301 + 49297) % 1000) / 10,
}))
