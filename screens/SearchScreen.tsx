import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  SectionList,
} from 'react-native';
import { products, Product } from '../data/products';

interface SearchScreenProps {
  onBack: () => void;
  onProductPress: (product: Product) => void;
}

interface ProductSection {
  title: string;
  data: Product[];
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ onBack, onProductPress }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [sectionResults, setSectionResults] = useState<ProductSection[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    if (searchText.length > 0) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase()) ||
          product.category.toLowerCase().includes(searchText.toLowerCase()) ||
          product.manufacturer.toLowerCase().includes(searchText.toLowerCase())
      );

      setSearchResults(filtered);

      const groupedByCategory = filtered.reduce(
        (acc, product) => {
          const category = product.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        },
        {} as Record<string, Product[]>
      );

      const sections: ProductSection[] = Object.keys(groupedByCategory).map((category) => ({
        title: category,
        data: groupedByCategory[category],
      }));

      setSectionResults(sections);
    } else {
      setSearchResults([]);
      setSectionResults([]);
    }
  }, [searchText]);

  const handleSearch = () => {
    if (searchText.trim() && !recentSearches.includes(searchText.trim())) {
      setRecentSearches((prev) => [searchText.trim(), ...prev.slice(0, 4)]);
    }
  };

  const handleRecentSearchPress = (search: string) => {
    setSearchText(search);
  };

  const clearSearch = () => {
    setSearchText('');
    setSearchResults([]);
    setSectionResults([]);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      className="m-2 flex-row rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
      onPress={() => onProductPress(item)}
      activeOpacity={0.7}>
      <Image
        source={{ uri: item.image }}
        className="mr-4 h-16 w-16 rounded-lg"
        resizeMode="cover"
      />

      <View className="flex-1">
        <View className="mb-1 flex-row items-start justify-between">
          <Text className="mr-2 flex-1 text-base font-bold" numberOfLines={2}>
            {item.name}
          </Text>
          {item.prescription && (
            <View className="rounded bg-red-500 px-1 py-0.5">
              <Text className="text-xs font-bold text-white">RECEITA</Text>
            </View>
          )}
        </View>

        <Text className="mb-1 text-sm text-gray-600">{item.manufacturer}</Text>

        <Text className="mb-2 text-xs text-blue-600">{item.category}</Text>

        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold text-green-600">R$ {item.price.toFixed(2)}</Text>
          <Text className={`text-xs ${item.stock > 10 ? 'text-green-600' : 'text-red-500'}`}>
            {item.stock > 0 ? `${item.stock} disponível` : 'Fora de estoque'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title } }: { section: ProductSection }) => (
    <View className="mx-2 mt-2 rounded-t-lg bg-gray-100 px-4 py-2">
      <Text className="font-bold text-gray-700">{title}</Text>
    </View>
  );

  const renderRecentSearch = ({ item }: { item: string }) => (
    <TouchableOpacity
      className="mb-2 mr-2 rounded-full bg-gray-100 px-3 py-2"
      onPress={() => handleRecentSearchPress(item)}
      activeOpacity={0.7}>
      <Text className="text-gray-700">{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      <View className="bg-white px-4 py-3 shadow-sm">
        <View className="mb-3 flex-row items-center">
          <TouchableOpacity onPress={onBack} className="mr-4" activeOpacity={0.7}>
            <Text className="text-lg text-blue-500">← Voltar</Text>
          </TouchableOpacity>
          <Text className="flex-1 text-xl font-bold text-gray-800">Buscar Produtos</Text>
        </View>

        <View className="flex-row items-center rounded-lg bg-gray-100 px-3 py-2">
          <Text className="mr-2 text-gray-500">🔍</Text>
          <TextInput
            className="flex-1 text-gray-700"
            placeholder="Digite o nome do produto, categoria ou fabricante..."
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={clearSearch} className="ml-2" activeOpacity={0.7}>
              <Text className="text-gray-500">✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {searchText.length === 0 && recentSearches.length > 0 && (
        <View className="mx-4 mt-4 rounded-lg bg-white p-4 shadow-sm">
          <Text className="mb-3 font-bold text-gray-800">Buscas Recentes:</Text>
          <FlatList
            data={recentSearches}
            renderItem={renderRecentSearch}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            scrollEnabled={false}
          />
        </View>
      )}

      {searchText.length > 0 && (
        <View className="flex-1">
          {searchResults.length > 0 ? (
            <>
              <View className="px-4 py-2">
                <Text className="text-gray-600">
                  {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado
                  {searchResults.length !== 1 ? 's' : ''}
                </Text>
              </View>

              <SectionList
                sections={sectionResults}
                renderItem={renderProduct}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            </>
          ) : (
            <View className="flex-1 items-center justify-center px-8">
              <Text className="mb-4 text-6xl">🔍</Text>
              <Text className="mb-2 text-center text-xl font-bold text-gray-800">
                Nenhum produto encontrado
              </Text>
              <Text className="text-center leading-6 text-gray-600">
                Tente buscar por outro termo ou verifique a ortografia.
              </Text>
            </View>
          )}
        </View>
      )}

      {searchText.length === 0 && recentSearches.length === 0 && (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="mb-4 text-6xl">💊</Text>
          <Text className="mb-2 text-center text-xl font-bold text-gray-800">
            Encontre seus medicamentos
          </Text>
          <Text className="text-center leading-6 text-gray-600">
            Digite o nome do produto, categoria ou fabricante para começar a buscar.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};
