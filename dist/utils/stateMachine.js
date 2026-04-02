const VALID_TRANSITIONS = {
    SALES_ORDER: {
        DRAFT: ['APPROVED', 'CANCELLED'],
        APPROVED: ['SHIPPED', 'CLOSED'],
        SHIPPED: ['CLOSED']
    }
};
export const validateTransition = (entity, current, next) => {
    if (!(entity in VALID_TRANSITIONS)) {
        throw new Error(`Entity ${entity} does not exist in state machine.`);
    }
    const entityTransitions = VALID_TRANSITIONS[entity];
    const allowedTransitions = entityTransitions[current];
    if (!allowedTransitions || !allowedTransitions.includes(next)) {
        throw new Error(`Invalid Status Change: ${current} to ${next} is not allowed for ${entity}.`);
    }
};
//# sourceMappingURL=stateMachine.js.map