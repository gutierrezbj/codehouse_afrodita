// Recupero todos los productos
const getAll = () => {
    const prom = new Promise((resolve, reject) => {
        db.query('select * from products', (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
    return prom;
};

// Recupero un producto por ID
// select * from products where id = 1
const getById = (productId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'select * from products where id = ?',
            [productId],
            (err, result) => {
                if (err) return reject(err);
                if (result.length !== 1) return resolve(null);
                resolve(result[0]);
            }
        );
    });
};

// Inserta nuevo registro en la BD
// insert into products (name, description, price, category, available, created_at) values (...)
const create = ({ name, description, price, category }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'insert into products (name, description, price, category, available, created_at) values (?, ?, ?, ?, ?, ?)',
            [name, description, price, category, true, new Date()],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// Recuperar productos por categoría
const getByCategory = (category) => {
    return new Promise((resolve, reject) => {
        db.query(
            'select * from products where category = ?',
            [category],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
}

// Actualizo los datos de un producto
// update products set name = '', description = '', price = , category = '' where id = XX
const update = (id, { name, description, price, category }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'update products set name = ?, description = ?, price = ?, category = ? where id=?',
            [name, description, price, category, id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
}

const remove = (productId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'delete from products where id = ?',
            [productId],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
}

module.exports = {
    getAll, getById, create, getByCategory, update, remove
}