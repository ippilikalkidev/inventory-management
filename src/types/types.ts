export interface Product {
    name: string;
    category: string;
    price: string;
    quantity: number;
    value: number;
    disabled: boolean;
  }
  
 export interface StatCardProps {
    title: string;
    value: string | number;
    icon: JSX.Element;
  }

  export interface StatCardsData {
    totalProducts: number;
    totalStoreValue: number;
    outOfStock: number;
    categories: number;
  }
  
  export interface StatCardsProps {
    statCardsData: StatCardsData;
  }
  
  export interface ProductTableProps {
    products: Product[];
    onDelete: (productName: string) => void;
    onDisable: (productName: string) => void;
    onEdit: (productName: string) => void;
    isAdmin: boolean;
  }

  export interface EditModalProps {
    product: Product;
    onSave: (updatedProduct: Product) => void;
    onClose: () => void;
  }
  
  