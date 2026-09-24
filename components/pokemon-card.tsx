import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatName, getArtworkUrl } from '@/lib/pokeapi';

interface PokemonCardProps {
  id: number;
  name: string;
}
export function PokemonCard({ id, name }: PokemonCardProps): React.JSX.Element {
  return (
    <li>
      <Link className="h-full focus:outline-none" href={`/pokemon/${name}`}>
        <Card className="h-full py-0 transition hover:ring-red-300 hover:shadow-md">
          <CardContent className="pt-4">
            <span className="text-sm text-muted-foreground">
              #{String(id).padStart(3, '0')}
            </span>
            <Image
              alt={formatName(name)}
              className="mx-auto my-3 h-32 w-32 object-contain sm:h-36 sm:w-36"
              height={180}
              priority={id <= 8}
              src={getArtworkUrl(id)}
              width={180}
            />
          </CardContent>
          <CardFooter className="mt-auto px-4 py-3">
            <span className="text-base font-semibold capitalize text-foreground">
              {formatName(name)}
            </span>
          </CardFooter>
        </Card>
      </Link>
    </li>
  );
}
