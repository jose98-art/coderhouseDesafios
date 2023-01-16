const fs = require("fs");
const path = "./Info.json";

class ManagerUsuarios {
  constructor() {
    this.path = [];
  }

  async getProducts() {
    try {
      if (fs.existsSync(path)) {
        const usuarios = await fs.promises.readFile(path, "utf-8");
        const usuarioJSON = JSON.parse(usuarios);
        return usuarioJSON;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
    return this.path;
  }

  async addProduct(produtcs) {
    try {
      const { title, description, price, thumbnail, code, stock } = produtcs;
      const product = {
        id: this.#generarId(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      const productFile = await this.getProducts();
      productFile.push(product);
      this.path.push(product);
      await fs.promises.writeFile(path, JSON.stringify(productFile));
    } catch (error) {
      console.log(error);
    }
  }

  deletFileProducts(parametro) {
    if (parametro === "si") {
      fs.unlinkSync(path);
    }
  }

  getProductById(id) {
    return (
      this.path.find((propiedad) => propiedad.id === id) ||
      `El producto con el id ${id} no existe`
    );
  }
    
  updateProduct(id, title){
        const actualizar = this.path.find(prop => prop.id === id)
        return actualizar.title = title
    }

  deleteProduct(id) {
    return this.path.filter((elemente) => elemente.id !== id);
  }

  #generarId() {
    const count = this.path.length;
    const idIncre = count > 0 ? this.path[count - 1].id + 1 : 1;
    return idIncre;
  }
}
const manager = new ManagerUsuarios();
const usuario1 = {
  title: "mochila",
  description: "mochila negra",
  price: 234,
  thumbnail: 23,
  code: 2390,
  stock: 2,
};
const usuario2 = {
  title: "tenis",
  description: "tenis negra",
  price: 345,
  thumbnail: 23,
  code: 2345,
  stock: 23,
};
const usuario3 = {
  title: "playera",
  description: "playera negra",
  price: 234,
  thumbnail: 12,
  code: 1938,
  stock: 32,
};
async function prueba() {
  // mostramos el archivo
  console.log(await manager.getProducts());
  // agregamos productos
  await manager.addProduct(usuario1);
  await manager.addProduct(usuario2);
  await manager.addProduct(usuario3);
  // mostramos un producto que si existe
  console.log("este producto si existe", manager.getProductById(1));
  // mostramos un producto que no existe por su id
  console.log(manager.getProductById(5));
  // actualizamos un producto
  console.log('actualizado',manager.updateProduct(1, 'canc'))
  //
  console.log(manager.deleteProduct(2));
  
  //eliminamos el archivo .json
  // manager.deletFileProducts('si')
}

prueba();
