export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  prescription: boolean;
  stock: number;
  manufacturer: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Dipirona 500mg',
    category: 'Analgésicos',
    price: 12.5,
    image: 'https://via.placeholder.com/150x150/0066cc/ffffff?text=Dipirona',
    description: 'Analgésico e antitérmico. Alívio rápido para dores e febre.',
    prescription: false,
    stock: 50,
    manufacturer: 'FarmaLab',
  },
  {
    id: 2,
    name: 'Ibuprofeno 600mg',
    category: 'Anti-inflamatórios',
    price: 18.9,
    image: 'https://via.placeholder.com/150x150/cc6600/ffffff?text=Ibuprofeno',
    description: 'Anti-inflamatório não esteroide. Reduz dor e inflamação.',
    prescription: false,
    stock: 30,
    manufacturer: 'MediPlus',
  },
  {
    id: 3,
    name: 'Omeprazol 20mg',
    category: 'Gastroenterologia',
    price: 25.3,
    image: 'https://via.placeholder.com/150x150/009966/ffffff?text=Omeprazol',
    description: 'Inibidor da bomba de prótons. Reduz acidez estomacal.',
    prescription: false,
    stock: 0,
    manufacturer: 'PharmaGen',
  },
  {
    id: 4,
    name: 'Amoxicilina 500mg',
    category: 'Antibióticos',
    price: 45.6,
    image: 'https://via.placeholder.com/150x150/cc0066/ffffff?text=Amoxicilina',
    description: 'Antibiótico de amplo espectro. Combate infecções bacterianas.',
    prescription: true,
    stock: 15,
    manufacturer: 'BioFarma',
  },
  {
    id: 5,
    name: 'Vitamina D3 2000UI',
    category: 'Vitaminas',
    price: 35.8,
    image: 'https://via.placeholder.com/150x150/ffcc00/ffffff?text=VitaminaD3',
    description: 'Suplemento vitamínico. Fortalece ossos e sistema imunológico.',
    prescription: false,
    stock: 40,
    manufacturer: 'NutriHealth',
  },
  {
    id: 6,
    name: 'Losartana 50mg',
    category: 'Cardiovascular',
    price: 22.7,
    image: 'https://via.placeholder.com/150x150/6600cc/ffffff?text=Losartana',
    description: 'Anti-hipertensivo. Controla a pressão arterial.',
    prescription: true,
    stock: 20,
    manufacturer: 'CardioMed',
  },
  {
    id: 7,
    name: 'Paracetamol 750mg',
    category: 'Analgésicos',
    price: 8.9,
    image: 'https://via.placeholder.com/150x150/00ccff/ffffff?text=Paracetamol',
    description: 'Analgésico e antipirético. Alívio de dores leves a moderadas.',
    prescription: false,
    stock: 60,
    manufacturer: 'GenericPharma',
  },
  {
    id: 8,
    name: 'Loratadina 10mg',
    category: 'Antialérgicos',
    price: 16.4,
    image: 'https://via.placeholder.com/150x150/ff6600/ffffff?text=Loratadina',
    description: 'Anti-histamínico. Alívio de sintomas alérgicos.',
    prescription: false,
    stock: 35,
    manufacturer: 'AllergyFree',
  },
];

export const categories: string[] = [
  'Todos',
  'Analgésicos',
  'Anti-inflamatórios',
  'Gastroenterologia',
  'Antibióticos',
  'Vitaminas',
  'Cardiovascular',
  'Antialérgicos',
];
