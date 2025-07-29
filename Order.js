class Order {
    constructor(customerId, drinkType) {
        this.customerId = customerId;
        this.drinkType = drinkType;
        this.preparationTime = this._getPreparationTime(drinkType);
    }

    getCustomerId() { return this.customerId; }
    getDrinkType() { return this.drinkType; }
    getPreparationTime() { return this.preparationTime; }

    getPreparationTime(drinkType) {
        switch (drinkType) {
            case 'coffee': return 5;
            case 'tea': return 3;
            case 'hot chocolate': return 7;
            default: return 1; 
        }
    }
}
