import axios from 'axios';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';
import * as helpers from '../helpers';
import { Mocks } from '../mocks';
import { PublicHolidayShort } from '../types';
import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from './public-holidays.service';
import Spy = jest.SpyInstance;

describe('getListOfPublicHolidays', () => {
    beforeEach(() => {
        jest.spyOn(helpers, 'validateInput').mockReturnValue(true);
        jest.spyOn(helpers, 'shortenPublicHoliday').mockReturnValue(Mocks.shortenPublicHoliday);
    });

    it('should return list of public holidays', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: Mocks.publicHolidays }));

        const listOfPublicHolidaysResponse = await getListOfPublicHolidays(Mocks.year, Mocks.country);

        expect(listOfPublicHolidaysResponse).toEqual([Mocks.shortenPublicHoliday]);
    });

    it('should call API with proper arguments', async () => {
        const axiosGetSpy: Spy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: Mocks.publicHolidays }));

        await getListOfPublicHolidays(Mocks.year, Mocks.country);

        expect(axiosGetSpy).toHaveBeenNthCalledWith(1, `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${Mocks.year}/${Mocks.country}`);
    });

    test('should return empty array on catch error from api', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('Fake error')));

        const listOfPublicHolidaysResponse: PublicHolidayShort[] = await getListOfPublicHolidays(Mocks.year, Mocks.country);

        expect(listOfPublicHolidaysResponse).toEqual([]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});

describe('checkIfTodayIsPublicHoliday', () => {
    beforeEach(() => {
        jest.spyOn(helpers, 'validateInput').mockReturnValue(true);
    });

    it('should return true if status is 200', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));

        const isTodayHolidayResponse = await checkIfTodayIsPublicHoliday(Mocks.country);

        expect(isTodayHolidayResponse).toBe(true);
    });

    it('should call API with proper arguments', async () => {
        const axiosGetSpy: Spy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));

        await checkIfTodayIsPublicHoliday(Mocks.country);

        expect(axiosGetSpy).toHaveBeenNthCalledWith(1, `${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${Mocks.country}`);
    });

    it('should return false if status is not 200', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 400 }));

        const isTodayHolidayResponse = await checkIfTodayIsPublicHoliday(Mocks.country);

        expect(isTodayHolidayResponse).toBe(false);
    });

    it('should return false on catch error from api', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('Fake error')));

        const isTodayHolidayResponse = await checkIfTodayIsPublicHoliday(Mocks.country);

        expect(isTodayHolidayResponse).toBe(false);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});

describe('getNextPublicHolidays', () => {
    beforeEach(() => {
        jest.spyOn(helpers, 'validateInput').mockReturnValue(true);
        jest.spyOn(helpers, 'shortenPublicHoliday').mockReturnValue(Mocks.shortenPublicHoliday);
    });

    it('should return list of next public holidays', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: Mocks.publicHolidays }));

        const listOfNextPublicHolidaysResponse = await getNextPublicHolidays(Mocks.country);

        expect(listOfNextPublicHolidaysResponse).toEqual([Mocks.shortenPublicHoliday]);
    });

    it('should call API with proper arguments', async () => {
        const axiosGetSpy: Spy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: Mocks.publicHolidays }));

        await getNextPublicHolidays(Mocks.country);

        expect(axiosGetSpy).toHaveBeenNthCalledWith(1, `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${Mocks.country}`);
    });

    test('should return empty array on catch error from api', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('Fake error')));

        const listOfNextPublicHolidaysResponse: PublicHolidayShort[] = await getNextPublicHolidays(Mocks.country);

        expect(listOfNextPublicHolidaysResponse).toEqual([]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});