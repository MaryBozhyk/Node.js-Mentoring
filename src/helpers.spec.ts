import { shortenPublicHoliday, validateInput } from './helpers';
import { Mocks } from './mocks';

describe('validateInput', () => {
    it('should return true if no year ans country data', () => {
        expect(validateInput({})).toBe(true);
    });

    it('should return true if year is valid', () => {
        expect(validateInput({ year: Mocks.year })).toBe(true);
    });

    it('should return true if country is valid', () => {
        expect(validateInput({ country: Mocks.country })).toBe(true);
    });

    it('should throw error if year is not valid', () => {
        expect(() => validateInput({ year: Mocks.notValidYear })).toThrow(new Error(Mocks.yearErrorMessage));
    });

    it('should throw error if country is not valid', () => {
        expect(() => validateInput({ country: Mocks.notValidCountry })).toThrow(new Error(Mocks.contryErrorMessage));
    });
});

describe('shortenPublicHoliday', () => {
    it('should return shorten public holiday', () => {
        expect(shortenPublicHoliday(Mocks.publicHolidays[0])).toEqual(Mocks.shortenPublicHoliday);
    });
});