import React from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity, Image, Alert, Button } from 'react-native';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartModalProps {
  visible: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  visible,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Carrinho Vazio', 'Adicione produtos ao carrinho antes de finalizar a compra.');
      return;
    }

    Alert.alert(
      'Finalizar Compra',
      `Total: R$ ${totalPrice.toFixed(2)}\n\nDeseja finalizar a compra?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            onCheckout();
            Alert.alert(
              'Compra Finalizada!',
              'Seu pedido foi processado com sucesso. Você receberá um email de confirmação em breve.',
              [{ text: 'OK', onPress: onClose }]
            );
          },
        },
      ]
    );
  };

  const handleRemoveItem = (productId: number, productName: string) => {
    Alert.alert('Remover Produto', `Deseja remover "${productName}" do carrinho?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => onRemoveItem(productId),
      },
    ]);
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View className="mb-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <View className="flex-row">
        <Image
          source={{ uri: item.product.image }}
          className="mr-4 h-16 w-16 rounded-lg"
          resizeMode="cover"
        />

        <View className="flex-1">
          <View className="mb-1 flex-row items-start justify-between">
            <Text className="mr-2 flex-1 text-base font-bold" numberOfLines={2}>
              {item.product.name}
            </Text>
            <TouchableOpacity
              onPress={() => handleRemoveItem(item.product.id, item.product.name)}
              className="p-1"
              activeOpacity={0.7}>
              <Text className="text-lg text-red-500">🗑️</Text>
            </TouchableOpacity>
          </View>

          <Text className="mb-2 text-sm text-gray-600">{item.product.manufacturer}</Text>

          <View className="flex-row items-center justify-between">
            <Text className="font-bold text-green-600">R$ {item.product.price.toFixed(2)}</Text>

            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                className="h-8 w-8 items-center justify-center rounded-full bg-gray-200"
                activeOpacity={0.7}
                disabled={item.quantity <= 1}>
                <Text
                  className={`text-lg ${item.quantity <= 1 ? 'text-gray-400' : 'text-gray-700'}`}>
                  -
                </Text>
              </TouchableOpacity>

              <Text className="mx-3 text-lg font-bold">{item.quantity}</Text>

              <TouchableOpacity
                onPress={() =>
                  onUpdateQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1))
                }
                className="h-8 w-8 items-center justify-center rounded-full bg-gray-200"
                activeOpacity={0.7}
                disabled={item.quantity >= item.product.stock}>
                <Text
                  className={`text-lg ${item.quantity >= item.product.stock ? 'text-gray-400' : 'text-gray-700'}`}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-2 border-t border-gray-100 pt-2">
            <Text className="text-right font-bold text-gray-800">
              Subtotal: R$ {(item.product.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}>
      <View className="flex-1 bg-gray-50">
        <View className="border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-bold text-gray-800">Carrinho de Compras</Text>
            <TouchableOpacity onPress={onClose} className="p-2" activeOpacity={0.7}>
              <Text className="text-lg text-gray-500">✕</Text>
            </TouchableOpacity>
          </View>

          {cartItems.length > 0 && (
            <Text className="mt-1 text-gray-600">
              {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} no carrinho
            </Text>
          )}
        </View>

        {cartItems.length === 0 ? (
          <View className="flex-1 items-center justify-center px-8">
            <Text className="mb-4 text-6xl">🛒</Text>
            <Text className="mb-2 text-center text-xl font-bold text-gray-800">Carrinho Vazio</Text>
            <Text className="mb-6 text-center leading-6 text-gray-600">
              Adicione produtos ao seu carrinho para continuar.
            </Text>
            <Button title="Continuar Comprando" onPress={onClose} color="#3b82f6" />
          </View>
        ) : (
          <>
            <FlatList
              data={cartItems}
              renderItem={renderCartItem}
              keyExtractor={(item) => item.product.id.toString()}
              contentContainerStyle={{ padding: 16 }}
              showsVerticalScrollIndicator={false}
            />

            <View className="border-t border-gray-200 bg-white p-4">
              <View className="mb-4 flex-row items-center justify-between">
                <Text className="text-lg font-bold text-gray-800">Total Geral:</Text>
                <Text className="text-2xl font-bold text-green-600">
                  R$ {totalPrice.toFixed(2)}
                </Text>
              </View>

              <View className="flex-row space-x-3">
                <TouchableOpacity
                  onPress={onClose}
                  className="flex-1 rounded-lg bg-gray-200 py-3"
                  activeOpacity={0.7}>
                  <Text className="text-center font-medium text-gray-700">Continuar Comprando</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleCheckout}
                  className="flex-1 rounded-lg bg-blue-500 py-3"
                  activeOpacity={0.7}>
                  <Text className="text-center font-bold text-white">Finalizar Compra</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};
