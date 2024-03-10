import { Mocks } from '../mocks';
import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from '../services/public-holidays.service';
import { PublicHolidayShort } from '../types';

describe('PublicHolidaysService', () => {
    describe('getListOfPublicHolidays', () => {
        it('should return shorten public holidays', async () => {
            const holidays: PublicHolidayShort[] = await getListOfPublicHolidays(Mocks.year, Mocks.country);

            expect(holidays.length).not.toBeNull();
        });

        it('should throw error if year is not valid', async () => {
            expect(() => getListOfPublicHolidays(Mocks.notValidYear, Mocks.country)).rejects.toThrow(Mocks.yearErrorMessage);
        });

        it('should throw error if country is not valid', async () => {
            expect(() => getListOfPublicHolidays(Mocks.year, Mocks.notValidCountry)).rejects.toThrow(Mocks.contryErrorMessage);
        });
    });

    describe('checkIfTodayIsPublicHoliday', () => {
        it('should return false', async () => {
            const isHoliday: boolean = await checkIfTodayIsPublicHoliday(Mocks.country);

            expect(isHoliday).toBe(false);
        });

        it('should throw error if country is not valid', async () => {
            expect(() => checkIfTodayIsPublicHoliday(Mocks.notValidCountry)).rejects.toThrow(Mocks.contryErrorMessage);
        });
    });

    describe('getNextPublicHolidays', () => {
        it('should return next public holidays', async () => {
            const nextPublicHolidays: PublicHolidayShort[] = await getNextPublicHolidays(Mocks.country);

            expect(nextPublicHolidays.length).not.toBeNull();
        });

        it('should throw error if country is not valid', async () => {
            expect(() => getNextPublicHolidays(Mocks.notValidCountry)).rejects.toThrow(Mocks.contryErrorMessage);
        });
    });
});