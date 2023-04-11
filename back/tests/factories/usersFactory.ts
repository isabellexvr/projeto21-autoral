import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { db } from '../../src/config/db';
import { users } from '@prisma/client';

export async function createFakeUser(body: Partial<users>) {
    const password = body.password || faker.internet.password(6);
    const hashedPassword = bcrypt.hashSync(password, 10);

    return db.prisma.users.create({
        data: {
            cityId: body.cityId || faker.datatype.number({ max: 20 }),
            fullName: body.fullName || faker.name.fullName(),
            userName: body.userName || faker.name.firstName(),
            picture: body.picture || faker.image.avatar(),
            email: body.email || faker.internet.email(),
            password: hashedPassword
        }
    });
};
