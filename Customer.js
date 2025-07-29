class Customer {
    constructor(id, arrivalTime, patience) {
        this.id = id;
        this.arrivalTime = arrivalTime;
        this.patience = patience;   
        this.order = null;
    }

    getId() { return this.id; }
    getArrivalTime() { return this.arrivalTime; }
    getPatience() { return this.patience; }
    getOrder() { return this.order; }
    setOrder(order) { this.order = order; }

// time customer waiting
    getTimeWaited(currentTime) {
        return currentTime - this.arrivalTime;
    }
// Is customer still patient?
    isPatient(currentTime) {
        return this.getTimeWaited(currentTime)
    }
}

