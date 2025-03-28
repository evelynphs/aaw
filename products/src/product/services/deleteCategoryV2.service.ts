import { InternalServerErrorResponse, NotFoundResponse } from "@src/commons/patterns";
import { deleteCategoryById } from "../dao/deleteCategoryById.dao";

export const deleteCategoryServiceV2 = async (
    category_id: string,
) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new InternalServerErrorResponse('Server Tenant ID not found').generate();
        }

        const category = await deleteCategoryById(SERVER_TENANT_ID, category_id);

        if (!category || Object.keys(category).length === 0) {
            return new NotFoundResponse(`Category with id ${category_id} not found`).generate();
        }

        return {
            data: {
                ...category,
            },
            status: 200,
        }
    } catch (err: any) {
        return new InternalServerErrorResponse(err).generate();
    }
}