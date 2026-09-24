const API_URL = 'https://pokeapi.co/api/v2';

export interface PokemonListItem {
  name: string;
  url: string;
}
interface PokemonListResponse {
  results: PokemonListItem[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: {
    ability: { name: string };
  }[];
  moves: {
    move: { name: string };
  }[];
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
  types: {
    type: { name: string };
  }[];
  sprites: { other: { 'official-artwork': { front_default: string | null } } };
}

async function fetchPokeApi<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok)
    throw new Error(`PokeAPI request failed (${response.status})`);

  return response.json() as Promise<T>;
}

/** Fetch the complete Pokemon catalogue. */
export async function getPokemonList(): Promise<PokemonListItem[]> {
  return (await fetchPokeApi<PokemonListResponse>('/pokemon?limit=1000'))
    .results;
}
/** Fetch a Pokemon by its canonical name. */
export async function getPokemon(name: string): Promise<PokemonDetail> {
  return fetchPokeApi<PokemonDetail>(
    `/pokemon/${encodeURIComponent(name.toLowerCase())}`,
  );
}
/** Return a stable Pokédex number from a PokeAPI resource URL. */
export function getPokemonId(url: string): number {
  return Number(url.match(/pokemon\/(\d+)\/?$/)?.[1] ?? 0);
}
/** Format API slugs for human-readable labels. */
export function formatName(value: string): string {
  return value
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
/** Build a sprite URL without an additional network request. */
export function getArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
