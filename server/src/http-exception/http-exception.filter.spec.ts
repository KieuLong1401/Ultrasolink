import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { AllExceptionsFilter } from './http-exception.filter'
import { Request, Response } from 'express'

describe('AllExceptionsFilter', () => {
    let filter: AllExceptionsFilter
    let mockResponse: Partial<Response>
    let mockRequest: Partial<Request>
    let mockArgumentsHost: Partial<ArgumentsHost>

    beforeEach(() => {
        filter = new AllExceptionsFilter()

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        mockRequest = {
            url: '/test-url',
        }
        mockArgumentsHost = {
            switchToHttp: () => ({
                getResponse: () => mockResponse,
                getRequest: () => mockRequest,
            }),
        } as Partial<ArgumentsHost>
    })

    it('should be defined', () => {
        expect(filter).toBeDefined()
    })

    it('should handle HttpException', () => {
        const exception = new HttpException('Forbidden', HttpStatus.FORBIDDEN)

        filter.catch(exception, mockArgumentsHost as ArgumentsHost)

        expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.FORBIDDEN)
        expect(mockResponse.json).toHaveBeenCalledWith({
            statusCode: HttpStatus.FORBIDDEN,
            timestamp: expect.any(String),
            path: '/test-url',
            message: 'Forbidden',
        })
    })

    it('should handle non-HttpException', () => {
        const exception = new Error('Some unknown error')

        filter.catch(exception, mockArgumentsHost as ArgumentsHost)

        expect(mockResponse.status).toHaveBeenCalledWith(
            HttpStatus.INTERNAL_SERVER_ERROR
        )
        expect(mockResponse.json).toHaveBeenCalledWith({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            timestamp: expect.any(String),
            path: '/test-url',
            message: 'Internal server error',
        })
    })
})
