import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
  Button,
  StyleSheet,
} from 'react-native';
import { Product } from '../data/products';

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onBack,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product.prescription) {
      Alert.alert(
        'Medicamento Controlado',
        'Este medicamento requer prescrição médica. Você possui receita médica?',
        [
          {
            text: 'Não',
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: () => {
              onAddToCart(product, quantity);
              Alert.alert('Sucesso!', `${quantity}x ${product.name} adicionado ao carrinho.`, [
                { text: 'OK' },
              ]);
            },
          },
        ]
      );
    } else {
      onAddToCart(product, quantity);
      Alert.alert('Sucesso!', `${quantity}x ${product.name} adicionado ao carrinho.`, [
        { text: 'OK' },
      ]);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Produto</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.productCard}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="cover" />
            {product.prescription && (
              <View style={styles.prescriptionBadge}>
                <Text style={styles.prescriptionText}>RECEITA OBRIGATÓRIA</Text>
              </View>
            )}
          </View>

          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>

            <Text style={styles.manufacturer}>{product.manufacturer}</Text>

            <Text style={styles.category}>{product.category}</Text>

            <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Descrição:</Text>
              <Text style={styles.descriptionText}>{product.description}</Text>
            </View>

            <View style={styles.stockAndQuantityContainer}>
              <View style={styles.stockContainer}>
                <Text style={styles.stockLabel}>Estoque disponível:</Text>
                <Text style={product.stock > 10 ? styles.stockGood : styles.stockLow}>
                  {product.stock} unidades
                </Text>
              </View>

              <View style={styles.quantityContainer}>
                <Text style={styles.quantityLabel}>Quantidade:</Text>
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    onPress={decrementQuantity}
                    style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
                    activeOpacity={0.7}
                    disabled={quantity <= 1}>
                    <Text
                      style={[
                        styles.quantityButtonText,
                        quantity <= 1 && styles.quantityButtonTextDisabled,
                      ]}>
                      -
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.quantityValue}>{quantity}</Text>

                  <TouchableOpacity
                    onPress={incrementQuantity}
                    style={[
                      styles.quantityButton,
                      quantity >= product.stock && styles.quantityButtonDisabled,
                    ]}
                    activeOpacity={0.7}
                    disabled={quantity >= product.stock}>
                    <Text
                      style={[
                        styles.quantityButtonText,
                        quantity >= product.stock && styles.quantityButtonTextDisabled,
                      ]}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: R$ {(product.price * quantity).toFixed(2)}</Text>
        </View>

        {product.stock > 0 ? (
          <Button title="Adicionar ao Carrinho" onPress={handleAddToCart} color="#3b82f6" />
        ) : (
          <View style={styles.unavailableContainer}>
            <Text style={styles.unavailableText}>Produto Indisponível</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 18,
    color: '#3b82f6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  scrollView: {
    flex: 1,
  },
  productCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 256,
  },
  prescriptionBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#ef4444',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  prescriptionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 24,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  manufacturer: {
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 4,
  },
  category: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '500',
    marginBottom: 16,
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 16,
  },
  descriptionContainer: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  descriptionTitle: {
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  descriptionText: {
    color: '#374151',
    lineHeight: 24,
  },
  stockAndQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  stockContainer: {
    flex: 1,
  },
  stockLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  stockGood: {
    fontWeight: 'bold',
    color: '#059669',
  },
  stockLow: {
    fontWeight: 'bold',
    color: '#ef4444',
  },
  quantityContainer: {
    alignItems: 'center',
  },
  quantityLabel: {
    fontWeight: '500',
    marginBottom: 8,
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
    marginHorizontal: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalContainer: {
    marginBottom: 12,
  },
  totalText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  unavailableContainer: {
    backgroundColor: '#e5e7eb',
    padding: 12,
    borderRadius: 8,
  },
  unavailableText: {
    textAlign: 'center',
    color: '#6b7280',
    fontWeight: '500',
  },
});
