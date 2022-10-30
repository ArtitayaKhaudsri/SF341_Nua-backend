const fs = require('fs')

class Recipes {

    //When create new class
    constructor(filename = 'recipes.json') {
        this.path = `./addRecipe/data/${filename}`;
        try {
            fs.readdirSync('data')
        } catch (error) {
            fs.mkdirSync('data')
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

    async create(data) {
        const totalData = await this.getAll()
        const id = this.createId()
        totalData.push({...data, id});
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(totalData, null, 2) //formatting in recipes.json
        );
    }

    async getAll() {
        return JSON.parse(await fs.promises.readFile(this.path));
    }

    async getSingle(id) {
        const data = await this.getAll()
        return data.find(recipes => recipes.id === id);
    }

    async getByType(type) {
        const data = await this.getAll();
        return data.filter(recipes => recipes.type === type);
    }

}

module.exports = Recipes