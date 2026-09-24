import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PokemonProfile } from '@/components/pokemon-profile';
import { buttonVariants } from '@/components/ui/button';
import { getPokemon } from '@/lib/pokeapi';

interface PokemonPageProps {
  params: Promise<{ name: string }>;
}
export default async function PokemonPage({
  params,
}: PokemonPageProps): Promise<React.JSX.Element> {
  const { name } = await params;
  let pokemon;
  try {
    pokemon = await getPokemon(name);
  } catch {
    notFound();
  }
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
      <Link
        className={buttonVariants({ className: 'mb-6', variant: 'outline' })}
        href="/"
      >
        Back to Pokemon catalogue
      </Link>
      <PokemonProfile pokemon={pokemon} />
    </main>
  );
}
