export enum DriverStatus {
    PENDING = 'PENDING',         // Just registered, not yet approved
    APPROVED = 'APPROVED',       // Approved and can accept rides
    REJECTED = 'REJECTED',       // Rejected in verification
    BLOCKED = 'BLOCKED',         // Blocked from the system
    AVAILABLE = 'AVAILABLE',     // Online and free for ride allocation
    ON_RIDE = 'ON_RIDE',
}