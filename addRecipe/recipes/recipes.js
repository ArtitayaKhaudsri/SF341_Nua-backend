const fs = require('fs');
const {log} = require("sharp/lib/libvips");

class Recipes {

    //When create new class
    constructor(filename = 'recipes.json') {
        this.path = `./addRecipe/data/${filename}`;
        try {
            fs.readdirSync('./addRecipe/data')
        } catch (error) {
            fs.mkdirSync('./addRecipe/data')
        }
        try {
            fs.accessSync(this.path)
        } catch (error) {
            fs.writeFileSync(this.path, '[]')
        }
    }

    createId() {
        return new Date().getTime().toString()
    }

    async create(data, id, imageName) {
        const totalData = JSON.parse(await fs.promises.readFile(this.path));
        totalData.push({...data, id, picture: `http://local:3410/image-name/${imageName}`});
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(totalData, null, 2) //formatting in recipes.json
        );
    }

    async getAll() {
        return JSON.parse(await fs.promises.readFile(this.path));
    }

    async getSingle(id) {
        const data = JSON.parse(await fs.promises.readFile(this.path));
        return data.find(Recipes => Recipes.id === id);
    }

    async getByType(type) {
        const data = await this.getAll();
        return data.filter(recipes => recipes.type === type);
    }
    
    async updatelike(id,like){
        const data = await this.getAll();
        var index = data.findIndex(function(data) {
            return data.id == id
          });
        data[index].like = true?like=="true":false;
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(data, null, 2) //formatting in recipes.json
        );
        console.log(data);
        return data;
    }

}

module.exports = Recipes;
