'use client'

import { Title, Text, Card } from '@tremor/react'

export default function PoliticaPrivacidadePage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <Card className="p-8">
        <Title className="text-3xl font-bold mb-4">Política de Privacidade</Title>
        <Text className="text-gray-500 mb-2">Última atualização: 01/07/2024</Text>
        <Text className="mb-6">
          Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações ao utilizar o DonMenu.
        </Text>
        <section className="mb-4">
          <Title className="text-lg font-semibold mb-2">1. Coleta de Informações</Title>
          <Text>Coletamos informações fornecidas pelo usuário no cadastro e durante o uso do sistema, como nome, e-mail e dados do restaurante.</Text>
        </section>
        <section className="mb-4">
          <Title className="text-lg font-semibold mb-2">2. Uso das Informações</Title>
          <Text>As informações são utilizadas para fornecer, operar e melhorar o DonMenu, bem como para comunicação com o usuário.</Text>
        </section>
        <section className="mb-4">
          <Title className="text-lg font-semibold mb-2">3. Compartilhamento de Dados</Title>
          <Text>Não compartilhamos dados pessoais com terceiros, exceto quando exigido por lei ou para funcionamento do serviço.</Text>
        </section>
        <section className="mb-4">
          <Title className="text-lg font-semibold mb-2">4. Segurança</Title>
          <Text>Adotamos medidas de segurança para proteger as informações dos usuários contra acesso não autorizado, alteração ou destruição.</Text>
        </section>
        <section className="mb-4">
          <Title className="text-lg font-semibold mb-2">5. Direitos do Usuário</Title>
          <Text>O usuário pode solicitar a atualização ou exclusão de seus dados pessoais a qualquer momento, entrando em contato com o suporte.</Text>
        </section>
        <section className="mb-4">
          <Title className="text-lg font-semibold mb-2">6. Alterações nesta Política</Title>
          <Text>Podemos atualizar esta Política de Privacidade periodicamente. As alterações serão comunicadas no site.</Text>
        </section>
        <Text className="mt-8 text-gray-400 text-sm">Dúvidas? Entre em contato pelo e-mail suporte@donmenu.com.</Text>
      </Card>
    </main>
  )
} 