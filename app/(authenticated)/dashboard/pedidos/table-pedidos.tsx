'use client'

import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Button,
  Badge,
  Title
} from '@tremor/react'
import { useState } from 'react'
import { EyeIcon, CheckIcon, XMarkIcon, ClockIcon } from '@heroicons/react/24/outline'

interface PedidoItem {
  id: number
  pedido_id: number
  item_id: number
  quantidade: number
  preco_unit: number
  observacoes?: string
  created_at: string
  item: {
    item_id: number
    name: string
    description: string
    price: number
  }
}

interface Pedido {
  pedido_id: number
  mesa: string
  cliente_nome: string
  status: string
  total: number
  observacoes?: string
  created_at: string
  updated_at: string
  pedido_itens: PedidoItem[]
}

interface PedidosTableProps {
  pedidos: Pedido[]
  onUpdate: () => void
}

export default function PedidosTable({ pedidos, onUpdate }: PedidosTableProps) {
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null)

  const handleView = (pedido: Pedido) => {
    setSelectedPedido(pedido)
    setIsViewModalOpen(true)
  }

  const handleViewClose = () => {
    setIsViewModalOpen(false)
    setSelectedPedido(null)
  }

  const updateStatus = async (pedidoId: number, newStatus: string) => {
    setUpdatingStatus(pedidoId)
    
    try {
      const response = await fetch(`/api/pedidos/${pedidoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        onUpdate()
      } else {
        alert('Erro ao atualizar status do pedido')
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      alert('Erro ao atualizar status do pedido')
    } finally {
      setUpdatingStatus(null)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente': return 'yellow'
      case 'preparando': return 'blue'
      case 'pronto': return 'green'
      case 'entregue': return 'gray'
      case 'cancelado': return 'red'
      default: return 'gray'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pendente': return 'Pendente'
      case 'preparando': return 'Preparando'
      case 'pronto': return 'Pronto'
      case 'entregue': return 'Entregue'
      case 'cancelado': return 'Cancelado'
      default: return status
    }
  }

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case 'pendente': return 'preparando'
      case 'preparando': return 'pronto'
      case 'pronto': return 'entregue'
      default: return currentStatus
    }
  }

  const getNextStatusText = (currentStatus: string) => {
    switch (currentStatus) {
      case 'pendente': return 'Iniciar Preparo'
      case 'preparando': return 'Marcar Pronto'
      case 'pronto': return 'Marcar Entregue'
      default: return 'Atualizar'
    }
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Pedido #</TableHeaderCell>
            <TableHeaderCell>Mesa</TableHeaderCell>
            <TableHeaderCell>Cliente</TableHeaderCell>
            <TableHeaderCell>Itens</TableHeaderCell>
            <TableHeaderCell>Total</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Data/Hora</TableHeaderCell>
            <TableHeaderCell>Ações</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pedidos.map((pedido) => {
            const nextStatus = getNextStatus(pedido.status)
            const canUpdateStatus = ['pendente', 'preparando', 'pronto'].includes(pedido.status)
            
            return (
              <TableRow key={pedido.pedido_id}>
                <TableCell>
                  <Text className="font-medium">#{pedido.pedido_id}</Text>
                </TableCell>
                <TableCell>
                  <Text className="font-medium">{pedido.mesa}</Text>
                </TableCell>
                <TableCell>
                  <Text className="font-medium">{pedido.cliente_nome}</Text>
                </TableCell>
                <TableCell>
                  <Text className="text-sm text-gray-600">
                    {pedido.pedido_itens.length} item(s)
                  </Text>
                </TableCell>
                <TableCell>
                  <Text className="font-semibold text-green-600">
                    {formatCurrency(pedido.total)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge color={getStatusColor(pedido.status)}>
                    {getStatusText(pedido.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Text className="text-sm text-gray-500">
                    {formatDateTime(pedido.created_at)}
                  </Text>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="xs"
                      variant="secondary"
                      onClick={() => handleView(pedido)}
                      icon={EyeIcon}
                    >
                      Ver
                    </Button>
                    
                    {canUpdateStatus && (
                      <Button
                        size="xs"
                        variant="secondary"
                        onClick={() => updateStatus(pedido.pedido_id, nextStatus)}
                        loading={updatingStatus === pedido.pedido_id}
                        disabled={updatingStatus === pedido.pedido_id}
                      >
                        {getNextStatusText(pedido.status)}
                      </Button>
                    )}
                    
                    {pedido.status === 'pendente' && (
                      <Button
                        size="xs"
                        variant="secondary"
                        color="red"
                        onClick={() => updateStatus(pedido.pedido_id, 'cancelado')}
                        loading={updatingStatus === pedido.pedido_id}
                        disabled={updatingStatus === pedido.pedido_id}
                        icon={XMarkIcon}
                      >
                        Cancelar
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      {/* Modal de Visualização */}
      {isViewModalOpen && selectedPedido && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <Title className="text-xl font-semibold text-gray-900">
                    Pedido #{selectedPedido.pedido_id}
                  </Title>
                  <Text className="text-gray-600">
                    Mesa {selectedPedido.mesa} • {selectedPedido.cliente_nome}
                  </Text>
                </div>
                <Button
                  onClick={handleViewClose}
                  variant="secondary"
                  icon={XMarkIcon}
                  size="xs"
                />
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="space-y-4">
                {selectedPedido.pedido_itens.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <Text className="font-medium text-gray-900">{item.item.name}</Text>
                      <Text className="text-sm text-gray-600">{item.item.description}</Text>
                    </div>
                    <div className="text-right">
                      <Text className="font-medium">{item.quantidade}x</Text>
                      <Text className="text-sm text-gray-600">
                        {formatCurrency(item.preco_unit)} cada
                      </Text>
                      <Text className="font-semibold text-green-600">
                        {formatCurrency(item.preco_unit * item.quantidade)}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <Text className="text-lg font-semibold text-gray-900">Total:</Text>
                  <Text className="text-xl font-bold text-green-600">
                    {formatCurrency(selectedPedido.total)}
                  </Text>
                </div>
                
                {selectedPedido.observacoes && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                    <Text className="text-sm font-medium text-yellow-800">Observações:</Text>
                    <Text className="text-sm text-yellow-700 mt-1">{selectedPedido.observacoes}</Text>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 