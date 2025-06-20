'use client'

import { Title, Text, Card } from '@tremor/react'

export default function TermosDeUsoPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <Card className="p-8">
        <Title className="text-3xl font-bold mb-4">Termos de Uso</Title>
        <Text className="text-gray-500 mb-2">Última atualização: 01/07/2024</Text>
        <Text className="mb-6">
          Estes Termos de Uso regulam o acesso e uso do sistema DonMenu. Ao utilizar nossos serviços, você concorda com as condições abaixo. Leia atentamente.
        </Text>
        <section className="mb-4">
          <Title className="text-lg font-semibold mb-2">1. Aceitação dos Termos</Title>
          <Text>Ao acessar ou usar o DonMenu, você concorda em cumprir estes Termos de Uso e todas as leis e regulamentos aplicáveis.</Text>
        </section>
        <section className="mb-4">
          <Title className="text-lg font-semibold mb-2">2. Uso do Sistema</Title>
          <Text>O usuário se compromete a utilizar o sistema apenas para fins legais e de acordo com as funcionalidades oferecidas.</Text>
        </section>
        <section className="mb-4">
          <Title className="text-lg font-semibold mb-2">3. Propriedade Intelectual</Title>
          <Text>Todo o conteúdo, marcas e funcionalidades do DonMenu são protegidos por direitos autorais e não podem ser reproduzidos sem autorização.</Text>
        </section>
        <section className="mb-4">
          <Title className="text-lg font-semibold mb-2">4. Limitação de Responsabilidade</Title>
          <Text>O DonMenu não se responsabiliza por danos decorrentes do uso indevido do sistema ou por indisponibilidades temporárias.</Text>
        </section>
        <section className="mb-4">
          <Title className="text-lg font-semibold mb-2">5. Alterações nos Termos</Title>
          <Text>Reservamo-nos o direito de alterar estes Termos a qualquer momento. As alterações serão comunicadas no site.</Text>
        </section>
        <Text className="mt-8 text-gray-400 text-sm">Em caso de dúvidas, entre em contato pelo e-mail suporte@donmenu.com.</Text>
      </Card>
    </main>
  )
} 