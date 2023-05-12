import { Card, Title, Text } from '@tremor/react';
import { queryBuilder } from '../../lib/planetscale';
import Search from './../search';
import CardapiosTable from './../table-cardapio';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  const cardapios = await queryBuilder
    .selectFrom('cardapios')
    .select(['id', 'item', 'status'])
    .where('item', 'like', `%${search}%`)
    .execute();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Cardapios</Title>
      <Text>
        Lista de cardapios        
      </Text>
      <Search />
      <Card className="mt-6">
        {/* @ts-expect-error Server Component */}
        <CardapiosTable cardapios={cardapios} />
      </Card>
    </main>
  );
}
