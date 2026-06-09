"use server";

import { saveMeal } from "./getMeals";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

function isInvalid(text) {
    return !text || text.trim().length === 0;
}

export const shareMealHandler = async (prevState, formData) => {
    const meal = {
        title: formData.get("title"),
        summary: formData.get("summary"),
        instructions: formData.get("instructions"),
        image: formData.get("image"),
        creator: formData.get("name"),
        creator_email: formData.get("email"),
    };

    if (
        isInvalid(meal.title) ||
        isInvalid(meal.summary) ||
        isInvalid(meal.creator) ||
        isInvalid(meal.creator_email) ||
        isInvalid(meal.instructions) ||
        !meal.creator_email.includes("@") ||
        !meal.image ||
        meal.image.size === 0
    ) {
        return {
            message: "Please fill in all required fields.",
            data: {
                name: meal.creator,
                email: meal.creator_email,
                title: meal.title,
                summary: meal.summary,
                instructions: meal.instructions,
            },
        };
    }

    await saveMeal(meal);
    revalidatePath('/meals');
    redirect("/meals");
};
