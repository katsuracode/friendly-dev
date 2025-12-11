import { Form } from "react-router";
import type { Route } from "./+types";

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  const errors: Record<string, string> = {};

  if (!name) {
    errors.name = "Name is required";
  }
  if (!email) {
    errors.email = "Email is required";
  } else if (typeof email === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Email is invalid";
  }

  if (!subject) {
    errors.subject = "Subject is required";
  }
  if (!message) {
    errors.message = "Message is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const data = {
    name,
    email,
    subject,
    message,
  };

  return { message: "Form submitted successfully", data };
};

const ContactPage = ({ actionData }: Route.ComponentProps) => {
  const errors = actionData?.errors || {};

  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900">
      <h2 className="text-3xl font-bold text-white mb-2">Contact Me 📬</h2>

      {actionData?.message && (
        <div className="mb-6 bg-green-700 text-green-100 text-center rounded-lg border border-green-500 shadow-md p-4">
          {actionData.message}
        </div>
      )}

      <Form method="post" className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Full Name 👩‍💻👨‍🏫
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
        </div>
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            E-mail ✉️
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
            Subject 🖊️
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
        </div>
        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">
            Message 📚️
          </label>
          <textarea
            name="message"
            id="message"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
        </div>
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}

        <button
          type="submit"
          className="w-full text-white py-2 rouded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Send Message 🖱️
        </button>
      </Form>
    </div>
  );
};

export default ContactPage;
