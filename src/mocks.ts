import { SUPPORTED_COUNTRIES } from './config';
import { PublicHoliday, PublicHolidayShort } from './types';

export namespace Mocks {
    export const year: number = 2024;

    export const country: string = SUPPORTED_COUNTRIES[0];

    export const notValidCountry: string = 'UA';

    export const notValidYear: number = 2020;

    export const publicHolidays: PublicHoliday[] = [
        {
            date: '07/03/24',
            localName: 'fake_local_name',
            name: 'fake_name',
            countryCode: 'fake_code',
            fixed: true,
            global: true,
            counties: [],
            launchYear: null,
            types: []
        }
    ];

    export const shortenPublicHoliday: PublicHolidayShort = {
        date: '07/03/24',
        localName: 'fake_local_name',
        name: 'fake_name'
    };

    export const contryErrorMessage: string = 'Country provided is not supported, received: UA';

    export const yearErrorMessage: string = 'Year provided not the current, received: 2020';
}