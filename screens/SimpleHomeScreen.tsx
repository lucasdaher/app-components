import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { products, categories, Product } from '../data/products';

import Constants from 'expo-constants';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

interface HomeScreenProps {
  onProductPress: (product: Product) => void;
  onCartPress: () => void;
  onSearchPress: () => void;
  onSettingsPress: () => void;
  cartCount: number;
}

export const SimpleHomeScreen: React.FC<HomeScreenProps> = ({
  onProductPress,
  onCartPress,
  onSearchPress,
  onSettingsPress,
  cartCount,
}) => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    console.log('Loading started');
    const timer = setTimeout(() => {
      console.log('Loading finished');
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'Todos') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category === selectedCategory));
    }
  }, [selectedCategory]);

  const handleProductPress = (product: Product) => {
    if (product.stock === 0) {
      Alert.alert('Produto Indisponível', 'Este produto está fora de estoque.', [{ text: 'OK' }]);
      return;
    }
    onProductPress(product);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item)}
      activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />
        {item.prescription && (
          <View style={styles.prescriptionBadge}>
            <Text style={styles.prescriptionText}>RECEITA</Text>
          </View>
        )}
      </View>

      <Text style={styles.productName} numberOfLines={2}>
        {item.name}
      </Text>

      <Text style={styles.manufacturer}>{item.manufacturer}</Text>

      <Text style={styles.category}>{item.category}</Text>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
        <Text style={item.stock > 10 ? styles.stockGood : styles.stockLow}>
          {item.stock > 0 ? `${item.stock} disponível` : 'Fora de estoque'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item ? styles.categoryButtonActive : styles.categoryButtonInactive,
      ]}
      onPress={() => setSelectedCategory(item)}
      activeOpacity={0.7}>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item ? styles.categoryTextActive : styles.categoryTextInactive,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#FF334C" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.loadingText}>Carregando produtos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && (
        <View style={[styles.statusBar, { backgroundColor: '#FF334C' }]}>
          <StatusBar barStyle="light-content" />
        </View>
      )}
      {Platform.OS === 'android' && (
        <StatusBar backgroundColor="#FF334C" barStyle="light-content" />
      )}

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {/* <Text style={styles.title}>Drogaria Mobile</Text> */}
            <Image
              source={require('../assets/logo-white.png')}
              alt="Logo do iDroga"
              style={styles.imageLogo}
            />
            <View style={styles.headerButtons}>
              <TouchableOpacity
                onPress={onSearchPress}
                style={styles.headerButton}
                activeOpacity={0.7}>
                <Text style={styles.headerButtonText}>🔍</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onSettingsPress}
                style={styles.headerButton}
                activeOpacity={0.7}>
                <Text style={styles.headerButtonText}>⚙️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onCartPress} style={styles.cartButton} activeOpacity={0.7}>
                <Text style={styles.cartButtonText}>🛒</Text>
                {cartCount > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartCount > 99 ? '99+' : cartCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesList}
          />
        </View>

        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#FF334C',
  },
  header: {
    backgroundColor: '#FF334C',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 12 : 16,
    paddingTop: Platform.OS === 'ios' ? 12 : 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    marginRight: 8,
  },
  headerButtonText: {
    fontSize: 18,
    color: '#374151',
  },
  cartButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    position: 'relative',
  },
  cartButtonText: {
    fontSize: 18,
    color: '#ffffff',
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoriesList: {
    marginTop: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
  },
  categoryButtonActive: {
    backgroundColor: '#4B040DFF',
  },
  categoryButtonInactive: {
    backgroundColor: '#e5e7eb',
  },
  categoryText: {
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  categoryTextInactive: {
    color: '#374151',
  },
  productsList: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  row: {
    paddingHorizontal: 8,
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  imageLogo: {
    width: 80,
    height: 40,
    resizeMode: 'contain',
  },
  productImage: {
    width: '100%',
    height: 128,
    borderRadius: 8,
    marginBottom: 12,
  },
  prescriptionBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ef4444',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  prescriptionText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  manufacturer: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: '#2563eb',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
  },
  stockGood: {
    fontSize: 12,
    color: '#059669',
  },
  stockLow: {
    fontSize: 12,
    color: '#ef4444',
  },
});
