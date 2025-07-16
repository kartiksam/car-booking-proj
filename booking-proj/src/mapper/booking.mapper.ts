export function toCreateBookingMapper(booking: any): any {
    return {
        pickupLocation: booking.pickupLocation,
        dropoffLocation: booking.dropoffLocation,
        rideDate: booking.rideDate,
        vehicleId: booking.vehicleId,
        driverId: booking.driverId,
        lat_lng: booking.lat_lng || null, // Default to null if not provided
        fare: booking.fare || null, // Default to null if not provided
    };
}



