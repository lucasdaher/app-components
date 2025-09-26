import React from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Button,
  StyleSheet,
} from 'react-native';
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
    <View style={styles.cartItem}>
      <View style={styles.itemContent}>
        <Image source={{ uri: item.product.image }} style={styles.itemImage} resizeMode="cover" />

        <View style={styles.itemInfo}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemName} numberOfLines={2}>
              {item.product.name}
            </Text>
            <TouchableOpacity
              onPress={() => handleRemoveItem(item.product.id, item.product.name)}
              style={styles.removeButton}
              activeOpacity={0.7}>
              <Text style={styles.removeButtonText}>🗑️</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.itemManufacturer}>{item.product.manufacturer}</Text>

          <View style={styles.itemFooter}>
            <Text style={styles.itemPrice}>R$ {item.product.price.toFixed(2)}</Text>

            <View style={styles.quantityControls}>
              <TouchableOpacity
                onPress={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                style={[styles.quantityButton, item.quantity <= 1 && styles.quantityButtonDisabled]}
                activeOpacity={0.7}
                disabled={item.quantity <= 1}>
                <Text
                  style={[
                    styles.quantityButtonText,
                    item.quantity <= 1 && styles.quantityButtonTextDisabled,
                  ]}>
                  -
                </Text>
              </TouchableOpacity>

              <Text style={styles.quantityValue}>{item.quantity}</Text>

              <TouchableOpacity
                onPress={() =>
                  onUpdateQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1))
                }
                style={[
                  styles.quantityButton,
                  item.quantity >= item.product.stock && styles.quantityButtonDisabled,
                ]}
                activeOpacity={0.7}
                disabled={item.quantity >= item.product.stock}>
                <Text
                  style={[
                    styles.quantityButtonText,
                    item.quantity >= item.product.stock && styles.quantityButtonTextDisabled,
                  ]}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}>
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
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Carrinho de Compras</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.7}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {cartItems.length > 0 && (
            <Text style={styles.itemCount}>
              {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} no carrinho
            </Text>
          )}
        </View>

        {cartItems.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartIcon}>🛒</Text>
            <Text style={styles.emptyCartTitle}>Carrinho Vazio</Text>
            <Text style={styles.emptyCartText}>
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
              contentContainerStyle={styles.cartList}
              showsVerticalScrollIndicator={false}
            />

            <View style={styles.footer}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total Geral:</Text>
                <Text style={styles.totalValue}>R$ {totalPrice.toFixed(2)}</Text>
              </View>

              <View style={styles.footerButtons}>
                <TouchableOpacity
                  onPress={onClose}
                  style={styles.continueButton}
                  activeOpacity={0.7}>
                  <Text style={styles.continueButtonText}>Continuar Comprando</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleCheckout}
                  style={styles.checkoutButton}
                  activeOpacity={0.7}>
                  <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#6b7280',
  },
  itemCount: {
    marginTop: 4,
    color: '#6b7280',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyCartIcon: {
    fontSize: 96,
    marginBottom: 16,
  },
  emptyCartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyCartText: {
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  cartList: {
    padding: 16,
  },
  cartItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  itemContent: {
    flexDirection: 'row',
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    padding: 4,
  },
  removeButtonText: {
    fontSize: 18,
    color: '#ef4444',
  },
  itemManufacturer: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#e5e7eb',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonDisabled: {
    backgroundColor: '#f3f4f6',
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#374151',
  },
  quantityButtonTextDisabled: {
    color: '#9ca3af',
  },
  quantityValue: {
    marginHorizontal: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtotalContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  subtotalText: {
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
  },
  footerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueButtonText: {
    textAlign: 'center',
    fontWeight: '500',
    color: '#374151',
  },
  checkoutButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 8,
  },
  checkoutButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
