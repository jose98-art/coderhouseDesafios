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
    try {
      const product = this.getProducts()
      if(product){
        const indice = product.findIndex((pro)=> pro.id === id)
        if(indice >= 0){
          product[indice] = {...product[indice], ...title}
          fs.writeFileSync(this.path, JSON.stringify(product, null))
          console.log('Se actualizo tu producto')
        }else{
          console.log("producto no existente")
        }
      }else{
        console.log("archivo no existente")
      }
    } catch (error) {
      console.log(error)
    }
        // const actualizar = this.path.find(prop => prop.id === id)
        // return actualizar.title = title
    }

    async deleteProductById(id) {
      try {
          const products = await this.getProducts();
          if (products) {
              const index = products.findIndex((prod) => prod.id === id);
              if (index >= 0) {
                  products[index].available = false;
                   fs.writeFileSync
                      (this.path, JSON.stringify(products, null, "\t"));
                  console.log('Producto eliminado');
              }
              else {
                 console.log("El producto no existe");
              }
          }
          else {
             console.log("El archivo no existe");
          }
      }
      catch (error) {
          console.log(error);
      }
  }

  #generarId() {
    const count = this.path.length;
    const idIncre = count > 0 ? this.path[count - 1].id + 1 : 1;
    return idIncre;
  }
}
const manager = new ManagerUsuarios();
const usuario1Actualizado = {
  title: "pantalon",
  description: "pantalon negra",
  price: 390,
  thumbnail: 2,
  code: 21098,
  stock: 5,
};

async function prueba() {
  // mostramos el archivo
  console.log(await manager.getProducts());
  console.log("este producto si existe", manager.getProductById(1));
  console.log(manager.getProductById(5));
  // actualizamos un producto
  console.log('actualizado',manager.updateProduct(1, usuario1Actualizado))
  //
  console.log(manager.deleteProductById(2));
  //eliminamos el archivo .json
  // manager.deletFileProducts('si')
}

prueba();
