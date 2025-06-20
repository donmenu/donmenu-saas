'use client'

import { Card, Title, Text, Button } from '@tremor/react'
import { useState } from 'react'
import { QrCodeIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function QRCodePage() {
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const generateQRCode = async () => {
    setLoading(true)
    
    try {
      // URL do cardápio público
      const cardapioUrl = `${window.location.origin}/cardapio`
      
      // Gerar QR Code usando API externa
      const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(cardapioUrl)}`
      
      setQrCodeUrl(qrCodeApiUrl)
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error)
      alert('Erro ao gerar QR Code')
    } finally {
      setLoading(false)
    }
  }

  const downloadQRCode = () => {
    if (!qrCodeUrl) return
    
    const link = document.createElement('a')
    link.href = qrCodeUrl
    link.download = 'cardapio-qr-code.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const copyUrl = () => {
    const cardapioUrl = `${window.location.origin}/cardapio`
    navigator.clipboard.writeText(cardapioUrl)
    alert('URL copiada para a área de transferência!')
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-4xl">
      <div className="mb-8">
        <Title className="text-3xl font-bold text-gray-900">QR Code do Cardápio</Title>
        <Text className="text-gray-600 mt-2">
          Gere um QR Code para que seus clientes acessem o cardápio digital
        </Text>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card de Geração */}
        <Card className="bg-white shadow-xl border-0 rounded-xl">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                <QrCodeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <Title className="text-xl font-semibold text-gray-900">Gerar QR Code</Title>
                <Text className="text-gray-600">Crie um QR Code para o cardápio</Text>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={generateQRCode}
                loading={loading}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3"
                icon={QrCodeIcon}
              >
                {loading ? 'Gerando QR Code...' : 'Gerar QR Code'}
              </Button>

              <div className="p-4 bg-blue-50 rounded-lg">
                <Text className="text-sm font-medium text-blue-800 mb-2">URL do Cardápio:</Text>
                <div className="flex items-center space-x-2">
                  <Text className="text-sm text-blue-600 font-mono bg-blue-100 px-2 py-1 rounded flex-1">
                    {`${typeof window !== 'undefined' ? window.location.origin : ''}/cardapio`}
                  </Text>
                  <Button
                    onClick={copyUrl}
                    size="xs"
                    variant="secondary"
                  >
                    Copiar
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <Text className="text-sm font-medium text-yellow-800 mb-2">Como usar:</Text>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Gere o QR Code</li>
                  <li>• Imprima e cole nas mesas</li>
                  <li>• Os clientes escaneiam com o celular</li>
                  <li>• Acessam o cardápio e fazem pedidos</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Card de Visualização */}
        <Card className="bg-white shadow-xl border-0 rounded-xl">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-4">
                <ArrowDownTrayIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <Title className="text-xl font-semibold text-gray-900">QR Code</Title>
                <Text className="text-gray-600">Visualize e baixe o QR Code</Text>
              </div>
            </div>

            <div className="space-y-4">
              {qrCodeUrl ? (
                <div className="text-center">
                  <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block mb-4">
                    <Image src={qrCodeUrl} alt="QR Code" width={200} height={200} className="mx-auto" />
                  </div>
                  
                  <Button
                    onClick={downloadQRCode}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
                    icon={ArrowDownTrayIcon}
                  >
                    Baixar QR Code
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <QrCodeIcon className="w-16 h-16 text-gray-400" />
                  </div>
                  <Text className="text-gray-500">
                    Clique em &quot;Gerar QR Code&quot; para criar o código
                  </Text>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Informações Adicionais */}
      <Card className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 border-0">
        <div className="p-6">
          <Title className="text-xl font-semibold text-gray-900 mb-4">
            Benefícios do Cardápio Digital
          </Title>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">📱</span>
              </div>
              <Text className="font-medium text-gray-900 mb-2">Fácil Acesso</Text>
              <Text className="text-sm text-gray-600">
                Clientes acessam o cardápio instantaneamente pelo celular
              </Text>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold text-lg">⚡</span>
              </div>
              <Text className="font-medium text-gray-900 mb-2">Pedidos Rápidos</Text>
              <Text className="text-sm text-gray-600">
                Sistema de pedidos integrado para agilizar o atendimento
              </Text>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold text-lg">💰</span>
              </div>
              <Text className="font-medium text-gray-900 mb-2">Economia</Text>
              <Text className="text-sm text-gray-600">
                Reduz custos com impressão e atualização de cardápios
              </Text>
            </div>
          </div>
        </div>
      </Card>

      <p>Você pode copiar o link clicando no botão &quot;Copiar Link&quot;.</p>
    </main>
  )
} 