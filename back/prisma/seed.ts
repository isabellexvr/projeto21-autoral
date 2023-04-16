import { PrismaClient } from "@prisma/client";
import { db } from "../src/config/db";
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

async function main() {
    let category = await db.prisma.categories.findFirst();

    if (!category) {
        await db.prisma.categories.createMany({
            data: [
                {
                    id: 1,
                    name: "eSports",
                    description: "eSports, also known as e-Sports, egames, or electronic sports is organized competitive video gaming. It primarily involves teams competing against each other in tournaments for a cash prize. Functionally, it's the same as traditional sports.",
                    icon: "https://www.kindpng.com/picc/m/398-3983118_icon-gamer-transparent-red-black-circle-hd-png.png"
                },
                {
                    id: 2,
                    name: "Tabletop Sports",
                    description: "Tabletop sports are sports that are played on a tabletop. Unlike tabletop games, tabletop sports require physical dexterity.",
                    icon: "https://cdn-icons-png.flaticon.com/512/4500/4500081.png"
                },
                {
                    id: 3,
                    name: "Soccer",
                    description: "Football, also called association football or soccer, is a game involving two teams of 11 players who try to maneuver the ball into the other team's goal without using their hands or arms. The team that scores more goals wins. Football is the world's most popular ball game in numbers of participants and spectators.",
                    icon: "https://cdn-icons-png.flaticon.com/512/188/188899.png"
                },
                {
                    id: 4,
                    name: "Run/Walk",
                    description: "Cardiovascular fitness.",
                    icon: "https://gooutside.com.br/wp-content/uploads/sites/3/2021/07/4-icon-corrida.png"
                },
                {
                    id: 5,
                    name: "Gym",
                    description: "Gym Sports Activities.",
                    icon: "https://cdn3.iconfinder.com/data/icons/forall/1062/gym-512.png"
                }
            ]
        });

        await db.prisma.addresses.create({
            data: {
                id: 1,
                country: "Brazil",
                countryIso2: "BR",
                state: "Alagoas",
                stateIso2: "AL",
                city: "Maceió"
            }
        })


        const encryptedPsswd = bcrypt.hashSync("testpassword", 10)

        await db.prisma.users.create({
            data: {
                id: 1,
                fullName: "Test User",
                userName: "testuser",
                picture: "https://cdn.pixabay.com/photo/2021/11/12/03/04/woman-6787784_960_720.png",
                cover: "https://cdn.pixabay.com/photo/2016/11/19/22/05/sailing-boat-1841376_960_720.jpg",
                addressId: 1,
                email: "testemail@gmail.com",
                password: encryptedPsswd
            }
        });

        await db.prisma.communities.create({
            data: {
                name: "Valorant Maceió",
                description: "Para jogadores de Valorant da cidade de Maceió.",
                icon: "https://yoolk.ninja/wp-content/uploads/2020/06/Games-Valorant-1024x1024.png",
                cover: "https://sm.ign.com/ign_br/game/v/valorant/valorant_5mxf.jpg",
                categoryId: 1,
                addressId: 1,
                ownerId: 1,
            }
        });

        await db.prisma.usersCommunities.create({
            data: {
                communityId: 1,
                userId: 1
            }
        });
        
        await db.prisma.posts.createMany({
            data: [
                {
                    id: 1,
                    ownerId: 1,
                    description: "This is my first post!",
                    media: "https://cdn.pixabay.com/photo/2017/05/25/15/08/jogging-2343558_1280.jpg"
                },
                {
                    id: 2,
                    ownerId: 1,
                    description: "This is a community post!",
                }
            ]
        });

        await db.prisma.communitiesPosts.create({
            data: { communityId: 1, postId: 2 }
        })
    }
};

main()
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })