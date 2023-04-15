import { categoriesRepository } from "../repositories/categoriesRepository";

async function findAllCategories(){
    const categories = await categoriesRepository.findAll();
    return categories;
}

export const categoriesServices = {
    findAllCategories
}