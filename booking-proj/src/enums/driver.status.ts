export enum DriverStatus {
    PENDING = 'PENDING',         // Just registered, not yet approved
    APPROVED = 'APPROVED',       // Approved and can accept rides
    REJECTED = 'REJECTED',       // Rejected in verification
    BLOCKED = 'BLOCKED',         // Blocked from the system
    AVAILABLE = 'AVAILABLE',
    UNAVAILABLE = 'UNAVAILABLE',
    ON_RIDE = 'ON_RIDE',
}