// Rename to "BaristaBotAgent.js" after downloading file so it will run successfully in main.js
class BaristaBotAgent {
    constructor(id) {
        this.id = id;
        this.orderQueue = [];
        this.currentlyMaking = null;
        this.timeRemainingForCurrentOrder = 0;
        this.servedOrders = [];
        this.missedOrders = [];
    }

    getId() {
        return this.id;
    }

    addOrder(order) {
        this.orderQueue.push(order);
        console.log(`BaristaBot ${this.id} received order for ${order.getDrinkType()} (Customer ${order.getCustomerId()}). Queue size: ${this.orderQueue.length}`);
    }

    onTick(currentTime, allCustomers) {
        return [];
    }
}

class SatisfactoryBaristaBotAgent extends BaristaBotAgent {
    constructor(id) {
        super(id);
    }

    addOrder(order) {
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

        if (!this.currentlyMaking && this.orderQueue.length > 0) {
            let bestOrderIndex = -1;
            let highestPriorityScore = -Infinity;

            for (let i = this.orderQueue.length - 1; i >= 0; i--) {
                const currentOrder = this.orderQueue[i];
                const customer = allCustomers.get(currentOrder.getCustomerId());

                if (!customer || !customer.isPatient(currentTime)) {
                    this.missedOrders.push(currentOrder);
                    this.orderQueue.splice(i, 1);
                    console.log(`BaristaBot ${this.id} removed impatient order for Customer ${currentOrder.getCustomerId()}.`);
                    continue;
                }

                const patienceRemaining = customer.getPatience() - customer.getTimeWaited(currentTime);
                const prepTime = currentOrder.getPreparationTime();

                let priorityScore = (100 - patienceRemaining) * 5 + (10 - prepTime) * 2;

                if (priorityScore > highestPriorityScore) {
                    highestPriorityScore = priorityScore;
                    bestOrderIndex = i;
                }
            }

            if (bestOrderIndex !== -1) {
                const nextOrder = this.orderQueue.splice(bestOrderIndex, 1)[0];
                this.currentlyMaking = nextOrder;
                this.timeRemainingForCurrentOrder = nextOrder.getPreparationTime();
                console.log(`BaristaBot ${this.id} started making ${nextOrder.getDrinkType()} for Customer ${nextOrder.getCustomerId()} (Priority).`);
            }
        }
        return actions;
    }
}
