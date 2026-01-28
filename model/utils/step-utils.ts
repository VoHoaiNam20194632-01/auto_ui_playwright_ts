import * as allure from "allure-js-commons";

export async function iStep<T>(
    name: string,
    action: () => Promise<T>
): Promise<T> {
    return await allure.step(name, async () => {
        return await action();
    });
}