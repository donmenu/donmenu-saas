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
  restaurant_id: number
  sale_id: number
  menu_item_id: number
  combo_id: number | null
  quantity: number
  unit_price: string
  total_price: string
  cost_price: string | null
  gross_profit: string | null
  margin: string | null
  created_at: string
  menu_item: {
    id: number
    name: string
    description: string | null
    price: string
  }
}

interface Pedido {
  id: number
  restaurant_id: number
  sale_number: string
  customer_name: string | null
  customer_phone: string | null
  subtotal: string
  discount: string
  total: string
  payment_method: string
  status: string
  notes: string | null
  created_at: string
  updated_at: string
  items: PedidoItem[]
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

  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(parseFloat(value))
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
      case 'pending': return 'yellow'
      case 'preparing': return 'blue'
      case 'ready': return 'green'
      case 'completed': return 'gray'
      case 'cancelled': return 'red'
      default: return 'gray'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente'
      case 'preparing': return 'Preparando'
      case 'ready': return 'Pronto'
      case 'completed': return 'Entregue'
      case 'cancelled': return 'Cancelado'
      default: return status
    }
  }

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case 'pending': return 'preparing'
      case 'preparing': return 'ready'
      case 'ready': return 'completed'
      default: return currentStatus
    }
  }

  const getNextStatusText = (currentStatus: string) => {
    switch (currentStatus) {
      case 'pending': return 'Iniciar Preparo'
      case 'preparing': return 'Marcar Pronto'
      case 'ready': return 'Marcar Entregue'
      default: return 'Atualizar'
    }
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Pedido #</TableHeaderCell>
            <TableHeaderCell>Cliente</TableHeaderCell>
            <TableHeaderCell>Telefone</TableHeaderCell>
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
            const canUpdateStatus = ['pending', 'preparing', 'ready'].includes(pedido.status)
            
            return (
              <TableRow key={pedido.id}>
                <TableCell>
                  <Text className="font-medium">#{pedido.sale_number}</Text>
                </TableCell>
                <TableCell>
                  <Text className="font-medium">{pedido.customer_name || 'N/A'}</Text>
                </TableCell>
                <TableCell>
                  <Text className="font-medium">{pedido.customer_phone || 'N/A'}</Text>
                </TableCell>
                <TableCell>
                  <Text className="text-sm text-gray-600 dark:text-gray-400">
                    {pedido.items.length} item(s)
                  </Text>
                </TableCell>
                <TableCell>
                  <Text className="font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(pedido.total)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge color={getStatusColor(pedido.status)}>
                    {getStatusText(pedido.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDateTime(pedido.created_at)}
                  </Text>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="xs"
                      variant="secondary"
                      onClick={() => handleView(pedido)}
                      className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/40 border-0"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </Button>
                    {canUpdateStatus && (
                      <Button
                        size="xs"
                        variant="secondary"
                        onClick={() => updateStatus(pedido.id, nextStatus)}
                        disabled={updatingStatus === pedido.id}
                        className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800/40 border-0"
                      >
                        {updatingStatus === pedido.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                        ) : (
                          <CheckIcon className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      {/* Modal de visualização */}
      {isViewModalOpen && selectedPedido && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <Title>Pedido #{selectedPedido.sale_number}</Title>
                  <Text className="mt-2">Detalhes do pedido</Text>
                </div>
                <Button
                  variant="secondary"
                  onClick={handleViewClose}
                >
                  Fechar
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Text className="font-medium text-gray-700 dark:text-gray-300">Cliente:</Text>
                    <Text>{selectedPedido.customer_name || 'N/A'}</Text>
                  </div>
                  <div>
                    <Text className="font-medium text-gray-700 dark:text-gray-300">Telefone:</Text>
                    <Text>{selectedPedido.customer_phone || 'N/A'}</Text>
                  </div>
                  <div>
                    <Text className="font-medium text-gray-700 dark:text-gray-300">Status:</Text>
                    <Badge color={getStatusColor(selectedPedido.status)}>
                      {getStatusText(selectedPedido.status)}
                    </Badge>
                  </div>
                  <div>
                    <Text className="font-medium text-gray-700 dark:text-gray-300">Método de Pagamento:</Text>
                    <Text>{selectedPedido.payment_method}</Text>
                  </div>
                </div>

                <div>
                  <Text className="font-medium text-gray-700 dark:text-gray-300 mb-2">Itens do Pedido:</Text>
                  <div className="space-y-2">
                    {selectedPedido.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <Text className="font-medium">{item.menu_item.name}</Text>
                          <Text className="text-sm text-gray-500 dark:text-gray-400">
                            Qtd: {item.quantity} x {formatCurrency(item.unit_price)}
                          </Text>
                        </div>
                        <Text className="font-semibold">{formatCurrency(item.total_price)}</Text>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <Text className="font-medium">Total:</Text>
                    <Text className="font-bold text-lg">{formatCurrency(selectedPedido.total)}</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
