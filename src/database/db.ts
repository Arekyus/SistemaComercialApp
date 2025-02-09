import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'SistemaComercialDB', location: 'default' },
  () => {
    console.log('Database opened successfully');
    initDatabase(); // Chama a função de inicialização do banco de dados
  },
  (error) => {
    console.error('Error opening database:', error);
  }
);

const initDatabase = () => {
  console.log('Initializing database...');
  db.transaction((tx) => {
    // Cria as tabelas
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT,
        name TEXT,
        quantity INTEGER,
        cost REAL,
        price REAL
      );`,
      [],
      () => {
        console.log('Products table created or already exists');
        insertDefaultProduct(tx); // Insere um produto padrão após criar a tabela
      },
      (_, error) => console.error('Error creating products table:', error)
    );

    // Cria as outras tabelas (sales e purchases)
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerName TEXT,
        customerPhone TEXT,
        totalAmount REAL,
        paymentMethod TEXT,
        date TEXT
      );`,
      [],
      () => console.log('Sales table created or already exists'),
      (_, error) => console.error('Error creating sales table:', error)
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS purchases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        supplierName TEXT,
        purchaseNumber TEXT,
        date TEXT
      );`,
      [],
      () => console.log('Purchases table created or already exists'),
      (_, error) => console.error('Error creating purchases table:', error)
    );
  });
};

// Função para inserir um produto padrão
const insertDefaultProduct = (tx: SQLite.Transaction) => {
  const defaultProduct = {
    code: 'PROD001',
    name: 'Produto Padrão',
    quantity: 10,
    cost: 5.0,
    price: 10.0,
  };

  tx.executeSql(
    `INSERT INTO products (code, name, quantity, cost, price) VALUES (?, ?, ?, ?, ?)`,
    [defaultProduct.code, defaultProduct.name, defaultProduct.quantity, defaultProduct.cost, defaultProduct.price],
    (_, result) => {
      console.log('Default product inserted:', result.insertId);
    },
    (_, error) => {
      console.error('Error inserting default product:', error);
    }
  );
};

export { db, initDatabase };