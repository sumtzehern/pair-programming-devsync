'use server';

import { deleteUser } from "@/data-access/user";
import { getSession } from "@/lib/auth";

export async function deleteAccountAction() {
    const session = await getSession();

    if (!session) {
        throw new Error("User not authenticated to delet your account");
    }
    await deleteUser(session.user.id);

}