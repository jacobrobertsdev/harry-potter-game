export class Player {

    constructor (
        public name: string,
        public allowSounds: boolean = false,
        public house: 'Gryffindor' | 'Hufflepuff' | 'Ravenclaw' | 'Slytherin' | '' = '',
        public score = 0
    ) {}
}
