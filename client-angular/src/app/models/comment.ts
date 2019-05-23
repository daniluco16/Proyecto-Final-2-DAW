export class Comment{

    constructor(

        public id: number,
        public User_id: number,
        public Film_id: number,
        public contenido: string,
        public created_at: string
        
    ){}

}