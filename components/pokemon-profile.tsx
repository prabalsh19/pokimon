import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatName, type PokemonDetail } from '@/lib/pokeapi';
interface PokemonProfileProps {
  pokemon: PokemonDetail;
}
export function PokemonProfile({
  pokemon,
}: PokemonProfileProps): React.JSX.Element {
  const artwork = pokemon.sprites.other['official-artwork'].front_default;
  return (
    <Card className="overflow-hidden py-0">
      <header className="grid gap-6 bg-red-500 p-6 text-white md:grid-cols-2 md:p-10">
        <div className="self-center">
          <p className="text-sm text-red-100">
            Pokédex #{String(pokemon.id).padStart(3, '0')}
          </p>
          <h1 className="mt-2 text-4xl font-bold capitalize sm:text-5xl">
            {formatName(pokemon.name)}
          </h1>
          <div className="mt-5 flex flex-wrap gap-2">
            {pokemon.types.map(({ type }) => (
              <Badge
                className="bg-white text-red-600 hover:bg-white"
                key={type.name}
              >
                {formatName(type.name)}
              </Badge>
            ))}
          </div>
        </div>
        {artwork && (
          <Image
            alt={formatName(pokemon.name)}
            className="mx-auto h-64 w-64 object-contain sm:h-72 sm:w-72"
            height={420}
            priority
            src={artwork}
            width={420}
          />
        )}
      </header>

      <CardContent className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
        <section aria-labelledby="measurements-title">
          <h2
            id="measurements-title"
            className="text-xl font-bold text-gray-900"
          >
            Details
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Height</dt>
              <dd className="font-medium text-gray-900">
                {(pokemon.height / 10).toFixed(1)} m
              </dd>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Weight</dt>
              <dd className="font-medium text-gray-900">
                {(pokemon.weight / 10).toFixed(1)} kg
              </dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-gray-100 pb-3">
              <dt className="text-gray-500">Abilities</dt>
              <dd className="text-right font-medium text-gray-900">
                {pokemon.abilities
                  .map(({ ability }) => formatName(ability.name))
                  .join(', ')}
              </dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="stats-title">
          <h2 id="stats-title" className="text-xl font-bold text-gray-900">
            Base stats
          </h2>
          <div className="mt-4 space-y-3">
            {pokemon.stats.map(({ base_stat, stat }) => (
              <div key={stat.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="capitalize text-gray-600">
                    {formatName(stat.name)}
                  </span>
                  <strong className="text-gray-900">{base_stat}</strong>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{ width: `${Math.min(base_stat / 1.8, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="moves-title" className="md:col-span-2">
          <h2 id="moves-title" className="text-xl font-bold text-gray-900">
            Moves
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {pokemon.moves.slice(0, 18).map(({ move }) => (
              <li
                className="rounded-md bg-gray-100 px-3 py-1.5 text-sm capitalize text-gray-700"
                key={move.name}
              >
                {formatName(move.name)}
              </li>
            ))}
          </ul>
        </section>
      </CardContent>
    </Card>
  );
}
