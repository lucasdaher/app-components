import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from 'react-native';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const [notifications, setNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationServices, setLocationServices] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [biometrics, setBiometrics] = useState(false);

  const handleNotificationToggle = (value: boolean) => {
    setNotifications(value);
    if (!value) {
      setPushNotifications(false);
      setEmailNotifications(false);
      Alert.alert(
        'Notificações Desabilitadas',
        'Todas as notificações foram desabilitadas. Você pode reabilitá-las individualmente a qualquer momento.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleBiometricsToggle = (value: boolean) => {
    if (value) {
      Alert.alert(
        'Habilitar Biometria',
        'Deseja usar sua impressão digital ou reconhecimento facial para acessar o aplicativo?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Habilitar',
            onPress: () => setBiometrics(true),
          },
        ]
      );
    } else {
      setBiometrics(false);
    }
  };

  const SettingItem: React.FC<{
    title: string;
    description?: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
    disabled?: boolean;
  }> = ({ title, description, value, onValueChange, disabled = false }) => (
    <View className="border-b border-gray-100 bg-white px-4 py-4">
      <View className="flex-row items-center justify-between">
        <View className="mr-4 flex-1">
          <Text className={`text-base font-medium ${disabled ? 'text-gray-400' : 'text-gray-800'}`}>
            {title}
          </Text>
          {description && (
            <Text className={`mt-1 text-sm ${disabled ? 'text-gray-300' : 'text-gray-600'}`}>
              {description}
            </Text>
          )}
        </View>
        <Switch
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          trackColor={{ false: '#f3f4f6', true: '#3b82f6' }}
          thumbColor={value ? '#ffffff' : '#9ca3af'}
        />
      </View>
    </View>
  );

  const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <View className="bg-gray-50 px-4 py-3">
      <Text className="text-sm font-bold uppercase tracking-wider text-gray-700">{title}</Text>
    </View>
  );

  const ActionItem: React.FC<{
    title: string;
    description?: string;
    onPress: () => void;
    color?: string;
  }> = ({ title, description, onPress, color = 'text-gray-800' }) => (
    <TouchableOpacity
      onPress={onPress}
      className="border-b border-gray-100 bg-white px-4 py-4"
      activeOpacity={0.7}>
      <Text className={`text-base font-medium ${color}`}>{title}</Text>
      {description && <Text className="mt-1 text-sm text-gray-600">{description}</Text>}
    </TouchableOpacity>
  );

  const handleClearCache = () => {
    Alert.alert(
      'Limpar Cache',
      'Isso irá remover dados temporários do aplicativo. Deseja continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          onPress: () => {
            Alert.alert('Cache Limpo', 'Os dados temporários foram removidos com sucesso.');
          },
        },
      ]
    );
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Restaurar Padrões',
      'Isso irá restaurar todas as configurações para os valores padrão. Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Restaurar',
          style: 'destructive',
          onPress: () => {
            setNotifications(true);
            setPushNotifications(false);
            setEmailNotifications(true);
            setDarkMode(false);
            setLocationServices(true);
            setAnalytics(false);
            setAutoUpdate(true);
            setBiometrics(false);
            Alert.alert(
              'Configurações Restauradas',
              'Todas as configurações foram restauradas para os valores padrão.'
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      <View className="border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={onBack} className="mr-4" activeOpacity={0.7}>
            <Text className="text-lg text-blue-500">← Voltar</Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">Configurações</Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <SectionHeader title="Notificações" />
        <SettingItem
          title="Notificações Gerais"
          description="Receber notificações do aplicativo"
          value={notifications}
          onValueChange={handleNotificationToggle}
        />
        <SettingItem
          title="Notificações Push"
          description="Receber alertas em tempo real"
          value={pushNotifications}
          onValueChange={setPushNotifications}
          disabled={!notifications}
        />
        <SettingItem
          title="Notificações por Email"
          description="Receber atualizações por email"
          value={emailNotifications}
          onValueChange={setEmailNotifications}
          disabled={!notifications}
        />

        <SectionHeader title="Aparência" />
        <SettingItem
          title="Modo Escuro"
          description="Usar tema escuro no aplicativo"
          value={darkMode}
          onValueChange={setDarkMode}
        />

        <SectionHeader title="Privacidade" />
        <SettingItem
          title="Serviços de Localização"
          description="Permitir acesso à localização para encontrar farmácias próximas"
          value={locationServices}
          onValueChange={setLocationServices}
        />
        <SettingItem
          title="Análise de Dados"
          description="Ajudar a melhorar o aplicativo compartilhando dados de uso"
          value={analytics}
          onValueChange={setAnalytics}
        />

        <SectionHeader title="Segurança" />
        <SettingItem
          title="Autenticação Biométrica"
          description="Usar impressão digital ou reconhecimento facial"
          value={biometrics}
          onValueChange={handleBiometricsToggle}
        />

        <SectionHeader title="Aplicativo" />
        <SettingItem
          title="Atualizações Automáticas"
          description="Baixar atualizações automaticamente"
          value={autoUpdate}
          onValueChange={setAutoUpdate}
        />

        <SectionHeader title="Armazenamento" />
        <ActionItem
          title="Limpar Cache"
          description="Remove arquivos temporários do aplicativo"
          onPress={handleClearCache}
        />

        <SectionHeader title="Configurações Avançadas" />
        <ActionItem
          title="Restaurar Padrões"
          description="Volta todas as configurações para os valores originais"
          onPress={handleResetSettings}
          color="text-red-600"
        />

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
};
