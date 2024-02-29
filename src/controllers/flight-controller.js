const { StatusCodes } = require('http-status-codes');

const { FlightService } = require('../services/');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

/**
 * POST: /flights
 * req-body {
 *  flightNumber: 'UK 808',
 *  airplaneId: 'a380',
 *  departureAirportId: BLR,
 *  arrivalAirportId: PNQ,
 *  arrivalTime: '2024-01-26T12:00:00',
 *  departureTime: '2024-01-26T06:00:00',
 *  price: 2000,
 *  boardingGate: '12A',
 *  totalSeats: 120
 * }
 */
async function createFlight(req, res) {
    try{
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats    
        });
        SuccessResponse.data = flight;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error){
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
};

module.exports = {
    createFlight,
}