import { useState } from 'react';
import { SimpleHomeScreen as HomeScreen } from './screens/SimpleHomeScreen';
import { SimpleProductDetailScreen as ProductDetailScreen } from './screens/SimpleProductDetailScreen';
import { SimpleCartModal as CartModal, CartItem } from './components/SimpleCartModal';
import { Product } from './data/products';
import { StatusBar } from 'react-native';

type Screen = 'home' | 'productDetail' | 'search' | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const updateCartQuantity = (productId: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('productDetail');
  };

  const handleBack = () => {
    setCurrentScreen('home');
    setSelectedProduct(null);
  };

  const handleSearch = () => {
    setCurrentScreen('search');
  };

  const handleSettings = () => {
    setCurrentScreen('settings');
  };

  const handleCartPress = () => {
    setShowCart(true);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            onProductPress={handleProductPress}
            onCartPress={handleCartPress}
            onSearchPress={handleSearch}
            onSettingsPress={handleSettings}
            cartCount={getTotalCartItems()}
          />
        );
      case 'productDetail':
        if (!selectedProduct) return null;
        return (
          <ProductDetailScreen
            product={selectedProduct}
            onBack={handleBack}
            onAddToCart={addToCart}
          />
        );
      case 'search':
        handleBack();
        return null;
      case 'settings':
        handleBack();
        return null;
      default:
        return null;
    }
  };

  return (
    <>
      {renderCurrentScreen()}

      <CartModal
        visible={showCart}
        onClose={() => setShowCart(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={clearCart}
      />

      <StatusBar barStyle="default" />
    </>
  );
}
