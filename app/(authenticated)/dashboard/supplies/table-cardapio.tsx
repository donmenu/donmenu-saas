import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

interface Cardapio {
  id: number;
  item: string;
  status: string;
}

export default async function CardapiosTable({ cardapios }: { cardapios: Cardapio[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Item</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cardapios.map((cardapio) => (
          <TableRow key={cardapio.id}>
            <TableCell>{cardapio.id}</TableCell>
            <TableCell>
              <Text>{cardapio.item}</Text>
            </TableCell>
            <TableCell>
              <Text>{cardapio.status}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
