# Aplicativo de demonstração

Este aplicativo tem como objetivo realizar a demonstração de componentes do React Native e suas utilizações. Foi desenvolvido para a matéria de Desenvolvimento Mobile.

## Sumário

- [Sobre o Aplicativo](#sobre-o-aplicativo)
- [Componentes do React Native que foram usados](#componentes-do-react-native-que-foram-usados)
  - [View](#1-view)
  - [Text](#2-text)
  - [TextInput](#3-textinput)
  - [Button](#4-button)
  - [Alert](#5-alert)
  - [Image](#6-image)
  - [Modal](#7-modal)
  - [ActivityIndicator](#8-activityindicator)
  - [FlatList](#9-flatlist)
  - [SafeAreaView](#10-safeareaview)
  - [ScrollView](#11-scrollview)
  - [SectionList](#12-sectionlist)
  - [StatusBar](#13-statusbar)
  - [Switch](#14-switch)
  - [TouchableOpacity](#15-touchableopacity)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Funcionalidades implementadas](#funcionalidades-implementadas)
  - [Tela Principal (HomeScreen)](#tela-principal-homescreen)
  - [Tela de Detalhes (ProductDetailScreen)](#tela-de-detalhes-productdetailscreen)
  - [Tela de Busca (SearchScreen)](#tela-de-busca-searchscreen)
  - [Modal do Carrinho (CartModal)](#modal-do-carrinho-cartmodal)
  - [Modal do Carrinho (CartModal)](#modal-do-carrinho-cartmodal)
  - [Tela de Configurações (SettingsScreen)](#tela-de-configurações-settingsscreen)
- [Como executar](#como-executar)
- [Aprendizados](#aprendizados)

## Sobre o Aplicativo

O **iDroga** é um marketplace completo para produtos farmacêuticos, permitindo aos usuários navegar, buscar e comprar medicamentos e produtos de farmácia. O aplicativo foi desenvolvido com foco em demonstrar o uso prático de componentes React Native essenciais.

## Componentes do React Native que foram usados

### 1. View

- **Onde foi utilizado**: Em todas as telas como container principal
- **Objetivo de termos utilizado**: Estruturação de layouts, containers flexbox e atuando como "div" do html, digamos assim.
- **Arquivos que utilizam**: `screens/HomeScreen.tsx`, `screens/ProductDetailScreen.tsx`, `screens/SearchScreen.tsx`, `screens/SettingsScreen.tsx`, `components/CartModal.tsx`

### 2. Text

- **Onde foi utilizado**: Em todas as telas para exibição de conteúdo textual
- **Objetivo de termos utilizado**: Títulos, descrições, preços, labels
- **Arquivos que utilizam**: Todas as telas e componentes

### 3. TextInput

- **Onde foi utilizado**: Tela de busca (`SearchScreen.tsx`)
- **Objetivo de termos utilizado**: Campo de busca de produtos
- **Arquivos que utilizam**: `screens/SearchScreen.tsx:67-77`

### 4. Button

- **Onde foi utilizado**: Tela de detalhes do produto e modal do carrinho
- **Objetivo de termos utilizado**: Ações principais como "Adicionar ao Carrinho" e "Continuar Comprando"
- **Arquivos que utilizam**: `screens/ProductDetailScreen.tsx:146-150`, `components/CartModal.tsx:117-121`

### 5. Alert

- **Onde foi utilizado**: Em múltiplas telas para exibir diálogos
- **Objetivo de termos utilizado**: Confirmações de ações, avisos, mensagens de erro
- **Arquivos que utilizam**:
  - `screens/HomeScreen.tsx:42-48` (produto indisponível)
  - `screens/ProductDetailScreen.tsx:39-62` (medicamento controlado)
  - `screens/SettingsScreen.tsx:24-32`, `153-167`, `170-184` (configurações)
  - `components/CartModal.tsx:26-45`, `48-65` (checkout e remoção)

### 6. Image

- **Onde foi utilizado**: Exibição de imagens de produtos
- **Objetivo de termos utilizado**: Fotos dos medicamentos e produtos
- **Arquivos que utilizam**:
  - `screens/HomeScreen.tsx:77-82` (grid de produtos)
  - `screens/ProductDetailScreen.tsx:95-100` (detalhes)
  - `screens/SearchScreen.tsx:87-92` (resultados da busca)
  - `components/CartModal.tsx:87-92` (itens do carrinho)

### 7. Modal

- **Onde foi utilizado**: Carrinho de compras
- **Objetivo de termos utilizado**: Sobreposição para exibir/editar itens do carrinho
- **Arquivos que utilizam**: `components/CartModal.tsx:88-94`

### 8. ActivityIndicator

- **Onde foi utilizado**: Tela inicial durante o carregamento
- **Objetivo de termos utilizado**: Indicador de loading enquanto carrega produtos
- **Arquivos que utilizam**: `screens/HomeScreen.tsx:122-128`

### 9. FlatList

- **Onde foi utilizado**: Múltiplas telas para listas horizontais e verticais
- **Objetivo de termos utilizado**:
  - Lista de categorias (horizontal)
  - Grid de produtos (vertical)
  - Lista de buscas recentes
- **Arquivos que utilizam**:
  - `screens/HomeScreen.tsx:175-182` (categorias)
  - `screens/HomeScreen.tsx:184-192` (produtos)
  - `screens/SearchScreen.tsx:149-156` (buscas recentes)
  - `components/CartModal.tsx:120-127` (itens do carrinho)

### 10. SafeAreaView

- **Onde foi utilizado**: Em todas as telas como container raiz
- **Objetivo de termos utilizado**: Evitar sobreposição com áreas seguras do dispositivo (notch, status bar)
- **Arquivos que utilizam**: Todas as telas principais

### 11. ScrollView

- **Onde foi utilizado**: Tela de detalhes do produto e configurações
- **Objetivo de termos utilizado**: Rolagem vertical para conteúdo que excede a tela
- **Arquivos que utilizam**:
  - `screens/ProductDetailScreen.tsx:88-140`
  - `screens/SettingsScreen.tsx:174-235`

### 12. SectionList

- **Onde foi utilizado**: Tela de busca para agrupar produtos por categoria
- **Objetivo de termos utilizado**: Lista de resultados agrupados por categoria de medicamentos
- **Arquivos que utilizam**: `screens/SearchScreen.tsx:160-168`

### 13. StatusBar

- **Onde foi utilizado**: Em todas as telas para controle da barra de status
- **Objetivo de termos utilizado**: Controle da aparência da barra de status (cor, estilo)
- **Arquivos que utilizam**: Todas as telas e `App.tsx:129`

### 14. Switch

- **Onde foi utilizado**: Tela de configurações
- **Objetivo de termos utilizado**: Controles liga/desliga para configurações do app
- **Arquivos que utilizam**: `screens/SettingsScreen.tsx:65-84` (componente SettingItem)

### 15. TouchableOpacity

- **Onde foi utilizado**: Em todas as telas para elementos tocáveis
- **Objetivo de termos utilizado**:
  - Botões personalizados
  - Cards de produtos clicáveis
  - Botões de navegação
  - Controles de quantidade
- **Arquivos que utilizam**: Amplamente usado em todas as telas

## Estrutura do Projeto

```bash
app-components/
├── components/
│   └── CartModal.tsx          # Modal do carrinho (Modal, FlatList, TouchableOpacity)
│   └── Container.tsx          # Container
│   └── EditScreenInfo.tsx     # Tela de edições
│   └── ScreenContent.tsx      # Tela de conteúdo
├── data/
│   └── products.ts            # Dados dos produtos e categorias
├── screens/
│   ├── HomeScreen.tsx         # Tela principal (FlatList, ActivityIndicator, SafeAreaView)
│   ├── ProductDetailScreen.tsx # Detalhes do produto (ScrollView, Image, Button)
│   ├── SearchScreen.tsx       # Busca (TextInput, SectionList, FlatList)
│   └── SettingsScreen.tsx     # Configurações (Switch, ScrollView, Alert)
├── App.tsx                    # Componente principal
└── README.md                  # Este arquivo
```

## Funcionalidades implementadas

### Tela Principal (HomeScreen)

- **Componentes**: View, Text, FlatList, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, Alert, Image
- **Recursos**:
  - Loading inicial com ActivityIndicator
  - Grid de produtos com FlatList
  - Filtros por categoria
  - Navegação para carrinho, busca e configurações

### Tela de Detalhes (ProductDetailScreen)

- **Componentes**: View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Alert, Image, Button
- **Recursos**:
  - Exibição detalhada do produto
  - Controle de quantidade
  - Validação para medicamentos controlados
  - Rolagem com ScrollView

### Tela de Busca (SearchScreen)

- **Componentes**: View, Text, TextInput, FlatList, TouchableOpacity, SafeAreaView, StatusBar, Image, SectionList
- **Recursos**:
  - Busca em tempo real
  - Histórico de buscas
  - Resultados agrupados por categoria com SectionList
  - Interface limpa e responsiva

### Modal do Carrinho (CartModal)

- **Componentes**: View, Text, Modal, FlatList, TouchableOpacity, Image, Alert, Button
- **Recursos**:
  - Visualização dos itens
  - Controle de quantidade
  - Remoção de itens
  - Checkout com validação

### Tela de Configurações (SettingsScreen)

- **Componentes**: View, Text, SafeAreaView, StatusBar, TouchableOpacity, Switch, ScrollView, Alert
- **Recursos**:
  - Múltiplas configurações com Switch
  - Validações e confirmações
  - Agrupamento por seções
  - Ações destrutivas com confirmação

## Como executar

1. **Certifique-se que o ambiente Expo está configurado**

2. **Instale as dependências:**

   ```bash
   npm install
   ```

   ou

   ```bash
   bun install
   ```

3. **Execute o aplicativo:**

   ```bash
   npm start
   ```

   ou

   ```bash
   bun start
   ```

4. **Escaneie o QR Code** com o app Expo Go no seu dispositivo ou execute em um emulador.

## Aprendizados

Este projeto demonstra o uso prático de todos os componentes React Native solicitados, mostrando:

1. **Como estruturar um app** com múltiplas telas
2. **Gerenciamento de estado** entre componentes
3. **Navegação simples** sem bibliotecas externas
4. **Boas práticas** de UX/UI para aplicações móveis
5. **Integração harmoniosa** entre diferentes componentes
6. **Tratamento de casos especiais** (produtos controlados, validações)

O aplicativo serve como um exemplo completo de como utilizar os componentes fundamentais do React Native para que possamos desenvolver a entrega final do aplicativo do **iDroga**.
