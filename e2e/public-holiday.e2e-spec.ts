import request from 'supertest';
import { PUBLIC_HOLIDAYS_API_URL } from '../src/config';
import { Mocks } from '../src/mocks';

describe('Public Holiday API', () => {
    describe('/PublicHolidays', () => {
        it('should return 200 and public holidays for country', async () => {
            const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/PublicHolidays/${Mocks.year}/${Mocks.country}`);

            expect(status).toEqual(200);
            expect(body.length).not.toBeNull();
        });

        it('should return 404 if country code is unknown', async () => {
            const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/PublicHolidays/${Mocks.year}/MPT`);

            expect(status).toEqual(404);
        });

        it('should return 400 if year is not supported', async () => {
            const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/PublicHolidays/1000/${Mocks.country}`);

            expect(status).toEqual(400);
        });
    });

    describe('/NextPublicHolidays', () => {
        it('should return 200 and next public holidays for country', async () => {
            const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/NextPublicHolidays/${Mocks.country}`);

            expect(status).toEqual(200);
            expect(body.length).not.toBeNull();
        });
    });
});