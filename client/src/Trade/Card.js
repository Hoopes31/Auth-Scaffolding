
class Card{
    constructor(name){
        this.name = name;
        this.price = (Math.random() * 100).toFixed(2);
        this.trending =  Math.ceil((Math.random() - 0.5) * 2) < 1 ? 'up' : 'down'
    }
    fetchCard(name){
        
    }
}
export default Card