'use client'

import { useState, useEffect } from 'react'
import { Card, Title, Text, Button, Badge } from '@tremor/react'
import { ShoppingCartIcon, PlusIcon, MinusIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'

interface Item {
  item_id: number
  name: string
  description: string
  price: number
  category: {
    category_id: number
    name: string
  }
}

interface CartItem {
  item: Item
  quantity: number
}

export default function CardapioPage() {
  const [itens, setItens] = useState<Item[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showCart, setShowCart] = useState(false)
  const [submittingOrder, setSubmittingOrder] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  // Buscar itens do cardápio
  useEffect(() => {
    const fetchItens = async () => {
      try {
        const response = await fetch('/api/cardapio-publico')
        if (response.ok) {
          const data = await response.json()
          setItens(data)
        }
      } catch (error) {
        console.error('Erro ao buscar cardápio:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchItens()
  }, [])

  // Adicionar item ao carrinho
  const addToCart = (item: Item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.item.item_id === item.item_id)
      
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.item.item_id === item.item_id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      } else {
        return [...prevCart, { item, quantity: 1 }]
      }
    })
  }

  // Remover item do carrinho
  const removeFromCart = (itemId: number) => {
    setCart(prevCart => prevCart.filter(cartItem => cartItem.item.item_id !== itemId))
  }

  // Atualizar quantidade
  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
      return
    }

    setCart(prevCart =>
      prevCart.map(cartItem =>
        cartItem.item.item_id === itemId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    )
  }

  // Calcular total do carrinho
  const cartTotal = cart.reduce((total, cartItem) => {
    return total + (Number(cartItem.item.price) * cartItem.quantity)
  }, 0)

  // Calcular total de itens no carrinho
  const cartItemCount = cart.reduce((total, cartItem) => total + cartItem.quantity, 0)

  // Agrupar itens por categoria
  const itensPorCategoria = itens.reduce((acc, item) => {
    const categoria = item.category.name
    if (!acc[categoria]) {
      acc[categoria] = []
    }
    acc[categoria].push(item)
    return acc
  }, {} as Record<string, Item[]>)

  // Enviar pedido
  const submitOrder = async () => {
    if (cart.length === 0) return

    setSubmittingOrder(true)
    
    try {
      const mesa = prompt('Digite o número da sua mesa:') || 'Mesa'
      const clienteNome = prompt('Digite seu nome:') || 'Cliente'
      
      const orderData = {
        mesa,
        cliente_nome: clienteNome,
        itens: cart.map(cartItem => ({
          item_id: cartItem.item.item_id,
          quantidade: cartItem.quantity,
          preco_unit: cartItem.item.price
        })),
        total: cartTotal
      }

      const response = await fetch('/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        setOrderSuccess(true)
        setCart([])
        setShowCart(false)
        
        // Resetar sucesso após 3 segundos
        setTimeout(() => setOrderSuccess(false), 3000)
      } else {
        alert('Erro ao enviar pedido. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro ao enviar pedido:', error)
      alert('Erro ao enviar pedido. Tente novamente.')
    } finally {
      setSubmittingOrder(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <Text className="text-gray-600">Carregando cardápio...</Text>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <div>
                <Title className="text-2xl font-bold text-gray-900">Don Menu</Title>
                <Text className="text-gray-600">Cardápio Digital</Text>
              </div>
            </div>
            
            {/* Carrinho */}
            <Button
              onClick={() => setShowCart(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg shadow-lg relative"
              icon={ShoppingCartIcon}
            >
              Carrinho
              {cartItemCount > 0 && (
                <Badge color="red" className="absolute -top-2 -right-2 bg-red-500 text-white">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mensagem de sucesso */}
        {orderSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
            <CheckIcon className="w-6 h-6 text-green-600 mr-3" />
            <div>
              <Text className="text-green-800 font-medium">Pedido enviado com sucesso!</Text>
              <Text className="text-green-600 text-sm">Aguarde, seu pedido será preparado.</Text>
            </div>
          </div>
        )}

        {/* Cardápio */}
        <div className="space-y-8">
          {Object.entries(itensPorCategoria).map(([categoria, itensCategoria]) => (
            <div key={categoria}>
              <div className="mb-6">
                <Title className="text-2xl font-bold text-gray-900 mb-2">{categoria}</Title>
                <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {itensCategoria.map((item) => (
                  <Card key={item.item_id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <Title className="text-lg font-semibold text-gray-900 mb-2">{item.name}</Title>
                          <Text className="text-gray-600 text-sm mb-3">{item.description}</Text>
                        </div>
                        <Badge color="orange" className="bg-orange-100 text-orange-800">
                          {formatCurrency(item.price)}
                        </Badge>
                      </div>
                      
                      <Button
                        onClick={() => addToCart(item)}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                        icon={PlusIcon}
                      >
                        Adicionar ao Carrinho
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal do Carrinho */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <Title className="text-xl font-semibold text-gray-900">Seu Pedido</Title>
                <Button
                  onClick={() => setShowCart(false)}
                  variant="secondary"
                  icon={XMarkIcon}
                  size="xs"
                />
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-96">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <Text className="text-gray-500">Seu carrinho está vazio</Text>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((cartItem) => (
                    <div key={cartItem.item.item_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <Text className="font-medium text-gray-900">{cartItem.item.name}</Text>
                        <Text className="text-sm text-gray-600">{formatCurrency(cartItem.item.price)} cada</Text>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Button
                          onClick={() => updateQuantity(cartItem.item.item_id, cartItem.quantity - 1)}
                          size="xs"
                          variant="secondary"
                          icon={MinusIcon}
                        />
                        
                        <span className="w-8 text-center font-medium">{cartItem.quantity}</span>
                        
                        <Button
                          onClick={() => updateQuantity(cartItem.item.item_id, cartItem.quantity + 1)}
                          size="xs"
                          variant="secondary"
                          icon={PlusIcon}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <Text className="text-lg font-semibold text-gray-900">Total:</Text>
                  <Text className="text-xl font-bold text-orange-600">{formatCurrency(cartTotal)}</Text>
                </div>
                
                <Button
                  onClick={submitOrder}
                  loading={submittingOrder}
                  disabled={submittingOrder}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3"
                >
                  {submittingOrder ? 'Enviando Pedido...' : 'Finalizar Pedido'}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 