'use client';
import { useMemo, useState } from 'react';
import { PokemonCard } from '@/components/pokemon-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getPokemonId, type PokemonListItem } from '@/lib/pokeapi';

interface PokemonExplorerProps {
  pokemon: PokemonListItem[];
}
export function PokemonExplorer({
  pokemon,
}: PokemonExplorerProps): React.JSX.Element {
  const [query, setQuery] = useState('');

  const visiblePokemon = useMemo(() => {
    const searchValue = query.trim().toLowerCase();
    return searchValue
      ? pokemon.filter((item) => item.name.includes(searchValue))
      : pokemon;
  }, [pokemon, query]);

  return (
    <section
      aria-labelledby="catalogue-title"
      className="mx-auto max-w-6xl px-4 py-10 sm:px-8"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 id="catalogue-title" className="text-2xl font-bold text-gray-900">
            Pokemon catalogue
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Browse all Pokemon available in PokeAPI.
          </p>
        </div>
        <p aria-live="polite" className="text-sm text-gray-500">
          {visiblePokemon.length} Pokemon found
        </p>
      </div>

      <div className="mt-6 flex gap-2">
        <label className="sr-only" htmlFor="pokemon-search">
          Search Pokemon by name
        </label>
        <Input
          className="h-11 px-4"
          id="pokemon-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search Pokemon by name"
          type="search"
          value={query}
        />
        {query && (
          <Button
            className="h-11 px-4"
            onClick={() => setQuery('')}
            type="button"
            variant="outline"
          >
            Clear
          </Button>
        )}
      </div>

      {visiblePokemon.length ? (
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visiblePokemon.map((item) => (
            <PokemonCard
              id={getPokemonId(item.url)}
              key={item.name}
              name={item.name}
            />
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-md border border-dashed border-gray-300 p-10 text-center text-gray-500">
          <p>No Pokemon found for “{query}”.</p>
          <Button
            className="mt-3"
            onClick={() => setQuery('')}
            type="button"
            variant="link"
          >
            Clear search
          </Button>
        </div>
      )}
    </section>
  );
}
