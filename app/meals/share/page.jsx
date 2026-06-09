"use client";

import classes from "./page.module.css";
import ImagePicker from "@/components/meals/ImagePicker";
import { shareMealHandler } from "@/lib/action";
import MealsFormSubmit from "@/components/meals/MealsFormSubmit";
import { useActionState } from "react";

export default function ShareMealPage() {
  const [state, formAction] = useActionState(shareMealHandler, {
    message: null,
    data: {
      name: "",
      email: "",
      title: "",
      summary: "",
      instructions: "",
    },
  });

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>

      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                defaultValue={state.data?.name}
              />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                defaultValue={state.data?.email}
              />
            </p>
          </div>

          <p>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              defaultValue={state.data?.title}
            />
          </p>

          <p>
            <label htmlFor="summary">Short Summary</label>
            <input
              type="text"
              id="summary"
              name="summary"
              required
              defaultValue={state.data?.summary}
            />
          </p>

          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
              defaultValue={state.data?.instructions}
            ></textarea>
          </p>

          {state.message && <p className={classes.error}>{state.message}</p>}

          <ImagePicker label={"your image"} name={"image"} />

          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
