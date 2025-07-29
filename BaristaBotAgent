class BaristaBotAgent {
    constructor(id) {
        this.id = id;
        this.orderQueue = []; 
        this.currentlyMaking = null; 
        this.timeRemainingForCurrentOrder = 0; 
        this.servedOrders = []; 
        this.missedOrders = [];
    }

    getId() { return this.id; }

    addOrder(order) {
        // Implement your order queueing strategy here
        this.orderQueue.push(order);
        console.log(`BaristaBot ${this.id} received order for ${order.getDrinkType()} (Customer ${order.getCustomerId()}). Queue size: ${this.orderQueue.length}`);
    }

    onTick(currentTime, allCustomers) {
        const actions = [];
        if (this.currentlyMaking) {
            this.timeRemainingForCurrentOrder--;
            if (this.timeRemainingForCurrentOrder <= 0) {
                actions.push({ type: 'serve', order: this.currentlyMaking });
                this.servedOrders.push(this.currentlyMaking);
                console.log(`BaristaBot ${this.id} served ${this.currentlyMaking.getDrinkType()} to Customer ${this.currentlyMaking.getCustomerId()}`);
                this.currentlyMaking = null;
            }
        }

    // If not making an order, decide which one to start next
        if (!this.currentlyMaking && this.orderQueue.length > 0) {
            
            // Implent your order prioritzation here first in first out
            const nextOrder = this.orderQueue.shift(); 
            if (nextOrder) {
                const customer = allCustomers.get(nextOrder.getCustomerId());
                if (customer && customer.isPatient(currentTime)) {
                    this.currentlyMaking = nextOrder;
                    this.timeRemainingForCurrentOrder = nextOrder.getPreparationTime();
                    console.log(`BaristaBot ${this.id} started making ${nextOrder.getDrinkType()} for Customer ${nextOrder.getCustomerId()}.`);
                } else if (customer) {
                    this.missedOrders.push(nextOrder);
                    console.log(`BaristaBot ${this.id} missed order for Customer ${nextOrder.getCustomerId()} (impatient).`);
                }
            }
        }
        return actions;
    }

    // Add helper methods here for sorting the queue
    // getNextOrderToPrioritize(currentTime, allCustomers) { ... }
}
