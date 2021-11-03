export class User {
    constructor(
        public name: String,
        public email: String,
        public password: String,
        public instituicao: String,
        public curso: String,
        public genero: String,
        public cidade: String,
        public situacao: boolean,
        public profiles: String[]
    ){}
}

