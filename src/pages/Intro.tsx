export default function Intro() {
  return (
    <article className="space-y-8 max-w-3xl text-slate-700 leading-relaxed">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Prestanda</h1>
        <p>
          Prestandaproblem i React kan oftast härledas till en (eller flera) av
          följande orsaker:
        </p>
        <ol className="list-decimal pl-6 space-y-1.5">
            <li>
            <strong className="text-slate-900">För många onödiga omrenderingar sker</strong> →{' '}
            <em className="text-emerald-700 not-italic">Memoization</em>
          </li>
           <li>
            <strong className="text-slate-900">För mycket renderas samtidigt</strong> →{' '}
            <em className="text-emerald-700 not-italic">Virtualization</em>
          </li>
          
          <li>
            <strong className="text-slate-900">För mycket kod laddas</strong> →{' '}
            <em className="text-emerald-700 not-italic">Code-splitting</em>
          </li>
         
        
        </ol>
        <p>
          Att förstå vilken typ av problem du har gör det lättare att välja rätt
          optimering.
        </p>
      </header>

      <hr className="border-slate-200" />
 <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900">Memoization</h2>
        <p>
          <strong className="text-slate-900">Memoisering</strong> är en teknik för att
          optimera program genom att spara resultatet av krävande och omfattande
          beräkningar. Om samma beräkning efterfrågas igen kan det sparade
          resultatet returneras istället för att uträkningen sker på nytt. Detta
          kan jämföras med caching.
        </p>
        <p>
          I ett React-sammanhang innebär memoization att beräkningar eller
          komponenter <strong className="text-slate-900">inte</strong> körs om vid
          varje render, så länge deras dependencies inte har förändrats.
        </p>
        <p>Vanliga verktyg i React:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 text-sm">
              React.memo
            </code>{' '}
            – för att memoisera en hel komponent
          </li>
          <li>
            <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 text-sm">
              useMemo
            </code>{' '}
            – för att memoisera enskilda värden eller beräkningar
          </li>
        </ul>
        <p>
          Memoisering används främst för att undvika{' '}
          <strong className="text-slate-900">onödiga omrenderingar.</strong> Att
          minimera lagg snarare än att göra saker snabbare än vad de är i
          utgångspunkt.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900">Virtualization</h2>
        <p>
          <strong className="text-slate-900">Virtualization</strong> innebär att du
          endast renderar det innehåll som användaren faktiskt kan se på skärmen
          just nu. Detta är särskilt viktigt vid hantering av stora datamängder,
          till exempel långa listor, tabeller eller feeds.
        </p>
        <div className="grid md:grid-cols-2 gap-3 pt-2">
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 space-y-1">
            <h3 className="text-sm font-semibold text-rose-700">Utan virtualization</h3>
            <ul className="text-sm space-y-1 list-disc pl-5">
              <li>Renderas alla listobjekt samtidigt</li>
              <li>DOM:en blir stor</li>
              <li>Scrollning och interaktioner blir långsamma</li>
            </ul>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 space-y-1">
            <h3 className="text-sm font-semibold text-emerald-700">Med virtualization</h3>
            <ul className="text-sm space-y-1 list-disc pl-5">
              <li>Renderas endast synliga objekt</li>
              <li>DOM:en hålls liten</li>
              <li>Prestandan förbättras markant</li>
            </ul>
          </div>
        </div>
        <p>
          Det finns färdiga bibliotek för virtualization, till exempel{' '}
          <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 text-sm">
            react-window
          </code>
          .
        </p>
        <p>
          Ett populärt alternativ till virtualization är{' '}
          <strong className="text-slate-900">pagination</strong>, där man delar upp en
          lista/tabell i UI:t på flera sidor. Pagination kan i många fall vara
          ett bättre val ur både UX- och prestandaperspektiv, beroende på
          användningsområde.
        </p>
      </section>

      <hr className="border-slate-200" />

     
      <hr className="border-slate-200" />


      <hr className="border-slate-200" />

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900">Code-splitting</h2>
        <p>
          <strong className="text-slate-900">Code-splitting</strong> innebär att
          källkoden delas upp i mindre delar som laddas vid behov, istället för
          att hela appen laddas på en gång. Syftet är att minska inledande
          laddningstid och förbättra upplevd prestanda.
        </p>
        <p>
          Det är särskilt relevant i större applikationer med många routes eller
          tunga komponenter som inte alltid används.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 pt-2">
          Praktiska sätt att använda code-splitting i React
        </h3>
        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong className="text-slate-900">Routenivå</strong>
            <p className="mt-1">
              Ladda sidor först när användaren navigerar dit. Bibliotek som{' '}
              <strong className="text-slate-900">TanStack Router</strong> har inbyggt
              stöd för detta. Effekten blir snabbare inledande laddning och
              mindre bundlar.
            </p>
          </li>
          <li>
            <strong className="text-slate-900">Lazy loading av komponenter</strong>
            <p className="mt-1">
              Använd{' '}
              <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 text-sm">
                React.lazy
              </code>{' '}
              och{' '}
              <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 text-sm">
                Suspense
              </code>{' '}
              för att ladda tunga komponenter först när de renderas:
            </p>
            <pre className="mt-2 p-3 rounded bg-white border border-slate-200 overflow-x-auto text-sm">
              <code className="text-slate-800">{`const SettingsPage = React.lazy(() => import("./SettingsPage"));

<Suspense fallback={<Spinner />}>
  <SettingsPage />
</Suspense>`}</code>
            </pre>
            <p className="mt-2">
              Exempel på komponenter som lämpar sig: diagram, kartor, editors
              eller moduler som öppnas med knapptryck eller i modaler.
            </p>
          </li>
          <li>
            <strong className="text-slate-900">Ladda vid användarinteraktion</strong>
            <p className="mt-1">
              Komponenter eller funktioner kan importeras först när användaren
              klickar på en knapp, öppnar en flik eller en modal, vilket sprider
              ut laddningen över tiden.
            </p>
          </li>
        </ol>

        <h3 className="text-lg font-semibold text-slate-900 pt-2">Förtydligande</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Code-splitting minskar <strong className="text-slate-900">inte</strong>{' '}
            mängden kod som körs totalt eller problem med långsam rendering.
          </li>
          <li>
            För många små bundles kan öka komplexiteten, så använd det främst
            för tunga komponenter eller sällan använda routes.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900">State management</h2>
        <p>
          En välfungerande state manager kan ha stor påverkan på prestandan.
          Även <strong className="text-slate-900">browser caching</strong>, som vi
          pratat om tidigare, är i sig en form av prestandaoptimering och bör
          ses som en del av helheten. Bibliotek som till exempel{' '}
          <strong className="text-slate-900">React Query</strong> kan:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Undvika onödiga/överflödiga API-anrop</li>
          <li>Cacha data effektivt</li>
          <li>Minimera onödiga uppdateringar och renderingar</li>
        </ul>
      </section>
    </article>
  )
}
