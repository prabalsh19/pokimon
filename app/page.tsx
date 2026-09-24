import { PokemonExplorer } from '@/components/pokemon-explorer';
import { Spotlight } from '@/components/ui/spotlight';
import { getPokemonList } from '@/lib/pokeapi';

export default async function Home(): Promise<React.JSX.Element> {
  const pokemon = await getPokemonList();
  console.log('pokemon', pokemon);
  return (
    <main>
      <section className="bg-slate-950 px-4 py-16 text-white sm:px-8 sm:py-20">
        <Spotlight fill="#ef4444" />
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-slate-300">
            Pokemon Explorer
          </p>
          <h1 className="max-w-3xl text-4xl font-bold sm:text-5xl">
            Find your favourite Pokemon
          </h1>
          <p className="mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
            Search the PokeAPI catalogue and view abilities, stats, moves, and
            more.
          </p>
        </div>
      </section>
      <PokemonExplorer pokemon={pokemon} />
    </main>
  );
}
