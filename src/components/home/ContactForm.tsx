// ContactForm.tsx
import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const validate = (form: HTMLFormElement) => {
    const newErrors: typeof errors = {};

    if (form.name.value.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres.";
    }

    if (!form.email.checkValidity()) {
      newErrors.email = "Por favor, introduce un correo válido.";
    }

    if (form.message.value.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres.";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(false);

    const form = e.currentTarget;
    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log({
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    });

    form.reset();
    setErrors({});
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Tu nombre"
          className={`w-full rounded-md border bg-background px-4 py-3 text-foreground
            focus:outline-none focus:ring-2 focus:ring-primary
            ${errors.name ? "border-red-500" : "border-white/10"}`}
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Correo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="tu@correo.com"
          className={`w-full rounded-md border bg-background px-4 py-3 text-foreground
            focus:outline-none focus:ring-2 focus:ring-primary
            ${errors.email ? "border-red-500" : "border-white/10"}`}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="¿En qué podemos ayudarte?"
          className={`w-full min-h-[120px] rounded-md border bg-background px-4 py-3 text-foreground
            focus:outline-none focus:ring-2 focus:ring-primary
            ${errors.message ? "border-red-500" : "border-white/10"}`}
        />
        {errors.message && (
          <p className="text-sm text-red-500 mt-1">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-md bg-primary py-4 text-lg font-bold text-black
               hover:opacity-90 transition"
      >
        Enviar Mensaje
      </button>

      {/* Success */}
      {submitted && (
        <p className="text-center text-sm text-green-500 font-medium">
          ✅ Mensaje enviado correctamente. ¡Gracias por contactarnos!
        </p>
      )}
    </form>
  );
}
