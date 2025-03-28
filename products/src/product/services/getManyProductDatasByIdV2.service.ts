import { InternalServerErrorResponse, NotFoundResponse } from "@src/commons/patterns";
import { getManyProductDatasById } from "../dao/getManyProductDatasById.dao";

export const getManyProductDatasByIdServiceV2 = async (
    productIds: string[],
) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new InternalServerErrorResponse('Server Tenant ID not found').generate()
        }

        const products = await getManyProductDatasById(SERVER_TENANT_ID, productIds)

        const foundProductIds = new Set(products.map(p => p.id));
        const missingProductIds = productIds.filter(id => !foundProductIds.has(id));

        if (missingProductIds.length > 0) {
            return new NotFoundResponse(`Some products not found: ${missingProductIds.join(', ')}`).generate();
        }

        return {
            data: products,
            status: 200,
        }
    } catch (err: any) {
        return new InternalServerErrorResponse(err).generate()
    }
}