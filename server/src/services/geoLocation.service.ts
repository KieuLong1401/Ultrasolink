import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class GeoLocationService {
    async getGeoLocation(
        ip: string
    ): Promise<{ country: string; city: string }> {
        try {
            const response = await axios.get(
                `http://ip-api.com/json/${ip}?fields=status,country,city,query`
            )
            const data = response.data

            if (data.status === 'success') {
                return {
                    country: data.country,
                    city: data.city,
                }
            } else {
                throw new HttpException(
                    'Unable to fetch geolocation',
                    HttpStatus.BAD_REQUEST
                )
            }
        } catch (error: any) {
            console.error('Error fetching geolocation:', error.message)
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}
